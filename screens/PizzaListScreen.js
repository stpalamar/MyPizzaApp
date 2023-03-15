import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native';
import PizzaListItem from '../components/PizzaList/PizzaListItem';
import IconButton from '../components/Buttons/IconButton';

import { PIZZAS } from '../data/dummy-data';

export default function PizzaListScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="cart-outline"
          size={30}
          onPress={() => navigation.navigate('OrdersList')}
        />
      ),
    });
  }, [navigation]);

  function renderPizzaItem(itemData) {
    function pressHandler() {
      navigation.navigate('PizzaOrder', {
        pizzaId: itemData.item.id,
      });
    }

    return (
      <PizzaListItem
        id={itemData.item.id}
        name={itemData.item.name}
        price={itemData.item.price}
        ingredients={itemData.item.ingredients}
        imageUrl={itemData.item.imageUrl}
        onPress={pressHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <FlatList
        data={PIZZAS}
        keyExtractor={(item) => item.id}
        renderItem={renderPizzaItem}
      />
    </>
  );
}
