import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image,TouchableOpacity,FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../../../Configs/Colors/Colors";
import Products from "../Sub Components/Products";
import { PrimaryButton } from "../Sub Components/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {mainBackend} from "../../../Configs/MainBackend"


function print(text) {
	return "data:image/png;base64," + text
}

const OrderList = ({ navigation }) => {
	let [cartItems,setCartItems] = React.useState();
	let [shit,setShit] = React.useState(false)

	let statuses = {
		'O':"ORDERED",
        'D':"DISPATCHED",
        'S':"SHIPED",
        'OD':"OUT FOR DELIVERY",
        'D':"DONE"
	}

	React.useEffect(()=>{
		AsyncStorage.getItem("login_token",(err,res)=>{
			mainBackend.get("/store/getallOrders",{headers:{Authorization:"Token "+res}})
			.then(response=>{
				setCartItems(response.data)
				setShit(true)
			})
			.catch(err=>{
				console.log(err.request.status)
			})
		})
	},[shit])

	const CartCard = ({ item }) => {
		return (
			<View style={style.cartCard}>
				<Image source={{uri:print(item.Items_ID.Display_Image)}} style={{ height: 80, width: 80 }} />
				<View
					style={{
						height: 100,
						marginLeft: 10,
						paddingVertical: 20,
						flex: 1,
					}}
				>
					<Text style={{ fontWeight: "bold", fontSize: 16 }}>
						{item.Items_ID.Name}
					</Text>
					{/* <Text style={{ fontSize: 13, color: Colors.grey }}>
						{item.Items_ID.discription}
					</Text> */}
					<Text style={{ fontSize: 17, fontWeight: "bold" }}>
						{item.Items_ID.Price}
					</Text>
				</View>
				<View style={{ marginRight: 20, alignItems: "center" }}>
					<Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.Quantity}</Text>
					<Text style={{ fontWeight: "bold", fontSize: 10 }}>{statuses[item.Status]}</Text>
					<Text style={{ fontWeight: "bold", fontSize: 9 }}>{item.Tracking_ID}</Text>
				</View>
			</View>
		);
	};
	return (
		<SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
			<View style={style.header}>
				<Icon
					name="arrow-back-ios"
					size={28}
					onPress={navigation.goBack}
				/>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>My Order</Text>
			</View>
			<FlatList
				showsVerticalScrollIndicator={true}
				contentContainerStyle={{ paddingBottom: 80 }}
				data={cartItems}
				renderItem={({ item }) => <CartCard item={item} />}
				keyExtractor={(item,index)=>item.Items_ID.id.toString()}
				ListFooterComponentStyle={{
					paddingHorizontal: 20,
					marginTop: 20,
				}}
				ListFooterComponent={() => (
					<View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								marginVertical: 15,
							}}
						>
						</View>
					</View>
				)}
			/>
			
		</SafeAreaView>
	);
};
const style = StyleSheet.create({
	header: {
		paddingVertical: 20,
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 20,
	},
	cartCard: {
		height: 100,
		elevation: 15,
		borderRadius: 10,
		backgroundColor: Colors.white,
		marginVertical: 10,
		marginHorizontal: 20,
		paddingHorizontal: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	actionBtn: {
		width: 80,
		height: 30,
		backgroundColor: Colors.primary,
		borderRadius: 30,
		paddingHorizontal: 5,
		flexDirection: "row",
		justifyContent: "center",
		alignContent: "center",
	},
});

export default OrderList;
