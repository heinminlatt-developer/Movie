import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {GET} from '../services/API';
import Loader from './Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const TrendingMovie = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await GET('/movie/top_rated');
        setMovies(data.results);
        setOriginalMovies(data.results);
      } catch (e) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  const searchMovie = text => {
    setSearchText(text);
    if (text.length > 0) {
      const filteredMovies = originalMovies.filter(movie =>
        movie.title.toLowerCase().includes(text.toLowerCase()),
      );
      setMovies(filteredMovies);
    } else {
      setMovies(originalMovies);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.flatContainer}>
          <Text style={styles.heading}>Trending Movies</Text>
          <View style={styles.searchContainer}>
            <TextInput
              onChangeText={searchMovie}
              value={searchText}
              placeholder="Search"
              style={styles.searchInput}
            />
            <TouchableOpacity onPress={searchMovie}>
              <Icon name="search" size={30} color="pink" />
            </TouchableOpacity>
          </View>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <FlatList
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => displayMovies({item, navigation})}
              data={movies}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            />
          )}
        </SafeAreaView>
      )}
    </View>
  );
};

const displayMovies = ({item, navigation}) => {
  return (
    <View style={styles.listContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Details', {movieId: item.id});
          }}>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.ratingText}>⭐⭐⭐⭐⭐ {item.vote_average}</Text>
      </View>
    </View>
  );
};

export default TrendingMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'grey',
    marginTop: 20,
  },
  flatContainer: {
    flex: 1,
  },
  heading: {
    color: 'pink',
    fontSize: 19,
    margin: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    fontSize: 20,
    paddingHorizontal: 15,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 20,
  },
  imageContainer: {
    width: '100%',
    margin: 15,
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  titleText: {
    color: 'pink',
    fontWeight: 'bold',
    marginLeft: 15,
    fontSize: 15,
    marginTop: 5,
  },
  ratingText: {
    color: 'orange',
    marginLeft: 15,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'pink',
    textAlign: 'center',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 20,
  },
});
