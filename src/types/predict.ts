export type PredictDataAPIProps = {
  weather: string;
  storeId: number;
};

export type PredictDataObject = {
  id: number;
  productionName: string;
  productionImg: string;
  price: number;
  info: string;
  dessertType: number;
  type: number;
  quantity: number;
};

export type PredictDataAPIResults = PredictDataObject[];
