import { StyleSheet } from "react-native";
import Colors from "../Colors/Colors";

const SignupStyle = StyleSheet.create({
	SafeAreaView: {
		paddingHorizontal: 40,
		flex: 1,
		backgroundColor: Colors.white,
	},
	Shopping: {
		fontWeight: "bold",
		fontSize: 32,
		color: Colors.dark,
	},
	Bazaar: {
		fontWeight: "bold",
		fontSize: 32,
		color: Colors.secondary,
	},
	Welcome: {
		fontSize: 42,
		textAlign: "center",
		fontWeight: "bold",
		color: Colors.dark,
	},
	Continue: {
		fontSize: 19,
		textAlign: "center",
		fontWeight: "bold",
		color: Colors.grey,
	},
	SignupBtn: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 20,
	},
	SignUpOr: {
		marginVertical: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	AlreadyHaveAccView: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
		marginTop: 40,
		marginBottom: 20,
	},
	AlreadyHaveAcc: {
		color: Colors.grey,
		fontSize: 18,
		fontWeight: "bold",
	},
	LoginBtn: {
		color: Colors.black,
		fontSize: 18,
		fontWeight: "bold",
	},
});

export { SignupStyle };
