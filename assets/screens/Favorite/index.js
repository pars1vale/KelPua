import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Heart} from 'iconsax-react-native';
import theme, {COLORS, SIZES, FONTS} from '../../constant';

const Favorite = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorite</Text>
      </View>
      <Content />
    </View>
  );
};

const Content = () => {
  return (
    <ScrollView>
      <View>
        <TouchableOpacity style={content.card}>
          <ImageBackground
            source={{
              uri: 'https://cdn0-production-images-kly.akamaized.net/z0qxu5KNmf_h5BgnW70UPZZco0Q=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3158121/original/075304800_1592646451-unnamed.jpg',
            }}
            style={content.cardImage}
          />
          <TouchableOpacity style={content.cardIcon}>
            <Heart size="26" color={COLORS.red} variant="Bold" />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            {/* Name */}
            <Text style={content.cardTitle}>Seblak</Text>
            {/* Description */}
            <Text style={content.cardSubTitle}>Masakan pedas khas Sunda</Text>
            {/* Price */}
            <Text style={content.cardPrice}>Rp25.000</Text>
          </View>

          {/* Calories */}
          <View style={content.cardCalories}>
            <Image
              source={{
                uri: 'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/icons/calories.png',
              }}
              style={{width: 22, height: 22}}
            />
            <Text style={content.cardCaloriesText}>262 kal</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={content.card}>
          <ImageBackground
            source={{
              uri: 'https://s3.bukalapak.com/uploads/content_attachment/80c01f5310e8d7620d452db5/original/resep_nasi_goreng_hijau_1.jpg',
            }}
            style={content.cardImage}
          />
          <TouchableOpacity style={content.cardIcon}>
            <Heart size="26" color={COLORS.red} variant="Bold" />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <Text style={content.cardTitle}>Nasi Goreng Ijo</Text>
            {/* Description */}
            <Text style={content.cardSubTitle}>Nasi goreng cabai hijau</Text>
            {/* Price */}
            <Text style={content.cardPrice}>Rp35.000</Text>
          </View>

          {/* Calories */}
          <View style={content.cardCalories}>
            <Image
              source={{
                uri: 'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/icons/calories.png',
              }}
              style={{width: 22, height: 22}}
            />
            <Text style={content.cardCaloriesText}>168 kal</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={content.card}>
          <ImageBackground
            source={{
              uri: 'https://www.masakapahariini.com/wp-content/uploads/2023/06/pempek-palembang.jpeg',
            }}
            style={content.cardImage}
          />
          <TouchableOpacity style={content.cardIcon}>
            <Heart size="26" color={COLORS.red} variant="Bold" />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <Text style={content.cardTitle}>Pempek</Text>
            {/* Description */}
            <Text style={content.cardSubTitle}>Makanan daging ikan</Text>
            {/* Price */}
            <Text style={content.cardPrice}>Rp44.000</Text>
          </View>

          {/* Calories */}
          <View style={content.cardCalories}>
            <Image
              source={{
                uri: 'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/icons/calories.png',
              }}
              style={{width: 22, height: 22}}
            />
            <Text style={content.cardCaloriesText}>164 kal</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
  },
});
const content = StyleSheet.create({
  card: {
    width: 345,
    height: 120,
    flexDirection: 'row',
    marginHorizontal: 25,
    marginBottom: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 5,
    left: 5,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    marginTop: 10,
    marginHorizontal: 10,
  },
  cardSubTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkGray2,
    marginTop: -4,
    marginHorizontal: 10,
  },
  cardPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: COLORS.black,
    marginTop: 8,
    marginHorizontal: 10,
  },
  cardCalories: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    right: 8,
  },
  cardCaloriesText: {
    color: COLORS.darkGray2,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});
