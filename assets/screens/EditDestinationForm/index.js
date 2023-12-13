import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { ArrowLeft2 } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import theme, { COLORS } from '../../constant';
import { categories } from '../../constant';
import axios from 'axios';

const EditDestinationForm = ({ route }) => {
    const { destiatnionId } = route.params;
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [destinationData, setDestinationData] = useState({
        name: '',
        location: '',
        titleDetail: '',
        description: '',
        categories: '',
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
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getDestinationById();
    }, [destiatnionId]);

    const getDestinationById = async () => {
        try {
            const response = await axios.get(
                `https://6571dd06d61ba6fcc013cf5b.mockapi.io/kelpua/Destination/${destiatnionId}`,
            );

            const destinationCategories = response.data.categories || [];

            setDestinationData({
                name: response.data.name,
                location: response.dat.location,
                titleDetail: response.data.titleDetail,
                description: response.data.description,
                categories: response.data.categories,
                rating: response.data.rating,
                likes: response.data.likes,
                views: response.data.views,

            });
            setSelectedCategories(destinationCategories);
            setImage(response.data.image);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await axios
                .put(
                    `https://6571dd06d61ba6fcc013cf5b.mockapi.io/kelpua/Destination/${destiatnionId}`,
                    {
                        name: destinationData.name,
                        location: destinationData.location,
                        titleDetail: destinationData.itleDetail,
                        description: destinationData.description,
                        categories: destinationData.categories,
                        rating: destinationData.rating,
                        likes: destinationData.likes,
                        views: destinationData.views,
                        image,
                    },
                )
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            setLoading(false);
            navigation.navigate('Homepage');
        } catch (e) {
            console.log(e);
        }
    };

    const handleChangeCategory = (categoryId, categoryName) => {
        const isCategorySelected = selectedCategories.some(
            category => category.id === categoryId,
        );

        if (isCategorySelected) {
            const updatedCategories = selectedCategories.filter(
                category => category.id !== categoryId,
            );
            setSelectedCategories(updatedCategories);
        } else {
            setSelectedCategories([
                ...selectedCategories,
                { id: categoryId, name: categoryName },
            ]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft2 color={COLORS.black} variant="Linear" size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.title}>Edit Menu</Text>
                </View>
            </View>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            )}
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingVertical: 10,
                    gap: 10,
                }}>
                <View style={textInput.borderDashed}>
                    <TextInput
                        placeholder="Name"
                        value={menuData.name}
                        onChangeText={text => handleChange('name', text)}
                        placeholderTextColor={COLORS.gray2}
                        multiline
                        style={textInput.title}
                        cursorColor={COLORS.primary}
                    />
                </View>
                <View style={textInput.borderDashed}>
                    <TextInput
                        placeholder="Short description"
                        value={menuData.description}
                        onChangeText={text => handleChange('description', text)}
                        placeholderTextColor={COLORS.gray2}
                        multiline
                        style={textInput.content}
                        cursorColor={COLORS.primary}
                    />
                </View>
                <View style={[textInput.borderDashed, { minHeight: 250 }]}>
                    <TextInput
                        placeholder="Description"
                        value={menuData.comDescription}
                        onChangeText={text => handleChange('comDescription', text)}
                        placeholderTextColor={COLORS.gray2}
                        multiline
                        style={textInput.content}
                        cursorColor={COLORS.primary}
                    />
                </View>
                <View style={textInput.borderDashed}>
                    <TextInput
                        placeholder="Rating"
                        value={menuData.rating}
                        onChangeText={text => handleChange('rating', text)}
                        placeholderTextColor={COLORS.gray2}
                        multiline
                        style={textInput.content}
                        cursorColor={COLORS.primary}
                    />
                </View>
                <View style={textInput.borderDashed}>
                    <TextInput
                        placeholder="Price"
                        value={menuData.price}
                        onChangeText={text => handleChange('price', text)}
                        placeholderTextColor={COLORS.gray2}
                        multiline
                        style={textInput.content}
                        cursorColor={COLORS.primary}
                    />
                </View>
                <View style={textInput.borderDashed}>
                    <TextInput
                        placeholder="Calories"
                        value={menuData.calories}
                        onChangeText={text => handleChange('calories', text)}
                        placeholderTextColor={COLORS.gray2}
                        multiline
                        style={textInput.content}
                        cursorColor={COLORS.primary}
                    />
                </View>
                <View style={textInput.borderDashed}>
                    <TextInput
                        placeholder="Duration"
                        value={menuData.duration}
                        onChangeText={text => handleChange('duration', text)}
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
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonLabel}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditDestinationForm;

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