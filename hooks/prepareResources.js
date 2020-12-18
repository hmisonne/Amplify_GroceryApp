import {
  MaterialCommunityIcons,
  Ionicons
} from "@expo/vector-icons";
import * as Font from "expo-font";
import * as React from "react";
import { Hub, DataStore } from 'aws-amplify';

export async function _cacheResourcesAsync() {
  
  const fonts = await Font.loadAsync({
    ...MaterialCommunityIcons.font,
    ...Ionicons.font,
  });

  return fonts;
}

export function prepareResources() {
  const [isSyncComplete, setSyncComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await DataStore.start();
      } catch (e) {
        console.warn(e);
      } finally {
        const removeListener = Hub.listen("datastore", async (data) => {
          const { payload } = data;
          if (payload.event === "ready") {
            console.log('READY', payload)
            setSyncComplete(true)
            removeListener();
          }
        });        
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isSyncComplete

}
