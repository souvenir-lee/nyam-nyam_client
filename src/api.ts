import axios from 'axios';
import { AddressAPIResult } from '@base/types/api';
import { Coords } from '@base/types/SignUpAddress';

export const getStoreByKeyword = async (
  keyword: string,
  coords: Coords
): Promise<AddressAPIResult> => {
  try {
    const cafeResults = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        keyword
      )}&x=${coords.x}&y=${coords.y}&size=15`,
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
