import { PermissionsAndroid } from "react-native";

export const RequestNotificationPermission = async () => {
    try {
        const currentStatus = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if (currentStatus) {
            console.log('Notification permission already granted');
            return true;
        } else {
            console.log('Notification permission not granted');
        }

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
                title: 'Izinkan Aplikasi',
                message: 'Aplikasi ini membutuhkan izin pemberitahuan untuk dapat berjalan dengan baik.',
                buttonNeutral: 'Tanya Nanti',
                buttonNegative: 'Batal',
                buttonPositive: 'Setuju',
            },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the notification');
            return true;
        } else {
            console.log('Notification permission denied');
        }

        return false;
    } catch (err) {
        console.warn(err);
        return false;
    }
};
