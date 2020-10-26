import axios from 'axios';
import {
  PredictDataAPIProps,
  PredictDataAPIResults,
} from '@base/types/predict';

export const getPredictDataOfWeather = async ({
  weather,
  storeId,
}: PredictDataAPIProps): Promise<PredictDataAPIResults> => {
  const predictData = await axios.post(
    `http://10.0.2.2:4000/predict/predict`,
    JSON.stringify({ weather, storeId }),
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    }
  );
  let {
    data: { quantityData },
  } = predictData;
  quantityData = quantityData.reduce((acc, curItem) => {
    acc.push(curItem.production);
    return acc;
  }, []);

  return quantityData;
};
