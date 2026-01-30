import { Text, View } from "react-native";

export default function SearchScreen() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <Text style={{ fontSize: 18, color: "#767676" }}>Search</Text>
        </View>
    );
}
