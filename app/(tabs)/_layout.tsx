import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    title: 'Beranda',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='home-flood' color={color} size={32} />
                    ),
                    tabBarStyle: styles.tabBar,
                    tabBarInactiveTintColor: '#C7C8CC',
                    tabBarActiveTintColor: '#64CCC5',
                }}
            />
            <Tabs.Screen
                name='reportPanel'
                options={{
                    headerShown: false,
                    title: 'Laporan',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='newspaper-outline' color={color} size={28} />
                    ),
                    tabBarStyle: styles.tabBar,
                    tabBarInactiveTintColor: '#C7C8CC',
                    tabBarActiveTintColor: '#64CCC5',
                    tabBarItemStyle: { paddingTop: 2 },
                }}
            />
            <Tabs.Screen
                name='settingUser'
                options={{
                    headerShown: false,
                    title: 'Akun',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='user' color={color} size={28} />
                    ),
                    tabBarStyle: styles.tabBar,
                    tabBarInactiveTintColor: '#C7C8CC',
                    tabBarActiveTintColor: '#64CCC5',
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
    }
})