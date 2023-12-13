import React, {useState, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';
import theme, {COLORS, SIZES, FONTS} from '../../constant';
import {Minus, Add} from 'iconsax-react-native';

const Order = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order</Text>
      </View>
      <Content />
    </View>
  );
};

const SwipeableListItem = ({item, onDelete}) => {
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
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: [{translateX}],
      }}>
      <View style={itemVertical.card}>
        <Image
          source={{
            uri: item.image,
          }}
          style={itemVertical.cardImage}
        />
        <View style={{flex: 1}}>
          {/* Name */}
          <Text style={itemVertical.cardTitle}>{item.name}</Text>
          {/* Price */}
          <Text style={itemVertical.cardPrice}>{item.price}</Text>
          <View style={itemVertical.inputStepper}>
            <Minus size="24" color={COLORS.gray} />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: COLORS.black,
                fontSize: 16,
                top: 2,
              }}>
              1
            </Text>
            <TouchableOpacity>
              <Add size="24" color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const Content = () => {
  const [order, setOrder] = useState([
    {
      id: '1',
      name: 'Ayam Teriyaki',
      price: 'Rp24.000',
      image:
        'https://cdns.klimg.com/merdeka.com/i/w/news/2021/11/29/1381128/content_images/670x335/20211129112556-2-7-cara-membuat-ayam-teriyaki-enak-dan-praktis-cocok-untuk-menu-makan-siang-004-ayu-isti.jpg',
    },
    {
      id: '2',
      name: 'Ayam Geprek',
      price: 'Rp21.000',
      image:
        'https://cdns.klimg.com/merdeka.com/i/w/news/2021/11/29/1381128/content_images/670x335/20211129112557-3-cara-bikin-ayam-geprek-003-khulafa-pinta-winastya.jpg',
    },
    {
      id: '3',
      name: 'Sate Lilit Ayam',
      price: 'Rp29.000',
      image:
        'https://akcdn.detik.net.id/community/media/visual/2020/09/17/sate-lilit-ayam-khas-bali-1.jpeg?w=700&q=90',
    },
  ]);

  const handleDeleteItem = id => {
    // Filter untuk menghapus item
    const updatedOrder = order.filter(item => item.id !== id);
    setOrder(updatedOrder);
  };

  return (
    <FlatList
      data={order}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <SwipeableListItem
          item={item}
          onDelete={() => handleDeleteItem(item.id)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
  },
});

const itemVertical = StyleSheet.create({
  card: {
    width: 345,
    height: 130,
    flexDirection: 'row',
    marginHorizontal: 25,
    marginBottom: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    marginTop: 10,
    marginHorizontal: 10,
  },
  cardPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: COLORS.primary,
    marginHorizontal: 10,
  },
  inputStepper: {
    height: 40,
    width: 100,
    marginLeft: 110,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingRight: 11,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Order;
