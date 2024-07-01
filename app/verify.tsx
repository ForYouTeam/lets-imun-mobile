import { Input } from "@/components/form/input";
import { InputFile } from "@/components/form/inputFile";
import { TextArea } from "@/components/form/textArea";
import Header from "@/components/home/header";
import { Colors } from "@/constants/Colors";
import { useReport } from "@/context/report/ReportState";
import { IVerifyPayload } from "@/context/types/ReportType";
import { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Verify() {
    const { verifyPayload, setVerifyPayload, loading, setLoading } =
        useReport();
    const [disabled, setDisabled] = useState(true);
    const [disabledStyle, setdisabledStyle] = useState(
        StyleSheet.create(disabledBtn)
      );
    

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

    useEffect(() => {
        if (areAllFieldsValid(verifyPayload) && emailRegex.test(verifyPayload.email)) {
            setdisabledStyle(enableBtn)
            setDisabled(false);
        } else {
            setdisabledStyle(disabledBtn)
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
                        value={verifyPayload.nik}
                        placeholder="Masukan NIK seusai KTP"
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
                        onChangeText={(text) => {
                            handleInputChange("name", text);
                        }}
                    />
                    <Input
                        disabled={loading}
                        required
                        label="E-mail"
                        type="email-address"
                        value={verifyPayload.email}
                        placeholder="Cth: example@gmail.com"
                        onChangeText={(text) => {
                            handleInputChange("email", text);
                        }}
                    />
                    <Input
                        disabled={loading}
                        required
                        label="Nomor HP"
                        type="numeric"
                        value={verifyPayload.phone}
                        placeholder="Cth: 08210001200"
                        onChangeText={(text) => {
                            handleInputChange("phone", text);
                        }}
                    />
                    <TextArea
                        required
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
                        style={{
                            width: "100%",
                            height: "auto",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: disabledStyle.backgroundBtn.backgroundColor,
                            borderRadius: 4,
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
