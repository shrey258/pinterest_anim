import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect } from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated, {
    Easing,
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PinOverlayContext } from "../context/pin-overlay-context";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export function PinOverlay() {
    const context = useContext(PinOverlayContext);
    const { width, height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const progress = useSharedValue(0);
    const shimmerProgress = useSharedValue(0);

    const { state, hideOverlay } = context ?? {
        state: { isActive: false, pin: null, layout: null },
        hideOverlay: () => { },
    };

    useEffect(() => {
        progress.value = withTiming(state.isActive ? 1 : 0, { duration: 200 });

        if (state.isActive) {
            // Start shimmer animation - loops continuously
            shimmerProgress.value = 0;
            shimmerProgress.value = withRepeat(
                withTiming(1, {
                    duration: 1500,
                    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) // ease-out-quad
                }),
                -1, // infinite
                false // don't reverse
            );
        } else {
            shimmerProgress.value = 0;
        }
    }, [state.isActive]);

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP),
        pointerEvents: progress.value > 0.5 ? "auto" : "none",
    }));

    const cardStyle = useAnimatedStyle(() => {
        const scale = interpolate(progress.value, [0, 1], [1, 1.05], Extrapolation.CLAMP);
        return {
            transform: [{ scale }],
            opacity: progress.value,
        };
    });

    const shimmerStyle = useAnimatedStyle(() => {
        // Move the shimmer from left to right across the card
        const translateX = interpolate(
            shimmerProgress.value,
            [0, 1],
            [-200, 400],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ translateX }, { skewX: "-20deg" }],
        };
    });

    if (!state.layout || !state.pin) {
        return null;
    }

    const { x, y, width: cardWidth, height: cardHeight } = state.layout;

    return (
        <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents="box-none">
            {/* Dark backdrop */}
            <Pressable
                style={[styles.backdrop, { width, height }]}
                onPress={hideOverlay}
            />

            {/* Floating pin card */}
            <Animated.View
                style={[
                    styles.floatingCard,
                    cardStyle,
                    {
                        position: "absolute",
                        left: x,
                        top: y,
                        width: cardWidth,
                    },
                ]}
            >
                <View
                    style={{
                        borderRadius: 16,
                        borderCurve: "continuous",
                        overflow: "hidden",
                        backgroundColor: "#f0f0f0",
                        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    {/* Image container with shimmer */}
                    <View style={{ position: "relative", overflow: "hidden" }}>
                        <Image
                            source={{ uri: state.pin.imageUrl }}
                            style={{
                                width: "100%",
                                height: state.pin.height,
                            }}
                            contentFit="cover"
                        />

                        {/* Shimmer overlay */}
                        <Animated.View
                            style={[
                                {
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    overflow: "hidden",
                                },
                            ]}
                            pointerEvents="none"
                        >
                            <Animated.View
                                style={[
                                    {
                                        width: 120,
                                        height: "150%",
                                        position: "absolute",
                                        top: -20,
                                    },
                                    shimmerStyle,
                                ]}
                            >
                                <LinearGradient
                                    colors={[
                                        "transparent",
                                        "rgba(255, 255, 255, 0.15)",
                                        "rgba(255, 255, 255, 0.35)",
                                        "rgba(255, 255, 255, 0.15)",
                                        "transparent",
                                    ]}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                    style={{ flex: 1 }}
                                />
                            </Animated.View>
                        </Animated.View>
                    </View>

                    {(state.pin.title || state.pin.author) && (
                        <View style={{ padding: 8, gap: 2, backgroundColor: "#fff" }}>
                            {state.pin.title && (
                                <Text
                                    numberOfLines={2}
                                    style={{
                                        fontSize: 13,
                                        fontWeight: "600",
                                        color: "#111",
                                    }}
                                >
                                    {state.pin.title}
                                </Text>
                            )}
                            {state.pin.author && (
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 11,
                                        color: "#767676",
                                    }}
                                >
                                    {state.pin.author}
                                </Text>
                            )}
                        </View>
                    )}
                </View>

                {/* Action buttons */}
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 12,
                        gap: 8,
                    }}
                >
                    <Pressable
                        style={{
                            flex: 1,
                            backgroundColor: "#E60023",
                            paddingVertical: 14,
                            borderRadius: 24,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>
                            Save
                        </Text>
                    </Pressable>
                </View>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    floatingCard: {
        zIndex: 1001,
    },
});
