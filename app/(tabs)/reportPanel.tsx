import Header from "@/components/home/header";
import ReportPanelPart from "@/components/report-panel/reportPanelPart";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, View } from "react-native";

const ReportPanel = () => {
    return (
        <SafeAreaView
            style={{
                height: "100%",
                width: "100%",
                flexDirection: "column",
                rowGap: 10,
                paddingTop: 20,
            }}
        >
            <ScrollView
                style={{
                    backgroundColor: "white",
                    paddingTop: 10,
                }}
            >
                <Header title="Laporan" />
                <ReportPanelPart />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReportPanel;
