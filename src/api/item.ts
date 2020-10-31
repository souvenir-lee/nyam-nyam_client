import axios from 'axios';
import { makeAuthHeaders, domain } from './utils';

export const ingredients = {
  초콜릿: 1,
  녹차: 2,
  생크림: 3,
  딸기: 4,
  민트초코: 5,
  요거트: 6,
  블루베리: 7,
  콩가루: 8,
  땅콩: 9,
  라즈베리: 10,
  치즈: 11,
  커피: 12,
  밤: 13,
  무화과: 14,
  키위: 15,
  복숭아: 16,
  망고: 17,
  당근: 18,
  시나몬: 19,
  꿀: 20,
  크림: 21,
  사과: 22,
  바나나: 23,
  건포도: 24,
  팥: 25,
  소보루: 26,
};

export const idToIngredients = [
  '초콜릿',
  '녹차',
  '생크림',
  '딸기',
  '민트초코',
  '요거트',
  '블루베리',
  '콩가루',
  '땅콩',
  '라즈베리',
  '치즈',
  '커피',
  '밤',
  '무화과',
  '키위',
  '복숭아',
  '망고',
  '당근',
  '시나몬',
  '꿀',
  '크림',
  '사과',
  '바나나',
  '건포도',
  '팥',
  '소보루',
];

export const dessertType = {
  케이크: 0,
  마카롱: 1,
  쿠키: 2,
  타르트: 3,
  '기타 빵': 4,
  기타: 5,
};

export const idToDessertType = [
  '케이크',
  '마카롱',
  '쿠키',
  '타르트',
  '기타 빵',
  '기타',
];

export const getItemDetailInfo = async (productionId: string) => {
  const getItemDetail = await axios.get(
    `${domain}/detail/${productionId}`,
    {
      withCredentials: true,
      responseType: 'json',
    }
  );

  return getItemDetail.data;
};

export const getItemModifyInfo = async (productionId, storeId, accessToken) => {
  const getItemDetail = await axios.get(
    `${domain}/managemenu/editmenu?productionId=${productionId}&storeId=${storeId}`,
    {
      withCredentials: true,
      responseType: 'json',
      headers: {
        ...makeAuthHeaders(accessToken),
      },
    }
  );

  console.log('item detail', getItemDetail.data);
  return getItemDetail.data;
};

export const postItemModifyInfo = async (
  data: FormData,
  accessToken: string
) => {
  const postItemDetail = await axios.post(
    `${domain}/managemenu/editmenu`,
    data,
    {
      withCredentials: true,
      responseType: 'json',
      headers: {
        ...makeAuthHeaders(accessToken),
      },
    }
  );

  return postItemDetail;
};
