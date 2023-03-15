import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PizzaListScreen from './screens/PizzaListScreen';
import PizzaOrderScreen from './screens/PizzaOrderScreen';
import OrdersListScreen from './screens/OrdersListScreen';

import IconButton from './components/Buttons/IconButton';

import { Colors } from './constants/Colors';

import { openDatabase } from './Database';

const db = openDatabase();
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists orders (id integer primary key not null, pizzaName text, totalPrice real, ingredients text, amount integer, size text, type text, cheeseSides integer, name text, address text, phone text);'
      );
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: Colors.backgroundPrimary },
        }}
      >
        <Stack.Screen
          name="PizzaList"
          component={PizzaListScreen}
          options={{
            title: 'Pizza List',
          }}
        />
        <Stack.Screen
          name="PizzaOrder"
          component={PizzaOrderScreen}
          options={{
            title: 'Pizza Ordering',
            contentStyle: { backgroundColor: Colors.backgroundSecondary },
            headerStyle: {
              backgroundColor: Colors.accent,
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="OrdersList"
          component={OrdersListScreen}
          options={{
            title: 'My Orders',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
