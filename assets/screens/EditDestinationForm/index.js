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
import { useNavigation } from '@react-navigation/native';
import theme, { COLORS } from '../../constant';
import { categories } from '../../constant';
import axios from 'axios';
import { ArrowLeft2, AddSquare, Add } from 'iconsax-react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const EditDestinationForm = ({ route }) => {
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
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
    useEffect(() => {
        const subscriber = firestore()
            .collection('blog')//lupa ganti
            .doc(destiatnionId)
            .onSnapshot(documentSnapshot => {
                const destinationData = documentSnapshot.data();
                if (destinationData) {
                    console.log('Destination data: ', destinationData);

                    const menuCategories = destinationData.categories || [];

                    setMenuData({
                        name: destinationData.name,
                        location: destinationData.location,
                        titleDetail: destinationData.titleDetail,
                        description: destinationData.titleDetail,
                        categories: destinationData.categories,
                        rating: destinationData.rating,
                        likes: destinationData.likes,
                        views: destinationData.views,
                    });
                    setSelectedCategories(menuCategories);
                    setOldImage(destinationData.image);
                    setImage(destinationData.image);
                    setLoading(false);
                } else {
                    console.log(`Destination with ID ${destiatnionId} not found.`);
                }
            });
        setLoading(false);
        return () => subscriber();
    }, [menuId]);

    const handleImagePick = async () => {
        ImagePicker.openPicker({
            width: 1920,
            height: 1080,
            cropping: true,
        })
            .then(image => {
                console.log(image);
                setImage(image.path);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleUpdate = async () => {
        setLoading(true);
        let filename = image.substring(image.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        const reference = storage().ref(`menuimages/${filename}`);
        try {
            if (image !== oldImage && oldImage) {
                const oldImageRef = storage().refFromURL(oldImage);
                await oldImageRef.delete();
            }
            if (image !== oldImage) {
                await reference.putFile(image);
            }
            const url =
                image !== oldImage ? await reference.getDownloadURL() : oldImage;
            await firestore().collection('blog').doc(destiatnionId).update({//lupa ganti nama collection
                name: destinationData.name,
                description: destinationData.description,
                comDescription: destinationData.comDescription,
                categories: selectedCategories,
                rating: destinationData.rating,
                price: destinationData.price,
                calories: destinationData.calories,
                duration: destinationData.duration,
                isFavorite: destinationData.isFavorite,
                image: url,
            });
            setLoading(false);
            console.log('Destination Updated!');
            navigation.navigate('DestinationDetail', { destiatnionId });
        } catch (error) {
            console.error('Error updating Destination:', error);
            console.log('Destination data: ', destinationData);
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