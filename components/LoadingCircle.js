import * as React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { mainColor } from '../utils/helpers';

const LoadingCircle = () => (
  <ActivityIndicator animating={true} color={mainColor} size='large'/>
);

export default LoadingCircle;