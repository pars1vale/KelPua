import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { blogData } from '../../../data';
import { fontType, colors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const ListBlog = ({ data }) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(Array(data.length).fill(false));
  const handleLikePress = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailScreen')}>
              <View style={styles.cardContent}>
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.cardIcon}>
                  <TouchableOpacity onPress={() => handleLikePress(index)}>
                    {liked[index] ? (
                      <Image source={item.iconLikeFilled} style={styles.likeIconFilled} />
                    ) : (
                      <Image source={item.iconLike} style={styles.likeIcon} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
  // cardContent: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // cardInfo: {
  //   justifyContent: 'flex-end',
  //   height: '100%',
  //   gap: 10,
  //   maxWidth: '60%',
  // },
  cardImage: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardIcon: {
    position: 'absolute',
    top: 10, // Sesuaikan posisi ikon like di atas
    right: 10, // Sesuaikan posisi ikon like di pojok kanan atas
    zIndex: 1, // Gunakan zIndex yang lebih tinggi untuk menempatkan ikon di atas gambar
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
    // top: 10,
    // right: 10,
    width: 30,
    height: 30,
  },
  likeIconFilled: {
    //top: 10,
    //right: 10,
    width: 30,
    height: 30,
    opacity: 0.75,
  },
});


export default ListBlog;
