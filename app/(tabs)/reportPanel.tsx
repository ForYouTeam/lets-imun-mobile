import { ReportComp } from "@/components/report/reportComp";
import { useGlobal } from "@/context/GlobalState";
import { ReportProvider } from "@/context/report/ReportState";
import { useEffect } from "react";
import { View } from "react-native";
import Verify from "../verify";
import { PendingStatus } from "@/components/report-panel/pendingStatus";
import { RejectStatus } from "@/components/report-panel/rejectStatus";

const ReportPanel = () => {
    const { memberStatus } = useGlobal();

    useEffect(() => {
        console.log("status member === :", memberStatus);
        
    }, [memberStatus]);

    return (
        <ReportProvider>
            {!memberStatus.isVerify && memberStatus.status  === "unverified" && <Verify />}
            {!memberStatus.isVerify && memberStatus.status  === "pending" && <PendingStatus />}
            {!memberStatus.isVerify && memberStatus.status  === "reject" && <RejectStatus />}
            {memberStatus.isVerify  && memberStatus.status  === "approve" && <ReportComp />}
        </ReportProvider>
    );
};

export default ReportPanel;
