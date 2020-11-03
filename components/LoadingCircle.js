import * as React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

const LoadingCircle = () => (
  <ActivityIndicator animating={true} color={Colors.white} size='large'/>
);

export default LoadingCircle;