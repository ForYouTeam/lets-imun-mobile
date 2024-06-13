import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Image, ImageSourcePropType, ScrollView, Text, View, useWindowDimensions } from "react-native";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

interface DataType {
    title: string;
    category: string;
    img?: ImageSourcePropType;
    key?: string;
}

type SpacerType = {
    key: string;
};

const CourselNews = () => {
    const { width } = useWindowDimensions();
    const SIZE = width * 0.9;
    const SPACER = (width - SIZE) / 2;

    const data: DataType[] = [
        {
            title: "Berita 1",
            category: "acara",
            img: require('@/assets/images/banner/example-1.png')
        },
        {
            title: "Berita 2",
            category: "tips",
            img: require('@/assets/images/banner/example-2.jpg')
        },
        {
            title: "Berita 3",
            category: "info",
            img: require('@/assets/images/banner/example-2.jpg')
        }
    ];

    const [newData] = useState<(DataType | SpacerType)[]>([
        { key: 'spacer-left' },
        ...data,
        { key: 'spacer-right' }
    ]);

    const x = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        }
    });

    const isDataType = (item: DataType | SpacerType): item is DataType => {
        return (item as DataType).title !== undefined;
    };

    return (
        <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={16}
            snapToInterval={SIZE}
            decelerationRate={'fast'}
            onScroll={onScroll}
        >
            {newData.map((item, index) => {
                const style = useAnimatedStyle(() => {
                    const scaleX = interpolate(
                        x.value,
                        [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                        [0.95, 1, 0.95]
                    );

                    const scaleY = interpolate(
                        x.value,
                        [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                        [0.88, 1, 0.88]
                    );

                    return {
                        transform: [{ scaleX }, { scaleY }]
                    };
                });

                if (!isDataType(item)) {
                    return <View style={{ width: SPACER }} key={item.key} />;
                }

                return (
                    <View key={item.key || index} style={{ width: SIZE }}>
                        <Animated.View style={[
                            style,
                            {
                                height: 200,
                                backgroundColor: '#176B87',
                                borderRadius: 24,
                                alignItems: 'flex-start',
                                position: 'relative',
                                overflow: 'hidden',
                            }
                        ]}>
                            <View style={{
                                height: '100%',
                                width: '100%',
                                position: 'relative',
                            }}>
                                <LinearGradient 
                                    colors={['rgba(0,0,0,0.4)', 'transparent']} style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    height: '40%',
                                    width: '100%',
                                    zIndex: 1,
                                }} />
                                <LinearGradient 
                                    colors={['rgba(0,0,0,0.9)', 'transparent']} 
                                    start={{ x: 0.5, y: 1 }}
                                    end={{ x: 0.5, y: 0 }}
                                    style={{
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    height: '50%',
                                    width: '100%',
                                    zIndex: 1,
                                }} />
                                <Image resizeMode="cover" style={{
                                    height: '100%',
                                    width: '100%',
                                }} source={item.img} />
                            </View>
                            <Text style={{
                                backgroundColor: 'white',
                                width: 'auto',
                                paddingHorizontal: 18,
                                paddingVertical: 4,
                                borderRadius: 118,
                                position: 'absolute',
                                top: 14,
                                left: 18,
                                zIndex: 2,
                                color: 'black',
                                fontSize: 12,
                                fontFamily: 'InterMedium',
                            }}>{item.category}</Text>
                            <View style={{
                                position: 'absolute',
                                bottom: 14,
                                left: 18,
                                flexDirection: 'column',
                                rowGap: 4,
                                paddingEnd: 32,
                                zIndex: 2,
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    color: 'white',
                                    fontFamily: 'InterMedium',
                                }}>
                                    12 jam yang lalu
                                </Text>
                                <Text style={{
                                    fontSize: 13,
                                    color: 'white',
                                    fontFamily: 'InterRegular',
                                }} numberOfLines={2} ellipsizeMode="tail">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. wwe ssdds
                                </Text>
                            </View>
                        </Animated.View>
                    </View>
                );
            })}
        </Animated.ScrollView>
    );
};

export default CourselNews;
