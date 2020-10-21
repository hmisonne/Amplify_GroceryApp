  import * as React from "react";
  import { Hub } from 'aws-amplify';
  import { DataStore } from "@aws-amplify/datastore";
  
  export default function syncDatastore() {
    const [isSyncComplete, setSyncComplete] = React.useState(false);
  
    // Sync datastore before loading the app
    React.useEffect(() => {
        async function startDataStore() {
            try {
                await DataStore.start();
            } catch (e) {
                console.warn(e);
            } finally {
                Hub.listen('datastore', (data) => {
                    const { payload } = data;
                    payload.event === 'ready' && setSyncComplete(true);       
                  })
            ;
            }
          }
      
  
          startDataStore();
    }, []);
  
    return isSyncComplete;
  }