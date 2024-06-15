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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
            setTimeout(() => {
                setIsAppReady(true);
            }, 3000);
        }
    }, [loaded]);

    if (!loaded || !isAppReady) {
        return <CustomSplashScreen />;
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="login" />
            </Stack>
        </ThemeProvider>
    );
}
