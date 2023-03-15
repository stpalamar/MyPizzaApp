import { View, Text, Modal, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import { Colors } from '../../constants/Colors';

import PizzaIngredientsText from './PizzaIngredientsText';
import CustomButton from '../Buttons/CustomButton';

import { openDatabase } from '../../Database';

const db = openDatabase();

export default function ConfirmOrderModal({ data, onCancel, ...props }) {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
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

  const insertOrder = () => {
    db.transaction((tx) => {
      console.log(ingredients);
      tx.executeSql(
        'insert into orders (pizzaName, totalPrice, ingredients, amount, size, type, cheeseSides, name, address, phone) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          pizzaName,
          totalPrice,
          ingredients.join(', '),
          amount,
          size,
          type,
          cheeseSides,
          name,
          address,
          phone,
        ],
        setIsSuccess(true)
      );
      tx.executeSql('select * from orders', [], (_, { rows }) =>
        console.log(JSON.stringify(rows), null, 2)
      );
    });
  };

  if (isSuccess) {
    return (
      <Modal {...props}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.header}>Order confirmed</Text>
            <View style={styles.buttonsView}>
              <CustomButton
                onPress={() => {
                  setIsSuccess(false);
                  onCancel();
                }}
                title="OK"
                backgroundColor={'forestgreen'}
                textColor={'white'}
                borderRadius={50}
                flex={1}
                height={60}
                fontSize={20}
                padding={0}
                marginTop={10}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal {...props}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.header}>Check your order</Text>
          <View style={styles.informationView}>
            <View style={styles.subInfo}>
              <Text style={styles.subtitle}>{pizzaName}</Text>
              <Text style={styles.text}>Ingredients:</Text>
              <PizzaIngredientsText
                ingredients={ingredients}
                style={styles.text}
              />
              <Text style={styles.text}>Amount: {amount}</Text>
              <Text style={styles.text}>Size: {size}</Text>
              <Text style={styles.text}>Type: {type}</Text>
              <Text style={styles.text}>
                Cheese sides: {cheeseSides ? 'Yes' : 'No'}
              </Text>
              <Text style={styles.priceText}>Price: ${totalPrice}</Text>
            </View>
            <View style={styles.subInfo}>
              <Text style={styles.subtitle}>Delivery info</Text>
              <Text style={styles.text}>Your name: {name}</Text>
              <Text style={styles.text}>Address: {address}</Text>
              <Text style={styles.text}>Phone: {phone}</Text>
            </View>
          </View>
          <View style={styles.buttonsView}>
            <CustomButton
              onPress={onCancel}
              title="Cancel"
              backgroundColor={'grey'}
              textColor={'white'}
              borderRadius={50}
              width={120}
              height={60}
              fontSize={20}
              padding={0}
              marginRight={10}
            />
            <CustomButton
              onPress={() => {
                insertOrder();
              }}
              title="Confirm"
              backgroundColor={'forestgreen'}
              textColor={'white'}
              borderRadius={50}
              width={120}
              height={60}
              fontSize={20}
              padding={0}
              marginLeft={10}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    elevation: 5,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 15,
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
  },
  informationView: {
    marginBottom: 20,
  },
  subInfo: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textAccent,
  },
});
