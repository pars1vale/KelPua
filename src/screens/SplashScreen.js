import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fontType, colors } from '../theme';
import { StackActions } from '@react-navigation/native';

//class componen
class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
                <Text style={styles.title}>KelPua</Text>
                <Text style={styles.subtitle}>Keliling Papua Kemanapun kamu mau</Text>
            </View>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace('HomeScreen'));
        }, 3000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        // Style your logo as needed, for example:
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#4A90E2',
        fontFamily: fontType['Pjs-ExtraBold'],
    },
    subtitle: {
        fontSize: 16,
        marginTop: 5,
        color: '#4A90E2',
        fontFamily: fontType['CS-Book'],
    },
});

export default SplashScreen;
