import _get from "lodash/get";
import { IResource, IEnvironment } from "./types"

const VARIABLE = /{{\s*(?<variable>[\w.]+)\s*}}/i;

export function replaceTemplateByValue(template: { [key: string]: any }, envs: object): { [key: string]: any } {
    const keys = Object.keys(template);
    
    return keys.reduce((acc: object, key: string) => {
      if(typeof template[key] === "object") {
        return { ...acc, [key]: replaceTemplateByValue(template[key], envs)}
      }

      const execution = VARIABLE.exec(template[key]);

      if (execution === null || !execution.groups) {
        return {... acc, [key]: template[key]};
      }
  
      const { variable } = execution.groups;
      const match = execution[0];
  
      return { ...acc, [key]: template[key].replace(match, _get(envs, variable)) };
    }, {});
}

export function getEnvs(insomniaFile: any) {
  return insomniaFile.resources
    .filter((resource: IResource) => resource._type === "environment")
    .reduce(
      (acc: object, resource: IEnvironment) => ({ ...acc, ...resource.data }),
      {}
    );
}

export function formatHeaders(insomniaHeaders: { name: string, value: any }[]): HeadersInit {
  return insomniaHeaders.reduce((acc, insomniaHeader) => {
    return { ...acc, [insomniaHeader.name]: insomniaHeader.value }
  }, {})
}