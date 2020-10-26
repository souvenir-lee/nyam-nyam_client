export type MyInfo = { 
    store: number;
    production: number;
    uploadSales: number;
};

export type MyInfoState = {
    store: number;
    production: number;
    uploadSales: number;
    loading: boolean;
    error: string | number | null
};
