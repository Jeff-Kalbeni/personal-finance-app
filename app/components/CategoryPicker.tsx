import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator, Text, View } from "react-native";
import { Category, useCategories } from "../hooks/useCategories";

interface CategoryPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  type?: "income" | "expense";
  placeholder?: string;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedValue,
  onValueChange,
  type,
  placeholder = "Select Category",
}) => {
  const { categories, loading, error } = useCategories(type);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="small" />
        <Text>Loading categories...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={{ color: "red" }}>Error loading categories</Text>;
  }

  return (
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      <Picker.Item label={placeholder} value="" />
      {categories.map((cat: Category) => (
        <Picker.Item
          key={cat._id}
          label={`${cat.icon} ${cat.name}`}
          value={cat._id}
        />
      ))}
    </Picker>
  );
};

export default CategoryPicker;
