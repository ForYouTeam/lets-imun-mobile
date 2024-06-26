import { ReportComp } from "@/components/report/reportComp";
import { ReportProvider } from "@/context/report/ReportState";
import { View } from "react-native";

const ReportPanel = () => {
    return (
        <ReportProvider>
            <ReportComp />
        </ReportProvider>
    );
};

export default ReportPanel;
