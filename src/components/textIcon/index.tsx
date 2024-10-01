import { COLORS } from '@/src/constants/Colors';
import { StyleSheet, Text } from 'react-native';

interface TextIconProps {
  isAbsolute: boolean
  top?: number
  margin?: number
}

export function TextIcon({isAbsolute, top, margin}: TextIconProps) {
  let styles
  if (isAbsolute == true) {
    styles = StyleSheet.create({
      text: {
        fontSize: 50,
        position: 'absolute',
        top: top,
        fontWeight: 'bold',
        color: COLORS.WHITE
      }
    })
  } else {
    styles = StyleSheet.create({
      text: {
        fontSize: 50,
        marginBottom: margin,
        fontWeight: 'bold',
        color: COLORS.WHITE
      }
    })
  }
 return (
   <Text
    style={[styles?.text]}
   >
    Y🔥ourself
   </Text>
  );
}
