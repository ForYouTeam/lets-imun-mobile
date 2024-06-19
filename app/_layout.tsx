import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import CustomSplashScreen from "@/components/customeSplashScreen";
import { GlobalProvider } from "@/context/GlobalState";
import { HandlerNotification } from "@/services/other/HandlerNotification";
import { GetFcmToken } from "@/utils/GetFcmToken";
import * as Notifications from "expo-notifications";
import { presentNotification } from "@/services/other/PresentNotifications";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Request required permissions

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const [loaded] = useFonts({
        MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
        MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
        MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
        MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
        InterBold: require("../assets/fonts/Inter-Bold.ttf"),
        InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
        InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
    });
    const [isAppReady, setIsAppReady] = useState(false);

    const handleNotificationResponse = (
        response: Notifications.NotificationResponse
    ) => {
        console.log("Notification response received: ", response);
    };

    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: true,
            }),
        });
        if (loaded) {
            SplashScreen.hideAsync();
            setTimeout(() => {
                setIsAppReady(true);
                // HandlerNotification();
                const token = GetFcmToken();
                token
                    .then((res) => {
                        console.log("Token : ", res);
                    })
                    .catch((err) => {
                        console.log("Error : ", err);
                    });
            }, 3000);
        }
        // Mendaftarkan listener untuk menangani notifikasi
        const subscription =
            Notifications.addNotificationResponseReceivedListener(
                handleNotificationResponse
            );

        return () => {
            // Membersihkan listener saat komponen unmount
            subscription.remove();
        };
    }, [loaded]);

    if (!loaded || !isAppReady) {
        return <CustomSplashScreen />;
    }

    return (
        <GlobalProvider>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                    <Stack.Screen
                        name="login"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </ThemeProvider>
        </GlobalProvider>
    );
}
