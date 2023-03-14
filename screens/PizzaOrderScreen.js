import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import Checkbox from 'expo-checkbox';

import PizzaIngredientsText from '../components/PizzaIngredientsText';
import AmountPicker from '../components/AmountPicker';
import ButtonPicker from '../components/ButtonPicker';
import { Picker } from '@react-native-picker/picker';

import { Colors } from '../constants/Colors';

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

  const [amount, setAmount] = React.useState(1);
  const [pizzaSize, setPizzaSize] = React.useState('Medium');
  const [isCheeseSidesChecked, setCheeseSidesChecked] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState();

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
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: Colors.textSecondary,
                }}
              />
            </View>
            <View style={styles.sectionContainer}>
              <AmountPicker />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.title}>Select size</Text>
              <ButtonPicker
                data={[
                  { name: 'S', value: 'Small' },
                  { name: 'M', value: 'Medium' },
                  { name: 'L', value: 'Large' },
                ]}
                onSelect={(value) => setPizzaSize(value)}
              />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.title}>Select type</Text>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  value={isCheeseSidesChecked}
                  onValueChange={setCheeseSidesChecked}
                  color={Colors.accent}
                  style={{ height: 25, width: 25, borderRadius: 6, margin: 5 }}
                />
                <Text style={styles.checkboxTitle}>Cheese sides</Text>
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  mode="dropdown"
                  style={{
                    margin: 0,
                    padding: 0,
                    color: Colors.textPrimary,
                  }}
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }
                >
                  <Picker.Item label={type.Thin} value={type.Thin} />
                  <Picker.Item label={type.Thick} value={type.Thick} />
                  <Picker.Item
                    label={type.DoubleCheese}
                    value={type.DoubleCheese}
                  />
                </Picker>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.title}>Delivery details</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                  style={styles.input}
                  cursorColor={Colors.accent}
                  selectionColor={Colors.accent}
                  maxLength={25}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Enter your name"
                  value={values.name}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Phone</Text>
                <TextInput
                  style={styles.input}
                  cursorColor={Colors.accent}
                  selectionColor={Colors.accent}
                  maxLength={10}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  keyboardType="numeric"
                  enterKeyHint="next"
                  placeholder="Enter your phone"
                  value={values.phone}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Address</Text>
                <TextInput
                  style={styles.input}
                  cursorColor={Colors.accent}
                  selectionColor={Colors.accent}
                  maxLength={25}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  placeholder="Enter your address"
                  value={values.address}
                />
              </View>
            </View>

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
  },
  image: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    margin: 30,
    marginBottom: 0,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
  },
  sectionContainer: {
    margin: 15,
    marginBottom: 0,
    borderWidth: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxTitle: {
    fontSize: 18,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 0,
    margin: 0,
  },
  title: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.backgroundPrimary,
    elevation: 5,
  },
  inputContainer: {},
  inputTitle: {
    fontSize: 16,
  },
});
