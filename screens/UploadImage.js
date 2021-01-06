import Amplify, { Storage } from 'aws-amplify';

import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

export default function UploadImage({route, navigation}) {
  const [image, setImage] = useState(null);
  const {productID} = route.params
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const uploadToStorage = async () => {
    try {
      const response = await fetch(image)
      const blob = await response.blob()
      Storage.put(`${productID}.jpeg`, blob, {
        contentType: 'image/jpeg',
      })
      navigation.goBack()
    } catch (err) {
        console.log('Failed')
      console.log(err)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && 
      <View>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <Button title="Upload" onPress={uploadToStorage}/>
      </View>
      }
    </View>
  );
}



  