import { FlatList } from 'react-native';
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

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderOrderItem}
    />
  );
}
