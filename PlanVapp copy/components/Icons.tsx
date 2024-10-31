import React from 'react';
import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type IconsProps = PropsWithChildren<{
  name: string;
  size: number;
  color: string;
}>;

const Icons: React.FC<IconsProps> = ({ name, size, color }) => {
  switch (name) {
    case 'bed':
      return <Ionicons name="bed-outline" size={size} color={color} />;
    case 'airplane':
      return <Ionicons name="ios-airplane-outline" size={size} color={color} />;
    case 'car':
      return <Ionicons name="car-outline" size={size} color={color} />;
    case 'uber':
      return <FontAwesome5 name="uber" size={size} color={color} />;
    default:
      return null; // Return null for unrecognized icon names
  }
};

export default Icons;
