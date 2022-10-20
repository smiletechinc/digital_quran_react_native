import React, {FunctionComponent, useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  View,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {PrimaryButton, TextButton} from '../components/buttons';
import {useTranslation} from 'react-i18next';
import {AppImageHeader} from '../components/images';
import AppTextInput from '../components/input/colors_app_textinput';
import {StatusBar} from 'expo-status-bar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
// import {setUserObject} from '../../redux/slices/AuthSlice';
// Custom UI components.
import {COLORS, SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants';
import {backgroundAppImage, backBtn2} from '../constants/images';
// import {TextInput} from '../../global-components/input';
// import SigninFooterComponent from './components/SigninFooterComponent';
import {AuthContext, AuthContextType} from '../context/authContext';

// Custom Styles
// import globalStyles from '../../global-styles';
import styles from './ScreenStyles';

const signinMainImage = require('../../assets/images/signin-main-image.png');
const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {StackActions, NavigationActions} from 'react-navigation';

// import {
//   signInService,
//   getUserWithIdService,
// } from './../../services/authenticationServices';
import {UserObject} from '../constants/type';
// import {AuthContext} from './../../context/auth-context';
// import {RootState} from '../../../store';
// const backIcon = require('../../assets/images/back-icon.png');

type Props = {
  navigation?: any;
  route?: any;
};

const SigninScreen: FunctionComponent<Props> = props => {
  // console.log('UserData: ', UserData);
  const {t} = useTranslation();
  const {authUser, setAuthUser, setAuthObject} = React.useContext(
    AuthContext,
  ) as AuthContextType;
  const {navigation, route} = props;
  const [email, setEmail] = useState<string>(''); // Testing@gmail.com
  const [password, setPassword] = useState<string>(''); // 123456

  const [passwordError, setPasswordError] = useState('');
  const [emailErrorDisc, setEmailErroDisc] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setEmailErroDisc('');
    setPasswordError('');
  }, [email, password]);
  // const goToHomePage = userObject => {
  //   const user: UserObject = userObject;
  //   console.log('userObject in home : ', user);

  //   setAuthObject(userObject);
  //   dispatch(setUserObject(user));

  //   navigation.reset({
  //     index: 0,
  //     routes: [{name: 'MainApp'}],
  //   });
  //   // navigation.navigate('MainApp');
  // };

  // const getUsrObject = userCredential => {
  //   // console.log('userCredential : ', userCredential);
  //   let uid = userCredential.uid;
  //   // console.log('uid : ', uid);
  //   setAuthUser(userCredential);
  //   getUserWithIdService(uid, goToHomePage, fetchUserFailure);

  //   // getUserWithIdService(uid, goToHomePage, authenticationFailure)
  // };

  // const authenticationSuccess = (userCredential?: any) => {
  //   setLoading(false);
  //   if (userCredential) {
  //     setAuthObject(userCredential);
  //     console.log('userCredential : ', userCredential);
  //     const user = userCredential.user;
  //     // Alert.alert("Trainify", `You've logged in successfully ${JSON.stringify(user)}`)
  //     getUsrObject(userCredential);
  //   } else {
  //     Alert.alert('Trainify', 'Error in login!');
  //   }
  // };

  // const fetchUserFailure = error => {
  //   setLoading(false);
  //   if (error) {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     if (errorCode === 'auth/user-not-found') {
  //       Alert.alert(
  //         'Trainify',
  //         'Account not found, Please register for account!',
  //       );
  //     } else {
  //       Alert.alert('Trainify', 'Error in fetching user data!');
  //     }
  //   } else {
  //     Alert.alert('Trainify', 'Error in fetching user data!');
  //   }
  // };

  // const authenticationFailure = error => {
  //   setLoading(false);
  //   if (error) {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log('error in loging, ', error);
  //     if (errorCode === 'auth/user-not-found') {
  //       Alert.alert(
  //         'Trainify',
  //         'Account not found, Please register for account!',
  //       );
  //     } else {
  //       Alert.alert('Trainify', 'Error in login');
  //     }
  //   } else {
  //     Alert.alert('Trainify!', 'Error in login!');
  //   }
  // };

  // const proceedToLogin = () => {
  //   setLoading(true);
  //   const authObject = {
  //     email,
  //     password,
  //   };
  //   signInService(authObject, authenticationSuccess, authenticationFailure);
  // };

  // const requestData = {
  //   cardPaymentMethod: {
  //     tokenizationSpecification: {
  //       type: 'PAYMENT_GATEWAY',
  //       // stripe (see Example):
  //       gateway: 'stripe',
  //       gatewayMerchantId: '',
  //       stripe: {
  //         publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
  //         version: '2018-11-08',
  //       },
  //       // other:
  //     },
  //     allowedCardNetworks,
  //     allowedCardAuthMethods,
  //   },
  //   transaction: {
  //     totalPrice: '10',
  //     totalPriceStatus: 'FINAL',
  //     currencyCode: 'USD',
  //   },
  //   merchantName: 'Example Merchant',
  // };
  // const isGooglePayAvailable = () => {
  //   GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
  //   GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
  //     .then(ready => {
  //       if (ready) {
  //         // Request payment token
  //         console.log('it is ready.', ready);
  //         GooglePay.requestPayment(requestData)
  //           .then((token: string) => {
  //             console.log('token here: ', token);
  //             // Send a token to your payment gateway
  //           })
  //           .catch(error =>
  //             console.log('payment error: ', error.code, error.message),
  //           );
  //       }
  //     })
  //     .catch(error => {
  //       console.log('error: ', error);
  //     });
  // };

  // const validateForInputs = () => {
  //   if (email === '') {
  //     return false;
  //   }
  //   if (password === '') {
  //     return false;
  //   }
  //   return true;
  // };

  const proceedToLogin = () => {
    // 1. check if user exists in database : authentication modue
    // 2. create account
    // 3. Create user in database : real time database
    console.log('proceedtologin function called');
    const authObject = {
      email,
      password,
    };
    // signInService(authObject, authenticationSuccess, authenticationFailure); // Async function
  };

  const loginCheck = () => {
    if (email.trim().length == 0) {
      setEmailErroDisc('Please Enter Email');
    } else if (password.trim().length == 0) {
      setPasswordError('Please Enter Password');
    } else {
      proceedToLogin();
    }
  };

  return (
    <ScrollView
      style={{backgroundColor: '#FFFFFF'}}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.selectionContainer, {minHeight: SCREEN_HEIGHT}]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{left: 16, zIndex: 50}}>
          <Image source={backBtn2} style={{width: 32, height: 32}} />
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            zIndex: 50,
          }}>
          <AppImageHeader />
          <View
            style={{
              minHeight: SCREEN_HEIGHT / 1.48,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                justifyContent: 'center',
                display: 'flex',
              }}>
              <AppTextInput
                placeholder="Enter Email"
                onChangeText={(text: string) => setEmail(text)}
                defaultValue={email}
                error={emailErrorDisc}
              />
              <AppTextInput
                placeholder="Enter Password"
                onChangeText={(text: string) => setPassword(text)}
                secureTextEntry={true}
                defaultValue={password}
                error={passwordError}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                display: 'flex',
                paddingTop: '4%',
              }}>
              <PrimaryButton
                title={t('login')}
                onPress={() => {
                  loginCheck();
                }}
                buttonMarginBottom={SCREEN_HEIGHT / 16}
              />
              <Text
                style={{color: '#00B4AC', fontSize: 16, textAlign: 'center'}}>
                If you have not register, then click on
              </Text>
              <PrimaryButton
                title={t('signup')}
                onPress={() => {
                  navigation.navigate('Signup');
                }}
                buttonMarginBottom={SCREEN_HEIGHT / 28}
              />
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TextButton
                title="Forgot Password"
                onPress={console.log('signin')}
              />
            </View>
          </View>
        </View>
        <View style={{position: 'absolute', opacity: 1}}>
          <Image
            source={backgroundAppImage}
            style={{
              resizeMode: 'cover',
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
            }}
          />
        </View>
        <StatusBar style="dark" />
      </View>
    </ScrollView>
  );
};
export default SigninScreen;
