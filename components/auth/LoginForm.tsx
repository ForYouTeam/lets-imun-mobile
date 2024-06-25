import { useLogin } from "@/context/auth/LoginState";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AlertBadge } from "../misc/alert";
import { loginProcess } from "@/services/auth/login";
import { ILoginSuccessResponse } from "@/services/auth/type";
import { setToken } from "@/utils/StoreToken";

export const LoginForm = () => {
  const {
    loading,
    setLoading,
    loginPayload,
    setLoginPayload,
    clearPayload,
    isComplete,
  } = useLogin();

  const [alert, setAlert] = useState({
    active: false,
    type: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [isShow, setIsShow] = useState(false);

  const clearErrMsg = () => {
    setErrMsg("");
  };

  const handleInputChange = (key: string, value: string) => {
    setLoginPayload({
      ...loginPayload,
      [key]: value,
    });
  };

  const handleLogin = async () => {
    clearErrMsg();
    setLoading(true);
    const { data, error, status } = await loginProcess(loginPayload);

    if (error) {
      setErrMsg(error.message || "terjadi kesalahan, coba lagi");
    }

    const member = data as {
      data: ILoginSuccessResponse;
    };

    setToken(member.data.token || "");
    setLoading(false);

    router.push("/");
  };

  useEffect(() => {
    console.log("check", isComplete());
  }, [loading, isComplete()]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flexDirection: "column",
        height: "100%",
        rowGap: 8,
        position: "relative",
      }}
    >
      {alert.active && alert.type == "success" && <AlertBadge />}
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            height: 160,
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 16,
            rowGap: 8,
            marginTop: 80,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              marginTop: 32,
              textAlign: "center",
            }}
          >
            Silahkan Masuk
          </Text>
        </View>
        <View style={{ flexDirection: "column", rowGap: 20 }}>
          <View
            style={{
              paddingHorizontal: 21,
              flexDirection: "column",
              rowGap: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ paddingStart: 4, fontSize: 13, fontWeight: "600" }}
              >
                E-mail
              </Text>
              {errMsg && (
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "InterRegular",
                    color: "red",
                  }}
                >
                  {errMsg}
                </Text>
              )}
            </View>
            <TextInput
              style={{
                height: "auto",
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 11,
                borderRadius: 14,
                fontSize: 16,
                borderColor: "grey",
              }}
              value={loginPayload.username}
              onChangeText={(text) => {
                handleInputChange("username", text);
              }}
              maxLength={150}
              placeholder="Cth: example@mail.com"
            />
          </View>
          <View
            style={{
              paddingHorizontal: 21,
              flexDirection: "column",
              rowGap: 6,
              position: "relative",
            }}
          >
            <Text style={{ paddingStart: 4, fontSize: 13, fontWeight: "600" }}>
              Password
            </Text>
            <View
              style={{
                height: "auto",
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 11,
                borderRadius: 14,
                borderColor: "grey",
              }}
            >
              <TextInput
                style={{
                  fontSize: 16,
                  width: "90%",
                }}
                secureTextEntry={!isShow}
                value={loginPayload.password}
                onChangeText={(text) => {
                  handleInputChange("password", text);
                }}
                maxLength={150}
                placeholder="Password yang kamu miliki"
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 14,
                  right: 16,
                }}
                activeOpacity={0.8}
                onPress={() => {
                  setIsShow(!isShow);
                }}
              >
                <Image
                  style={{
                    height: 21,
                    width: 21,
                  }}
                  source={
                    isShow
                      ? require("@/assets/images/visibility-off.png")
                      : require("@/assets/images/visibility.png")
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={loading || !isComplete()}
          style={{ paddingHorizontal: 21, marginTop: 52, width: "100%" }}
          onPress={() => {
            handleLogin();
          }}
        >
          <View
            style={[
              {
                flexDirection: "row",
                columnGap: 10,
                justifyContent: "center",
                width: "100%",
                height: "auto",
                paddingVertical: 21,
                borderRadius: 14,
              },
              loading || !isComplete()
                ? disabledBtn.backgroundBtn
                : enableBtn.backgroundBtn,
            ]}
          >
            <Text
              style={[
                { fontSize: 18, fontWeight: "700" },
                loading || !isComplete()
                  ? disabledBtn.textColorBtn
                  : enableBtn.textColorBtn,
              ]}
            >
              Login
            </Text>
            {loading && (
              <Image
                style={{ height: 24, width: 24, marginTop: 2 }}
                source={require("@/assets/images/icon/loading.gif")}
              />
            )}
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 11,
            flexDirection: "row",
            justifyContent: "center",
            columnGap: 4,
          }}
        >
          <Text style={{ textAlign: "center", color: "grey", fontSize: 14 }}>
            Belum punya akun?
          </Text>
          <TouchableOpacity
            disabled={loading}
            activeOpacity={0.8}
            onPress={() => {
              router.push("register");
            }}
          >
            <Text
              style={{ textAlign: "center", color: "#003285", fontSize: 14 }}
            >
              Daftar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const disabledBtn = StyleSheet.create({
  backgroundBtn: {
    backgroundColor: "#BFCFE7",
  },
  textColorBtn: {
    color: "#686D76",
  },
});

const enableBtn = StyleSheet.create({
  backgroundBtn: {
    backgroundColor: "#003285",
  },
  textColorBtn: {
    color: "white",
  },
});
