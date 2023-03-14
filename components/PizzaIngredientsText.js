import { View, Text } from 'react-native';
import React from 'react';

export default function PizzaIngredientsText({ ingredients, styles }) {
  return (
    <View>
      <Text style={styles}>
        {ingredients.map((i) => {
          if (ingredients.indexOf(i) === ingredients.length - 1) return i;
          else return i + ', ';
        })}
      </Text>
    </View>
  );
}
