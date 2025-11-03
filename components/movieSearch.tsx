import { IMAGE_BASE_URL } from "@/utils/variables";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export const renderMovie = ({ item }) => (
  <ThemedView style={styles.movieItem}>
    {item.poster_path && (
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
        style={styles.posterImage}
        contentFit="cover"
      />
    )}
    <View style={styles.movieDetails}>
      <ThemedText type="subtitle" style={styles.movieTitle}>
        {item.title}
      </ThemedText>
      <ThemedText>⭐ {item.vote_average.toFixed(1)} / 10</ThemedText>
    </View>
  </ThemedView>
);

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  posterImage: {
    width: 60,
    height: 90,
    borderRadius: 5,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
