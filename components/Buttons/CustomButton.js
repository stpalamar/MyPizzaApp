import { View, Text, StyleSheet, Pressable } from 'react-native';
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
  ...props
}) {
  return (
    <View
      style={{
        borderRadius: borderRadius,
        backgroundColor: backgroundColor,
        margin: margin,
        height: height,
        width: width,
        ...props,
      }}
    >
      <Pressable
        style={[
          {
            flex: 1,
            padding: padding,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
        android_ripple={{ color: '#ccc', borderless: true }}
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
      </Pressable>
    </View>
  );
}
