import React from "react";
import { Text, StyleSheet, View, Image, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../Configs/Colors/Colors";
import { PrimaryButton } from "../Sub Components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
const OnBoardScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
			<View style={{ height: 500 }}>
				<Image
					style={{
						width: "100%",
						resizeMode: "contain",
						height: Platform.OS === "web" ? 500 : 500,
						top: -40,
						marginTop: 20,
					}}
					source={require("../../../assets/Logo.png")}
				/>
			</View>
			<View style={style.textContainer}>
				<View>
					<Text
						style={{
							fontSize: 52,
							fontWeight: "bold",
							textAlign: "center",
							marginTop: -100,
						}}
					>
						Shopping Bazaar
					</Text>
					<View>
						<Text
							style={{
								marginTop: 30,
								fontSize: 18,
								textAlign: "center",
								color: Colors.grey,
							}}
						>
							We help you to find best
						</Text>
					</View>
				</View>
				<View>
					<PrimaryButton
						onPress={() => {
							AsyncStorage.setItem("firstTime","false");
							navigation.navigate("Home")
						}}
						title="Get Started"
					/>
				</View>
			</View>
			<View style={style.indicatorContainer}>
				<View style={style.currentIndicator} />
				<View style={style.indicator} />
				<View style={style.indicator} />
			</View>
		</SafeAreaView>
	);
};

const style = StyleSheet.create({
	textContainer: {
		flex: 1,
		paddingHorizontal: 50,
		justifyContent: "space-between",
		paddingBottom: 40,
	},
	indicatorContainer: {
		height: 50,
		flex: 1,
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
	},
	currentIndicator: {
		height: 12,
		width: 30,
		borderRadius: 10,
		backgroundColor: Colors.primary,
		marginHorizontal: 5,
	},
	indicator: {
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: Colors.grey,
		marginHorizontal: 5,
	},
});
export default OnBoardScreen;
