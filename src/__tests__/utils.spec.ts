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
})