import React, { useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Animated, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, _View } from 'react-native';
import { fontType, colors } from '../../../src/theme';
import { blogData } from '../../../data';
import { DestinationList, MostPopular } from '../../../src/components';

const Stack = createStackNavigator();

export default function Home() {
    const translateX = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                translateX.setValue(gestureState.dx);
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx < -50) {
                    // Fungsi untuk menghapus item berdasarkan nilai threshold
                    Animated.timing(translateX, {
                        toValue: -300,
                        duration: 200,
                        useNativeDriver: false,
                    }).start(() => onDelete());
                } else {
                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                }
            },
        }),
    ).current;
    return (
        <Animated.View style={styles.container}>
            <ScrollView>
                <Header />
                <SearchBar />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
                    <CategoryItem title="Popular" />
                    <CategoryItem title="New" />
                    <CategoryItem title="Nearby" />
                    <CategoryItem title="Nearest" />
                    <CategoryItem title="Recommendation" />
                </ScrollView>
                <DestinationList data={blogData} />
                <MostPopular />
                <CardPopular />
            </ScrollView>
            <Footer />
        </Animated.View>
    );
}

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.helloText}>Hello,</Text>
                <Text style={styles.nameUser}>MUHAMMAD</Text>
            </View>
        </View>
    );
};

const SearchBar = () => {
    return (
        <View style={searchBar.searchBarContainer}>
            <View style={searchBar.searchIconContainer}>
                <Image source={require('../../assets/images/iconSearch.png')} style={searchBar.searchIcon} />
            </View>
            <TextInput
                style={searchBar.searchInput}
                placeholder="Search"
                placeholderTextColor="grey"
            />
        </View>
    );
};

const CategoryItem = ({ title }) => {
    return (
        <View style={styles.containerCategory}>
            <View style={styles.categoryItem}>
                <Text style={styles.categoryTitle}>{title}</Text>
            </View>
        </View>
    );
};

const CardPopular = () => {
    const blogData = [
        {
            title: 'Raja Ampat',
            location: 'Raja Ampat, West Papua',
            rating: 5.0,
            image: require('../../assets/images/gambar1.jpg'),
        },
        {
            title: 'Sentani Lake',
            location: 'Sentani, Papua',
            rating: 4.4,
            image: require('../../assets/images/gambar2.jpg'),
        },
        {
            title: 'Beach Base-G ',
            location: 'Jayapura, Papua',
            rating: 4.2,
            image: require('../../assets/images/gambar3.jpg'),
        },
        {
            title: 'Lorentz National Park',
            location: 'Timika, Center Papua',
            rating: 4.8,
            image: require('../../assets/images/gambar4.jpg'),
        },
        {
            title: 'Uter Lake',
            location: 'Korom, West Papua',
            rating: 4.1,
            image: require('../../assets/images/gambar5.jpg'),
        },
    ];

    return (
        <View>
            {blogData.map((item, index) => (
                <View key={index} style={popularCard.cardContainer}>
                    <Image source={item.image} style={popularCard.image} />
                    <View style={popularCard.textContainer}>
                        <Text style={popularCard.title}>{item.title}</Text>
                        <Text style={popularCard.location}>{item.location}</Text>
                        <View style={popularCard.ratingContainer}>
                            <Text style={popularCard.ratingText}>{item.rating}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

const Footer = () => {
    return (
        <View style={footer.footerContainer}>
            <View style={footer.footerItem}>
                <Image style={footer.image} source={require('../../assets/images/iconHouse.png')} />
            </View>
            <View style={footer.footerItem}>
                <Image style={footer.image} source={require('../../assets/images/iconSearch2.png')} />
            </View>

            <View style={footer.footerItem}>
                <Image style={footer.image} source={require('../../assets/images/iconLikeNavbar.png')} />
            </View>
            <View style={footer.footerItem}>
                <Image style={footer.image} source={require('../../assets/images/iconProfile.png')} />
            </View>
        </View>
    );
}

const searchBar = StyleSheet.create({
    searchBarContainer: {
        top: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft: 50,
        marginRight: 20,
        borderWidth: 0.5,
        borderColor: '#FFF7F6',
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    searchIconContainer: {
        paddingLeft: 10, // Adjust the padding for icon alignment
    },
    searchIcon: {
        width: 25,
        height: 25,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: 'grey',
        padding: 15,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white(),
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.white(),
    },
    textContainer: {
        flexDirection: 'column',
        left: 15,
    },
    helloText: {
        fontSize: 18,
        fontFamily: fontType['CS-Book'],
        color: colors.grey(),
    },
    nameUser: {
        fontSize: 24,
        fontFamily: fontType['Pjs-ExtraBold'],
        color: colors.black(),
    },

    categoryList: {
        paddingTop: 30,
        maxHeight: 100,
        flexDirection: 'row',
    },
    categoryItem: {
        borderRadius: 20,
        padding: 10,
        margin: 10,
    },
    categoryTitle: {
        fontSize: 18,
        fontFamily: fontType['CS-Book'],
        color: colors.lighGrey(),
    },

    cardContainer: {
        width: 270,
        height: 410,
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 20,
        marginRight: 20, // Ubah marginRight ke 20 agar lebih simetris
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 5, // Mengurangi tinggi bayangan untuk tampilan yang lebih ringan
        },
        shadowOpacity: 0.5, // Mengurangi opacity bayangan
        shadowRadius: 5, // Mengurangi radius bayangan
        elevation: 5,
    },
    cardImage: {
        width: '100%',
        height: 300,
        borderTopLeftRadius: 10, // Hanya sudut kiri atas yang membulat
        borderTopRightRadius: 10, // Hanya sudut kanan atas yang membulat
    },
    cardTitle: {
        fontSize: 20, // Sedikit mengurangi ukuran font agar sesuai dengan desain
        fontFamily: fontType['CS-Book'],
        fontWeight: 'bold',
        color: colors.black(),
        padding: 10,
    },
    cardDescription: {
        fontSize: 14, // Mengurangi ukuran font untuk deskripsi
        fontFamily: fontType['CS-Book'],
        color: colors.grey(),
        padding: 10,
    },

    containerMostPopular: {
        marginTop: 5, // Tambahkan margin atas di sini
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    titleMostPopular: {
        fontSize: 18,
        color: colors.black(),
        fontWeight: 'bold',
    },
    viewAllMostPopular: {
        fontSize: 16,
        color: 'blue', // Ganti dengan warna yang diinginkan
    },

});

const popularCard = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#FFF7F6',
        borderRadius: 15,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 20,
    },
    title: {
        fontFamily: fontType['CS-Book'],
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black(),
        marginBottom: 10,
    },
    location: {
        fontFamily: fontType['CS-Book'],
        fontSize: 16,
        color: '#777',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 16,
        color: '#777',
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

const footer = StyleSheet.create({
    footerContainer: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25,
        backgroundColor: colors.white(),
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
        elevation: 5, // Tambahkan elevation untuk shadow kontras di Android
    },
    footerItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    footerTitle: {
        fontSize: 18,
        fontFamily: fontType['CS-Book'],
        color: colors.grey(),
    },
    image: {
        marginLeft: 10,
        marginRight: 10,
        width: 30,
        height: 30,
        // borderRadius: 10,
    }
});




