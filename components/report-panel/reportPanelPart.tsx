import { Colors } from "@/constants/Colors";
import { FlatList, Image, Text, View } from "react-native";

const ReportPanelPart = () => {
    interface IReportData {
        name: string;
        age: string;
        gender: number;
        weight: string;
        height: string;
        checkup: string[];
    }

    const data: IReportData[] = [
        {
            name: "Rafael",
            age: "1.2",
            gender: 1,
            weight: "10",
            height: "80",
            checkup: ["Imunisasi", "Pemeriksaan", "Konsultasi"],
        },
        {
            name: "Putri",
            age: "1.1",
            gender: 2,
            weight: "8",
            height: "75",
            checkup: ["Imunisasi", "Pemeriksaan", "Konsultasi"],
        },
        {
            name: "Lala",
            age: "1.8",
            gender: 2,
            weight: "8",
            height: "75",
            checkup: ["Imunisasi", "Pemeriksaan", "Konsultasi"],
        },
    ];

    const ImageGender = (gender: number) => {
        if (gender === 1) {
            return require("@/assets/images/icon/boy.png");
        }
        return require("@/assets/images/icon/girl.png");
    };

    return (
        <View
            style={{
                flexDirection: "column",
                rowGap: 24,
                paddingBottom: 24,
            }}
        >
            <View
                style={{
                    paddingHorizontal: 24,
                    marginTop: 18,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontFamily: "InterRegular",
                    }}
                >
                    Status Anak.
                </Text>
                <View
                    style={{
                        paddingStart: 24,
                        paddingEnd: 14,
                        paddingVertical: 6,
                        borderRadius: 50,
                        backgroundColor: Colors.primary,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        columnGap: 8,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 13,
                            fontFamily: "InterRegular",
                            color: "#FFF",
                        }}
                    >
                        September
                    </Text>
                    <Image
                        style={{
                            width: 21,
                            height: 21,
                            marginTop: 2,
                        }}
                        source={require("@/assets/images/icon/white-down-arrow.png")}
                    />
                </View>
            </View>

            {data.map((item, index) => {
                return (
                    <View
                        key={index}
                        style={{
                            paddingHorizontal: 24,
                            flexDirection: "column",
                            rowGap: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontFamily: "MontserratSemiBold",
                                transform: [{ scaleY: 1.1 }],
                            }}
                        >
                            {item.name}
                        </Text>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: "#E4E4E4",
                                height: "auto",
                                width: "100%",
                                flexDirection: "column",
                                borderRadius: 10,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    columnGap: 4,
                                    borderBottomWidth: 0.8,
                                    borderBottomColor: "#E4E4E4",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: "InterRegular",
                                        color: "#04364A",
                                        padding: 10,
                                    }}
                                >
                                    {item.age} Tahun
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: "InterRegular",
                                        color: "#04364A",
                                        padding: 10,
                                    }}
                                >
                                    {item.weight} Kg
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: "InterRegular",
                                        color: "#04364A",
                                        padding: 10,
                                    }}
                                >
                                    {item.height} Cm
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    columnGap: 4,
                                    alignItems: "center",
                                    paddingStart: 10,
                                }}
                            >
                                <View
                                    style={{
                                        width: 100,
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 80,
                                            height: 80,
                                        }}
                                        source={ImageGender(item.gender)}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: "column",
                                        rowGap: 10,
                                        paddingHorizontal: 24,
                                        paddingVertical: 24,
                                        width: "70%",
                                    }}
                                >
                                    {item.checkup.map((check, index2) => {
                                        return (
                                            <View
                                                key={index2}
                                                style={{
                                                    flexDirection: "row",
                                                    columnGap: 10,
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 13,
                                                        fontFamily:
                                                            "InterRegular",
                                                        color: "#04364A",
                                                    }}
                                                >
                                                    {check}
                                                </Text>
                                                <Image
                                                    style={{
                                                        width: 21,
                                                        height: 21,
                                                    }}
                                                    source={require("@/assets/images/icon/check.png")}
                                                />
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};
export default ReportPanelPart;
