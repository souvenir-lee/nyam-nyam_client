import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import useForm from '@base/hooks/useForm';
import Loading from '@base/components/loading';
import AddMenuScreen from '../components/AddMenuScreen';
import { addMenu, clearData } from '@base/modules/addMenu';
import { AddMenuProps } from '@base/types/Navigation/MyPageNavigation';
import { convertStoreObjToArray } from '@base/api/utils';
import { RootState } from '@base/modules';

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

export default function AddMenuContainer({ route, navigation }: AddMenuProps) {
  const dispatch = useDispatch();
  const { loading, error, submit } = useSelector((state) => state.addMenu);
  const { store } = useSelector((state) => state.signin);
  const [form, onChange, onDelete, initialize] = useForm({
    storeId: null,
    productionName: '',
    price: '0',
    info: '',
    dessertType: 0,
  });
  const [image, setImage] = useState(null);
  const storeArray = convertStoreObjToArray(store);
  console.log(storeArray);

  useEffect(() => {
    onChange('storeId', storeArray[0].id);
    dispatch(clearData());
  }, [dispatch]);

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

  const handleSubmit = () => {
    const { storeId, productionName, price, info, dessertType } = form;
    if (
      storeId === undefined ||
      !productionName ||
      !price ||
      !info ||
      !dessertType ||
      !('ingredient1' in form) ||
      !image
    ) {
      Alert.alert('모든 정보를 입력해주세요.');
      return;
    }

    const formdata = createFormData(form, image);
    dispatch(addMenu(formdata, storeId));
  };

  useEffect(() => {
    if (!loading) {
      if (error) {
        Alert.alert('정보를 수정할 수 없습니다.');
      } else if (submit) {
        Alert.alert('메뉴를 추가했습니다.');
        dispatch(clearData());
        navigation.goBack();
      }
    }
  }, [navigation, loading, error, submit]);

  return form.storeId === null ? (
    <Loading />
  ) : (
    <AddMenuScreen
      data={form}
      store={storeArray}
      loading={loading}
      image={image}
      onChange={onChange}
      onDelete={onDelete}
      pickImage={pickImage}
      handleSubmit={handleSubmit}
    />
  );
}
