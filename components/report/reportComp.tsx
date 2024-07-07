import { SafeAreaView, ScrollView } from "react-native"
import Header from "../home/header"
import ReportPanelPart from "../report-panel/reportPanelPart"
import { ReportProvider } from "@/context/report/ReportState"

export const ReportComp = () => {
    return (
        <SafeAreaView
            style={{
                height: "100%",
                width: "100%",
                flexDirection: "column",
                rowGap: 10,
                paddingTop: "10%",
            }}
        >
            <ScrollView
                style={{
                    backgroundColor: "white",
                    paddingTop: 10,
                }}
            >
                <Header title="Laporan" hideNotifButton={true} />
                <ReportProvider>
                    <ReportPanelPart />
                </ReportProvider>
            </ScrollView>
        </SafeAreaView>
    )
}