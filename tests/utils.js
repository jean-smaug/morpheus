"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("lodash/get"));
const VARIABLE = /{{\s*(?<variable>[\w.]+)\s*}}/i;
function replaceTemplateByValue(template, envs) {
    const keys = Object.keys(template);
    return keys.reduce((acc, key) => {
        if (typeof template[key] === "object") {
            if (template[key].length !== undefined) {
                if (template[key].length === 0) {
                    return Object.assign(Object.assign({}, acc), { [key]: template[key] });
                }
                return Object.assign(Object.assign({}, acc), { [key]: template[key].map(item => replaceTemplateByValue(item, envs)) });
            }
            return Object.assign(Object.assign({}, acc), { [key]: replaceTemplateByValue(template[key], envs) });
        }
        const execution = VARIABLE.exec(template[key]);
        if (execution === null || !execution.groups) {
            return Object.assign(Object.assign({}, acc), { [key]: template[key] });
        }
        const { variable } = execution.groups;
        const match = execution[0];
        return Object.assign(Object.assign({}, acc), { [key]: template[key].replace(match, get_1.default(envs, variable)) });
    }, {});
}
exports.replaceTemplateByValue = replaceTemplateByValue;
function getEnvs(insomniaFile) {
    return insomniaFile.resources
        .filter((resource) => resource._type === "environment")
        .reduce((acc, resource) => (Object.assign(Object.assign({}, acc), resource.data)), {});
}
exports.getEnvs = getEnvs;
function formatHeaders(insomniaHeaders) {
    return insomniaHeaders.reduce((acc, insomniaHeader) => {
        return Object.assign(Object.assign({}, acc), { [insomniaHeader.name]: insomniaHeader.value });
    }, {});
}
exports.formatHeaders = formatHeaders;
function formatQueryParameters(parameters) {
    return new URLSearchParams(parameters.map(parameter => [parameter.name, parameter.value])).toString();
}
exports.formatQueryParameters = formatQueryParameters;
function getHeaders({ authentication, headers: requestHeaders }) {
    const formatedRequestHeaders = formatHeaders(requestHeaders);
    let headers = formatedRequestHeaders;
    if (authentication.type === "bearer" && authentication.token) {
        headers.Authorization = `Bearer ${authentication.token}`;
    }
    if (authentication.type === "basic" &&
        authentication.username &&
        authentication.password) {
        const basicToken = Buffer.from(`${authentication.username}:${authentication.password}`).toString("base64");
        headers.Authorization = `Basic ${basicToken}`;
    }
    return headers;
}
exports.getHeaders = getHeaders;
