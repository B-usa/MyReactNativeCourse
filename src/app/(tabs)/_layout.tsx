import {NativeTabs} from "expo-router/unstable-native-tabs";
import {Ionicons} from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <NativeTabs>
        <NativeTabs.Trigger name="index">
            <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon 
                sf={"house"}     // iOS
                md={"home"}      // Android
            />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="about">
            <NativeTabs.Trigger.Label>About</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon 
                sf={"info.circle"} //iOS: Valid SF Symbol
                md={"info"}        // Android: Valid Material Design icon
            />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="profile">
            <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon 
                sf={"person"}    // iOS
                md={"person"}    // Android
            />
        </NativeTabs.Trigger>
    </NativeTabs>
  );
}