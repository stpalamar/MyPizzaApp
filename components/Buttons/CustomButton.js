import { View, Text, TouchableHighlight } from 'react-native';
import React from 'react';

export default function CustomButton({
  title,
  onPress,
  textColor,
  backgroundColor,
  borderRadius,
  width,
  height,
  padding,
  fontSize,
  margin,
}) {
  return (
    <TouchableHighlight
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        width: width,
        height: height,
        padding: padding,
        margin: margin,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      underlayColor={'#ccc'}
      onPress={onPress}
    >
      <Text
        style={{
          color: textColor,
          fontSize: fontSize,
        }}
      >
        {title}
      </Text>
    </TouchableHighlight>
  );
}
