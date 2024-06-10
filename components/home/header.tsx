import { Fontisto } from "@expo/vector-icons"
import { Text, View } from "react-native"

const Header = () => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: '600',
                paddingHorizontal: 24,
                color: '#04364A',
            }}>Kabar Terbaru</Text>
            <View style={{
                backgroundColor: '#F7F7F7',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingVertical: 10,
                paddingHorizontal: 12,
                width: 'auto',
                borderRadius: 50,
                marginEnd: 18,
            }}>
                <Fontisto name="bell" size={21} color="black" />
            </View>
        </View>
    )
}

export default Header
