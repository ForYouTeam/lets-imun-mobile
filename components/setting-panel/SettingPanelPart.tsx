import { Colors } from "@/constants/Colors";
import { useGlobal } from "@/context/GlobalState";
import { clearToken } from "@/utils/StoreToken";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ISettingData {
  title: string;
  value: string;
  valueLabel?: string;
  type?: string;
  icon?: string;
}

interface IAccountData {
  title: string;
  key: string;
  value: string;
}

const data: ISettingData[] = [
  {
    title: "Waktu Notifikasi",
    value: "-1",
    valueLabel: "1 Hari Sebelum",
    type: "modal",
    icon: require("@/assets/images/icon/bell.png"),
  },
  {
    title: "Notifikasi",
    value: "1",
    type: "switch",
    icon: require("@/assets/images/icon/bell.png"),
  },
  {
    title: "Bunyikan",
    value: "0",
    type: "switch",
    icon: require("@/assets/images/icon/hearing.png"),
  },
  {
    title: "Bahasa",
    value: "Indonesia",
    icon: require("@/assets/images/icon/lang.png"),
  },
  {
    title: "Versi Aplikasi",
    value: "1.0.0",
    icon: require("@/assets/images/icon/hastag.png"),
  },
];

const accountData: IAccountData[] = [
  {
    title: "Nama Lengkap",
    key: "name",
    value: "Larimusketir Pompom",
  },
  {
    title: "Email",
    key: "email",
    value: "mail@nob.com",
  },
  {
    title: "Nomor Telepon",
    key: "phone",
    value: "08123456789",
  },
  {
    title: "Alamat",
    key: "address",
    value: "Jalan Jalan",
  },
];

const SettingList = () => {
  return (
    <View
      style={{
        flexDirection: "column",
        rowGap: 21,
      }}
    >
      {data.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              columnGap: 4,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                columnGap: 12,
                alignItems: "center",
              }}
            >
              {item.icon && (
                <Image
                  style={{
                    width: 21,
                    height: 21,
                  }}
                  source={item.icon as any}
                />
              )}
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  fontSize: 14,
                }}
              >
                {item.title}
              </Text>
            </View>
            {item.type === "switch" ? (
              <Switch
                style={{
                  height: 24,
                  marginEnd: -4,
                }}
                trackColor={{
                  false: "#767577",
                  true: Colors.primary,
                }}
                thumbColor={item.value === "1" ? Colors.secondary : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={item.value === "1"}
              />
            ) : item.type === "modal" ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginEnd: -8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "InterRegular",
                    fontSize: 13,
                  }}
                >
                  {item.valueLabel}
                </Text>
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    marginTop: 2,
                  }}
                  source={require("@/assets/images/icon/right-arrow.png")}
                />
              </View>
            ) : (
              <Text>{item.value}</Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

const AccountInformation = () => {
  return (
    <View
      style={{
        flexDirection: "column",
        rowGap: 21,
      }}
    >
      {accountData.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              columnGap: 4,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                columnGap: 12,
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 21,
                  height: 21,
                }}
                source={require("@/assets/images/icon/acount.png")}
              />
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  fontSize: 14,
                }}
              >
                {item.title}
              </Text>
            </View>
            <Text>{item.value}</Text>
          </View>
        );
      })}
    </View>
  );
};

const SettingPanelPart = () => {
  const {setAuthenticated} = useGlobal()

  const logout = async () => {
    await clearToken();
    setAuthenticated(false)
  };

  return (
    <View
      style={{
        flexDirection: "column",
        rowGap: 24,
        marginTop: 24,
      }}
    >
      <View>
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 13,
            backgroundColor: "#F6F5F2",
          }}
        >
          <Text
            style={{
              fontFamily: "InterRegular",
              fontSize: 11,
            }}
          >
            Informasi Akun
          </Text>
        </View>
        <View
          style={{
            paddingTop: 18,
            paddingHorizontal: 24,
          }}
        >
          <AccountInformation />
        </View>
      </View>
      <View>
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 13,
            backgroundColor: "#F6F5F2",
          }}
        >
          <Text
            style={{
              fontFamily: "InterRegular",
              fontSize: 11,
            }}
          >
            Terkait Pemberitahuan
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 18,
            paddingHorizontal: 24,
          }}
        >
          <SettingList />
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 50,
            justifyContent: "center",
            paddingHorizontal: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              logout();
            }}
            activeOpacity={0.8}
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: 8,
              width: "100%",
              borderRadius: 11,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 18,
                color: "white",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SettingPanelPart;
