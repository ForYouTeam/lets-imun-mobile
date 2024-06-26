import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

const SIZE = 350; 
const SPACER = 14;

export const NewsShimmer = () => {
    const newData = new Array(3).fill(0); // Ganti 5 dengan jumlah item yang Anda perlukan

    return (
        <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={16}
            snapToInterval={SIZE + SPACER} // Tambahkan SPACER ke snapToInterval
            decelerationRate={'fast'}
            style={{
                paddingStart: 20
            }}
        >
            {newData.map((_, index) => (
                <View key={index} style={{ width: SIZE, marginRight: SPACER }}>
                    <View style={{
                        height: 200,
                        backgroundColor: '#eee', // Warna placeholder
                        borderRadius: 24,
                        alignItems: 'flex-start',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Placeholder untuk gambar */}
                        <View style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: '#bbb', // Warna placeholder gambar
                        }} />
                        
                        {/* Placeholder untuk teks kategori */}
                        <Text style={{
                            backgroundColor: '#fff', // Warna background teks
                            width: 'auto',
                            paddingHorizontal: 18,
                            paddingVertical: 4,
                            borderRadius: 118,
                            position: 'absolute',
                            top: 14,
                            left: 18,
                            zIndex: 2,
                            color: '#fff', // Warna teks
                            fontSize: 12,
                            fontFamily: 'InterMedium',
                        }}>Category</Text>
                        
                        {/* Placeholder untuk teks waktu */}
                        <View style={{
                            position: 'absolute',
                            bottom: 18,
                            left: 18,
                            flexDirection: 'column',
                            rowGap: 4,
                            paddingEnd: 32,
                            zIndex: 2,
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: '#fff', // Warna teks waktu
                                fontFamily: 'InterMedium',
                                backgroundColor: '#FFF',
                                borderRadius: 20,
                                width: 120,
                                marginBottom: 8
                            }}>
                            </Text>
                            <Text style={{
                                fontSize: 13,
                                color: '#fff', // Warna teks deskripsi
                                fontFamily: 'InterRegular',
                                width: 170,
                                backgroundColor: '#FFF',
                                borderRadius: 20
                            }} numberOfLines={2} ellipsizeMode="tail">
                            </Text>
                        </View>
                    </View>
                </View>
            ))}
        </Animated.ScrollView>
    );
}