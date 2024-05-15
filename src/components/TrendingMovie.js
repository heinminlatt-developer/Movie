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

  useEffect(() => {
    const getMovies = async () => {
      const data = await GET('/movie/top_rated');
      setMovies(data.results);
      setLoading(false);
    };
    getMovies();
  }, []);
  console.log('TrendingMovies=>===>', movies);

  const searchMovie = () => {
    console.log('search');
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.flatContainer}>
          <Text style={styles.heading}>Tending movies</Text>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <TextInput
              onChangeText={text => {
                searchMovie(text);
              }}
              placeholder="Search"
              style={{
                width: '80%',
                backgroundColor: 'white',
                borderRadius: 20,
                fontSize: 20,
              }}
            />
            <Icon name="search" size={50} color="pink" />
          </View>
          <FlatList
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => displayMovies({item, navigation})}
            data={movies}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

const displayMovies = ({item, navigation}) => {
  console.log('Navigation', navigation);
  console.log('Item of Id=>', item.id);
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
        <Text style={styles.ratingText}>⭐⭐⭐⭐⭐: {item.vote_average}</Text>
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
  },
  ratingText: {
    color: 'orange',
    marginLeft: 15,
    fontWeight: 'bold',
  },
});
