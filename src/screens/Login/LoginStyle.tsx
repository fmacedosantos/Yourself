import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#373435",
  },
  boxTop: {
    height: Dimensions.get("window").height / 20, // Reduziu a altura para 1/5 da tela
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  boxMid: {
    height: Dimensions.get("window").height / 4,
    width: "100%",
    paddingHorizontal: 37,
    alignItems: "center", 
  },
  boxBottom: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
    backgroundColor: "green",
    alignItems: "center", 
  },
  text: {
    fontWeight: "bold",
    marginTop: -250,
    fontSize: 50,
    color: "white",
  },
  titleInput: {
    marginLeft: 10, 
    color: "white",
    marginTop: 20,
  },
  BoxInput: {
    width: "60%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    backgroundColor: "white",
  },
  input: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  buttonEntrar: {
    width: "60%",
    height: "100%",
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "orange",
    color: "white",
    fontSize: 30,
  },
  buttonCadastrar: {
    width: "60%",
    height: "100%",
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#373435",
    color: "white",
    borderColor: "white",
    fontSize: 30,
  },
  esqueceu: {
    fontSize: 20,
    color: "white",
    marginTop: 200,
  },
  senha: {
    color: "orange",
    textDecorationLine : 'none',
  },
});