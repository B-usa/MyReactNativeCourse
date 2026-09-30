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



export default function SignUpScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { signUp } = useAuth();

    const handleSignUp = async () => {
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
            // Only pass email and password now
            await signUp(email, password);
            router.push("/(auth)/onboarding");
        } catch (error: any) {
            console.error(error);
            Alert.alert("Error", error.message || "Failed to sign up. Please try again.");
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
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Sign In to Get Started</Text>
                        
                        <View>
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
                                value={password}
                                onChangeText={setPassword}
                                style={styles.input}
                                returnKeyType="done" 
                                onSubmitEditing={handleSignUp} 
                            />
                            
                            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                                {isLoading ? (
                                    <ActivityIndicator size={24} color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.linkButton}>
                                <Text style={styles.linkButtonText}>Already have an account?</Text>
                                <Text style={styles.linkButtonTextBold} onPress={() => router.push("/(auth)/login")}>
                                    Sign In
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
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 40, color: "#666" },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0"
  },
  button: { backgroundColor: "#000", borderRadius: 12, padding: 16, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  linkButton: { marginTop: 24, alignItems: "center" },
  linkButtonText: { color: "#666", fontSize: 14 },
  linkButtonTextBold: { fontWeight: "600", color: "#000" },
});