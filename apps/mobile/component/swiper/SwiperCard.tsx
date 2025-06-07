import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SwipeCardProps } from "../../types/swiper";

const { width, height } = Dimensions.get("window");

export const SwipeCard: React.FC<SwipeCardProps> = ({ item }) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        {/* Gradient overlay for better text readability */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradient}
        >
          <View style={styles.infoContainer}>
            <View style={styles.mainInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.age}>{item.age} years old</Text>
            </View>

            {/* Additional info section */}
            {item.bio && (
              <Text style={styles.bio} numberOfLines={2}>
                {item.bio}
              </Text>
            )}

            {/* Tags/interests */}
            {item.interests && item.interests.length > 0 && (
              <View style={styles.tagsContainer}>
                {item.interests
                  .slice(0, 3)
                  .map((interest: string, index: number) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{interest}</Text>
                    </View>
                  ))}
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: height * 0.75,
    borderRadius: 25,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 16,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  infoContainer: {
    gap: 12,
  },
  mainInfo: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    flex: 1,
  },
  age: {
    fontSize: 24,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.9)",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bio: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: 22,
    fontWeight: "400",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  tagText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
