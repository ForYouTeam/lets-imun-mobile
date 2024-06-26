import { Tabs, router, useNavigation } from "expo-router";
import { AppState, AppStateStatus, BackHandler, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useGlobal } from "@/context/GlobalState";
import { getProfile } from "@/services/profile";
import { IProfileServiceResponse } from "@/services/type";
import Login from "../login";
import CustomSplashScreen from "@/components/customeSplashScreen";

const TabsLayout = () => {
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const { isAuthenticated, setAuthenticated } = useGlobal();

  const fetchProfile = async () => {
    const {status, data, error} = await getProfile()
    if (status === 200) {
      setAuthenticated(true)
    }
    if (status !== 200) {
      console.log(data);
    }
  }

  useEffect(() => {
    fetchProfile()

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        fetchProfile()
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    const handleBackPress = () => {
          minimizeApp();
          return true;
        };
    
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      subscription.remove();
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [])

   const minimizeApp = () => {
    BackHandler.exitApp();
  };

  if (!isAuthenticated) {
    return (
      <Login />
    )
  }

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
