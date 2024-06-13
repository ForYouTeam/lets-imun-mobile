import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CourselNews from "@/components/courselNews";
import Header from "@/components/home/header";
import Calendar from "@/components/home/calendar";

const Home = () => {
    return (
        <SafeAreaView style={{ paddingTop: 24 }}>
            <StatusBar style="auto" />
            <ScrollView>
                <View style={{
                    paddingTop: 20,
                    backgroundColor: 'white',
                    height: '100%',
                    width: '100%',
                }}>
                    <View style={{
                        flexDirection: 'column',
                        rowGap: 10,
                    }}>
                        <Header />
                        <CourselNews />
                        <Calendar />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;