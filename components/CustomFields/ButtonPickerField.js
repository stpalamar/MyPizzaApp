import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useField } from 'formik';

import { Colors } from '../constants/Colors';

export default function ButtonPickerField({ name, data }) {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = meta;

  const [userOption, setUserOption] = React.useState(value);
  const selectHandler = (value) => {
    setUserOption(value);
    setValue(value);
  };

  return (
    <View style={styles.container}>
      {data.map((item, i) => (
        <Pressable
          key={i}
          style={({ pressed }) => pressed && styles.pressed}
          onPress={() => selectHandler(item.value)}
        >
          <View
            style={
              item.value === userOption
                ? [styles.circle, styles.circleSelected]
                : [styles.circle, styles.circleUnselected]
            }
          >
            <Text
              style={
                item.value === userOption
                  ? [styles.text, styles.textSelected]
                  : [styles.text, styles.textUnselected]
              }
            >
              {item.name}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 50,
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  textUnselected: {
    color: 'black',
  },
  textSelected: {
    color: 'white',
  },
  circleUnselected: {
    backgroundColor: 'lightgray',
  },
  circleSelected: {
    backgroundColor: Colors.accent,
  },
  pressed: {
    opacity: 0.7,
  },
});
