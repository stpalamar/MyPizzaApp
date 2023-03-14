import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import IconButton from './IconButton';

import { Colors } from '../constants/Colors';

export default function AmountPicker() {
  const [amount, setAmount] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <IconButton icon="remove-outline" size={32} color="black" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{amount}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <IconButton icon="add-outline" size={32} color={Colors.textAccent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 150,
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

  textContainer: {},
  buttonContainer: {},
});
