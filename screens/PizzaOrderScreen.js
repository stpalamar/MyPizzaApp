import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import React from 'react';
import { Formik } from 'formik';

import PizzaIngredientsText from '../components/PizzaIngredientsText';
import AmountPicker from '../components/AmountPicker';

import { PIZZAS } from '../data/dummy-data';

const size = {
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
};

const type = {
  Thin: 'Thin',
  Thick: 'Thick',
  DoubleCheese: 'Double Cheese',
};

export default function PizzaOrderScreen({ route, navigation }) {
  const pizzaId = route.params.pizzaId;
  const selectedPizza = PIZZAS.find((pizza) => pizza.id === pizzaId);
  return (
    <ScrollView>
      <Formik
        initialValues={{
          pizzaName: selectedPizza.name,
          pizzaPrice: selectedPizza.price,
          pizzaIngredients: selectedPizza.ingredients,
          name: '',
          address: '',
          phone: '',
          amount: 1,
          size: size.Medium,
          type: type.Thin,
          cheeseSides: false,
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={selectedPizza.imageUrl} />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{selectedPizza.name}</Text>
            </View>
            <View style={styles.ingredientsContainer}>
              <PizzaIngredientsText
                ingredients={selectedPizza.ingredients}
                style={{}}
              />
            </View>
            <AmountPicker />
            <Button onPress={handleSubmit} title="Order" />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    margin: 30,
    marginBottom: 0,
  },
  name: {
    fontSize: 24,
  },
  nameContainer: {
    margin: 15,
    marginBottom: 0,
  },
  ingredientsContainer: {
    margin: 15,
  },
});
