import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { RootState } from '@base/modules';
import {
  getItemModify,
  postItemModify,
  clearData,
} from '@base/modules/itemModify';
import { ingredients } from '@base/api/item';
import useForm from '@base/hooks/useForm';
import ItemModifyScreen from '../components/ItemModifyScreen';

function refactorModifyData(data) {
  const {
    dessertType,
    id,
    storeId,
    info,
    ingredient1,
    ingredient2,
    price,
    productionImg,
    productionName,
    type,
    storeName,
  } = data;
  const refactoredData = {
    storeName,
    productionName,
    price,
    info,
    productionId: id,
    storeId,
    dessertType,
    type,
  };
  if (ingredient1) {
    refactoredData.ingredient1 = ingredients[ingredient1];
  }
  if (ingredient2) {
    refactoredData.ingredient2 = ingredients[ingredient2];
  }
  return [refactoredData, productionImg];
}

function createFormData(form, image) {
  const formdata = new FormData();
  for (const key in form) {
    formdata.append(key, form[key]);
  }
  console.log(image);
  if (image.name && image.type) {
    formdata.append('data', image);
  }
  return formdata;
}

// 매출 예측 페이지, 시그니처 페이지, 검색 페이지
export default function ItemModifyContainer({ navigation, route }) {
  console.log(route);
  const { productionId, storeId } = route.params;
  const {
    itemInfo: { itemLoading, data, itemError },
  } = useSelector((state) => state.itemModify);
  const { loading, error } = useSelector((state) => state.itemModify);
  const dispatch = useDispatch();
  const [form, onChange, onDelete, initialize] = useForm(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log('get item modify', productionId, storeId);
    dispatch(getItemModify({ productionId, storeId }));
  }, [dispatch, productionId, storeId]);

  useEffect(() => {
    if (!itemLoading && data) {
      const [refactored] = refactorModifyData(data);
      initialize(refactored);
    }
  }, [itemLoading]);

  useEffect(() => {
    if (!loading) {
      if (error) {
        Alert.alert('정보를 수정할 수 없습니다.');
        navigation.goBack();
      } else if (!form && data) {
        data.id = productionId;
        data.storeId = storeId;
        const [refactored, imageURL] = refactorModifyData(data);
        console.log('refactored', refactored);
        initialize(refactored);
        setImage({ uri: imageURL });
      }
    }
  }, [navigation, loading, error, data, form, initialize]);

  const handleImageLibraryPermission = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  const pickImage = async () => {
    await handleImageLibraryPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const localUri = result.uri;
      const filename = localUri.split('/').pop();

      // Infer the type of the image
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      setImage({ uri: localUri, name: filename, type });
    }
  };

  const handleGoBack = () => {
    dispatch(clearData());
    navigation.goBack();
  };

  const handleSubmit = () => {
    const { productionName, price, info, dessertType } = form;
    if (
      !productionName ||
      !price ||
      !info ||
      !dessertType ||
      !('ingredient1' in form)
    ) {
      Alert.alert('모든 정보를 입력해주세요.');
      return;
    }

    const formdata = createFormData(form, image);
    console.log('submit formdata', formdata);
    dispatch(postItemModify(formdata, form.productionId));
    navigation.goBack();
  };

  return itemLoading || !form ? null : (
    <ItemModifyScreen
      data={form}
      loading={loading}
      image={image}
      onChange={onChange}
      onDelete={onDelete}
      pickImage={pickImage}
      handleGoBack={handleGoBack}
      handleSubmit={handleSubmit}
    />
  );
}
