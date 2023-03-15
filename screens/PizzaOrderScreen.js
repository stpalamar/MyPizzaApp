import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Formik, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';

import { Colors } from '../constants/Colors';

import { PIZZAS } from '../data/dummy-data';

import ConfirmOrderModal from '../components/PizzaOrder/ConfirmOrderModal';
import PizzaIngredientsText from '../components/PizzaOrder/PizzaIngredientsText';
import AmountPickerField from '../components/CustomFields/AmountPickerField';
import ButtonPickerField from '../components/CustomFields/ButtonPickerField';
import CustomButton from '../components/Buttons/CustomButton';

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

const CalcTotalPrice = () => {
  const { values, setFieldValue } = useFormikContext();
  useEffect(() => {
    let onePizzaPrice = values.price;
    if (values.size === size.Small) {
      onePizzaPrice = onePizzaPrice * 0.8;
    } else if (values.size === size.Large) {
      onePizzaPrice = onePizzaPrice * 1.2;
    }
    if (values.type === type.Thick) {
      onePizzaPrice = onePizzaPrice * 1.2;
    } else if (values.type === type.DoubleCheese) {
      onePizzaPrice = onePizzaPrice * 1.5;
    }
    if (values.cheeseSides) {
      onePizzaPrice = onePizzaPrice + 2;
    }
    let finalPrice = onePizzaPrice;
    finalPrice = finalPrice * values.amount;
    setFieldValue('totalPrice', parseFloat(finalPrice).toFixed(2));
  }, [values, setFieldValue]);
  return null;
};

export default function PizzaOrderScreen({ route, navigation }) {
  const pizzaId = route.params.pizzaId;
  const selectedPizza = PIZZAS.find((pizza) => pizza.id === pizzaId);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderData, setOrderData] = useState({});

  const schema = Yup.object().shape({
    name: Yup.string().required("Name can't be empty"),
    address: Yup.string().required("Address can't be empty"),
    phone: Yup.string().required("Phone can't be empty"),
  });

  return (
    <>
      <StatusBar style="light" />
      <ScrollView>
        <Formik
          validationSchema={schema}
          initialValues={{
            pizzaName: selectedPizza.name,
            price: selectedPizza.price,
            totalPrice: selectedPizza.price,
            ingredients: selectedPizza.ingredients,
            amount: 1,
            size: size.Medium,
            type: type.Thin,
            cheeseSides: false,
            name: 'Stanislav',
            address: 'st. Lipkovska 1',
            phone: '0660769298',
          }}
          onSubmit={(values) => {
            setModalVisible(true);
            setOrderData(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
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
                <AmountPickerField name="amount" />
              </View>
              <View style={[styles.sectionContainer]}>
                <Text style={styles.title}>Select size</Text>
                <ButtonPickerField
                  name="size"
                  data={[
                    { name: 'S', value: 'Small' },
                    { name: 'M', value: 'Medium' },
                    { name: 'L', value: 'Large' },
                  ]}
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
                      selectedValue={values.type}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('type', itemValue)
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
                      value={values.cheeseSides}
                      onValueChange={(newValue) =>
                        setFieldValue('cheeseSides', newValue)
                      }
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
                  <Text style={styles.errorMessage}>
                    <ErrorMessage name="name" />
                  </Text>
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
                  <Text style={styles.errorMessage}>
                    <ErrorMessage name="phone" />
                  </Text>
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
                  <Text style={styles.errorMessage}>
                    <ErrorMessage name="address" />
                  </Text>
                </View>
              </View>
              <View style={[styles.sectionContainer, styles.bottom]}>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${values.totalPrice}</Text>
                  <CalcTotalPrice />
                </View>
                <View style={styles.submitButton}>
                  <CustomButton
                    onPress={handleSubmit}
                    title="Order"
                    backgroundColor={Colors.accent}
                    borderRadius={50}
                    textColor={'white'}
                    flex={1}
                    height={60}
                    fontSize={20}
                    padding={0}
                    color={Colors.accent}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <ConfirmOrderModal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        data={orderData}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
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
    alignItems: 'center',
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
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
