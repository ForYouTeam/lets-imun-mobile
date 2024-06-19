import * as Notifications from "expo-notifications";

export const presentNotification = async (
    title: string,
    body: string,
    trigger: number,
    channelId: string,
    url?: string
): Promise<void> => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    const contentWithUrl = {
        title: title,
        body: body + " " + url,
        data: { url: url, channelId: channelId },
    };

    const contentWithoutUrl = {
        title: title,
        body: body,
    };

    const contents = url ? contentWithUrl : contentWithoutUrl;

    await Notifications.scheduleNotificationAsync({
        content: contents,
        trigger: { seconds: trigger }, // Schedule to trigger after 1 second
    });
};
