import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    justifyContent: "center", 
    paddingVertical: 10,
  },
  scrool: {
    flex: 1, 
    backgroundColor: COLORS.GRAY
  },
  items: {
    justifyContent: "center", 
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  noItemsText: {
    color: COLORS.WHITE, 
    textAlign: 'center',
    fontSize: 16,
    marginTop: '35%', 
    fontFamily: 'Itim-Regular'
  }, 
});