import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../../../Configs/Colors/Colors";
import HomeScreen from "../Screens/HomeScreen";
import CartScreen from "../Screens/CartScreen";
import MyAccount from "../Screens/MyAccount";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
	let [comp,setComp] =React.useState()
	function  myacc () {return <MyAccount islogedin={comp}/> }

	AsyncStorage.getItem("isLogedin",(err,result)=>{    
		if(result=="true"){
			setComp(true)
			}
			else{
				setComp(false)
			} })



	return (
		<Tab.Navigator
		screenOptions={{
				style: {
					height: 55,
					borderTopWidth: 0,
					elevation: 0,
				},
				showLabel: false,
				activeTintColor: Colors.primary,
			}}
		>
			<Tab.Screen
				name="Home "
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="home-filled" color={color} size={28} />
					),
				}}
			/>
			<Tab.Screen
				name="My Account"
				component={myacc} 
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="account-circle" color={color} size={28} />
					),
				}}
			/>
			{/* <Tab.Screen
				name="Search"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="search" color={color} size={28} />
					),
				}}
			/> */}
			<Tab.Screen
				name="My Cart"
				component={CartScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="shopping-cart" color={color} size={28} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};
export default BottomNavigator;
