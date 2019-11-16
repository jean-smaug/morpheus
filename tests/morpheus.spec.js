"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const utils_1 = require("./utils");
const file_1 = __importDefault(require("./file"));
const envs = utils_1.getEnvs(file_1.default);
const requests = file_1.default.resources.filter((item) => item._type === "request");
const requestsWithEnvs = requests.map((request) => {
    return utils_1.replaceTemplateByValue(request, envs);
});
requestsWithEnvs.forEach((request) => {
    const { method: requestMethod, url: requestUrl, description, parameters, body: requestBody } = request;
    const formattedParameters = utils_1.formatQueryParameters(parameters);
    let trueRequestBody = undefined;
    let requestHeaders = utils_1.getHeaders(request);
    if (requestBody.mimeType === "application/graphql" && requestBody.text) {
        trueRequestBody = requestBody.text;
    }
    if (requestBody.mimeType === "application/json" && requestBody.text) {
        trueRequestBody = requestBody.text;
    }
    it(`${requestMethod} - ${request.name}`, async () => {
        try {
            const gotMethod = requestMethod.toLowerCase();
            const { body, headers, statusCode } = await got_1.default[gotMethod](requestUrl, {
                headers: requestHeaders,
                query: formattedParameters,
                body: trueRequestBody
            });
            delete headers.date;
            let serializedBody = body;
            if (headers["content-type"] &&
                headers["content-type"].includes("application/json")) {
                serializedBody = JSON.parse(body);
            }
            expect({
                url: requestUrl,
                statusCode,
                headers,
                body: serializedBody,
                description
            }).toMatchSnapshot();
        }
        catch (error) {
            expect(error).toMatchSnapshot();
        }
    });
});
