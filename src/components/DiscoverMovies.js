import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { GET } from '../services/API';
import { SliderBox } from 'react-native-image-slider-box';
import { IMAGE_POSTER_URL } from '../config';
import Constant from '../constant/Constant';
import PropTypes from 'prop-types'; 

const DiscoverMovies = () => {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await GET('/discover/movie');
        setMovies(response.results);
        const images = response.results.map(
          data => `${IMAGE_POSTER_URL}${data.backdrop_path}`,
        );
        const backImages = images.slice(0, 10);
        setImages(backImages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);
  console.log("Didcover Movie===>",images);

  return (
    <View>
      {/* <SliderBox
        images={images}
        dotColor={Constant.secondaryColor}
        autoplay={true}
        autoplayInterval={3000}
        circleLoop={true}
        resizeMode={'contain'}
        ImageComponentStyle={{ borderRadius: 15 }}
      /> */}
      <Text>Hein</Text>
    </View>
  );
};

export default DiscoverMovies;
