import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {Text, View, ScrollView, Alert, StyleSheet} from 'react-native';
import {ClipboardHook} from '../hooks/clipboardHook';
import Toast from 'react-native-fast-toast';
type Props = {
  isSurahToba: boolean;
  isSurahFatiha: boolean;
  bismillahAyah: any;
  surahData: any;
};
const MusufView: FunctionComponent<Props> = props => {
  const {isSurahFatiha, isSurahToba, bismillahAyah, surahData} = props;
  const {copyToClipboard, textCopyStatus, setTextCopyStatus} = ClipboardHook();
  const toast = useRef(null);
  useEffect(() => {
    if (textCopyStatus) {
      toast.current.show('Copy to Clipboard', {
        type: 'success',
        duration: 2000,
      });
      setTextCopyStatus(false);
    }
  }, [textCopyStatus]);

  return (
    <ScrollView>
      <View style={styles.mushafView}>
        {isSurahToba && (
          <View style={styles.bismillahView}>
            <Text style={styles.bismillahText}>{bismillahAyah}</Text>
            {isSurahFatiha && (
              <Text style={[styles.indexTextStyle]}>&#xFD3E;1 &#xFD3F;</Text>
            )}
          </View>
        )}

        <Text
          style={styles.nestedText}
          adjustsFontSizeToFit={true}
          allowFontScaling={true}>
          {surahData &&
            surahData.map((ayat: any, index: any) => (
              <Text
                key={index}
                allowFontScaling={true}
                selectable={true}
                adjustsFontSizeToFit={true}>
                <Text
                  selectable={true}
                  style={[styles.elementTextStyle]}
                  onPress={() => copyToClipboard(ayat)}
                  adjustsFontSizeToFit={true}>
                  {ayat}
                </Text>
                <Text style={[styles.indexTextStyle]}>
                  &#xFD3F;{isSurahFatiha ? index + 2 : index + 1} &#xFD3E;
                </Text>
              </Text>
            ))}
        </Text>
      </View>
      <Toast ref={toast} placement="bottom" />
    </ScrollView>
  );
};
export default MusufView;
const styles = StyleSheet.create({
  mushafView: {
    paddingVertical: 16,
    paddingBottom: 64,
    borderRadius: 16,
    marginTop: 36,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  bismillahView: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bismillahText: {
    textAlign: 'center',
    color: '#D49C35',
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '700',
    letterSpacing: 3,
  },
  nestedText: {
    flex: 1,
    fontSize: 20,
    marginTop: 15,
    textAlign: 'right',
    paddingHorizontal: 16,
  },
  indexTextStyle: {
    fontSize: 20,
    color: '#C7AA35',
  },
  elementTextStyle: {
    textAlign: 'center',
    fontSize: 24,
    color: '#1A1A1A',
    letterSpacing: 0,
    fontFamily: 'Arial',
  },
});
