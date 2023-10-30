import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fontType, colors } from '../theme';

function MostPopular() {
    const [isViewAllClicked, setIsViewAllClicked] = useState(false);

    return (
        <View style={styles.containerMostPopular}>
            <Text style={styles.titleMostPopular}>Most Popular</Text>
            <TouchableOpacity onPress={() => setIsViewAllClicked(!isViewAllClicked)}>
                <Text style={styles.viewAllMostPopular}>View All</Text>
            </TouchableOpacity>
            {isViewAllClicked && (
                <Text>Button "View All" telah diklik!</Text>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
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

export default MostPopular;
