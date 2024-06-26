import { useHome } from "@/context/home/HomeState";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { getNews } from "@/services/home/NewsService";
import { INewsSuccess } from "@/services/home/type";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import Header from "./header";
import CourselNews from "../courselNews";
import Calendar from "./calendar";
import { router } from "expo-router";
import { NewsShimmer } from "../placeholder/newsShimmer";

const wait = (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

export const HomeComp = () => {
    const { homeNews, setHomeNews } = useHome();

    const colorScheme = useColorScheme();
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const fetchNews = async () => {
        const { status, data, error } = await getNews();
        if (status !== 200 || error) {
            if (status === 401) {
                router.push("/login");
            } else {
                console.log(error);
            }
        }

        if (data) {
            const news = data as {
                data: INewsSuccess
            };
            setHomeNews(news.data.list)
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <SafeAreaView style={{ paddingTop: colorScheme === "dark" ? 40 : 40 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View
                    style={{
                        paddingTop: 20,
                        backgroundColor: "white",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            rowGap: 10,
                        }}
                    >
                        <Header title="Kabar Terbaru" />
                        {homeNews.length >= 1 && (
                            <CourselNews newsList={homeNews} />
                        )}
                        {homeNews.length < 1 && (
                            <NewsShimmer />
                        )}
                        <Calendar />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
