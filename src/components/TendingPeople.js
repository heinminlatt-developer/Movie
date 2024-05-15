import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {GET} from '../services/API';
import Loader from './Loader';
import {IMAGE_POSTER_URL} from '../config';
import TrendingMovie from './TrendingMovie';

const TendingPeople = () => {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getPeople = async () => {
      try {
        const response = await GET('/trending/person/week');
        setPeople(response.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending people:', error);
        setLoading(false);
      }
    };

    getPeople();
  }, []);

  console.log('Trending People=>>>>>', people);
  const renderPersonItem = ({item}) => (
    <View style={styles.personContainer}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${item.profile_path}`,
        }}
        style={styles.profileImage}
      />
      <Text style={styles.personName}>{item.name}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trending people</Text>
      {loading ? <Loader /> : null}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        data={people}
        renderItem={renderPersonItem}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
    width: '100%',
    height: '5%',
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  heading: {
    color: 'pink',
    fontSize: 19,
    margin: 10,
    fontWeight: 'bold',
  },
  personContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 30, // Half of the width and height to make it a circle
  },
  personName: {
    color: 'pink',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TendingPeople;
