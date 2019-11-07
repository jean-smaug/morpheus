export interface IResource {
    _id: string;
    description: string;
    name: string;
    _type: string;
};

export interface IRequest extends IResource {
    authentication: {
        type?: string;
        token?: string;
        username?: string;
        password?: string;
    };
    body: {
        mimeType?: string;
        text?: string;
    };
    headers: [];
    isPrivate: false;
    method: string;
    parameters: {
        "id": string;
        "name": string;
        "value": string;
    }[],
    settingDisableRenderRequestBody: boolean;
    settingEncodeUrl: boolean;
    settingRebuildPath: boolean;
    settingSendCookies: boolean;
    settingStoreCookies: boolean;
    url: string;
    _type: "request";
};

export interface IEnvironment extends IResource {
    color: null;
    data: object;
    _type: "environment";
};

export type LowerCasedHttpMethod = "get" | "post" | "put" | "delete";
