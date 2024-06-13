import React from 'react';
import { Image, Text, View } from "react-native";

const Header = () => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Text style={{
                fontSize: 18,
                paddingHorizontal: 24,
                color: '#04364A',
                fontFamily: 'MontserratSemiBold',
                transform: [{ scaleY: 1.1 }]
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
                <Image style={{
                    width: 24,
                    height: 24,
                }} source={require('@/assets/images/bell.png')} />
            </View>
        </View>
    );
};

export default Header;
