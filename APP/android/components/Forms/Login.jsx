import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	Image,
	StyleSheet,ScrollView,TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../../../Configs/Colors/Colors";
import STYLES from "../../../Configs/Style/formStyles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { mainBackend } from "../../../Configs/MainBackend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "./Modal";
const style = StyleSheet.create({
	header: {
		paddingVertical: 20,
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 1,
		marginTop: 15,
	},
});

const Login = () => {
	let [email, SetEmail] = useState("");
	let [password, SetPassword] = useState("");
	let [log, SetLog] = useState("");
	let values = { email, password };
	return (
		<ScrollView>
			<SafeAreaProvider
				style={{
					paddingHorizontal: 40,
					flex: 1,
					margintop: 50,
					backgroundColor: Colors.white,
				}}
			>
				<SafeAreaView
					style={{ backgroundColor: Colors.white, flex: 1 }}
				>
					<View style={style.header}>
						<Icon
							name="arrow-back-ios"
							size={28}
							onPress={navigationRef.goBack}
						/>
						<Text style={{ fontSize: 20, fontWeight: "bold" }}>
							{" "}
							LogIn
						</Text>
					</View>
				</SafeAreaView>

				<View style={{ flexDirection: "row", marginTop: 60 }}>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 32,
							color: Colors.dark,
						}}
					>
						{" "}
						Shopping{" "}
					</Text>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 32,
							color: Colors.secondary,
						}}
					>
						{" "}
						Bazaar{" "}
					</Text>
				</View>

				<View style={{ marginTop: 40 }}>
					<Text
						style={{
							fontSize: 42,
							textAlign: "center",
							fontWeight: "bold",
							color: Colors.dark,
						}}
					>
						Welcome Back...
					</Text>
					<Text
						style={{
							fontSize: 19,
							textAlign: "center",
							fontWeight: "bold",
							color: Colors.grey,
						}}
					>
						{" "}
						Login to continue
					</Text>
				</View>

				<View style={{ marginTop: 20 }}>
				<Text style={{color:"rgb(255,0,0)"}} >{log}</Text>
					<View style={STYLES.inputContainer}>
						<Icon
							name="mail-outline"
							color={Colors.grey}
							size={20}
							style={STYLES.inputIcon}
						/>
						<TextInput
							placeholder="Email"
							onChangeText={(text) => SetEmail(text)}
							type="email"
							style={STYLES.input}
						/>
					</View>
					<View style={STYLES.inputContainer}>
						<Icon
							name="lock-outline"
							color={Colors.grey}
							size={20}
							style={STYLES.inputIcon}
						/>
						<TextInput
							placeholder="Password"
							onChangeText={(text) => SetPassword(text)}
							style={STYLES.input}
							secureTextEntry
						/>
	
					</View>
					<TouchableOpacity
						onPress={() => loginSubmit(values, SetLog)}
					>
						<View style={STYLES.btnPrimary}>
							<Text
								style={{
									color: "#fff",
									fontWeight: "bold",
									fontSize: 20,
								}}
							>
								Log In{" "}
							</Text>
						</View>
					</TouchableOpacity>
					<View
						style={{
							marginVertical: 20,
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View style={STYLES.line}></View>
						<Text
							style={{ marginHorizontal: 5, fontWeight: "bold" }}
						>
							{" "}
							OR
						</Text>
						<View style={STYLES.line}></View>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<View style={STYLES.btnSecondary}>
							<TouchableOpacity onPress={() => ""}>
								<Text style={{ fontWeight: "bold", fontSize: 18 }}>	Login with <Image style={STYLES.btnImage} source={require("../../../assets/facebook.png")} /></Text>
							</TouchableOpacity>
						</View>
						<View style={{ width: 10 }}></View>
						<View style={STYLES.btnSecondary}>
							<TouchableOpacity onPress={() => "Home"}>
								<Text style={{ fontWeight: "bold", fontSize: 18 }}>	Login with<Image style={STYLES.btnImage} source={require("../../../assets/google.png")} /></Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<View
					style={{
						flexDirection: "row",
						alignItems: "flex-end",
						justifyContent: "center",
						marginTop: 40,
						marginBottom: 20,
					}}
				>
					<Text style={{ color: Colors.grey, fontWeight: "bold" }}>
						Don`t have an account ?
					</Text>
					<TouchableOpacity
						onPress={() => navigationRef.navigate("SignUp")}
					>
						<Text
							style={{ color: Colors.pink, fontWeight: "bold" }}
						>
							Sign up
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaProvider>
		</ScrollView>
	);
	function loginSubmit(value, SetLog) {
		let email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!email_pattern.test(value.email)) {
			SetLog("Please enter proper Email");
			return;
		}
		if (value.password == "") {
			SetLog("enter password please");
			return;
		} else {
			mainBackend
				.post("/user/login/", {
					Email: value.email,
					password: value.password,
				})
				.then(function (response) {
					switch (response.status) {
						case 400:
							AsyncStorage.clear()
							navigationRef.navigate("Home ")
							alert("oops something went wrong!");
							break;
						case 202:
							for (let key in response.data) {
								AsyncStorage.setItem(key, response.data[key]);
							}
							AsyncStorage.setItem("isLogedin", "true");
							navigationRef.navigate("Home ")
							break;
						case 403:
							SetLog("sorry wrong credentials");
							break;
					}
				}).catch(err=>{
					if (err.request.status == 403){
						SetLog("Email or Password wrong")
					}
				});
		}
	}
};



export default Login;
