import Header from "@/components/home/header";
import SettingPanelPart from "@/components/setting-panel/SettingPanelPart";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const SettingUser = () => {
    return (
        <SafeAreaView
            style={{
                paddingTop: 40,
                width: "100%",
                height: "100%",
            }}
        >
            <ScrollView
                style={{
                    paddingVertical: 24,
                    backgroundColor: "white",
                    flexDirection: "column",
                    rowGap: 10,
                }}
            >
                <Header title="Pengaturan" hideNotifButton={true} />
                <SettingPanelPart />
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingUser;
