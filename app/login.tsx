import { View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginProvider } from "@/context/auth/LoginState";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
export default function Login() {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
      }}
    >
      <StatusBar style="auto" />
      <LoginProvider>
        <LoginForm />
      </LoginProvider>
    </View>
  );
}
