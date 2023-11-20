import React from 'react';
import { TextInput, Text, View, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { fontType, colors } from '../../theme';

export default function Search() {
    return (
        <View style={styles.container}>
            <Header />
            {/* Konten Detail */}
            <SearchBar />
            <ScrollView>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    <CategoryItem title="Trending" />
                    <CategoryItem title="Recently Upload" />
                    <CategoryItem title="Bookmark" />
                    <CategoryItem title="Nearest" />
                    <CategoryItem title="Recommendation" />
                </ScrollView>
                {/* <DetailPicture /> */}
                <CardPopular />
            </ScrollView>
            <Footer />
        </View>
    );
}

const Header = () => {
    return (
        <View style={header.headerContainer}>
            <TouchableOpacity style={header.iconContainer} activeOpacity={0.5} onPress={() => { }}>
                {/* <Image
                    style={header.icon}
                    source={require('../../assets/images/previous.png')} // Gantilah dengan path gambar ikon "back"
                /> */}
            </TouchableOpacity>
            <Text style={header.title}>Article</Text>
            <TouchableOpacity style={header.iconContainer}>
                {/* <Image
                    style={header.icon}
                    source={require('../../assets/images/share.png')} // Gantilah dengan path gambar ikon "share"
                /> */}
            </TouchableOpacity>
        </View>
    );
};

const SearchBar = () => {
    return (
        <View style={searchBar.searchBarContainer}>
            <View style={searchBar.searchIconContainer}>
                {/* <Text style={searchBar.searchIcon}>🔍</Text> */}
                <Image source={require('../../assets/images/iconSearch.png')} style={searchBar.searchIcon} />
            </View>
            <TextInput
                style={searchBar.searchInput}
                placeholder="Search Keyboard..."
                placeholderTextColor="grey"
            />
        </View>
    );
};

const CategoryItem = ({ title }) => {
    return (
        <View style={categoryItem.containerCategory}>
            <View style={categoryItem.categoryItem}>
                <Text style={categoryItem.categoryTitle}>{title}</Text>
            </View>
        </View>
    );
};

const DetailPicture = () => {
    return (
        <View style={detailPicture.Container}>
            <Image source={require('../../assets/images/gambar1.jpg')} style={detailPicture.image} />
        </View>
    );
}

const Information = () => {
    return (
        <View style={information.container}>
            <View style={information.leftContent}>
                <Image
                    source={require('../../assets/images/iconLocation.png')} // Ganti dengan path gambar ikon "location"
                    style={information.icon}
                />
                <Text style={information.locationText}>raja ampat, west papua</Text>
            </View>
            <View style={information.rightContent}>
                <View style={information.infoItem}>
                    <Image
                        source={require('../../assets/images/iconViews.png')} // Ganti dengan path gambar ikon "views"
                        style={information.icon}
                    />
                    <Text style={information.infoText}>1.4K</Text>
                </View>
                <View style={information.infoItem}>
                    <Image
                        source={require('../../assets/images/iconLikFilled.png')} // Ganti dengan path gambar ikon "like"
                        style={information.icon}
                    />
                    <Text style={information.infoText}>100</Text>
                </View>
            </View>
        </View>
    );
}

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
                <Image style={footer.image} source={require('../../assets/images/iconLikeNavbar.png')} />
            </View>

            <View style={footer.footerItem}>
                <Image style={footer.image} source={require('../../assets/images/iconSchedule.png')} />
            </View>
            <View style={footer.footerItem}>
                <Image style={footer.image} source={require('../../assets/images/iconProfile.png')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white(),
    },
});

const header = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        // backgroundColor: colors.white(),
        backgroundColor: colors.white(),
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
        fontFamily: fontType['Pjs-ExtraBold'],
        color: colors.black(),
    },
});

const searchBar = StyleSheet.create({
    searchBarContainer: {
        marginTop: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
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

const categoryItem = StyleSheet.create({
    containerCategory: {
        flexDirection: 'row',
        paddingTop: 30,
        paddingLeft: 30,
        paddingBottom: 1,
        marginBottom: 35,
    },
    categoryItem: {
        marginRight: 10,
    },
    categoryTitle: {
        fontSize: 18,
        fontFamily: fontType['CS-Book'],
        color: colors.lighGrey(),
    },
});

const detailPicture = StyleSheet.create({
    Container: {
        height: 300,
        backgroundColor: colors.white(),
    },
    image: {
        width: 438,
        height: 300,
        marginLeft: 33,
        marginRight: 33,
        borderRadius: 20,
    },
});

const information = StyleSheet.create({
    container: {
        paddingTop: 40,
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
        color: colors.black(),
        fontSize: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    infoText: {
        color: colors.black(),
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
        fontFamily: fontType['Pjs-ExtraBold'],
        color: colors.black(),
        marginBottom: 10,
    },
    text: {
        lineHeight: 26,
        fontSize: 16,
        fontFamily: fontType['CS-Book'],
        color: colors.grey(),
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

