import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return; 
        }

        if (password.length < 6) { 
            Alert.alert("Error", "Password must be at least 6 characters");
            return; 
        }

        setIsLoading(true);
        try {
            await signIn(email, password);
            router.push("/(tabs)");
        } catch (error: any) {
            console.error(error);
            Alert.alert("Error", error.message || "Failed to sign in. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView 
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Text style={styles.title}>
                            Welcome to Login Screen
                        </Text>
                        <Text style={styles.subtitle}>
                            Sign In to Continue
                        </Text>
                        
                        <View style={styles.form}>
                            <TextInput 
                                placeholder="Email..." 
                                placeholderTextColor={"#999"}
                                keyboardType="email-address"
                                autoComplete="email"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                            />
                            <TextInput 
                                placeholder="Password..." 
                                placeholderTextColor={"#999"}
                                autoComplete="password"
                                secureTextEntry
                                autoCapitalize="none"
                                value={password}
                                onChangeText={setPassword}
                                style={styles.input}
                                returnKeyType="done"
                                onSubmitEditing={handleLogin}
                            />
                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                {isLoading ? (
                                    <ActivityIndicator size={24} color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>
                                        Sign In
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.linkButton} onPress={() => router.push("/(auth)/signup")}>
                                <Text style={styles.linkButtonText}>
                                    Don't have an account?
                                </Text>
                                <Text style={styles.linkButtonTextBold}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Changed from 'content' to 'scrollContent' to work with ScrollView
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: "#666",
  },
  form: {
    width: "100%",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0" // Fixed missing #
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 24,
    alignItems: "center",
  },
  linkButtonText: {
    color: "#666",
    fontSize: 14,
  },
  linkButtonTextBold: {
    fontWeight: "600",
    color: "#000",
  },
});