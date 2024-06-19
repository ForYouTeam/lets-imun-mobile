import { Image, SafeAreaView, KeyboardAvoidingView, Text, TextInput, View, Platform, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {

    return (
        <View style={{
            paddingTop: Platform.OS === 'android' ? 25 : 0,
        }}>
            <StatusBar style="auto" />
            <SafeAreaView style={{
                backgroundColor: 'white',
                flexDirection: 'column',
                height: '100%',
                rowGap: 8,
                position: 'relative',
            }}>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{
                            flexDirection: 'column',
                            width: '100%',
                            height: 160,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingVertical: 16,
                            rowGap: 8,
                            marginTop: 50,
                        }}>
                            <Text style={{
                                fontSize: 32,
                                fontWeight: 'bold',
                                marginTop: 16,
                                textAlign: 'center',
                            }}>Silahkan Masuk</Text>
                            <Text style={{
                                fontSize: 16,
                                textAlign: 'center',
                                width: '80%',
                                lineHeight: 24,
                            }}>Jaga kesehatan bunda dan anak. Jangan lupa ke posyandu terdekat yah.</Text>
                        </View>
                        <View style={{ flexDirection: 'column', rowGap: 20 }}>
                            <View style={{
                                paddingHorizontal: 21,
                                flexDirection: 'column',
                                rowGap: 6,
                            }}>
                                <Text style={{ paddingStart: 4, fontSize: 13, fontWeight: '600' }}>E-mail</Text>
                                <TextInput style={{
                                    height: 'auto',
                                    borderWidth: 1,
                                    paddingHorizontal: 16,
                                    paddingVertical: 11,
                                    borderRadius: 14,
                                    fontSize: 16,
                                    borderColor: 'grey',
                                }} placeholder="Cth: example@mail.com" />
                            </View>
                            <View style={{
                                paddingHorizontal: 21,
                                flexDirection: 'column',
                                rowGap: 6,
                                position: 'relative',
                            }}>
                                <Text style={{ paddingStart: 4, fontSize: 13, fontWeight: '600' }}>Password</Text>
                                <View style={{
                                        height: 'auto',
                                        borderWidth: 1,
                                        paddingHorizontal: 16,
                                        paddingVertical: 11,
                                        borderRadius: 14,
                                        borderColor: 'grey',
                                    }}>
                                    <TextInput style={{
                                        fontSize: 16,
                                        width: '90%',
                                    }} placeholder="Cth: example@mail.com" />
                                    <Image style={{ position: 'absolute', bottom: 14, right: 16, height: 21, width: 21 }} source={require('@/assets/images/visibility.png')} />
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 21, marginTop: 52, width: '100%' }}>
                            <View style={{ 
                                flexDirection: 'row', 
                                justifyContent: 'center', 
                                width: '100%', 
                                height: 'auto', 
                                backgroundColor: '#003285',
                                paddingVertical: 21, 
                                borderRadius: 14
                            }}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>
                                    Login
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 11, flexDirection: 'row', justifyContent: 'center', columnGap: 4 }}>
                            <Text style={{ textAlign: 'center', color: 'grey', fontSize: 14 }}>Belum punya akun?</Text>
                            <Text style={{ textAlign: 'center', color: '#003285', fontSize: 14 }}>Daftar</Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}