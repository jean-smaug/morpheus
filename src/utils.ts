import _get from "lodash/get";

const VARIABLE = /{{\s*(?<variable>[\w.]+)\s*}}/i;

export function replaceTemplateByValue(template: object, envs: object) {

    const keys = Object.keys(template);
    
    keys.forEach(key => {
      const execution = VARIABLE.exec(template[key]);
      if (execution === null) {
        return;
      }
  
      if (!execution.groups) {
        return;
      }

      
      const { variable } = execution.groups;
      const match = execution[0];
  
      template[key] = template[key].replace(match, _get(envs, variable));
    });

    return template;
}
