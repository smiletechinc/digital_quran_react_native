import React, {FunctionComponent, useState} from 'react';
import {View, Modal, TextInput, StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '../constants/index';
import {TextButton} from '../components/buttons';

type Props = {
  visible?: boolean;
  onAcceptButton?: any;
  onCancelButton?: any;
};

const TextInputModel: FunctionComponent<Props> = props => {
  const {visible, onAcceptButton, onCancelButton} = props;
  const [textValue, setTextValue] = useState<string>('');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        close();
      }}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView]}>
          <View style={styles.TextView}>
            <TextInput
              style={styles.TextInput}
              placeholder={'Enter  Name'}
              editable={true}
              onChangeText={text => setTextValue(text)}
              defaultValue={textValue}
              placeholderTextColor={'#98d3d3'}
            />
          </View>
          <View style={styles.buttonView}>
            <TextButton
              title="Create"
              onPress={() => onAcceptButton(textValue)}
              buttonStyle={{marginLeft: 4}}
            />
            <TextButton
              title="Cancel"
              onPress={onCancelButton}
              buttonStyle={{marginRight: 4}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TextInputModel;
function close() {
  throw new Error('Function not implemented.');
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: SCREEN_WIDTH * 0.75,
    alignItems: 'flex-start',
  },
  TextView: {
    width: '90%',
    marginBottom: '5%',
    paddingVertical: '8%',
  },
  TextInput: {
    marginLeft: 20,
    borderBottomWidth: 1,
    fontSize: 20,
  },
  buttonView: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
  },
});
