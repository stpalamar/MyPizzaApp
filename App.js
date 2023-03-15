import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PizzaListScreen from './screens/PizzaListScreen';
import PizzaOrderScreen from './screens/PizzaOrderScreen';

import { Colors } from './constants/Colors';

const Stack = createNativeStackNavigator();

export default function App() {
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
          options={{ title: 'Pizza List' }}
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
