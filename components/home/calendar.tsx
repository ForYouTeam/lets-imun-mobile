import { Colors } from "@/constants/Colors"
import { Image, Text, View } from "react-native"

interface DataType {
    title: string
    date : string
    time : string
    desc?: string
}

const data: DataType[] = [
    {
        title: "Imuniasi Anak",
        date: "10 Juni 2024",
        time: "10:00 - 12:00",
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam dicta deserunt explicabo laborum assumenda!'
    },
    {
        title: "Sunatan Massal",
        date: "25 Juni 2024",
        time: "09:00 - 12:00",
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam dicta deserunt explicabo laborum assumenda!'
    },
    {
        title: "Sunatan Massal II",
        date: "30 Juni 2024",
        time: "09:00 - 12:00",
        desc: ''
    },
]

const ScheduleList = () => {
    return (
        <View>
            {data.map((item, index) => (
                <View key={index} style={{
                    marginBottom: 8,
                    paddingVertical: 12,
                    paddingStart: 15,
                    paddingEnd: 10,
                    borderWidth: 1,
                    borderColor: '#C4DFDF',
                    borderRadius: 8,
                    backgroundColor: '#whi',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <View style={{
                        flexDirection: 'column',
                    }}>
                        <Text style={{ fontSize: 15, marginBottom: 0, fontFamily: 'InterBold' }}>{item.title}</Text>
                        <View style={{
                            flexDirection: 'row',
                            columnGap: 8,
                            marginTop: item.desc ? 4 : 0,
                        }}>
                            <Text style={{ fontSize: 11, marginBottom: 0, fontFamily: 'InterRegular' }}>{item.date}</Text>
                            <Text style={{ fontSize: 11, fontFamily: 'InterRegular' }}>{item.time}</Text>
                        </View>
                        {
                            item.desc && (
                                <Text style={{
                                    maxWidth: '100%',
                                }}>
                                    { item.desc }
                                </Text>
                            )
                        }
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 5,
                        height: 200,
                        backgroundColor: '#64CCC5',
                    }} />
                </View>
            ))}
        </View>
    );
}


const Calendar = () => {
    return (
        <View style={{paddingHorizontal: 10,}}>
            <View style={{
                paddingHorizontal: 10,
                paddingTop: 10,
                paddingBottom: 15,
                marginVertical: 24,
                flexDirection: 'column',
                rowGap: 14,
                backgroundColor: '#F7F7F7',
                borderRadius: 8,
            }}>
                <Text style={{
                    fontSize: 18,
                    color: '#04364A',
                    fontFamily: 'MontserratSemiBold',
                    transform: [{ scaleY: 1.1 }]
                }}>Jadwal Bulanan</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    columnGap: 20,
                    alignItems: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 6,
                        borderRadius: 50,
                        backgroundColor: 'white',
                    }}>
                        <Image style={{
                            width: 24,
                            height: 24,
                        }} source={require('@/assets/images/tabbar/arrow-left.png')} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 8,
                        paddingHorizontal: 32,
                        width: '70%',
                        borderRadius: 24,
                        backgroundColor: '#DAFFFB',
                        borderWidth: 1,
                        borderColor: Colors.primary
                    }}>
                        <Text style={{
                            fontSize: 18,
                            color: '#04364A',
                            fontFamily: 'InterMedium',
                        }}>Juni</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 6,
                        borderRadius: 50,
                        backgroundColor: 'white',
                    }}>
                        <Image style={{
                            width: 24,
                            height: 24,
                        }} source={require('@/assets/images/tabbar/arrow-right.png')} />
                    </View>
                </View>
                <ScheduleList />
            </View>
        </View>
    )
}

export default Calendar