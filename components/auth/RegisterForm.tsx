import { useRegister } from "@/context/auth/RegisterState";
import { saveRegister } from "@/services/auth/register";
import {
  IRegisterResponse,
  IRegisterValidationMsg,
} from "@/services/auth/type";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AlertBadge } from "../misc/alert";

export const RegisterForm = () => {
  const { loading, setLoading, registerPayload, setRegisterPayload } =
    useRegister();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [cPasswordVisibility, setCPasswordVisibility] = useState(false);
  const [alert, setAlert] = useState({
    active: false,
    type: "success",
  });
  const [disabledStyle, setdisabledStyle] = useState(
    StyleSheet.create(disabledBtn)
  );

  const [payloadErrorMessage, setPayloadErrorMessage] =
    useState<IRegisterValidationMsg>({
      username: null,
      password: null,
      password_confirmation: null,
    });

  const handleInputChange = (key: string, value: string) => {
    setRegisterPayload({
      ...registerPayload,
      [key]: value,
    });
  };

  const clearAlert = () => {
    setPayloadErrorMessage({
      password: null,
      password_confirmation: null,
      username: null,
    });
  };

  const clearInput = () => {
    setRegisterPayload({
      password: "",
      password_confirmation: "",
      username: "",
    });
  };

  const handleRegister = async () => {
    clearAlert();
    setLoading(true);
    const { data, status, error } = await saveRegister(registerPayload);

    if (status === 422 && error) {
      const errorData = error as IRegisterValidationMsg | null;
      setPayloadErrorMessage({
        username: errorData?.username || null,
        password: errorData?.password || null,
        password_confirmation: errorData?.password_confirmation || null,
      });
    }

    if (status === 200 && data) {
      clearInput();

      setAlert({
        active: true,
        type: "success",
      });

      setTimeout(() => {
        setAlert({
          active: false,
          type: "success",
        });

        router.push("/login");
      }, 3100);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (
      registerPayload.username.length <= 0 ||
      registerPayload.password.length <= 0 ||
      registerPayload.password_confirmation.length <= 0
    ) {
      setdisabledStyle(disabledBtn);
    } else {
      setdisabledStyle(enableBtn);
    }
  }, [registerPayload]);

  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
      }}
    >
      {alert.active && alert.type == "success" && <AlertBadge />}
      <StatusBar style="auto" />
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flexDirection: "column",
          height: "100%",
          rowGap: 8,
          position: "relative",
        }}
      >
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
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                marginTop: 61,
                textAlign: "center",
              }}
            >
              Daftar
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
                  style={{
                    paddingStart: 4,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  E-mail
                </Text>
                {payloadErrorMessage.username && (
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "400",
                      color: "red",
                      paddingTop: 2,
                    }}
                  >
                    {payloadErrorMessage.username[0]}
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
                placeholder="Cth: example@mail.com"
                value={registerPayload.username}
                onChangeText={(text) => {
                  handleInputChange("username", text);
                }}
                maxLength={150}
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    paddingStart: 4,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  Password
                </Text>
                {payloadErrorMessage.password && (
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "400",
                      color: "red",
                      paddingTop: 2,
                    }}
                  >
                    {payloadErrorMessage.password[0]}
                  </Text>
                )}
              </View>
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
                  placeholder="Gunakan kombinasi huruf dan angka"
                  value={registerPayload.password}
                  onChangeText={(text) => {
                    handleInputChange("password", text);
                  }}
                  secureTextEntry={!passwordVisibility}
                  maxLength={15}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: 14,
                    right: 16,
                    height: 21,
                    width: 21,
                  }}
                  activeOpacity={0.8}
                  onPress={() => {
                    setPasswordVisibility(!passwordVisibility);
                  }}
                >
                  <Image
                    style={{
                      height: 21,
                      width: 21,
                    }}
                    source={
                      !passwordVisibility
                        ? require("@/assets/images/visibility.png")
                        : require("@/assets/images/visibility-off.png")
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 21,
                flexDirection: "column",
                rowGap: 6,
                position: "relative",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    paddingStart: 4,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  Konfirmasi Password
                </Text>
                {payloadErrorMessage.password_confirmation && (
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "400",
                      color: "red",
                      paddingTop: 2,
                    }}
                  >
                    {payloadErrorMessage.password_confirmation[0]}
                  </Text>
                )}
              </View>
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
                  placeholder="Tulis ulang password"
                  value={registerPayload.password_confirmation}
                  onChangeText={(text) => {
                    handleInputChange("password_confirmation", text);
                  }}
                  secureTextEntry={!cPasswordVisibility}
                  maxLength={15}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: 14,
                    right: 16,
                    height: 21,
                    width: 21,
                  }}
                  activeOpacity={0.8}
                  onPress={() => {
                    setCPasswordVisibility(!cPasswordVisibility);
                  }}
                >
                  <Image
                    style={{
                      height: 21,
                      width: 21,
                    }}
                    source={
                      !cPasswordVisibility
                        ? require("@/assets/images/visibility.png")
                        : require("@/assets/images/visibility-off.png")
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 21,
              marginTop: 42,
              width: "100%",
            }}
          >
            <TouchableOpacity
              disabled={loading}
              activeOpacity={0.8}
              onPress={() => {
                handleRegister();
              }}
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "100%",
                  height: "auto",
                  paddingVertical: 21,
                  borderRadius: 14,
                  columnGap: 8,
                  alignItems: "center",
                },
                loading
                  ? disabledBtn.backgroundBtn
                  : disabledStyle.backgroundBtn,
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 18,
                    fontWeight: "700",
                  },
                  loading
                    ? disabledBtn.textColorBtn
                    : disabledStyle.textColorBtn,
                ]}
              >
                Buat Akun
              </Text>
              {loading && (
                <Image
                  style={{ height: 24, width: 24, marginTop: 2 }}
                  source={require("@/assets/images/icon/loading.gif")}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 11,
              flexDirection: "row",
              justifyContent: "center",
              columnGap: 4,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "grey",
                fontSize: 14,
              }}
            >
              Sudah punya akun?
            </Text>
            <TouchableOpacity
              disabled={loading}
              activeOpacity={0.8}
              onPress={() => {
                router.push("login");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#003285",
                  fontSize: 14,
                }}
              >
                Masuk
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
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
