import { presentNotification } from "@/services/other/PresentNotifications";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as Linking from "expo-linking";

interface HeaderProps {
    title: string;
    hideNotifButton?: boolean;
}

const Header = (headerProps: HeaderProps) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontSize: 18,
                    paddingHorizontal: 24,
                    color: "#04364A",
                    fontFamily: "MontserratSemiBold",
                    transform: [{ scaleY: 1.1 }],
                }}
            >
                {headerProps.title}
            </Text>
            {!headerProps.hideNotifButton && (
                <TouchableOpacity
                    onPress={() => {
                        presentNotification("Testing", "Notification body testing", 10, 'scheduler', 'reportPanel');
                    }}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: "#F7F7F7",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        paddingVertical: 10,
                        paddingHorizontal: 12,
                        width: "auto",
                        borderRadius: 50,
                        marginEnd: 18,
                    }}
                >
                    <Image
                        style={{
                            width: 24,
                            height: 24,
                        }}
                        source={require("@/assets/images/bell.png")}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Header;
