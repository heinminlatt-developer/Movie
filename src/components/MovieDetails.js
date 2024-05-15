import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {GET} from '../services/API';
import Styles from '../style/Styles';
import Loader from './Loader';

const MovieDetails = () => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const route = useRoute();
  const {movieId} = route.params;
  console.log('jjjjj', movieId);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const data = await GET(`/movie/${movieId}`);
      console.log('HHH=>', data);
      setDetails(data);
      setLoading(false);
    };

    getDetails();
  }, [movieId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <View style={Styles.sectionBg}>
          <View style={styles.movieImageContainer}>
            {details && details.backdrop_path ? (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${details.backdrop_path}`,
                }}
                style={styles.imageBg}
                resizeMode="cover"
              />
            ) : (
              <Text>No backdrop image available</Text>
            )}
          </View>
          {details && (
            <ScrollView style={{flex:1,}}>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{details.title}</Text>
              <Text style={styles.overview}>ID:{details.id}</Text>
              <Text style={styles.overview}>Budget:{details.budget} USD</Text>
              <Text style={styles.overview}>{details.overview}</Text>
              
              <Text style={styles.overview}>{details.overview}</Text>
            </View>
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  movieImageContainer: {
    width: '100%',
    height: 300,
    padding: 20, // Adjust the height to fit your design
  },
  imageBg: {
    boderRadius: 50,
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'pink',
  },
  overview: {
    fontSize: 16,
    color: 'pink',
  },
});
