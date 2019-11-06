import { replaceTemplateByValue, formatHeaders, formatQueryParameters, getHeaders } from "../utils"
import { IRequest } from "../types"

describe("> utils/replaceTemplateByValue", () => {
    it("should replace nothing", () => {
        const template = {
            jean: "smaug"
        }

        const envs = {
            smaug: "bogass"
        }

        expect(replaceTemplateByValue(template, envs)).toEqual({
            jean: "smaug"
        })
    })

    it("should replace variable by the real value", () => {
        const template = {
            jean: "{{smaug}}"
        }

        const envs = {
            smaug: "bogass"
        }

        expect(replaceTemplateByValue(template, envs)).toEqual({
            jean: "bogass"
        })
    })

    it("should replace variable by the real value when env is deep", () => {
        const template = {
            jean: "{{deep.smaug}}"
        }

        const envs = {
            deep: {
                smaug: "bogass"
            }
        }

        expect(replaceTemplateByValue(template, envs)).toEqual({
            jean: "bogass"
        })
    })

    it("should replace variable by the real value when template is deep", () => {
        const template = {
            deep: {
                jean: "{{smaug}}"
            }
        }

        const envs = {
            smaug: "bogass"
        }

        expect(replaceTemplateByValue(template, envs)).toEqual({
            deep: { jean: "bogass" }
        })
    })
})

describe('> utils/getHeaders', () => {
    it('should format headers', () => {
        const insomniaHeaders = [
            {
                "id": "pair_d070764b7a584d9891ab8f5d5781868d",
                "name": "Content-Type",
                "value": "application/json"
            }
        ]

        expect(formatHeaders(insomniaHeaders)).toEqual({
            'Content-Type': "application/json"
        })
    })
})

describe('> utils/formatQueryParameters', () => {
    it('should format one query param', () => {
        const queryParameters = [
            {
                "name": "jean",
                "value": "smaug"
            }
        ]

        expect(formatQueryParameters(queryParameters)).toBe("jean=smaug")
    })

    it('should format one query param', () => {
        const queryParameters = [
            {
                "name": "jean",
                "value": "smaug"
            },
            {
                "name": "cadeau",
                "value": "de-noel"
            }
        ]

        expect(formatQueryParameters(queryParameters)).toBe("jean=smaug&cadeau=de-noel")
    })
})

describe('> utils/getHeaders', () => {
    const baseRequest: IRequest = {
        "_id": "req_d650433ac4264b6e9f611c54332789c2",
        "authentication": {},
        "body": {},
        "description": "",
        "headers": [],
        "isPrivate": false,
        "method": "GET",
        "name": "Get character by name",
        "parameters": [],
        "settingDisableRenderRequestBody": false,
        "settingEncodeUrl": true,
        "settingRebuildPath": true,
        "settingSendCookies": true,
        "settingStoreCookies": true,
        "url": "{{baseUrl}}/characters/name-querystring",
        "_type": "request"
      };

    it('should\'nt return headers', () => {
        expect(getHeaders(baseRequest)).toEqual({})
    })
    
    it('should return headers for token auth', () => {
        expect(getHeaders({...baseRequest, authentication: { token: "mein-token", type: "bearer" }})).toEqual({ Authorization: "Bearer mein-token" })
    })

    it('should set headers for graphql query', () => {
        expect(getHeaders({...baseRequest, body: { mimeType: "application/graphql", text: "{ foo, bar }" } })).toEqual({ "Content-Type": "application/json" })
    })
})
