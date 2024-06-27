import { Input } from "@/components/form/input";
import Header from "@/components/home/header";
import { Colors } from "@/constants/Colors";
import { useReport } from "@/context/report/ReportState";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Verify() {
    const { verifyPayload, setVerifyPayload } = useReport();

    const handleInputChange = (key: string, value: string | number) => {
        setVerifyPayload({
            ...verifyPayload,
            [key]: value,
        });
    };

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
                        paddingVertical: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#04364A",
                            fontFamily: "MontserratSemiBold",
                            transform: [{ scaleY: 1.1 }],
                        }}
                    >
                        Verifikasi Data Diri
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "column",
                        rowGap: 20,
                        width: "auto",
                        height: "auto",
                        paddingHorizontal: 20,
                        marginTop: 20,
                    }}
                >
                    <Input
                        required
                        label="NIK"
                        type="number"
                        value={verifyPayload.nik}
                        placeholder="Masukan NIK seusai KTP"
                        onChangeText={(text) => {
                            handleInputChange("nik", text);
                        }}
                    />
                    <Input
                        required
                        label="Nama"
                        type="text"
                        value={verifyPayload.name}
                        placeholder="Cth: Budi Agung"
                        onChangeText={(text) => {
                            handleInputChange("name", text);
                        }}
                    />
                    <Input
                        required
                        label="E-mail"
                        type="text"
                        value={verifyPayload.email}
                        placeholder="Cth: example@gmail.com"
                        onChangeText={(text) => {
                            handleInputChange("email", text);
                        }}
                    />
                    <Input
                        required
                        label="Nomor HP"
                        type="number"
                        value={verifyPayload.email}
                        placeholder="Cth: 08210001200"
                        onChangeText={(text) => {
                            handleInputChange("email", text);
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
