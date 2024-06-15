import { StatusBar } from "expo-status-bar";
import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import CourselNews from "@/components/courselNews";
import Header from "@/components/home/header";
import Calendar from "@/components/home/calendar";
import { useCallback, useState } from "react";

const wait = (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={{ paddingTop: 24 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View
                    style={{
                        paddingTop: 20,
                        backgroundColor: "white",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            rowGap: 10,
                        }}
                    >
                        <Header title="Kabar Terbaru" />
                        <CourselNews />
                        <Calendar />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
