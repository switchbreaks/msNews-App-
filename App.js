import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllNews from "./AllNews"
import ShortNews from "./shortNews/ShortNews"
import Profile from "./user/Profile"
import Home_Icon from 'react-native-vector-icons/AntDesign';
import NewspaperIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2_Icon3 from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import { responsiveHeight, } from "react-native-responsive-dimensions";
const Tab = createBottomTabNavigator();

function MyTabs() {
  const sizeOfBttomIcone = responsiveHeight(3);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={AllNews}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Home_Icon name="home" size={sizeOfBttomIcone} color={color} />
          )
        }}
      />
      <Tab.Screen name="ShortNews" component={ShortNews}
        options={{
          tabBarLabel: "Short News",
          headerShown: false,
          headerTintColor: "#fff",
          tabBarIcon: ({ color }) => (
            <NewspaperIcon name="newspaper-variant" size={sizeOfBttomIcone} color={color} />
          )
        }}
      />
      <Tab.Screen name="User" component={Profile}
        options={{
          tabBarLabel: "User",
          headerShown: false,
          headerTintColor: "#fff",
          tabBarIcon: ({ color }) => (
            <Icon2_Icon3 name="user" size={sizeOfBttomIcone} color={color} />
          )
        }} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#478eff" />
      <MyTabs />
    </NavigationContainer>
  );
}
