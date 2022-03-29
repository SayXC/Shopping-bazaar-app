import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image ,ActivityIndicator,Modal,ScrollView,TouchableOpacity,Picker,FlatList,TextInput} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../../../Configs/Colors/Colors";
import { SecondaryButton } from "../Sub Components/Button";
import {navigationRef} from "./../Forms/Modal"
import axios from "axios";
import { mainBackend } from "../../../Configs/MainBackend";
import AsyncStorage from "@react-native-async-storage/async-storage";

function print(text) {
	return text.startsWith("data:image") ? text : "data:image/png;base64," +text ;
}


const DetailsScreen = (props) => {
	let data = props.route.params.data
	let [visibility,setVisibility]=React.useState(false)
	let [Addres,setAddres]=React.useState()
	let [selectedAddressShip,setselectedAddressShip]=React.useState()
	let [selectedAddressbil,setselectedAddressbil]=React.useState()

	let [firstName,setfirstName] = React.useState();
	let [secondName,setsecondName] = React.useState();
	let [quantity,setquantity] = React.useState();
	let [Phone_number,setPhone_number] = React.useState();
	function SingleAddress({item,comparator,setter}){
		return (
			<TouchableOpacity onPress={_=>setter(item.item.id)} style={{borderRadius:30,alignItems:"center",borderStyle:"solid",borderColor:"rgb(0,0,0)",borderWidth:3,margin:10,backgroundColor:(item.item.id==comparator?"#787878":"#ffffff")}}>
				<Text style={{fontWeight:"bold",fontSize:17,margin:5 ,color:(item.item.id==comparator?"#ffffff":"#000000")}} >{item.item.Name}  {item.item.Phone_number} </Text>
				<Text style={{margin:10,color:(item.item.id==comparator?"#ffffff":"#000000")}}>{item.item.Landmark} {item.item.Regein} {item.item.Town} {item.item.State} {item.item.Pincode}</Text>
			</TouchableOpacity>
		)
	}
	React.useEffect(()=>{
		AsyncStorage.getItem("login_token",(err,res)=>{
			if(err){
				console.log(err)
			}
			if(res){
				mainBackend.get("/resident/getAddress/",{headers:{Authorization:"Token "+res}}).then(Response=>{
					setAddres(Response.data)
				})
			}
		})
	},[true])
	let image_ist = data.Product_details.images
		image_ist = [data.Display_Image,...image_ist]
		const ImageView = () => {
			return (
				<SafeAreaView>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{image_ist.map((image, index) => ( <Image source={{uri:print(image)}} style={{ height: 220, width: 220,margin:15 }} key={index} /> ))}
					</ScrollView>
				</SafeAreaView>
			);
		}

	function order(){
		AsyncStorage.getItem("login_token",(err,res)=>{
			mainBackend.post("/store/order/",
				{
				itemID:data.id,
				quantity:quantity,
				shippingID:selectedAddressShip,
				billingID:selectedAddressbil,
				First_Name:firstName,
				Last_Name:secondName,
				Phone_Number:Phone_number
				},
				{headers:{Authorization:"Token "+res}})
			.then(response=>{
				if(response.status==200){
					setVisibility(false);
					alert("item orderd successfully")
				}
			})
			.catch(err=>{
				console.log(err.request.status)
			})
		})
	
	}

	function addtoCart(){
		AsyncStorage.getItem("login_token",(err,res)=>{
			if(res){
				console.log("if entered")
			mainBackend.get("/store/setItemsInCart/",{params:{itemID:data.id,quantity:1},headers:{Authorization:"Token "+res}})
			.then(Response=>{
				if(Response.status==200){
					alert("Item added successfully!")
					return;
				}
			}).catch(err=>{
				console.log(err.request)
			})
		}
		})
	}

		return (
		<SafeAreaView style={{ backgroundColor: Colors.white }}>
			<Modal visible={visibility}  animationType="slide" >
				<ScrollView>
				<TouchableOpacity onPress={_=>setVisibility(false)} >
				<Icon size={30} name="close"/ >
				</TouchableOpacity>
				<View style={{display:"flex",padding:15}} >
					<TextInput style={style.inpuTText} onChangeText={text=>setfirstName(text)} placeholder="Recivers First Name" />
					<TextInput style={style.inpuTText} onChangeText={text=>setsecondName(text)} placeholder="Recivers Last Name" />
					<TextInput style={style.inpuTText} onChangeText={text=>setquantity(text)} placeholder="Quantitiy" 	autoCompleteType='tel' keyboardType='number-pad' />
					<TextInput style={style.inpuTText} onChangeText={text=>setPhone_number(text)} placeholder="Phone number of reciever" 	autoCompleteType='tel' keyboardType='number-pad' />
					<Text style={style.inpuTText}>select Shipping address:</Text>
					{Addres==[]?<Text>There are no address of yours!</Text>:<FlatList data={Addres} renderItem={item => <SingleAddress item={item} setter={setselectedAddressShip} comparator={selectedAddressShip} />} keyExtractor={item => (item.id).toString()} />}
					<Text style={style.inpuTText}>select billing address:</Text>
					{Addres==[]?<Text>There are no address of yours!</Text>:<FlatList data={Addres} renderItem={item => <SingleAddress item={item} setter={setselectedAddressbil} comparator={selectedAddressbil} />} keyExtractor={item => (item.id).toString()} />}
					<TouchableOpacity onPress={_=>order()} style={{backgroundColor:Colors.primary,alignContent:"center",borderRadius:20}} >
						<Text style={{alignSelf:"center",fontSize:50}}>Buy</Text>
					</TouchableOpacity>
				</View>
				</ScrollView>

			</Modal>
			<View style={style.header}>
				<Icon
					name="arrow-back-ios"
					size={28}
					onPress={navigationRef.goBack}
				/>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>
					Details
				</Text>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{	justifyContent: "center",	alignItems: "center",	height: 280,	}}	>
					<ImageView />
				</View>
				<View style={style.details}>
					<View style={{	flexDirection: "row",justifyContent: "space-between",	alignItems: "center",}}	>
						<Text style={{	fontSize: 25,		fontWeight: "bold",	color: Colors.white,}}>
							{data.Name}
						</Text>
						<View style={style.iconContainer}>
							<Icon	name="favorite-border"	color={Colors.primary}	size={25}/>
						</View>
					</View>
					<Text style={style.detailsText}>
						{data.Product_details.description}
					</Text>
					<View style={{margin:10 }}>
						<SecondaryButton onPress={_=>{
							AsyncStorage.getItem("login_token",(err,res)=>{
								if(res){
									setVisibility(true)
								}
								else {
									navigationRef.navigate("LogIn")
								}
							})
							}} title="Buy" />
					</View>
					<View style={{ margin:10,marginBottom:40 }}>
						<SecondaryButton onPress={_=>{
											AsyncStorage.getItem("login_token",(err,res)=>{
												if(res){
													addtoCart()
												}
												else {
													navigationRef.navigate("LogIn")
												}})
								}} title="Add To Cart" />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}



const style = StyleSheet.create({
	inpuTText:{
		fontSize:30
	},
	header: {
		paddingVertical: 20,
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 20,
	},
	details: {
		paddingHorizontal: 20,
		paddingTop: 40,
		paddingBottom: 60,
		backgroundColor: Colors.primary,
		borderTopRightRadius: 40,
		borderTopLeftRadius: 40,
	},
	iconContainer: {
		backgroundColor: Colors.white,
		height: 50,
		width: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
	},
	detailsText: {
		marginTop: 10,
		lineHeight: 22,
		fontSize: 16,
		color: Colors.white,
	},
});

export default DetailsScreen;
