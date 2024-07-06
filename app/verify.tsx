import { Input } from "@/components/form/input";
import { InputFile } from "@/components/form/inputFile";
import { Select } from "@/components/form/select";
import { TextArea } from "@/components/form/textArea";
import Header from "@/components/home/header";
import { Colors } from "@/constants/Colors";
import { useGlobal } from "@/context/GlobalState";
import { useReport } from "@/context/report/ReportState";
import { IVerifyPayload } from "@/context/types/ReportType";
import { getProfile } from "@/services/profile";
import { IProfileResponse } from "@/services/profile/type";
import { sendVerify } from "@/services/report";
import { IErrorResponseVerify } from "@/services/report/type";
import { splitString } from "@/utils/GetSplitString";
import { clearToken } from "@/utils/StoreToken";
import { useEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Verify() {
    const { setAuthenticated, memberStatus, setMemberStatus } = useGlobal();
    const { verifyPayload, setVerifyPayload, loading, setLoading } =
        useReport();
    const [disabled, setDisabled] = useState(true);
    const [disabledStyle, setdisabledStyle] = useState(
        StyleSheet.create(disabledBtn)
    );
    const [errorValidation, setErrorValidation] =
        useState<IErrorResponseVerify>();

    const handleInputChange = (key: string, value: string | number) => {
        setVerifyPayload({
            ...verifyPayload,
            [key]: value,
        });
    };

    const isFieldValid = (field: string | number | null): boolean => {
        return field !== null && field.toString().length >= 1;
    };

    const areAllFieldsValid = (payload: IVerifyPayload): boolean => {
        return [
            payload.nik,
            payload.name,
            payload.email,
            payload.phone,
            payload.gender,
            payload.address,
            payload.img_document,
        ].every(isFieldValid);
    };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const gender = [
        { id: 1, label: "Laki-Laki", value: "man" },
        { id: 2, label: "Perempuan", value: "woman" },
    ];

    const clearErrorMessage = () => {
        setErrorValidation({});
    };

    const getProfileInfo = async () => {
        const { data, error, status } = await getProfile();
        if (status === 401) {
            clearToken();
            setAuthenticated(false);
            return null;
        }

        if (status !== 401 && status !== 200) {
            console.log("Error when get profile");
            return null;
        }

        return {
            data,
        };
    };

    const verifyRequestSend = async () => {
        clearErrorMessage();
        setLoading(true);
        setDisabledButton();
        const { status, data, error } = await sendVerify(verifyPayload);
        console.log("Ini status: ", status);
        console.log("Ini data: ", data);
        console.log("Ini error: ", error);

        if (status === 401) {
            clearToken();
            setAuthenticated(false);
        }

        if (status !== 401 && status !== 200) {
            const errorMsg = error as {
                data: IErrorResponseVerify;
            };
            setErrorValidation(errorMsg.data);
        }

        if (status === 200) {
            const profile = await getProfileInfo();
            if (profile) {
                const dataProfile = (await getProfileInfo()) as {
                    data: {
                        data: IProfileResponse;
                    };
                };

                const statusUser = splitString(dataProfile.data.data.status);
                if (!dataProfile.data.data.is_verify) {
                    setMemberStatus({
                        isVerify: false,
                        status: statusUser[0],
                    });
                    console.log(statusUser);
                } else {
                    setMemberStatus({
                        isVerify: true,
                        status: statusUser[0],
                    });
                }
            }
        }

        setLoading(false);
        setEnableButton();
    };

    const isFormValid = () => {
        return (
            areAllFieldsValid(verifyPayload) &&
            emailRegex.test(verifyPayload.email)
        );
    };

    const setDisabledButton = () => {
        setdisabledStyle(disabledBtn);
        setDisabled(true);
    };

    const setEnableButton = () => {
        setdisabledStyle(enableBtn);
        setDisabled(false);
    };

    useEffect(() => {
        if (isFormValid()) {
            setdisabledStyle(enableBtn);
            setDisabled(false);
        } else {
            setdisabledStyle(disabledBtn);
            setDisabled(true);
        }
    }, [verifyPayload]);

    return (
        <SafeAreaView
            style={{
                height: "100%",
                width: "100%",
                flexDirection: "column",
                rowGap: 10,
                paddingTop: 40,
            }}
        >
            <ScrollView
                style={{
                    backgroundColor: "white",
                    paddingTop: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#04364A",
                            fontFamily: "MontserratSemiBold",
                            transform: [{ scaleY: 1.1 }],
                        }}
                    >
                        Verifikasi Data Diri
                    </Text>
                </View>

                <InputFile label="Upload KTP" />

                <View
                    style={{
                        flexDirection: "column",
                        rowGap: 20,
                        width: "auto",
                        height: "auto",
                        paddingHorizontal: 20,
                        marginTop: 20,
                        paddingBottom: 40,
                    }}
                >
                    <Input
                        disabled={loading}
                        required
                        label="NIK"
                        type="numeric"
                        maxInput={20}
                        value={verifyPayload.nik}
                        placeholder="Masukan NIK"
                        errorMessage={errorValidation?.nik}
                        onChangeText={(text) => {
                            handleInputChange("nik", text);
                        }}
                    />
                    <Input
                        disabled={loading}
                        required
                        label="Nama"
                        value={verifyPayload.name}
                        placeholder="Cth: Budi Agung"
                        errorMessage={errorValidation?.name}
                        onChangeText={(text) => {
                            handleInputChange("name", text);
                        }}
                    />
                    <Select
                        disabled={loading}
                        label="Jenis Kelamin"
                        data={gender}
                        onSelectText={(text) => {
                            handleInputChange("gender", text as string);
                        }}
                        value={verifyPayload.gender}
                        required
                    />
                    <Input
                        disabled={loading}
                        required
                        label="E-mail"
                        type="email-address"
                        value={verifyPayload.email}
                        placeholder="Cth: example@gmail.com"
                        errorMessage={errorValidation?.email}
                        onChangeText={(text) => {
                            handleInputChange("email", text);
                        }}
                    />
                    <Input
                        disabled={loading}
                        required
                        label="Nomor HP"
                        type="numeric"
                        maxInput={13}
                        value={verifyPayload.phone}
                        placeholder="Cth: 08210001200"
                        errorMessage={errorValidation?.phone}
                        onChangeText={(text) => {
                            handleInputChange("phone", text);
                        }}
                    />
                    <TextArea
                        required
                        disabled={loading}
                        label="Alamat"
                        type="text"
                        value={verifyPayload.address}
                        placeholder="Cth: Jl. Kijang"
                        onChangeText={(text) => {
                            handleInputChange("address", text);
                        }}
                    />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        disabled={disabled}
                        onPress={() => {
                            verifyRequestSend();
                        }}
                        style={{
                            width: "100%",
                            height: "auto",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            columnGap: 10,
                            backgroundColor:
                                disabledStyle.backgroundBtn.backgroundColor,
                            borderRadius: 11,
                            paddingVertical: 12,
                        }}
                    >
                        <Text
                            style={{
                                color: disabledStyle.textColorBtn.color,
                                fontFamily: "InterBold",
                                fontSize: 14,
                            }}
                        >
                            Verifikasi Sekarang
                        </Text>
                        {loading && (
                            <Image
                                style={{ height: 24, width: 24, marginTop: 2 }}
                                source={require("@/assets/images/icon/loading.gif")}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

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
