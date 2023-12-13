import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft2, SearchNormal1, Add} from 'iconsax-react-native';
import theme, {COLORS, SIZES, FONTS} from '../../constant';

const Search = () => {
  const [searchSentc, setSearchSentc] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar searchSentc={searchSentc} setSearchSentc={setSearchSentc} />
      </View>
    </View>
  );
};

const SearchBar = ({searchSentc, setSearchSentc}) => {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={search.container}>
      <Animated.View
        style={{
          transform: [
            {
              scale: animation.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [0, 1.2, 1],
              }),
            },
          ],
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft2 size="24" color={COLORS.black} />
        </TouchableOpacity>
      </Animated.View>
      <View style={search.bar}>
        <SearchNormal1
          size="21"
          color={searchSentc ? COLORS.black : COLORS.gray}
        />
        <TextInput
          style={searchSentc ? search.textinput : {...search.textinput, top: 3}}
          placeholder="Find some food..."
          cursorColor={COLORS.primary}
          placeholderTextColor={COLORS.gray}
          value={searchSentc}
          onChangeText={setSearchSentc}
          borderWidth={0}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoFocus={true}
        />
        {searchSentc && (
          <TouchableOpacity onPress={() => setSearchSentc('')}>
            <Add
              size="26"
              color={COLORS.black}
              variant="Linear"
              style={{transform: [{rotate: '45deg'}]}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 24,
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    top: 0,
    zIndex: 1000,
    right: 0,
    left: 0,
    backgroundColor: COLORS.white,
  },
});
const search = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    elevation: 8,
  },
  bar: {
    width: 305,
    height: 50,
    gap: 5,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray2,
    borderRadius: 25,
  },
  textinput: {
    width: 220,
    ...FONTS.body3,
    color: COLORS.black,
  },
});
