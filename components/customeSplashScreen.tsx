import React from 'react';
import { View, Image } from 'react-native';

const CustomSplashScreen = () => {
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0, // Tambahkan ini untuk memastikan posisi dari kiri
            right: 0, // Tambahkan ini untuk memastikan posisi dari kanan
            bottom: 0, // Tambahkan ini untuk memastikan posisi dari bawah
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff', // Tambahkan latar belakang jika diperlukan
            zIndex: 9999
        }}>
            <Image style={{width: 130, height: 130}} source={require('@/assets/images/soon.gif')} />
        </View>
    );
}

export default CustomSplashScreen;
