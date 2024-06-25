import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";

export const AlertBadge = () => {
  return (
    <View style={style.container}>
      <View style={style.card}>
        <Image
          style={{
            width: 170,
            height: 170,
          }}
          source={require("@/assets/images/icon/success.gif")}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "110%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.50)",
    zIndex: 9,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
  },
  card: {
    height: "50%",
    width: "90%",
    borderRadius: 14,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20,
  },
});
