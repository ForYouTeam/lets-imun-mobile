import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { CameraView } from "expo-camera";
import { useReport } from "@/context/report/ReportState";

interface IInputFileProps {
    label: string;
}

export const InputFile: React.FC<IInputFileProps> = ({ label }) => {
    const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const {verifyPayload, setVerifyPayload} = useReport()

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setVerifyPayload({
                ...verifyPayload,
                img_document: result.assets[0].uri
            });
        }
    };

    useEffect(() => {
        requestPermission();
    });

    return (
        <View
            style={{
                width: "100%",
                height: "auto",
                marginTop: 42,
                flexDirection: "column",
                rowGap: 30,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
                borderRadius: 11,
                overflow: "hidden",
            }}
        >
            {verifyPayload.img_document && (
                <Image
                    style={{
                        height: 160,
                        width: "80%",
                    }}
                    source={{ uri: verifyPayload.img_document }}
                />
            )}
            <TouchableOpacity
                onPress={() => {
                    pickImage();
                }}
                style={{
                    backgroundColor:
                        !verifyPayload.img_document ? Colors.primary : Colors.warning,
                    width: "70%",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingVertical: 13,
                    borderRadius: 14,
                }}
                activeOpacity={0.8}
            >
                <Text
                    style={{
                        fontSize: 13,
                        fontFamily: "InterBold",
                        color: "white",
                    }}
                >
                    {!verifyPayload.img_document ? label : "Pilih Lagi"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};
