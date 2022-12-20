import {useCallback, useEffect, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

interface Props {
  arabictext: any;
}

export const InternetCheckedHook = () => {
  const [internetCheckStatus, setInternetCheckStatus] = useState<
    boolean | null
  >(false);
  const [internetConditionCheck, setInternetConditionCheck] =
    useState<boolean>();

  const internetCheckFunction = async () => {
    try {
      NetInfo.addEventListener(state => {
        setInternetCheckStatus(state.isInternetReachable);
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        console.log('Is isInternetReachable?', state.isInternetReachable);
      });
      if (internetCheckStatus) {
        setInternetConditionCheck(internetCheckStatus);
      } else {
        Alert.alert(
          'Digital Quran',
          'Internet is not availble for this service',
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    internetCheckFunction,
    internetCheckStatus,
    setInternetCheckStatus,
    internetConditionCheck,
  };
};
