import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import PizzaIngredientsText from '../components/PizzaIngredientsText';

import { Colors } from '../constants/Colors';

export default function PizzaListItem({
  id,
  name,
  price,
  ingredients,
  imageUrl,
  onPress,
}) {
  return (
    <View style={styles.listItem}>
      <Pressable onPress={onPress} android_ripple={{ color: '#ccc' }}>
        <View style={styles.innerContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={imageUrl} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.price}>${price}</Text>
              <PizzaIngredientsText
                ingredients={ingredients}
                style={{
                  fontSize: 14,
                  color: Colors.textSecondary,
                }}
              />
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    width: 330,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
  imageContainer: {
    marginEnd: 20,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textAccent,
  },
});
