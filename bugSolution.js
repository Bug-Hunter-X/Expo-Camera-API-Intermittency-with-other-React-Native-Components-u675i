// bugSolution.js
import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View } from 'react-native';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; // wait for permission
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity style={{alignSelf: 'flex-end', position: 'absolute', bottom: 20, right:20}} onPress={handleTakePicture} >
          <View style={{backgroundColor: 'white', borderRadius: 50, padding: 15}}>
            <Text>Capture</Text>
          </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;