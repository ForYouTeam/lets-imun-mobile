import * as Notifications from "expo-notifications";

export const createNotificationChannel = async (channelName: string) => {
    const channel = await Notifications.getNotificationChannelAsync(channelName);

    if (channel == null) {
      await Notifications.setNotificationChannelAsync(channelName, {
        name: channelName,
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
      });
    }
}
