import { SwipeCard } from "@/component/swiper/SwiperCard";
import { SwipeStack } from "@/component/swiper/SwiperStack";
import { SwipeItem } from "../../types/swiper";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

const mockData: SwipeItem[] = [
  {
    id: 1,
    name: "Alice",
    age: 25,
    image: "https://picsum.photos/400/600?random=1",
    bio: "Love hiking and photography. Always up for new adventures!",
    interests: ["Photography", "Hiking", "Travel", "Coffee"],
  },
  {
    id: 2,
    name: "Bob",
    age: 28,
    image: "https://picsum.photos/400/600?random=2",
    bio: "Software engineer by day, chef by night. Passionate about creating amazing experiences.",
    interests: ["Coding", "Cooking", "Gaming"],
  },
  {
    id: 3,
    name: "Charlie",
    age: 30,
    image: "https://picsum.photos/400/600?random=3",
    bio: "Fitness enthusiast and dog lover. Looking for someone to share life's adventures with.",
    interests: ["Fitness", "Dogs", "Music", "Movies"],
  },
  {
    id: 4,
    name: "Diana",
    age: 27,
    image: "https://picsum.photos/400/600?random=4",
    bio: "Artist and world traveler. Collecting memories one city at a time.",
    interests: ["Art", "Travel", "Books", "Wine"],
  },
  {
    id: 5,
    name: "Ethan",
    age: 32,
    image: "https://picsum.photos/400/600?random=5",
    bio: "Entrepreneur with a passion for innovation and sustainable living.",
    interests: ["Business", "Sustainability", "Tech", "Yoga"],
  },
];

export default function CardsScreen(): React.ReactElement {
  const handleSwipeLeft = (item: SwipeItem): void => {
    console.log("Swiped left on:", item.name);
  };

  const handleSwipeRight = (item: SwipeItem): void => {
    console.log("Swiped right on:", item.name);
  };

  const renderCard = (item: SwipeItem): React.ReactElement => (
    <SwipeCard item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <View style={styles.content}>
        <SwipeStack
          data={mockData}
          renderCard={renderCard}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
});
