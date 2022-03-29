import { StyleSheet } from "react-native";
import Colors from "../Colors/Colors";

const STYLES = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		marginTop: 20,
		flex: 1,
		alignItems: "center",
	},
	input: {
		color: Colors.black,
		paddingLeft: 30,
		borderBottomWidth: 1,
		borderColor: Colors.grey,
		borderBottomWidth: 0.5,
		flex: 1,
		fontSize: 18,
	},
	inputIcon: {
		marginTop: 3,
		position: "absolute"
	},
	btnPrimary: {
		backgroundColor: Colors.primary,
		height: 50,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 50,
	},
	btnSecondary: {
		height: 50,
		borderWidth: 1,
		borderColor: "#a5a5a5",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		flex: 1,
		flexDirection: "row",
	},
	btnImage: {
		width: 20,
		height: 20,
		marginLeft: 5
	},
	line: {
		height: 1,
		width: 30,
		backgroundColor: "#a5a5a5"
	},
});

export default STYLES;
