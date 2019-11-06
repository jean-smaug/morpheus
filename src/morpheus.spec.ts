import got from "got";
import { OutgoingHttpHeaders } from "http";
import { IRequest, IResource, LowerCasedHttpMethod } from "./types"
import { getEnvs, replaceTemplateByValue, formatQueryParameters, getHeaders } from "./utils"
import insomniaFile from "./file"

const envs = getEnvs(insomniaFile)

const requests: IRequest[] = insomniaFile.resources.filter(
  (item: IResource) => item._type === "request"
);

const requestsWithEnvs: IRequest[] = requests.map((request: IRequest) => {
  return replaceTemplateByValue(request, envs)
});

requestsWithEnvs.forEach((request: IRequest) => {
  const { method: requestMethod, url: requestUrl, description, parameters, body: requestBody } = request;
  
  const formattedParameters = formatQueryParameters(parameters);
    
  let trueRequestBody: string;
  let requestHeaders: OutgoingHttpHeaders = getHeaders(request)

  if(requestBody.mimeType === "application/graphql" && requestBody.text) {
    trueRequestBody = JSON.parse(requestBody.text)
  }

  it(`${requestMethod} - ${requestUrl}`, async () => {
    try {
      const gotMethod: LowerCasedHttpMethod = requestMethod.toLowerCase() as LowerCasedHttpMethod;
      const { body, headers, statusCode } = 
        await got[gotMethod](requestUrl, {
          headers: requestHeaders,
          query: formattedParameters,
          body: trueRequestBody ? JSON.stringify(trueRequestBody) : undefined,
        });

      delete headers.date;

      const serializedBody = JSON.parse(body)
      
      expect({ statusCode, headers, body: serializedBody, description }).toMatchSnapshot();
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});
