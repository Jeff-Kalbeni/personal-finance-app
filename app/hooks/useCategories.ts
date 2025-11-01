import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getCategories } from "../services/categories";

interface Category {
  _id: string;
  name: string;
  type: "income" | "expense";
  icon: string;
  color: string;
  isSystem: boolean;
}

const useCategories = (type?: "income" | "expense") => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCategories();

      let filteredCategories = response.categories;
      if (type) {
        filteredCategories = response.categories.filter(
          (cat: Category) => cat.type === type
        );
      }

      setCategories(filteredCategories);
    } catch (err: any) {
      setError(err.message || "Failed to fetch categories");
      Alert.alert("Error", "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [type]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
};

export default useCategories;
