import { Tabs, router, useNavigation } from "expo-router";
import { BackHandler, Image, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { useGlobal } from "@/context/GlobalState";
import { getProfile } from "@/services/profile";
import { IResponseData } from "@/services/type";

const TabsLayout = () => {
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const { isAuthenticated, setAuthenticated } = useGlobal();
    const navigation = useNavigation();

    const fetchingData = async () => {
        const { data, error } = await getProfile();
        if (error) {
            console.log(error);
            return;
        }

        if (data) {
            const dataResponse: IResponseData = data;
            if (dataResponse.status != 200) {
                setAuthenticated(true);
            }
        }
    };

    useEffect(() => {
        setIsComponentMounted(true);

        fetchingData();

        const handleBackPress = () => {
            minimizeApp(); // Panggil fungsi minimize ketika tombol kembali ditekan
            return true; // Event tidak menyebar
        };

        BackHandler.addEventListener("hardwareBackPress", handleBackPress);

        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBackPress
            );
        };
    }, []);

    useEffect(() => {
        if (isComponentMounted && !isAuthenticated) {
            router.push("login"); // Gunakan navigation.push untuk navigasi ke halaman login setelah komponen terpasang
        }
    }, [isComponentMounted, isAuthenticated, navigation]);

    const minimizeApp = () => {
        BackHandler.exitApp();
    };

    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Beranda",
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={styles.icon}
                            source={
                                focused
                                    ? require("@/assets/images/tabbar/home.png")
                                    : require("@/assets/images/tabbar/home-inactive.png")
                            }
                        />
                    ),
                    tabBarStyle: styles.tabBar,
                    tabBarInactiveTintColor: "#C7C8CC",
                    tabBarActiveTintColor: "#54808C",
                }}
            />
            <Tabs.Screen
                name="reportPanel"
                options={{
                    headerShown: false,
                    title: "Laporan",
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={styles.icon}
                            source={
                                focused
                                    ? require("@/assets/images/tabbar/news.png")
                                    : require("@/assets/images/tabbar/news-inactive.png")
                            }
                        />
                    ),
                    tabBarStyle: styles.tabBar,
                    tabBarInactiveTintColor: "#C7C8CC",
                    tabBarActiveTintColor: "#54808C",
                    tabBarItemStyle: { paddingTop: 2 },
                }}
            />
            <Tabs.Screen
                name="settingUser"
                options={{
                    headerShown: false,
                    title: "Akun",
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={styles.icon}
                            source={
                                focused
                                    ? require("@/assets/images/tabbar/account.png")
                                    : require("@/assets/images/tabbar/account-inactive.png")
                            }
                        />
                    ),
                    tabBarStyle: styles.tabBar,
                    tabBarInactiveTintColor: "#C7C8CC",
                    tabBarActiveTintColor: "#54808C",
                    tabBarItemStyle: { paddingTop: 2 },
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "white",
        height: 60,
        paddingBottom: 6,
        paddingTop: 6,
    },
    icon: {
        width: 28,
        height: 28,
    },
});
