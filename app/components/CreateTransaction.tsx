import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, View } from "react-native";
import useCategories from "../hooks/useCategories";

interface TransactionForm {
  category: string;
  description: string;
  type: "income" | "expense";
  amount: string;
  date: string;
}

const CreateTransaction = () => {
  const [formData, setFormData] = useState<TransactionForm>({
    category: "",
    description: "",
    type: "expense",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { categories, loading: categoriesLoading } = useCategories(
    formData.type
  );

  const handleTypeChange = (type: "income" | "expense") => {
    setFormData({ ...formData, type, category: "" });
  };

  const handleCreateTransaction = async (): Promise<void> => {
    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://https://192.168.176.80:3003/api/transactions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: formData.category,
            description: formData.description,
            type: formData.type,
            amount: parseFloat(formData.amount),
            date: formData.date,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      alert("Transaction created successfully");
      setFormData({
        category: "",
        description: "",
        type: "expense",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (err: any) {
      alert("Error creating transaction: " + err.message);
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
        <Text>Loading categories... </Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Create Transaction</Text>

      <Picker
        selectedValue={formData.type}
        onValueChange={(value: "income" | "expense") => handleTypeChange(value)}
      >
        <Picker.Item label="Expense" value="expense" />
        <Picker.Item label="Income" value="income" />
      </Picker>

      <Picker
        selectedValue={formData.category}
        onValueChange={(value: string) =>
          setFormData({ ...formData, category: value })
        }
      >
        <Picker.Item label={`Select ${formData.type} Category`} value="" />
        {categories.map((cat) => (
          <Picker.Item
            key={cat._id}
            label={`${cat.icon} ${cat.name}`}
            value={cat._id}
          />
        ))}
      </Picker>

      <TextInput
        placeholder="Description"
        value={formData.description}
        onChangeText={(text: string) =>
          setFormData({ ...formData, description: text })
        }
      />

      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={formData.amount}
        onChangeText={(text: string) =>
          setFormData({ ...formData, amount: text })
        }
      />

      <Button
        title="Create Transaction"
        onPress={handleCreateTransaction}
        disabled={loading}
      />
    </View>
  );
};

export default CreateTransaction;
