import got from "got";
import { OutgoingHttpHeaders } from "http";
import { IRequest, IResource, LowerCasedHttpMethod } from "./types"
import { getEnvs, replaceTemplateByValue } from "./utils"
import insomniaFile from "./file"

const envs = getEnvs(insomniaFile)

const requests: IRequest[] = insomniaFile.resources.filter(
  (item: IResource) => item._type === "request"
);

const requestsWithEnvs: IRequest[] = requests.map((request: IRequest) => {
  return replaceTemplateByValue(request, envs)
});

requestsWithEnvs.forEach((request: IRequest) => {
  const { method: requestMethod, url: requestUrl, authentication, description, parameters, body: requestBody } = request;
  
  const formattedParameters = new URLSearchParams(Object.keys(parameters).map(parameterIndex => ([parameters[parameterIndex].name, parameters[parameterIndex].value])))
    
  let trueIRequestBody: string;
  let requestHeaders: OutgoingHttpHeaders = {}
  let json = false
  if(authentication.type === "bearer" && request.authentication.token) {
    requestHeaders.Authorization = `Bearer ${request.authentication.token}`
  }

  if(requestBody.mimeType === "application/graphql" && requestBody.text) {
    trueIRequestBody = JSON.parse(requestBody.text)
    json = true
  }

  it(`${requestMethod} - ${requestUrl}`, async () => {
    try {
      const gotMethod: LowerCasedHttpMethod = requestMethod.toLowerCase() as LowerCasedHttpMethod;
      const { body, headers, statusCode } = 
        await got[gotMethod](requestUrl, {
          headers: requestHeaders,
          query: formattedParameters.toString(),
          json,
          body: trueIRequestBody
        });

      delete headers.date;

      const serializedBody =
      headers["content-type"] &&
      headers["content-type"].includes("application/json") &&
      requestBody.mimeType && requestBody.mimeType !== "application/graphql"
      ? JSON.parse(body)
      : body;
      
      expect({ statusCode, headers, body: serializedBody, description }).toMatchSnapshot();
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});
