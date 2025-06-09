import React from 'react';
import { View, Animated, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';

export default function LeadDetailSkeleton() {
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

    return (
        <ScrollView style={{ padding: 16 }}>
            <Card>
                <Card.Title
                    title={
                        <Animated.View
                            style={{
                                width: '60%',
                                height: 24,
                                backgroundColor: '#E1E9EE',
                                borderRadius: 4,
                                opacity,
                            }}
                        />
                    }
                    subtitle={
                        <Animated.View
                            style={{
                                width: '80%',
                                height: 20,
                                backgroundColor: '#E1E9EE',
                                borderRadius: 4,
                                marginTop: 4,
                                opacity,
                            }}
                        />
                    }
                />
                <Card.Content>
                    <Animated.View
                        style={{
                            width: '70%',
                            height: 20,
                            backgroundColor: '#E1E9EE',
                            borderRadius: 4,
                            marginTop: 8,
                            opacity,
                        }}
                    />
                    <Animated.View
                        style={{
                            width: '60%',
                            height: 20,
                            backgroundColor: '#E1E9EE',
                            borderRadius: 4,
                            marginTop: 8,
                            opacity,
                        }}
                    />
                    <Animated.View
                        style={{
                            width: '40%',
                            height: 20,
                            backgroundColor: '#E1E9EE',
                            borderRadius: 4,
                            marginTop: 16,
                            opacity,
                        }}
                    />
                    <Animated.View
                        style={{
                            width: '90%',
                            height: 60,
                            backgroundColor: '#E1E9EE',
                            borderRadius: 4,
                            marginTop: 8,
                            opacity,
                        }}
                    />
                    <Animated.View
                        style={{
                            width: '50%',
                            height: 20,
                            backgroundColor: '#E1E9EE',
                            borderRadius: 4,
                            marginTop: 16,
                            opacity,
                        }}
                    />
                    <View style={{ marginTop: 12 }}>
                        <Animated.View
                            style={{
                                width: '30%',
                                height: 20,
                                backgroundColor: '#E1E9EE',
                                borderRadius: 4,
                                opacity,
                            }}
                        />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                            {[1, 2, 3].map((index) => (
                                <Animated.View
                                    key={index}
                                    style={{
                                        width: 80,
                                        height: 32,
                                        backgroundColor: '#E1E9EE',
                                        borderRadius: 16,
                                        margin: 4,
                                        opacity,
                                    }}
                                />
                            ))}
                        </View>
                    </View>
                </Card.Content>
            </Card>
            <Animated.View
                style={{
                    width: '100%',
                    height: 48,
                    backgroundColor: '#E1E9EE',
                    borderRadius: 4,
                    marginTop: 24,
                    opacity,
                }}
            />
        </ScrollView>
    );
}