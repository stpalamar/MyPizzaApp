import { View, Text } from 'react-native';
import { FlatList } from 'react-native';
import PizzaListItem from '../components/PizzaListItem';

import { PIZZAS } from '../data/dummy-data';

export default function PizzaListScreen({ navigation }) {
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
    <FlatList
      data={PIZZAS}
      keyExtractor={(item) => item.id}
      renderItem={renderPizzaItem}
    />
  );
}
