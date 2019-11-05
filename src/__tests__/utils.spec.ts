import { replaceTemplateByValue } from "../utils"

describe("utils", () => {
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

    it.skip("should replace variable by the real value when template is deep", () => {
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