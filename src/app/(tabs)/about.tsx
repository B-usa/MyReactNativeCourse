import { Text, View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import {Image} from "expo-image";

export default function About() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://tse3.mm.bing.net/th/id/OIP.cQ76_ayY67VdQMQCg3PHygHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  helloTravelerTitle: {
    color: "red",
  },
  image: {
    width: 200,
    height: 200,
  },
});
