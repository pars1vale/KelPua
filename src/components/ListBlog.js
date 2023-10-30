import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from '../../data';
import { fontType, colors } from '../theme';


const ListBlog = ({ data }) => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <Image source={item.image} style={styles.cardImage} />
            <Image source={item.iconLike} style={styles.likeIcon} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 270,
    height: 410,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    position: 'relative', // Tambahkan properti 'position' untuk menjadikan posisi relatif
  },
  cardImage: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: fontType['CS-Book'],
    fontWeight: 'bold',
    color: colors.black(),
    padding: 10,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: fontType['CS-Book'],
    color: colors.grey(),
    padding: 10,
  },
  likeIcon: {
    position: 'absolute',
    top: 10, // Sesuaikan posisi ikon like
    right: 10, // Sesuaikan posisi ikon like
    width: 30, // Sesuaikan ukuran ikon like
    height: 30, // Sesuaikan ukuran ikon like
  },
});

export default ListBlog;
