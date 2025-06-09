import React from 'react';
import { View, Animated } from 'react-native';
import { Card } from 'react-native-paper';

export default function ListSkeleton() {
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();

        return () => animation.stop();
    }, []);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    const SkeletonItem = () => (
        <Card style={{ margin: 8 }}>
            <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Animated.View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: '#E1E9EE',
                            opacity,
                        }}
                    />
                    <View style={{ marginLeft: 16, flex: 1 }}>
                        <Animated.View
                            style={{
                                width: '60%',
                                height: 24,
                                backgroundColor: '#E1E9EE',
                                borderRadius: 4,
                                marginBottom: 8,
                                opacity,
                            }}
                        />
                        <Animated.View
                            style={{
                                width: '40%',
                                height: 20,
                                backgroundColor: '#E1E9EE',
                                borderRadius: 4,
                                opacity,
                            }}
                        />
                    </View>
                </View>
            </View>
        </Card>
    );

    return (
        <View style={{ flex: 1 }}>
            {[1, 2, 3, 4, 5].map((index) => (
                <SkeletonItem key={index} />
            ))}
        </View>
    );
}