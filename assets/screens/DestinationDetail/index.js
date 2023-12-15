import React, { useState, useRef, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft2,
  Share,
  Location,
  Eye,
  Like,
  Add,
  Edit,
} from 'iconsax-react-native';
import { find } from 'lodash';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import theme, { COLORS, SIZES, FONTS } from '../../constant';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ActionSheet from 'react-native-actions-sheet';

const DestinationDetail = ({ route }) => {
  const { destinationId } = route.params;
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const actionSheetRef = useRef(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('blog')
      .doc(destinationId)
      .onSnapshot(documentSnapshot => {
        const destinationData = documentSnapshot.data();
        if (destinationData) {
          console.log('Destination data: ', destinationData);
          setSelectedDestination(destinationData);
        } else {
          console.log(`Destination with ID ${destinationId} not found.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [destinationId]);

  const navigateEdit = () => {
    closeActionSheet();
    navigation.navigate('EditDestination', { destinationId });
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection('blog')// lupa ganti
        .doc(destinationId)
        .delete()
        .then(() => {
          console.log('Destination deleted!');
        });
      if (selectedMenu?.image) {
        const imageRef = storage().refFromURL(selectedDestination?.image);
        await imageRef.delete();
      }
      console.log('Destination deleted!');
      closeActionSheet();
      setSelectedDestination(null);
      setLoading(false);
      navigation.navigate('Homepage');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        {/* Image Detail */}
        <View style={detailPicture.Container}>

          {selectedDestination?.image ? (
            <Image
              source={{
                uri: selectedDestination?.image,
                headers: { Authorization: 'someAuthToken' },
              }}
              style={detailPicture.image}
            />
          ) : (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          )}

        </View>

        {/* Information */}
        <View style={information.container}>
          <View style={information.leftContent}>
            <Location size="24" color="#697689" />
            <Text style={information.locationText}>{selectedDestination?.name}</Text>
          </View>
          <View style={information.rightContent}>
            <View style={information.infoItem}>
              <Eye
                size="24"
                color="#697689"
              />
              <Text style={information.infoText}>{selectedDestination?.views}K</Text>
            </View>
            <View style={information.infoItem}>
              <Like
                size="24"
                color="#697689"
                variant='Bold'
              />
              <Text style={information.infoText}>{selectedDestination?.likes}k</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={description.container}>
          <Text style={description.title}>{selectedDestination?.titleDetail}</Text>
          <Text style={description.text}>
            {selectedDestination?.description}
          </Text>
          <Text style={description.text}></Text>
          <Text style={description.text}>
            {selectedDestination?.description}
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={openActionSheet}>
        <Edit color={COLORS.white} variant="Linear" size={20} />
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={navigateEdit}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: COLORS.black,
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: COLORS.black,
              fontSize: 18,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: 'red',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ActionSheet>
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
  floatingButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    position: 'absolute',
    bottom: 50,
    right: 24,
    borderRadius: 10,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
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
