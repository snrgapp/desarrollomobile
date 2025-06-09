import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SwipeItem, SwipeStackProps } from "../../types/swiper";

const { width: screenWidth } = Dimensions.get("window");

export const SwipeStack: React.FC<SwipeStackProps> = ({
  data,
  renderCard,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const startX = useSharedValue(0);

  const handleSwipeComplete = (item: SwipeItem, isRightSwipe: boolean) => {
    if (isRightSwipe) {
      onSwipeRight(item);
    } else {
      onSwipeLeft(item);
    }
    setCurrentIndex((prev) => prev + 1);

    translateX.value = 0;
    rotate.value = 0;
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      rotate.value = translateX.value / 10;
    })
    .onEnd((event) => {
      const shouldSwipe =
        Math.abs(event.velocityX) > 500 ||
        Math.abs(translateX.value) > screenWidth * 0.3;

      if (shouldSwipe) {
        const direction = translateX.value > 0 ? 1 : -1;
        const isRightSwipe = direction > 0;

        translateX.value = withSpring(
          direction * screenWidth * 1.5,
          {
            damping: 20,
            stiffness: 90,
          },
          (finished) => {
            if (finished) {
              runOnJS(handleSwipeComplete)(data[currentIndex], isRightSwipe);
            }
          }
        );
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const likeAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, screenWidth * 0.3],
      [0, 1],
      Extrapolation.CLAMP // Updated usage
    );

    return {
      opacity,
    };
  });

  const nopeAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-screenWidth * 0.3, 0],
      [1, 0],
      Extrapolation.CLAMP // Updated usage
    );

    return {
      opacity,
    };
  });

  if (currentIndex >= data.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, color: "#666" }}>No more cards!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[cardAnimatedStyle]}>
          {renderCard(data[currentIndex])}

          {/* Like indicator */}
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 50,
                right: 20,
                backgroundColor: "#4CAF50",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
              likeAnimatedStyle,
            ]}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              LIKE
            </Text>
          </Animated.View>

          {/* Nope indicator */}
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 50,
                left: 20,
                backgroundColor: "#F44336",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
              nopeAnimatedStyle,
            ]}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              NOPE
            </Text>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
