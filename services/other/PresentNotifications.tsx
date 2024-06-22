import * as Notifications from "expo-notifications";

export const presentNotification = async (
    title: string,
    body: string,
    trigger: number,
    channelId: string,
    url?: string
): Promise<void> => {
    const contentWithUrl = {
        title: title,
        body: body + " " + url,
        channelId: channelId,
        data: { url: url },
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
