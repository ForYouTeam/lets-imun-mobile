import * as Notifications from 'expo-notifications'

export const GetFcmToken = async () => {
    const token = (await Notifications.getDevicePushTokenAsync()).data;
    return token;
}