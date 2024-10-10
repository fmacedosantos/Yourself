import { StyleSheet, Text, View } from "react-native";

export default function AddNewActivity() {
  return (
    <View
      style={styles.container}
    >
      <Text>Add New Activity</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
