import got from "got";
import { OutgoingHttpHeaders } from "http";
import { Request, Resource, LowerCasedHttpMethod } from "./types"
import { getEnvs, replaceTemplateByValue } from "./utils"
import insomniaFile from "./file"

const envs = getEnvs(insomniaFile)

const requests: [] = insomniaFile.resources.filter(
  (item: Resource) => item._type === "request"
);

const requestsWithEnvs = requests.map((request: Request) => {
  return replaceTemplateByValue(request, envs)
});

requestsWithEnvs.forEach((request: Request) => {
  const { method: requestMethod, url: requestUrl, authentication, description, parameters } = request;
  
  const formattedParameters = new URLSearchParams(Object.keys(parameters).map(parameterIndex => ([parameters[parameterIndex].name, parameters[parameterIndex].value])))
    
  let requestHeaders: OutgoingHttpHeaders = {}
  if(authentication.type === "bearer" && request.authentication.token) {
    requestHeaders.Authorization = `Bearer ${request.authentication.token}`
  }

  it(`${requestMethod} - ${requestUrl}`, async () => {
    try {
      const gotMethod: LowerCasedHttpMethod = requestMethod.toLowerCase() as LowerCasedHttpMethod;
      const { body, headers, statusCode } = await got[gotMethod](requestUrl, { headers: requestHeaders, query: formattedParameters.toString() });

      delete headers.date;

      const serializedBody =
        headers["content-type"] &&
        headers["content-type"].includes("application/json")
          ? JSON.parse(body)
          : body;

      expect({ statusCode, headers, body: serializedBody, description }).toMatchSnapshot();
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});
