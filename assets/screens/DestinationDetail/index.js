import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft2,
  Share,
  Location,
  Eye,
  Like,
  Add,
} from 'iconsax-react-native';
import theme, { COLORS, SIZES, FONTS, destinationList } from '../../constant';
import { find } from 'lodash';

const DestinationDetail = ({ route }) => {
  const { destinationId } = route.params;
  const selectedDestination = destinationList.find(destination => destination.id === destinationId)
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        {/* Image Detail */}
        <View style={detailPicture.Container}>
          <Image source={{ uri: selectedDestination.image, }} style={detailPicture.image} />
        </View>

        {/* Information */}
        <View style={information.container}>
          <View style={information.leftContent}>
            <Location size="24" color="#697689" />
            <Text style={information.locationText}>{selectedDestination.name}</Text>
          </View>
          <View style={information.rightContent}>
            <View style={information.infoItem}>
              <Eye
                size="24"
                color="#697689"
              />
              <Text style={information.infoText}>{selectedDestination.views}K</Text>
            </View>
            <View style={information.infoItem}>
              <Like
                size="24"
                color="#697689"
                variant='Bold'
              />
              <Text style={information.infoText}>{selectedDestination.likes}k</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={description.container}>
          <Text style={description.title}>{selectedDestination.titleDetail}</Text>
          <Text style={description.text}>
            {selectedDestination.description}
          </Text>
          <Text style={description.text}></Text>
          <Text style={description.text}>
            {selectedDestination.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DestinationDetail;

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={header.headerContainer}>
      <TouchableOpacity style={header.iconContainer} activeOpacity={0.5} onPress={() => { navigation.goBack() }}>
        <ArrowLeft2 size="25" color="#697689" />
      </TouchableOpacity>
      <Text style={header.title}>Detail</Text>
      <TouchableOpacity style={header.iconContainer}>
        <Share
          size="25"
          color="#697689"
          variant="Bold"
        />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

const header = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    // backgroundColor: colors.white(),
    backgroundColor: COLORS.white,
  },
  iconContainer: {

    padding: 10,
  },
  icon: {
    width: 25, // Sesuaikan dengan ukuran ikon
    height: 25, // Sesuaikan dengan ukuran ikon
  },
  title: {
    fontSize: 20,
    // fontFamily: fontType['Pjs-ExtraBold'],
    ...FONTS.h2,
    color: COLORS.black,
  },
});

const detailPicture = StyleSheet.create({
  Container: {
    height: 300,
    backgroundColor: COLORS.white,
  },
  image: {
    width: 335,
    height: 280,
    // marginLeft: 33,
    // marginRight: 33,
    marginHorizontal: 30,
    borderRadius: 20,
  },
});

const information = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 16,
  },
  leftContent: {
    backgroundColor: 'white', // Menambahkan latar belakang putih
    borderRadius: 10, // Membuat sudut membulat
    padding: 16, // Memberikan padding untuk membuatnya terlihat seperti card
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  locationText: {
    color: COLORS.black,
    fontSize: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  infoText: {
    color: COLORS.black,
    fontSize: 16,
  },
});

const description = StyleSheet.create({
  container: {
    padding: 30,
  },
  title: {
    fontSize: 26,
    lineHeight: 40,
    // fontFamily: fontType['Pjs-ExtraBold'],
    color: COLORS.black,
    marginBottom: 10,
  },
  text: {
    textAlign: 'justify',
    lineHeight: 26,
    fontSize: 16,
    // fontFamily: fontType['CS-Book'],
    color: COLORS.gray,
  },
});
