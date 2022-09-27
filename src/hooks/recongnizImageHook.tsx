import {useCallback, useEffect, useState} from 'react';
import {FetchTextFromImageHook} from './textRecongApiHook';

interface Props {
  arabictext: any;
}

export const recognizeImageHook = () => {
  const [image, setImage] = useState<string | null>(null);
  const [arabicText, setArabicText] = useState('');
  const [error, setError] = useState('');
  const {getAyahImageHook, apiResponse} = FetchTextFromImageHook();

  const reconginzeImageFunction = async (
    imageCapture: any,
    bottomRef: any,
    imageFileName: any,
    imageType: string,
  ) => {
    try {
      // Remove old predictions if any
      await Promise.all([setImage(imageCapture)]);
      setArabicText('');
      setError('');
      // animate bottom sheet to cover whole screen
      bottomRef.current?.snapToIndex(1);
      // call prediction service with image
      await getAyahImageHook(imageCapture, imageFileName, imageType);
      const predictPayload = apiResponse;
      console.log('predictPayload', predictPayload);
      // if (!predictPayload.isErrorProcessing) {
      //   var arabicText = JSON.stringify(predictPayload).replace(
      //     /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669])/g,
      //     '',
      //   );
      //   setArabicText(arabicText);
      // } else {
      //   console.log('before set error', predictPayload.text);
      //   setError(`${predictPayload.text}, Please Try Again`);
      // }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return {
    reconginzeImageFunction,
    image,
    arabicText,
    error,
  };
};
