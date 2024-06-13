import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    title: 'Beranda',
                    tabBarIcon: ({ focused }) => (
                        <Image style={styles.icon} source={focused ? require('@/assets/images/tabbar/home.png') : require('@/assets/images/tabbar/home-inactive.png')} />
                    ),
                    tabBarStyle: styles.tabBar,
                    tabBarInactiveTintColor: '#C7C8CC',
                    tabBarActiveTintColor: '#54808C',
                }}
            />
            <Tabs.Screen
                name='reportPanel'
                options={{
                    headerShown: false,
                    title: 'Laporan',
                    tabBarIcon: ({ focused }) => (
                        <Image style={styles.icon} source={focused ? require('@/assets/images/tabbar/news.png') : require('@/assets/images/tabbar/news-inactive.png')} />
                    ),
                    tabBarStyle: styles.tabBar,
                    tabBarInactiveTintColor: '#C7C8CC',
                    tabBarActiveTintColor: '#54808C',
                    tabBarItemStyle: { paddingTop: 2 },
                }}
            />
            <Tabs.Screen
                name='settingUser'
                options={{
                    headerShown: false,
                    title: 'Akun',
                    tabBarIcon: ({ focused }) => (
                        <Image style={styles.icon} source={focused ? require('@/assets/images/tabbar/account.png') : require('@/assets/images/tabbar/account-inactive.png')} />
                    ),
                    tabBarStyle: styles.tabBar,
                    tabBarInactiveTintColor: '#C7C8CC',
                    tabBarActiveTintColor: '#54808C',
                    tabBarItemStyle: { paddingTop: 2 },
                }}
            />
        </Tabs>
    )
}

export default TabsLayout;

const styles = StyleSheet.create({
    tabBar: { 
        backgroundColor: 'white', 
        height: 60,
        paddingBottom: 6,
        paddingTop: 6,
    },
    icon: {
        width: 28,
        height: 28,
    }
})