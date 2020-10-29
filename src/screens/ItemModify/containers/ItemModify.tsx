import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { RootState } from '@base/modules';
import { getItemModify, postItemModify } from '@base/modules/itemModify';
import useForm from '@base/hooks/useForm';
import ItemModifyScreen from '../components/ItemModifyScreen';

function refactorModifyData(data) {
  const {
    dessertType,
    id,
    info,
    ingredients,
    price,
    productionImg,
    productionName,
    type,
  } = data.productionData;
  const refactoredData = {
    productionId: id,
    storeId: data.storeId,
    productionName,
    price,
    info,
    storeName: data.storeName,
    dessertType,
    type,
  };
  if (ingredients[0]) {
    refactoredData.ingredient1 = ingredients[0].id;
  }
  if (ingredients[1]) {
    refactoredData.ingredient2 = ingredients[1].id;
  }
  return [refactoredData, productionImg];
}

function createFormData(form, image) {
  const formdata = new FormData();
  for (const key in form) {
    formdata.append(key, form[key]);
  }
  if (image.name && image.type) {
    formdata.append('productionImg', image);
  }
  return formdata;
}

// 매출 예측 페이지, 시그니처 페이지, 검색 페이지
export default function ItemModifyContainer({ navigation, route }) {
  console.log(route);
  const { productionId, storeId } = route.params;
  const {
    itemInfo: { loading, data, error },
  } = useSelector((state) => state.itemDetail);
  const dispatch = useDispatch();
  const [form, onChange, onDelete, initialize] = useForm(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(getItemModify({ productionId, storeId }));
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (error) {
        Alert.alert('정보를 수정할 수 없습니다.');
        navigation.goBack();
      } else if (!form && data) {
        const [refactored, imageURL] = refactorModifyData(data);
        initialize(refactored);
        setImage({ uri: imageURL });
      }
    }
  }, [navigation, loading, error, data]);

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
    navigation.goBack();
  };

  const handleSubmit = () => {
    const formdata = createFormData(form, image);
    console.log(formdata);
    navigation.goBack();
  };

  return loading || !form ? null : (
    <ItemModifyScreen
      data={form}
      image={image}
      onChange={onChange}
      onDelete={onDelete}
      pickImage={pickImage}
      handleGoBack={handleGoBack}
      handleSubmit={handleSubmit}
    />
  );
}
