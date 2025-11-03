import { renderMovieItem } from "@/components/movieItem";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { fetchPopularMovies } from "@/utils/popularMovies";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPopularMovies();

        setMovies(response.data.results);
      } catch (e: any) {
        console.error("Error al obtener datos de TMDB:", e);

        const status = e.response ? e.response.status : "Desconocido";
        setError(
          status === 401
            ? "Error de autenticación (Token incorrecto o expirado)."
            : `Error: ${e.message}`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  let content;

  if (loading) {
    content = (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
    );
  } else if (error) {
    content = (
      <ThemedText style={styles.errorMessage}>Error: {error}</ThemedText>
    );
  } else if (movies.length === 0) {
    content = (
      <ThemedText style={styles.errorMessage}>
        No se encontraron películas.
      </ThemedText>
    );
  } else {
    content = (
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#00A8E8", dark: "#023047" }}
      headerImage={
        <ThemedText type="title" style={styles.headerTitle}>
          🍿 Películas Populares de TMDB
        </ThemedText>
      }
    >
      <ThemedView style={styles.container}>{content}</ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  headerTitle: {
    padding: 50,
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
  },
  loading: {
    paddingVertical: 40,
  },
  errorMessage: {
    textAlign: "center",
    padding: 20,
    color: "red",
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});
