import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ArrowLeft2 } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import theme, { COLORS, SIZES, FONTS } from '../../constant';
import { categories } from '../../constant';
import axios from 'axios';

const AddFoodForm = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [destinationData, setDestinationData] = useState({
    name: '',
    location: '',
    titleDetail: '',
    description: '',
    categories: {},
    rating: '',
    likes: '',
    views: '',
  });
  const handleChange = (key, value) => {
    setDestinationData({
      ...destinationData,
      [key]: value,
    });
  };
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const handleChangeCategory = (categoryId, categoryName) => {
    const isCategorySelected = selectedCategories.some(
      categories => categories.id === categoryId,
    );

    if (isCategorySelected) {
      const updatedCategories = selectedCategories.filter(
        categories => categories.id !== categoryId,
      );
      setSelectedCategories(updatedCategories);
    } else {
      setSelectedCategories([
        ...selectedCategories,
        { id: categoryId, name: categoryName },
      ]);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      await axios.post('https://6571dd06d61ba6fcc013cf5b.mockapi.io/kelpua/Destination', {
        name: destinationData.name,
        location: destinationData.location,
        titleDetail: destinationData.titleDetail,
        description: destinationData.description,
        categories: destinationData.categories,
        rating: destinationData.rating,
        likes: destinationData.likes,
        views: destinationData.views,
        image,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setLoading(false);
      navigation.navigate('Profile');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft2 color={COLORS.black} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Create New Destination</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Name"
            value={destinationData.name}
            onChangeText={text => handleChange('name', text)}
            placeholderTextColor={COLORS.gray2}
            multiline
            style={textInput.title}
            cursorColor={COLORS.primary}
          />
        </View>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="location"
            value={destinationData.location}
            onChangeText={text => handleChange('location', text)}
            placeholderTextColor={COLORS.gray2}
            multiline
            style={textInput.content}
            cursorColor={COLORS.primary}
          />
        </View>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Title Detail"
            value={destinationData.titleDetail}
            onChangeText={text => handleChange('titleDetail', text)}
            placeholderTextColor={COLORS.gray2}
            multiline
            style={textInput.content}
            cursorColor={COLORS.primary}
          />
        </View>
        <View style={[textInput.borderDashed, { minHeight: 250 }]}>
          <TextInput
            placeholder="Description"
            value={destinationData.description}
            onChangeText={text => handleChange('description', text)}
            placeholderTextColor={COLORS.gray2}
            multiline
            style={textInput.content}
            cursorColor={COLORS.primary}
          />
        </View>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Rating"
            value={destinationData.rating}
            onChangeText={text => handleChange('rating', text)}
            placeholderTextColor={COLORS.gray2}
            multiline
            style={textInput.content}
            cursorColor={COLORS.primary}
          />
        </View>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Likes"
            value={destinationData.likes}
            onChangeText={text => handleChange('likes', text)}
            placeholderTextColor={COLORS.gray2}
            multiline
            style={textInput.content}
            cursorColor={COLORS.primary}
          />
        </View>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Views"
            value={destinationData.views}
            onChangeText={text => handleChange('views', text)}
            placeholderTextColor={COLORS.gray2}
            multiline
            style={textInput.content}
            cursorColor={COLORS.primary}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <TextInput
            placeholder="Image"
            value={image}
            onChangeText={text => setImage(text)}
            placeholderTextColor={COLORS.gray2}
            style={textInput.content}
            cursorColor={COLORS.primary}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              color: COLORS.gray2,
            }}>
            Category
          </Text>
          <View style={category.container}>
            {categories.map((item, index) => {
              const bgColor = selectedCategories.some(
                category => category.id === item.id,
              )
                ? COLORS.black
                : COLORS.lightGray2;
              const color = selectedCategories.some(
                category => category.id === item.id,
              )
                ? COLORS.white
                : COLORS.gray;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleChangeCategory(item.id, item.name)}
                  style={[category.item, { backgroundColor: bgColor }]}>
                  <Text style={[category.name, { color }]}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonLabel}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddFoodForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: COLORS.black,
  },
  bottomBar: {
    backgroundColor: COLORS.white,
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.white,
  },
});
const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: COLORS.gray2,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.black,
    padding: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
    padding: 0,
  },
});
const category = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.lightGray1,
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
});
