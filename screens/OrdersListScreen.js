import { Text, View, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import OrdersListItem from '../components/OrdersList/OrdersListItem';

import { openDatabase } from '../Database';

const db = openDatabase();

export default function OrdersListScreen() {
  const [orders, setOrders] = React.useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('select * from orders', [], (_, { rows: { _array } }) =>
        setOrders(_array)
      );
    });
  }, []);

  function renderOrderItem(itemData) {
    return <OrdersListItem data={itemData.item} />;
  }

  if (orders && orders.length === 0)
    return (
      <View style={styles.centeredView}>
        <Text style={styles.text}>No orders found</Text>
      </View>
    );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderOrderItem}
    />
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
