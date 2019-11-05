export type Resource = {
    _id: string;
    description: string;
    name: string;
    settingDisableRenderRequestBody: boolean;
    settingEncodeUrl: boolean;
    settingRebuildPath: boolean;
    settingSendCookies: boolean;
    settingStoreCookies: boolean;
    _type: string;
};

export type Request = {
    _id: string;
    authentication: {};
    body: {};
    description: string;
    headers: [];
    isPrivate: false;
    method: string;
    name: string;
    parameters: [];
    settingDisableRenderRequestBody: boolean;
    settingEncodeUrl: boolean;
    settingRebuildPath: boolean;
    settingSendCookies: boolean;
    settingStoreCookies: boolean;
    url: string;
    _type: string;
};

export type Environment = {
    _id: string;
    color: null;
    created: 1572158819937;
    data: object;
    _type: "environment";
};
  