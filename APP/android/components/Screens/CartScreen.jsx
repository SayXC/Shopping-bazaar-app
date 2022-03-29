import React from "react";	
import { SafeAreaView, StyleSheet, View, Text, Image ,FlatList,TouchableOpacity,Modal,ScrollView,TextInput} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../../../Configs/Colors/Colors";
import Products from "../Sub Components/Products";
import { PrimaryButton } from "../Sub Components/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {mainBackend} from "../../../Configs/MainBackend"
import {navigationRef} from "../Forms/Modal"
function print(text) {
	return text.startsWith("data:image/png;base64,") ? text : "data:image/png;base64," +text ;
}

const CartScreen = () => {
	
	let [cartItems,setCartItems] = React.useState();
	let [shit,setShit] = React.useState(false)
	let [selectedAddressShip,setselectedAddressShip]=React.useState()
	let [selectedAddressbil,setselectedAddressbil]=React.useState()
	let [visibility,setVisibility]=React.useState(false)
	let [firstName,setfirstName] = React.useState();
	let [secondName,setsecondName] = React.useState();
	let [Phone_number,setPhone_number] = React.useState();

	let [Addres,setAddress] = React.useState([])
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
			if(res){
			mainBackend.get("/store/getItemsInCart/",{headers:{Authorization:"Token "+res}}).then(response=>{
				setCartItems(response.data)
				setShit(true)
			})
			mainBackend.get("/resident/getAddress/",{headers:{Authorization:"Token "+res}}).then(Response=>{
				setAddress(Response.data)
			})
		}})
	},[shit])


	function checkOUTWholeCart(){
		AsyncStorage.getItem("login_token",(err,res)=>{
			if(res){
				mainBackend.post("/store/checkout/",{
					first_name:firstName,
					last_name:secondName,
					Phone_number:Phone_number,
					shipping_address_id:selectedAddressShip,
					billing_address_id:selectedAddressbil 
				},{headers:{Authorization:"Token "+res}})
				.then(response=>{
					if(response.status==202){
						alert("all items ordered successfully!")
						navigationRef.navigate("Home")
						setShit(true)
					}
				})
				.catch(err=>{
					console.log(err.request.status)
					console.log(err.request)
					console.log(err.request.data)
				})


				}
				})

	}


// =====================================================================================================================================================================================
	const CartCard = ({ item}) => {

		let [changed,setChanged]=React.useState(false)
		let [Quantity,setQuantity]=React.useState(item.Quantity)
		let oldQunatity = item.Quantity;



		function doneChange(){
			setChanged(false)
			AsyncStorage.getItem("login_token",(err,res)=>{
				mainBackend.post("store/updataQuantitiy/",{cartID:(item.id).toString(),quantity:Quantity},{headers:{Authorization:"Token "+res}})
				.then(Response=>{
					if(Response.status==202){
						setShit(false)
						return;
					}
					if(err){
						setQuantity(oldQunatity)
					}
					else{
						setQuantity(oldQunatity)
					}
				})
				.catch(err=>
					setQuantity(oldQunatity)
					)

			})
		}


		function subtract(){
			let newQuantitiy = Quantity - 1;
			setQuantity(newQuantitiy)
			if(newQuantitiy<0){
				setQuantity(0)
			}
			setChanged(true)
		}
		function add(){
			let newQuantitiy = Quantity + 1;
			setQuantity(newQuantitiy)
			if(newQuantitiy<0){
				setQuantity(0)
			}
			setChanged(true)
		}

		return (
			<View style={style.cartCard}>

				<Image source={{uri:print(item.Items_ID.Display_Image)}} style={{ height: 80, width: 80 }} />
				<View	style={{height: 100,marginLeft: 10,	paddingVertical: 20,flex: 1,}}>
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
					<Text style={{ fontWeight: "bold", fontSize: 18 }}>{Quantity}</Text>
					<View style={style.actionBtn}>
						<TouchableOpacity onPress={_=>subtract()} >
						<Icon  name="remove" size={25} color={Colors.white} />
						</TouchableOpacity>
						<TouchableOpacity>
						<Icon name="add" onPress={_=>add()}  size={25} color={Colors.white} />
						</TouchableOpacity>

						{changed==true?	<TouchableOpacity onPress={ _=>doneChange()} >
						<Icon name="done" size={25} color={Colors.white} />
						</TouchableOpacity>:<></>}
					

					</View>
				</View>
			</View>
		);
	};

