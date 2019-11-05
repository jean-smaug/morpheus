export interface Resource {
    _id: string;
    description: string;
    name: string;
    _type: string;
};

export interface Request extends Resource {
    authentication: {
        type?: string;
        token?: string;
    };
    body: {};
    headers: [];
    isPrivate: false;
    method: string;
    parameters: [];
    settingDisableRenderRequestBody: boolean;
    settingEncodeUrl: boolean;
    settingRebuildPath: boolean;
    settingSendCookies: boolean;
    settingStoreCookies: boolean;
    url: string;
    _type: "request";
};

export interface Environment extends Resource {
    color: null;
    data: object;
    _type: "environment";
};
