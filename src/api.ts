import axios from 'axios';
import { AddressAPIResult } from '@base/types/api';
import { Coords } from '@base/types/SignUpAddress';

type getStoreByKeywordProps = {
  keyword: string;
  coords: Coords;
};

export const getStoreByKeyword = async ({
  keyword,
  coords,
}: getStoreByKeywordProps): Promise<AddressAPIResult> => {
  try {
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
