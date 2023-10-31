import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { fontType, colors } from '../../../src/theme';

export default function Detail() {
    return (
        <View style={styles.container}>
            <Header />
            {/* Konten Detail */}
            <ScrollView>
                <DetailPicture />
                <Information />
                <Description />
            </ScrollView>
            <Footer />
        </View>
    );
}

const Header = () => {
    return (
        <View style={header.headerContainer}>
            <TouchableOpacity style={header.iconContainer} activeOpacity={0.5} onPress={() => { }}>
                <Image
                    style={header.icon}
                    source={require('../../assets/images/previous.png')} // Gantilah dengan path gambar ikon "back"
                />
            </TouchableOpacity>
            <Text style={header.title}>Detail</Text>
            <TouchableOpacity style={header.iconContainer}>
                <Image
                    style={header.icon}
                    source={require('../../assets/images/share.png')} // Gantilah dengan path gambar ikon "share"
                />
            </TouchableOpacity>
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

const Description = () => {
    return (
        <View style={description.container}>
            <Text style={description.title}>Pemandangan Indah di Pulau Raja Ampat</Text>
            <Text style={description.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                eget felis eu nulla tincidunt tincidunt. Pellentesque habitant
                morbi tristique senectus et netus et malesuada fames ac turpis
                egestas. Sed auctor, justo vitae vestibulum vestibulum, elit
                urna hendrerit massa, sed tincidunt mauris eros vitae sapien.
                Nulla facilisi. Sed et nisl auctor, ultricies sapien eget,
                aliquet nibh. Nulla facilisi. Sed et nisl auctor, ultricies
                sapien eget, aliquet nibh. Nulla facilisi. Sed et nisl auctor,
                ultricies sapien eget, aliquet nibh.
            </Text>
            <Text style={description.text}></Text>
            <Text style={description.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                eget felis eu nulla tincidunt tincidunt. Pellentesque habitant
                morbi tristique senectus et netus et malesuada fames ac turpis
                egestas. Sed auctor, justo vitae vestibulum vestibulum, elit
                urna hendrerit massa, sed tincidunt mauris eros vitae sapien.
                Nulla facilisi. Sed et nisl auctor, ultricies sapien eget,
                aliquet nibh. Nulla facilisi. Sed et nisl auctor, ultricies
                sapien eget, aliquet nibh. Nulla facilisi. Sed et nisl auctor,
                ultricies sapien eget, aliquet nibh.
            </Text>
        </View>
    );
}

const Footer = () => {
    return (
        <View style={footer.footerContainer}>
            <View style={footer.footerItem}>
                <Image style={footer.image} source={require('../../assets/images/iconHouse.png')} />
            </View>
            <View style={footer.footerItem}>
                <Image style={footer.image} source={require('../../assets/images/iconLikeNavbarFilled.png')} />
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

