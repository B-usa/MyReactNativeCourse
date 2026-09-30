import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  BottomSheet,
  Button,
  ColorPicker,
  Host,
  VStack,
} from "@expo/ui/swift-ui";

export default function ColorPickerIOS() {
  const[color, setColor] = useState("#FF6347");

  return (
    <View style={styles.container}>

      <Host>
        <ColorPicker selection={color} onSelectionChange={setColor}/>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});