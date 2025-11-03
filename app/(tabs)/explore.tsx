import { renderMovie } from '@/components/movieSearch';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { searchMovies } from '@/utils/searchMovies';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native';

export default function TabTwoScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findMovies = async (query) => {
    if (query.length < 3) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchMovies(query)

      setMovies(response.data.results);
    } catch (e) {
      console.error("Error al buscar en TMDB:", e);
      setError('Error al conectar con TMDB. Verifica el token y la red.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      findMovies(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  let content;

  if (loading) {
    content = <ActivityIndicator size="large" color="#00A8E8" style={styles.loading} />;
  } else if (error) {
    content = <ThemedText style={styles.errorMessage}>{error}</ThemedText>;
  } else if (movies.length === 0 && searchTerm.length > 2) {
    content = <ThemedText style={styles.infoMessage}>No se encontraron resultados para &quot;{searchTerm}&quot;.</ThemedText>;
  } else if (searchTerm.length < 3) {
    content = <ThemedText style={styles.infoMessage}>Comienza a escribir para buscar películas...</ThemedText>;
  } else {
    content = (
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        // SOLUCIÓN AL ERROR: permite que ParallaxScrollView maneje el scroll
        scrollEnabled={false} 
      />
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#00A8E8', dark: '#023047' }}
      headerImage={
        <ThemedText type="title" style={styles.headerTitle}>
            🔎 Buscar Películas
        </ThemedText>
      }>
      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe el nombre de la película..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </ThemedView>
      <ThemedView style={styles.resultsContainer}>
        {content}
      </ThemedView>
    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  headerTitle: {
    padding: 70,
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff', 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderColor: '#00A8E8',
    borderWidth: 2,
    fontSize: 18,
    backgroundColor: '#f0f0f0',
  },
  // Contenedor de los resultados (debajo del campo de búsqueda)
  resultsContainer: {
    flex: 1, // Es importante para el layout
    paddingHorizontal: 10,
  },
  loading: {
    paddingVertical: 40,
  },
  errorMessage: {
    textAlign: 'center',
    padding: 20,
    color: 'red',
  },
  infoMessage: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: 'gray',
  },
  listContent: {
    paddingBottom: 20,
  },
});