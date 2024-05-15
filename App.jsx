import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DetailScreen from './src/screens/DetailScreen';
import Constant from './src/constant/Constant';
import Icon from 'react-native-vector-icons/Ionicons';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={headerStyle}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Details" component={DetailScreen}options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const headerStyle = {
  title: 'Movies',
  headerStyle: {backgroundColor: Constant.baseColor},
  headerTitleStyle: {color: Constant.textColor},
  headerLeft: () => <Icon name="menu" size={30} color={Constant.textColor} />,
  headerRight: () => (
    <Icon name="search" size={30} color={Constant.textColor} />
  ),
};
export default App;


