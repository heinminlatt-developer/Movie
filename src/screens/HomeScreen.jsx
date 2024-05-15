import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Constant from '../constant/Constant';
import DiscoverMovies from '../components/DiscoverMovies';
import TendingPeople from '../components/TendingPeople';
import styles from '../style/Styles';
import TrendingMovie from '../components/TrendingMovie';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.sectionBg}>
      <TendingPeople />
      <TrendingMovie navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
