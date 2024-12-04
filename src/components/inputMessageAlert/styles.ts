import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertBox: {
    width: '80%',
    backgroundColor: COLORS.GRAY,
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.WHITE,
    marginBottom: 10,
    fontFamily: 'Itim-Regular'
  },
  message: {
    fontSize: 16,
    color: COLORS.WHITE,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: 'Itim-Regular'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  singleButtonContainer: {
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: "center",
  },
  singleButton: {
    backgroundColor: COLORS.ORANGE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  dualButton: {
    backgroundColor: COLORS.RED,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: COLORS.ORANGE
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'Itim-Regular'
  },
  inputAlertContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: COLORS.RED,
    fontSize: 14,
    marginTop: 5,
  },
});
