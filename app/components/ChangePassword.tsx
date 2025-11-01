import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import changePassword from "../services/auth";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const [formData, setFormData] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await changePassword(formData.currentPassword, formData.newPassword);

      Alert.alert("Success", "Password changed successfully");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Current Password"
        secureTextEntry
        value={formData.currentPassword}
        onChangeText={(text: string) =>
          setFormData({ ...formData, currentPassword: text })
        }
      />
      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={formData.newPassword}
        onChangeText={(text: string) =>
          setFormData({ ...formData, newPassword: text })
        }
      />
      <TextInput
        placeholder="Confirm New Password"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(text: string) =>
          setFormData({ ...formData, confirmPassword: text })
        }
      />

      <Button
        title={loading ? "Changing..." : "Change password"}
        onPress={handleChangePassword}
        disabled={loading}
      />
    </View>
  );
};

export default ChangePassword;
