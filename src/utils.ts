import _get from "lodash/get";
import { OutgoingHttpHeaders } from "http";
import crypto from "crypto";
import { IResource, IEnvironment, IRequest } from "./types";

const VARIABLE = /{{\s*(?<variable>[\w.]+)\s*}}/i;

export function replaceTemplateByValue(
  template: any,
  envs: object
): IRequest {
  const keys: string[] = Object.keys(template);

  return keys.reduce((acc: object, key: string) => {
    if (typeof template[key] === "object") {
      if (template[key].length !== undefined) {
        if (template[key].length === 0) {
          return { ...acc, [key]: template[key] };
        }

        return {
          ...acc,
          [key]: template[key].map((item: any) => replaceTemplateByValue(item, envs))
        };
      }

      return { ...acc, [key]: replaceTemplateByValue(template[key], envs) };
    }

    const execution = VARIABLE.exec(template[key]);

    if (execution === null || !execution.groups) {
      return { ...acc, [key]: template[key] };
    }

    const { variable } = execution.groups;
    const match = execution[0];

    return {
      ...acc,
      [key]: template[key].replace(match, _get(envs, variable))
    };
  }, {}) as IRequest;
}

export function getChainingRequestId(template: string) {
  const parsedTemplate = JSON.parse(template)
  const templateKeys = Object.keys(parsedTemplate)
  return templateKeys.reduce((acc, templateKey) => {
    return { ...acc, [templateKey]: parsedTemplate[templateKey].split(",").map((i: string) => i.trim())[1].subsring(1) }
  }, {})
}

export function getEnvs(insomniaFile: any) {
  return insomniaFile.resources
    .filter((resource: IResource) => resource._type === "environment")
    .reduce(
      (acc: object, resource: IEnvironment) => ({ ...acc, ...resource.data }),
      {}
    );
}

export function formatHeaders(
  insomniaHeaders: { name: string; value: any }[]
): { [key: string]: string } {
  return insomniaHeaders.reduce((acc, insomniaHeader) => {
    return { ...acc, [insomniaHeader.name]: insomniaHeader.value };
  }, {});
}

export function formatQueryParameters(
  parameters: { name: string; value: any }[]
) {
  return new URLSearchParams(
    parameters.map(parameter => [parameter.name, parameter.value])
  ).toString();
}

export function getHeaders({
  authentication,
  headers: requestHeaders
}: IRequest): OutgoingHttpHeaders {
  const formatedRequestHeaders = formatHeaders(requestHeaders);
  let headers: { [key: string]: string } = formatedRequestHeaders;

  if (authentication.type === "bearer" && authentication.token) {
    headers.Authorization = `Bearer ${authentication.token}`;
  }

  if (
    authentication.type === "basic" &&
    authentication.username &&
    authentication.password
  ) {
    const basicToken = Buffer.from(
      `${authentication.username}:${authentication.password}`
    ).toString("base64");
    headers.Authorization = `Basic ${basicToken}`;
  }

  return headers;
}
