import {Dimensions, StyleSheet} from 'react-native';
import Constant from '../constant/Constant';

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  sectionBg: {backgroundColor: Constant.baseColor, height: deviceHeight},
});
export default styles;
