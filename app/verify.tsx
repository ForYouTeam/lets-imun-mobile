import Header from "@/components/home/header";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Verify() {
    return (
        <SafeAreaView
            style={{
                height: "100%",
                width: "100%",
                flexDirection: "column",
                rowGap: 10,
                paddingTop: 40,
            }}
        >
            <ScrollView
                style={{
                    backgroundColor: "white",
                    paddingTop: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "MontserratBold",
                            fontSize: 18,
                            color: Colors.Text,
                            transform: [{ scaleY: 1.1 }],
                        }}
                    >
                        Verifikasi Data Diri
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "column",
                        rowGap: 10,
                        width: "auto",
                        height: "auto",
                        alignItems: 'center',
                        marginTop: 20
                    }}
                >
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
