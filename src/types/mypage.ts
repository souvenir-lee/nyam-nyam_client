export type MyInfo = { 
    store: number;
    production: number;
    upload: number;
};

export type MyMenuItemType = {
    storeId: number | string;
    productionId: number | string;
    productionName: string;
    productionImg: string;
};

export type MyPageState = {
    store: number;
    production: number;
    upload: number;
    menus: MyMenuItemType[] | [];
    loading: boolean;
    error: any
};
