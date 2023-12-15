import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constant';
import { Eye, EyeSlash } from 'iconsax-react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoginDisabled, setLoginDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    let errorMessage = '';
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const userToken = await auth().currentUser.getIdToken();
      const expirationInMilliseconds = 30 * 24 * 60 * 60 * 1000; // login time 30 day
      const expirationTime = new Date().getTime() + expirationInMilliseconds;
      const dataToStore = {
        userToken,
        expirationTime,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(dataToStore));
      setLoading(false);
      navigation.navigate('MainApp');
    } catch (error) {
      setLoading(false);
      console.log('Login Error:', error.message);
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Wrong password.';
      } else if (error.code === 'auth/invalid-login') {
        errorMessage = 'Wrong email or password, please check again.';
      } else {
        errorMessage = 'An error occurred when logging in.';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const updateLoginButtonStatus = () => {
    if (email.trim() && password.trim()) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  };

  useEffect(() => {
    updateLoginButtonStatus();
  }, [email, password]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>Log in</Text>
            <Text style={styles.caption}>
              Let's log in and get full with KelPua!
            </Text>
            <View style={styles.form}>
              <View>
                <Text style={textinput.label}>Email</Text>
                <View style={textinput.container}>
                  <TextInput
                    placeholder="Enter your email address"
                    placeholderTextColor={COLORS.gray2}
                    value={email}
                    onChangeText={text => {
                      setEmail(text);
                      updateLoginButtonStatus();
                    }}
                    inputMode="email"
                    keyboardType="email-address"
                    style={textinput.text}
                  />
                </View>
              </View>
              <View>
                <Text style={textinput.label}>Password</Text>
                <View
                  style={[
                    textinput.container,
                    {
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                    },
                  ]}>
                  <TextInput
                    placeholder="Enter password"
                    placeholderTextColor={COLORS.gray2}
                    value={password}
                    onChangeText={text => {
                      setPassword(text);
                      updateLoginButtonStatus();
                    }}
                    secureTextEntry={!passwordVisible}
                    style={[textinput.text, { flex: 1 }]}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <Eye variant="Linear" color={COLORS.gray2} size={20} />
                    ) : (
                      <EyeSlash
                        variant="Linear"
                        color={COLORS.gray2}
                        size={20}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{ gap: 10 }}>
            <TouchableHighlight
              style={[
                button.container,
                {
                  backgroundColor: isLoginDisabled
                    ? COLORS.transparentPrimary
                    : COLORS.primary,
                },
              ]}
              underlayColor={COLORS.primary}
              onPress={handleLogin}
              disabled={isLoginDisabled}>
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={button.label}>LOG IN</Text>
              )}
            </TouchableHighlight>
            <View style={{ flexDirection: 'row', gap: 5, alignSelf: 'center' }}>
              <Text style={[button.label, { color: COLORS.black }]}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={[button.label, { color: COLORS.primary }]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 60,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 32,
    fontFamily: 'Poppins-ExtraBold',
    color: COLORS.black,
  },
  caption: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray2,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 40,
  },
  form: {
    gap: 20,
  },
});
const textinput = StyleSheet.create({
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.gray2,
    marginBottom: 5,
  },
  container: {
    backgroundColor: COLORS.lightGray2,
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    paddingVertical: 0,
    color: COLORS.black,
    fontFamily: 'Poppins-Regular',
  },
});
const button = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});
