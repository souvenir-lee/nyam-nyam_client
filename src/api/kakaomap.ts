import axios from 'axios';
import { AddressAPIProps, AddressAPIResult } from '@base/types/weather';

export const getStoreByKeyword = async ({
  keyword,
  coords,
}: AddressAPIProps): Promise<AddressAPIResult> => {
  try {
    if (!coords) {
      throw new Error('no coord provided');
    }
    const cafeResults = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        keyword
      )}&x=${coords.x}&y=${coords.y}`,
      {
        headers: {
          Authorization: 'KakaoAK 00bb9e39dfdc4d620c37f49660ac625a',
        },
      }
    );

    return cafeResults.data.documents;
  } catch (error) {
    throw new Error(error);
  }
};
