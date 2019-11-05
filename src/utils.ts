import _get from "lodash/get";

const VARIABLE = /{{\s*(?<variable>[\w.]+)\s*}}/i;

export function replaceTemplateByValue(template: object, envs: object) {
    const keys = Object.keys(template);
    
    return keys.reduce((acc: object, key: string) => {
      const execution = VARIABLE.exec(template[key]);
  
      if (execution === null || !execution.groups) {
        return {... acc, [key]: template[key]};
      }
  
      const { variable } = execution.groups;
      const match = execution[0];
  
      return { ...acc, [key]: template[key].replace(match, _get(envs, variable)) };
    }, {});
}