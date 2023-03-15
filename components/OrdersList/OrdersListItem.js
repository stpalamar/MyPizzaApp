import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { Colors } from '../../constants/Colors';

export default function OrdersListItem({ data }) {
  const {
    id,
    pizzaName,
    totalPrice,
    ingredients,
    amount,
    size,
    type,
    cheeseSides,
    name,
    address,
    phone,
  } = data;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order #{id}</Text>
      <View style={styles.orderInfo}>
        <Text style={styles.subtitle}>details</Text>
        <Text>{pizzaName}</Text>
        <Text>{ingredients}</Text>
        <Text>Amount: {amount}</Text>
        <Text>Size: {size}</Text>
        <Text>Type: {type}</Text>
        <Text>Cheese sides: {cheeseSides ? 'Yes' : 'No'}</Text>
        <Text>Price: ${totalPrice}</Text>
      </View>
      <View style={styles.deliveryInfo}>
        <Text style={styles.subtitle}>Delivery details</Text>
        <Text>{name}</Text>
        <Text>{address}</Text>
        <Text>{phone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 25,
    padding: 15,
    margin: 10,
    marginEnd: 20,
    marginStart: 20,
    backgroundColor: 'white',
    elevation: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    textTransform: 'uppercase',
    color: Colors.textAccent,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  orderInfo: {
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  deliveryInfo: {
    alignItems: 'flex-end',
  },
});
