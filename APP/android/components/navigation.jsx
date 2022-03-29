import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, SafeAreaView } from "react-native";

import OnBoardScreen from "./Screens/OnBoardScreen";
import DetailsScreen from "./Screens/DetailsScreen";
import BottomNavigator from "./Navigation/BotomNavigator";
import MyAccount from './Screens/MyAccount';
import Login from "./Forms/Login";
import Colors from "../../Configs/Colors/Colors"
import ProfilePage from './Screens/Profile/ProfilePage';
import WishList from './Screens/WishListScreen';
import OrderList from './Screens/OrderScreen';
import Address from './Screens/Profile/Address';
import ComplainScreen from './Forms/ComplainScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from './Forms/Modal';
const Stack = createStackNavigator();


export default function Android(props) {

	if(props.isFirst){
	return (
		<>
			<NavigationContainer ref={navigationRef}>
				<StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{/* <Stack.Screen name="MainPage" component={MainPage} /> */}
					<Stack.Screen name="BoardScreen" component={OnBoardScreen} />
					<Stack.Screen name="Home" component={BottomNavigator} />
					<Stack.Screen name="LogIn" component={Login} />
					<Stack.Screen name="MyAccount" component={MyAccount} />
					<Stack.Screen name="DetailsScreen" component={DetailsScreen} />
					<Stack.Screen name="Profile" component={ProfilePage} />
					<Stack.Screen name="WishList" component={WishList} />
					<Stack.Screen name="OrderList" component={OrderList} />
					<Stack.Screen name="Address" component={Address} />
					<Stack.Screen name="ComplainScreen" component={ComplainScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
	}
	else{
		return (
			<>
			<NavigationContainer ref={navigationRef}>
				<StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{/* <Stack.Screen name="MainPage" component={MainPage} /> */}
					{/* <Stack.Screen name="BoardScreen" component={OnBoardScreen} /> */}
					<Stack.Screen name="Home" component={BottomNavigator} />
					<Stack.Screen name="LogIn" component={Login} />
					<Stack.Screen name="MyAccount" component={MyAccount} />
					<Stack.Screen name="DetailsScreen" component={DetailsScreen} />
					<Stack.Screen name="Profile" component={ProfilePage} />
					<Stack.Screen name="WishList" component={WishList} />
					<Stack.Screen name="OrderList" component={OrderList} />
					<Stack.Screen name="Address" component={Address} />
					<Stack.Screen name="ComplainScreen" component={ComplainScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
		)
	}
}