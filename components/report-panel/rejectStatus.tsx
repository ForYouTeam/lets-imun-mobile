import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "../home/header";

export const RejectStatus = () => {
    return (
        <SafeAreaView
            style={{
                height: "100%",
                width: "100%",
                flexDirection: "column",
                rowGap: 10,
                paddingTop: "10%",
            }}
        >
            <ScrollView
                style={{
                    backgroundColor: "white",
                    paddingTop: 10,
                }}
            >
                <Header title="Laporan" hideNotifButton={true} />
                <View style={{
                    width: "100%",
                    height: 600,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    rowGap: 2
                }}>
                    <Image style={{width: 210, height: 210}} source={require('@/assets/images/reject.png')} />
                    <Text style={{
                        fontFamily: 'MontserratMedium',
                        fontSize: 14,
                        maxWidth: '70%',
                        textAlign: 'center'
                    }}>Verifikasi anda ditolak, hubungi puskesmas yang anda tuju.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
