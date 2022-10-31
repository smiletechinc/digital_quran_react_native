import {useCallback, useEffect, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import NetInfo from '@react-native-community/netinfo';
import InternetConnectionAlert from 'react-native-internet-connection-alert';

interface Props {
  arabictext: any;
}

export const InternetCheckedHook = () => {
  const [internetCheckStatus, setInternetCheckStatus] = useState<
    boolean | null
  >();

  const internetCheckFunction = async () => {
    try {
      //   NetInfo.fetch().then(state => {
      //     setInternetCheckStatus(state.isInternetReachable);
      //     console.log('Connection type', state.type);
      //     console.log('Is connected?', state.isConnected);
      //     console.log('isInternetReachable?', state.isInternetReachable);
      //   });

      NetInfo.addEventListener(state => {
        setInternetCheckStatus(state.isInternetReachable);
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        console.log('Is isInternetReachable?', state.isInternetReachable);
      });
      //   console.log('netInfo', netinfo);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    internetCheckFunction,
    internetCheckStatus,
    setInternetCheckStatus,
  };
};
