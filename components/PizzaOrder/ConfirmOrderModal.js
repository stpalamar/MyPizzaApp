import { View, Text, Modal, StyleSheet } from 'react-native';
import React from 'react';

import CustomButton from '../Buttons/CustomButton';

export default function ConfirmOrderModal({ data, ...props }) {
  return (
    <Modal {...props}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>ConfirmOrderModal</Text>
          <View style={styles.buttonsView}>
            <CustomButton
              onPress={() => {}}
              title="Cancel"
              backgroundColor={'grey'}
              textColor={'white'}
              borderRadius={50}
              width={120}
              height={60}
              fontSize={20}
              padding={0}
              marginRight={10}
            />
            <CustomButton
              onPress={() => {}}
              title="Confirm"
              backgroundColor={'forestgreen'}
              textColor={'white'}
              borderRadius={50}
              width={120}
              height={60}
              fontSize={20}
              padding={0}
              marginLeft={10}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 5,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
