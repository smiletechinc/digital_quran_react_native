import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';

const BASE_URL = 'https://api.ocr.space/parse/image';

export const FetchTextFromImageHook = () => {
  const [apiResponse, setApiResponse] = useState({});
  // const [apiResponseError, setApiResponseError] = useState();
  const getAyahImageHook = async (
    photoUri: any,
    photoName: any,
    photoType: any,
  ) => {
    setApiResponse({});
    new Promise(async (resolve, reject) => {
      try {
        const URL_ = BASE_URL;

        var headers = {
          'Content-Type': 'multipart/form-data',
          apikey: 'K88634971788957',
        };
        console.log('file', photoName);
        const imageToSend = {
          uri: photoUri,
          type: photoType,
          name: photoName,
        };
        var formBody = new FormData();
        formBody.append('url', imageToSend.uri);
        formBody.append('file', imageToSend);
        formBody.append('language', 'ara');
        formBody.append('scale', 'true');
        var responseObject = {
          isErrorProcessing: false,
          text: '',
        };
        await axios
          .post(URL_, formBody, {
            headers: headers,
          })
          .then(resonse => {
            const responseCheck = resonse.data.IsErroredOnProcessing;
            var rawResponse;
            if (!responseCheck) {
              Object.values(resonse.data).forEach((resoponseData: any) => {
                Object.values(resoponseData).forEach(
                  (responseDataInnder: any) => {
                    if (Object.values(responseDataInnder)[3]) {
                      rawResponse = Object.values(responseDataInnder)[3];
                      responseObject = {
                        isErrorProcessing: false,
                        text: JSON.stringify(rawResponse),
                      };
                    }
                  },
                );
              });
            } else {
              rawResponse = Object.values(resonse.data.ErrorMessage);
              responseObject = {
                isErrorProcessing: true,
                text: rawResponse.toString(),
              };
            }
          })
          .catch(e => {
            responseObject = {
              isErrorProcessing: true,
              text: e.toString(),
            };
          });

        setApiResponse(responseObject);
      } catch (err) {
        console.log(err);
      }
    });
  };
  return {
    getAyahImageHook,
    apiResponse,
  };
};
