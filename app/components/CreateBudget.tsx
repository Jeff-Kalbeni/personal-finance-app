import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  View,
} from "react-native";
import { useCategories } from "../hooks/useCategories";

interface BudgetForm {
  category: string;
  amount: string;
  month: string;
}

const CreateBudget = () => {
  const [formData, setFormData] = useState<BudgetForm>({
    category: "",
    amount: "",
    month: new Date().toISOString().slice(0, 7),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const {
    categories,
    loading: categoriesLoading,
    error,
  } = useCategories("expense");

  const handleCreateBudget = async (): Promise<void> => {
    if (!formData.category) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    const validateMonth = (month: string): boolean => {
      const monthRegex = /^\d{4}-\d{2}$/;

      if (!monthRegex.test(month)) return false;

      const [, monthPart] = month.split("-");
      const monthNum = parseInt(monthPart, 10);
      return monthNum >= 1 && monthNum <= 12;
    };

    if (!validateMonth(formData.month)) {
      Alert.alert("Error", "Please enter month in YYYY-MM format");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://192.168.176.80:3003/api/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: formData.category,
          amount: parseFloat(formData.amount),
          month: formData.month + "-01",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create budget");
      }

      Alert.alert("Success", "Budget created successfully");
      setFormData({
        category: "",
        amount: "",
        month: new Date().toISOString().slice(0, 7),
      });
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to create budget");
    } finally {
      setLoading(false);
    }
  };

  if (categoriesLoading) {
    return (
      <View
        style={{ padding: 20, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" />
        <Text>Loading categories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red" }}> Error loading categories: {error}</Text>
        <Button title="Retry" onPress={() => window.location.reload} />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Create Monthly Budget</Text>

      <Picker
        selectedValue={formData.category}
        onValueChange={(value: string) =>
          setFormData({ ...formData, category: value })
        }
      >
        <Picker.Item label="Select Category" value="" />
        {categories.map((cat) => (
          <Picker.Item
            key={cat._id}
            label={`${cat.icon} ${cat.name}`}
            value={cat._id}
          />
        ))}
      </Picker>

      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={formData.amount}
        onChangeText={(text: string) =>
          setFormData({ ...formData, amount: text })
        }
      />

      <TextInput
        placeholder="Month (YYYY-MM)"
        value={formData.month}
        onChangeText={(text: string) =>
          setFormData({ ...formData, month: text })
        }
      />

      <Button
        title={loading ? "Creating..." : "Create Budget"}
        onPress={handleCreateBudget}
        disabled={loading || categories.length === 0}
      />
    </View>
  );
};

export default CreateBudget;
