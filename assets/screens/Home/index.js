import React, { useState, useCallback, } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  HambergerMenu,
  Bill,
  SearchNormal1,
  ArrowDown2,
  ProfileCircle,
  Wallet,
  Edit,
  Notification,
  SearchNormal,
} from 'iconsax-react-native';
import theme, { COLORS, SIZES, FONTS } from '../../constant';
import { categoryList, menuList } from '../../constant';
import { destinationList } from '../../constant/dummyData';
import axios from 'axios';


export default function Homepage() {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <Header />
      <SearchBar />
      <ScrollView>
        <Content />
        <MostPopular />
        {destinationList.map(item => (
          <CardPopular key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.helloText}>Hello,</Text>
        <Text style={styles.nameUser}>MUHAMMAD</Text>
      </View>
      <View style={styles.notifIcon}>
        <Notification
          color={COLORS.primary}
          size={24}
        />
      </View>
    </View>
  );
};

const SearchBar = () => {
  return (
    <View style={searchBar.searchBarContainer}>
      <View style={searchBar.searchIconContainer}>
        <SearchNormal
          color={COLORS.primary}
          size={18}
        />
      </View>
      <TextInput
        style={searchBar.searchInput}
        placeholder="Find Pleace.."
        placeholderTextColor="grey"
      />
    </View>
  );
};

const Content = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [destinationData, setDestinationData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getDataDestination = async () => {
    try {
      const response = await axios.get(
        'https://6571dd06d61ba6fcc013cf5b.mockapi.io/kelpua/Destination',
      );
      setDestinationData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getDataDestination();
      setRefreshing(false);
    }, 1500);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDataDestination();
    }, []),
  );
  return (
    <View>

      <View style={{ marginTop: 10 }}>
        <FlatListCategory />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}
      // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {destinationList.map(item => (
          <CardDestination key={item.id} item={item} />
        ))}

        {loading ? (
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        ) : (
          destinationData.map((item, index) => <CardDestination item={item} key={index} />)
        )}
      </ScrollView>

    </View>
  );
};

//category Destination
const ItemCategory = ({ item, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={category.item}>
        <Text style={{ ...category.title, color }}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
};
const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({ item }) => {
    const color = item.id === selected ? COLORS.black : COLORS.primary;
    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
      />
    );
  };
  return (
    <FlatList
      data={categoryList}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({ ...item })}
      contentContainerStyle={{ paddingHorizontal: 18 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const MostPopular = ({ isViewAllClicked, toggleViewAll }) => {
  return (
    <View style={mostPopular.containerMostPopular}>
      <Text style={mostPopular.titleMostPopular}>Most Popular</Text>
      <TouchableOpacity onPress={toggleViewAll}>
        <Text style={mostPopular.viewAllMostPopular}>View All</Text>
      </TouchableOpacity>
      {isViewAllClicked && (
        <Text>Button "View All" telah diklik!</Text>
      )}
    </View>
  );
}

//card Destination
const CardDestination = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={cardDestination.cardContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('DestinationDetail', { destinationId: item.id })}>
        <View style={styles.cardContent}>
          <Image source={{ uri: item.image, }} style={cardDestination.cardImage} />
          <View style={cardDestination.cardInfo}>
            <Text style={cardDestination.cardTitle}>{item.name}</Text>
            <Text style={cardDestination.cardDescription}>{item.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

//card popular vertikal
const CardPopular = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={popularCard.cardContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('DestinationDetail', { destinationId: item.id })}>
        <View style={popularCard.content}>
          <Image source={{ uri: item.image, }} style={popularCard.image} />
          <View style={popularCard.cardInfo}>
            <Text style={popularCard.title}>{item.name}</Text>
            <Text style={popularCard.location}>{item.location}</Text>
            <View style={popularCard.ratingContainer}>
              <Text style={popularCard.ratingText}>{item.rating}</Text>
            </View>
          </View>
        </View>

      </TouchableOpacity>
    </View>
  );
};


const cardDestination = StyleSheet.create({
  cardContainer: {
    width: 270,
    height: 410,
    marginTop: 0,
    marginBottom: 15,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  cardTitle: {
    fontSize: 20,
    // fontFamily: fontType['CS-Book'],
    fontWeight: 'bold',
    color: COLORS.black,
    padding: 10,
  },
  cardDescription: {
    fontSize: 14,
    // fontFamily: fontType['CS-Book'],
    color: COLORS.gray,
    padding: 10,
  },
  // likeIcon: {
  //   width: 30,
  //   height: 30,
  // },
  // likeIconFilled: {
  //   width: 30,
  //   height: 30,
  //   opacity: 0.75,
  // },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  text: {
    color: COLORS.white,
    ...FONTS.h3,
    paddingTop: 15,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.white,
  },
  textContainer: {
    flexDirection: 'column',
    left: 15,
  },
  helloText: {
    fontSize: 18,
    // fontFamily: fontType['CS-Book'],
    color: COLORS.gray,
  },
  nameUser: {
    fontSize: 24,
    // fontFamily: fontType['Pjs-ExtraBold'],
    color: COLORS.black,
  },
  notifIcon: {
    position: 'absolute',
    right: 20,
  },
});

const searchBar = StyleSheet.create({
  searchBarContainer: {
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 50,
    marginRight: 20,
    marginBottom: 35,
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

const category = StyleSheet.create({
  item: {
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,

  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.grey,
  },
});

const mostPopular = StyleSheet.create({
  containerMostPopular: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  titleMostPopular: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  viewAllMostPopular: {
    fontSize: 16,
    color: 'blue',
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInfo: {
    marginLeft: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  title: {

    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  location: {
    // fontFamily: fontType['CS-Book'],
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
