import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Font from "expo-font";
import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { Hub, DataStore } from 'aws-amplify';

export default function prepareResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isSyncComplete, setSyncComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load datastore
        await DataStore.start();
        // Load fonts
        await Font.loadAsync({
          ...MaterialCommunityIcons.font,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        Hub.listen('datastore', (data) => {
          const { payload } = data;
          payload.event === 'ready' && setSyncComplete(true);       
        })
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete && isSyncComplete;
}
