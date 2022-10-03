import {useCallback, useEffect, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

interface Props {
  arabictext: any;
}

export const ClipboardHook = () => {
  const [textCopyStatus, setTextCopyStatus] = useState(false);
  const copyToClipboard = async (arabicText: any) => {
    try {
      console.log('araci', arabicText);
      Clipboard.setString(arabicText);
      const text = await Clipboard.getString();
      setTextCopyStatus(true);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    copyToClipboard,
    textCopyStatus,
    setTextCopyStatus,
  };
};
