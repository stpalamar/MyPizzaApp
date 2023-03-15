import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useField } from 'formik';

import IconButton from '../IconButton';

import { Colors } from '../../constants/Colors';

export default function AmountPickerField({ name }) {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = meta;
  const [amount, setAmount] = useState(value);

  const decreaseAmount = () => {
    if (amount <= 1) return;
    setAmount(amount - 1);
    setValue(amount - 1);
  };

  const increaseAmount = () => {
    if (amount >= 10) return;
    setAmount(amount + 1);
    setValue(amount + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <IconButton
          icon="remove-outline"
          size={32}
          color="black"
          onPress={decreaseAmount}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{amount}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <IconButton
          icon="add-outline"
          size={32}
          color={Colors.textAccent}
          onPress={increaseAmount}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
    height: 50,
    borderRadius: 50,
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
    elevation: 10,
    backgroundColor: Colors.backgroundPrimary,
  },
  text: {
    color: Colors.textAccent,
    fontSize: 26,
  },
});
