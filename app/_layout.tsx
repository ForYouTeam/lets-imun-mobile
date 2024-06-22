import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import CustomSplashScreen from "@/components/customeSplashScreen";
import { GlobalProvider } from "@/context/GlobalState";
import { getFcmToken } from "@/utils/GetFcmToken";
import * as Notifications from "expo-notifications";
import { HandlerNotification } from "@/services/other/HandlerNotification";

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

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    const [notification, setNotification] = useState<
        Notifications.Notification | undefined
    >(undefined);
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        getFcmToken();

        if (loaded) {
            SplashScreen.hideAsync();
            notificationListener.current =
                Notifications.addNotificationReceivedListener(
                    (notification) => {
                        setNotification(notification);
                        console.log(notification);
                    }
                );

            responseListener.current =
                Notifications.addNotificationResponseReceivedListener(
                    (response) => {
                        console.log(response);
                    }
                );
            setTimeout(() => {
                HandlerNotification();
                setIsAppReady(true);
            }, 3000);
        }
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
