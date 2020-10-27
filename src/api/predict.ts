import axios from 'axios';
import {
  PredictDataAPIProps,
  PredictDataAPIResults,
} from '@base/types/predict';
import { makeAuthHeaders } from './utils';

export const getPredictDataOfWeather = async ({
  weather,
  storeId,
  accessToken,
}: PredictDataAPIProps): Promise<PredictDataAPIResults> => {
  const encoded_weather = encodeURIComponent(weather);
  console.log(encoded_weather);
  const predictData = await axios.get(
    `http://10.0.2.2:4000/predict?storeId=${storeId}&weather=${weather}`,
    {
      withCredentials: true,
      headers: {
        ...makeAuthHeaders(accessToken),
      },
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
