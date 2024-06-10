import CustomSplashScreen from '@/components/customeSplashScreen';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync()

const Layout = () => {
    const [appReady, setAppIsReady] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setAppIsReady(true);
            SplashScreen.hideAsync();
        }, 3000);
    } ,[]);

    if (!appReady) {
        return <CustomSplashScreen />
    }

    return (
        <Stack
        screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='login' />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}

export default Layout;