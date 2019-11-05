import got from "got";
import fs from "fs";
import { OutgoingHttpHeaders } from "http";
import { Request, Resource, Environment } from "./types"
import { replaceTemplateByValue } from "./utils"

const INSOMNIA_FILE_NAME = /insomnia.*\.json/i;

const {
  cwd,
  env: { FILE }
} = process;

const insomniaFileName =
  FILE ||
  fs.readdirSync(cwd()).find(fileName => fileName.match(INSOMNIA_FILE_NAME));

if (!insomniaFileName || !fs.existsSync(insomniaFileName)) {
  throw new Error("Insonmia file not found");
}

const insomniaFile = JSON.parse(
  fs.readFileSync(insomniaFileName, { encoding: "utf-8" })
);

const envs = insomniaFile.resources
  .filter((resource: Resource) => resource._type === "environment")
  .reduce(
    (acc: object, resource: Environment) => ({ ...acc, ...resource.data }),
    {}
  );

const requests: [] = insomniaFile.resources.filter(
  (item: Resource) => item._type === "request"
);

const requestsWithEnvs = requests.map((request: { [key: string]: any }): Request => {
  return replaceTemplateByValue(request, envs)
});

type LowerCasedHttpMethod = "get" | "post" | "put" | "delete";

requestsWithEnvs.forEach((request: Request) => {
  const { method: requestMethod, url: requestUrl, authentication, description } = request;
  
  let requestHeaders: OutgoingHttpHeaders = {}
  if(authentication.type === "bearer" && request.authentication.token) {
    requestHeaders.Authorization = `Bearer ${request.authentication.token}`
  }

  it(`${requestMethod} - ${requestUrl}`, async () => {
    try {
      const gotMethod: LowerCasedHttpMethod = requestMethod.toLowerCase() as LowerCasedHttpMethod;
      const { body, headers, statusCode } = await got[gotMethod](requestUrl, { headers: requestHeaders });

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
