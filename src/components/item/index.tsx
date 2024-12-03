import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import XpIcon from '../../assets/images/xp-icon.svg';
import { styles } from './styles';

interface ItemProps {
  icon: string;
  name: string;
  price: number;
}

export function Item({ icon, name, price }: ItemProps) {
  return (
    <Pressable style={styles.container}>
      <Image source={{ uri: icon }} style={styles.icon} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.priceContainer}>
        <XpIcon width={20} height={20} />
        <Text style={styles.price}>{price} Xp</Text>
      </View>
    </Pressable>
  );
}
