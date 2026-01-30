import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useContext, useRef } from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import { PinOverlayContext } from "../context/pin-overlay-context";

export interface PinData {
    id: string;
    imageUrl: string;
    title?: string;
    author?: string;
    height: number;
}

interface PinCardProps {
    pin: PinData;
    onPress?: () => void;
}

export function PinCard({ pin, onPress }: PinCardProps) {
    const context = useContext(PinOverlayContext);
    const viewRef = useRef<View>(null);
    const scale = useSharedValue(1);
    const isLongPressing = useSharedValue(false);

    const triggerHaptic = () => {
        if (process.env.EXPO_OS === "ios") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
    };

    const handleLongPressStart = () => {
        triggerHaptic();
        viewRef.current?.measureInWindow((x, y, width, height) => {
            context?.showOverlay(pin, { x, y, width, height });
        });
    };

    const handleLongPressEnd = () => {
        context?.hideOverlay();
    };

    const longPress = Gesture.LongPress()
        .minDuration(300)
        .onStart(() => {
            isLongPressing.value = true;
            scale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
            runOnJS(handleLongPressStart)();
        })
        .onEnd(() => {
            isLongPressing.value = false;
            scale.value = withSpring(1, { damping: 15, stiffness: 300 });
            runOnJS(handleLongPressEnd)();
        })
        .onFinalize(() => {
            if (isLongPressing.value) {
                isLongPressing.value = false;
                scale.value = withSpring(1, { damping: 15, stiffness: 300 });
                runOnJS(handleLongPressEnd)();
            }
        });

    const tap = Gesture.Tap().onEnd(() => {
        if (onPress) {
            runOnJS(onPress)();
        }
    });

    const gesture = Gesture.Exclusive(longPress, tap);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View ref={viewRef} style={animatedStyle}>
                <View
                    style={{
                        borderRadius: 16,
                        borderCurve: "continuous",
                        overflow: "hidden",
                        backgroundColor: "#f0f0f0",
                    }}
                >
                    <Image
                        source={{ uri: pin.imageUrl }}
                        style={{
                            width: "100%",
                            height: pin.height,
                        }}
                        contentFit="cover"
                        transition={200}
                    />
                    {(pin.title || pin.author) && (
                        <View style={{ padding: 8, gap: 2 }}>
                            {pin.title && (
                                <Text
                                    numberOfLines={2}
                                    style={{
                                        fontSize: 13,
                                        fontWeight: "600",
                                        color: "#111",
                                    }}
                                >
                                    {pin.title}
                                </Text>
                            )}
                            {pin.author && (
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 11,
                                        color: "#767676",
                                    }}
                                >
                                    {pin.author}
                                </Text>
                            )}
                        </View>
                    )}
                </View>
            </Animated.View>
        </GestureDetector>
    );
}
