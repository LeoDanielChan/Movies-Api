import { IMAGE_BASE_URL } from "@/utils/variables";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Movie = {
  poster_path?: string | null;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  id: number | string;
};

export const renderMovieItem = ({ item }: { item: Movie }) => (
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
      <ThemedText>{item.overview.substring(0, 100)}...</ThemedText>
      <ThemedText>⭐ {item.vote_average.toFixed(1)} / 10</ThemedText>
      <ThemedText>📅 {item.release_date}</ThemedText>
    </View>
  </ThemedView>
);

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#f9f9f9", // Color de fondo del item
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    // Estilos para ThemedView
    borderColor: "gray",
    borderWidth: 1,
  },
  posterImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 15,
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    marginBottom: 5,
  },
});