// =====================================================================================================================================================================================

	return (
		<SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
						<Modal visible={visibility}  animationType="slide" >
				<ScrollView>
				<TouchableOpacity onPress={_=>setVisibility(false)} >
				<Icon size={30} name="close"/ >
				</TouchableOpacity>
				<View style={{display:"flex",padding:15}} >
					<TextInput style={style.inpuTText} onChangeText={text=>setfirstName(text)} placeholder="Recivers First Name" />
					<TextInput style={style.inpuTText} onChangeText={text=>setsecondName(text)} placeholder="Recivers Last Name" />
					<TextInput style={style.inpuTText} onChangeText={text=>setPhone_number(text)} placeholder="Phone number of reciever" 	autoCompleteType='tel' keyboardType='number-pad' />
					<Text style={style.inpuTText}>select Shipping address:</Text>
					{Addres==[]?<Text>There are no address of yours!</Text>:<FlatList data={Addres} renderItem={item => <SingleAddress item={item} setter={setselectedAddressShip} comparator={selectedAddressShip} />} keyExtractor={item => (item.id).toString()} />}
					<Text style={style.inpuTText}>select billing address:</Text>
					{Addres==[]?<Text>There are no address of yours!</Text>:<FlatList data={Addres} renderItem={item => <SingleAddress item={item} setter={setselectedAddressbil} comparator={selectedAddressbil} />} keyExtractor={item => (item.id).toString()} />}
					<TouchableOpacity onPress={_=>checkOUTWholeCart()} style={{backgroundColor:Colors.primary,alignContent:"center",borderRadius:20}} >
						<Text style={{alignSelf:"center",fontSize:50}}>Buy</Text>
					</TouchableOpacity>
				</View>
				</ScrollView>

			</Modal>
				<View style={style.header}>
						<Icon	name="arrow-back-ios"	size={28} onPress={navigationRef.goBack}/>
						<Text style={{ fontSize: 20, fontWeight: "bold" }}>
							Cart
						</Text>

						<TouchableOpacity onPress={_=>setShit(false)} ><Text style={{marginHorizontal:10,fontWeight:"bold",color:Colors.primary,backgroundColor:Colors.secondary,width:55,borderRadius:5,padding:3}}>Reload!</Text></TouchableOpacity>
					</View>{ cartItems!==null?
			<FlatList	showsVerticalScrollIndicator={true}	contentContainerStyle={{ paddingBottom: 80 }} data={cartItems}	
			renderItem={({ item,id }) => <CartCard item={item} id={id} />}	
			keyExtractor={(item,index)=>item.Items_ID.id.toString()} ListFooterComponentStyle={{	paddingHorizontal: 20,	marginTop: 20,	}}
				ListFooterComponent={() => (
					<View>
						<View	style={{	flexDirection: "row",	justifyContent: "space-between",	marginVertical: 15,	}}	>
							<Text style={{ fontSize: 18, fontWeight: "bold" }}>
								Total Price
							</Text>
							<Text style={{ fontSize: 18, fontWeight: "bold" }}>
								{cartItems==null? 0 :cartItems.reduce((sumofcart,items)=>{
									return sumofcart + (items.Items_ID.Price * items.Quantity)
								},0)}
							</Text>
						</View>
						<View style={{ marginHorizontal: 30 }}>
							<PrimaryButton onPress={_=>setVisibility(true)} title="CHECKOUT" />
						</View>
					</View>
				)}
			/>:<Text>Login please!</Text>}
		</SafeAreaView>
	);
};
// =====================================================================================================================================================================================
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

export default CartScreen;
