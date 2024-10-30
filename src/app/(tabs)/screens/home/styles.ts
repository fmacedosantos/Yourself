import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.GRAY,
    },
    scrollContainer: {
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      flexGrow: 1,
    },
    noActivitiesText: {
      color: COLORS.WHITE, 
      textAlign: 'center',
      fontSize: 16,
      marginTop: '35%', 
      fontFamily: 'Itim-Regular'
    },    
    verMais: {
      color: '#00AEEF',
      fontSize: 16,
      marginVertical: 10,
      textAlign: 'center',
      fontFamily: 'Itim-Regular' 
    },
    summaryContainer: {
      width: '100%',
      justifyContent: 'flex-start',
      marginBottom: 10,
      paddingHorizontal: 0,
    },
  });