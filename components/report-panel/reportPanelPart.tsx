import { Colors } from "@/constants/Colors";
import { useGlobal } from "@/context/GlobalState";
import { useReport } from "@/context/report/ReportState";
import { getReport } from "@/services/report";
import { IReportResponse } from "@/services/report/type";
import { splitString } from "@/utils/GetSplitString";
import { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";

const ReportPanelPart = () => {
    const {reportList, setReportList} = useReport()
    const {setAuthenticated} = useGlobal()

    const ImageGender = (gender: number) => {
        if (gender === 1) {
            return require("@/assets/images/icon/boy.png");
        }
        return require("@/assets/images/icon/girl.png");
    };

    const getReportList = async () => {
        const {data, error, status} = await getReport('2024-07')

        if (!data && status === 401) {
            setAuthenticated(false)
        }

        if (status !== 200 && error) {
            console.log(error);
        }

        if (status === 200 && data) {
            const result = data as {
                data: {
                    list: IReportResponse[]
                }
            }
            setReportList(result.data.list)
            console.log(reportList);
        }
    }

    useEffect(() => {
        getReportList()
    }, [])
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

            {reportList.map((item, index) => {
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
                                textTransform: 'capitalize'
                            }}
                        >
                            {item.nama_anak}
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
                                    {item.umur}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: "InterRegular",
                                        color: "#04364A",
                                        padding: 10,
                                    }}
                                >
                                    {item.bb}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: "InterRegular",
                                        color: "#04364A",
                                        padding: 10,
                                    }}
                                >
                                    {item.tb}
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
                                        source={ImageGender(item.jenis_kelamin == 'man' ? 1 : 2)}
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
                                    {splitString(item.check_up).map((check, index2) => {
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
