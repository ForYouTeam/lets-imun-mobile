import { Text, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';

interface DataType {
    title: string
    date : string
    time : string
}

const data: DataType[] = [
    {
        title: "Imuniasi Anak",
        date: "10 Juni 2024",
        time: "10:00 - 12:00"
    },
    {
        title: "Sunatan Massal",
        date: "25 Juni 2024",
        time: "09:00 - 12:00"
    },
]

const ScheduleList = () => {
    return (
        <View>
            {data.map((item, index) => (
                <View key={index} style={{
                    marginBottom: 16,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 18,
                    backgroundColor: '#f9f9f9',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flexDirection: 'column',
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{item.title}</Text>
                        <View style={{
                            flexDirection: 'row',
                            columnGap: 16,
                        }}>
                            <Text style={{ fontSize: 16, marginBottom: 2 }}>{item.date}</Text>
                            <Text style={{ fontSize: 16 }}>{item.time}</Text>
                        </View>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={28} color="grey" />
                </View>
            ))}
        </View>
    );
}


const Calendar = () => {
    return (
        <View style={{
            paddingHorizontal: 20,
            marginTop: 24,
            flexDirection: 'column',
            rowGap: 24,
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#04364A',
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
                    backgroundColor: '#EEEEEE',
                }}>
                    <MaterialIcons name="keyboard-arrow-left" size={32} color="#A9A9A9" />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 16,
                    paddingHorizontal: 32,
                    width: '70%',
                    borderRadius: 24,
                    backgroundColor: '#DAFFFB',
                    borderWidth: 1,
                    borderColor: '#64CCC5'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#04364A',
                    }}>Juni</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 6,
                    borderRadius: 50,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: '#64CCC5'
                }}>
                    <MaterialIcons name="keyboard-arrow-right" size={32} color="#64CCC5" />
                </View>
            </View>
            <ScheduleList />
        </View>
    )
}

export default Calendar