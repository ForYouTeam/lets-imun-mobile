import { ReportComp } from "@/components/report/reportComp";
import { useGlobal } from "@/context/GlobalState";
import { ReportProvider } from "@/context/report/ReportState";
import { useEffect } from "react";
import { View } from "react-native";
import Verify from "../verify";

const ReportPanel = () => {
    const { memberStatus } = useGlobal();

    useEffect(() => {}, []);

    return (
        <ReportProvider>
            {!memberStatus.isVerify && <Verify />}
            {memberStatus.isVerify && <ReportComp />}
        </ReportProvider>
    );
};

export default ReportPanel;
