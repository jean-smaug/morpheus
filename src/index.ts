import got from "got";
import fs from "fs";

const INSOMNIA_FILE_NAME = /insomnia.*\.json/i;
const VARIABLE = /{{\s*(?<variable>\w+)\s*}}/i;

const cwd = process.cwd();

type Resource = {
  _id: string;
  authentication: {};
  body: {};
  description: string;
  headers: [];
  isPrivate: false;
  method: string;
  name: string;
  parameters: [];
  settingDisableRenderRequestBody: boolean;
  settingEncodeUrl: boolean;
  settingRebuildPath: boolean;
  settingSendCookies: boolean;
  settingStoreCookies: boolean;
  url: string;
  _type: string;
};

type Environment = {
  _id: string;
  color: null;
  created: 1572158819937;
  data: object;
  _type: "environment";
};

const insomniaFileName = fs
  .readdirSync(cwd)
  .find(fileName => fileName.match(INSOMNIA_FILE_NAME));

if (!insomniaFileName) {
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

requests.forEach(request => {
  const keys = Object.keys(request);
  keys.forEach(key => {
    const execution = VARIABLE.exec(request[key]);
    if (execution === null) {
      return;
    }

    if (!execution.groups) {
      return;
    }

    const { variable } = execution.groups;
    const match = execution[0];

    request[key] = request[key].replace(match, envs[variable]);
  });
});

console.log(requests);
