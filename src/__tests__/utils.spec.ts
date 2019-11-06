import { replaceTemplateByValue, formatHeaders } from "../utils"

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