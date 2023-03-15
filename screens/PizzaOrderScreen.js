import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Formik } from 'formik';
import Checkbox from 'expo-checkbox';

import PizzaIngredientsText from '../components/PizzaIngredientsText';
import AmountPicker from '../components/AmountPicker';
import ButtonPicker from '../components/ButtonPicker';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../components/CustomButton';

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
    <>
      <StatusBar style="light" />
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
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{selectedPizza.name}</Text>
                <PizzaIngredientsText
                  ingredients={selectedPizza.ingredients}
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: Colors.textSecondary,
                  }}
                />
              </View>
              <View
                style={[styles.sectionContainer, styles.amountPickerContainer]}
              >
                <AmountPicker />
              </View>
              <View style={[styles.sectionContainer]}>
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
                <View style={styles.typePickerContainer}>
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
                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      value={isCheeseSidesChecked}
                      onValueChange={setCheeseSidesChecked}
                      color={Colors.accent}
                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: 6,
                        margin: 5,
                      }}
                    />
                    <Text style={styles.checkboxTitle}>Cheese sides</Text>
                  </View>
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
              <View style={[styles.sectionContainer, styles.bottom]}>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>$25.56{values.price}</Text>
                </View>
                <View style={styles.submitButton}>
                  <CustomButton
                    onPress={handleSubmit}
                    title="Order"
                    backgroundColor={Colors.accent}
                    borderRadius={25}
                    textColor={'white'}
                    fontSize={20}
                    color={Colors.accent}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
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
  infoContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  sectionContainer: {
    margin: 15,
    paddingStart: 15,
    paddingEnd: 15,
    marginBottom: 0,
  },
  amountPickerContainer: {
    alignItems: 'center',
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
    marginBottom: 10,
    backgroundColor: Colors.backgroundPrimary,
  },
  typePickerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.backgroundPrimary,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputTitle: {
    fontSize: 16,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    backgroundColor: Colors.backgroundSecondary,
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: Colors.backgroundPrimary,
    borderColor: Colors.accent,
    elevation: 5,
    borderRadius: 50,
    marginEnd: 10,
  },
  price: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  submitButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginStart: 10,
  },
});
