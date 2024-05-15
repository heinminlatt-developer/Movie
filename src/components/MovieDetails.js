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
            <View
              style={{
                flex: 0.5,
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 20,
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${details.backdrop_path}`,
                }}
                style={{width: 150, height: 150}}
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{details.title}</Text>
                <Text style={styles.overview}>ID:{details.id}</Text>
                <Text style={styles.overview}>Budget:{details.budget} USD</Text>
                <View>
                  <Text style={styles.overview}>
                    Over View:{details.overview} USD
                  </Text>
                </View>
              </View>
            </View>
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
    marginTop: 50,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'pink',
  },
  overview: {
    fontSize: 16,
    color: 'pink',
  },
});
