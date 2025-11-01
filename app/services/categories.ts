import { getToken } from "../utils/auth.js";

export interface Category {
  _id: string;
  name: string;
  type: "income" | "expense";
  icon: string;
  color: string;
  isSystem: boolean;
}

export const getCategories = async () => {
  const token = await getToken();
  const response = await fetch("https://192.168.176.80:3003/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export const createCategory = async (
  categoryData: Omit<Category, "_id" | "isSystem">
) => {
  const token = await getToken();
  const response = await fetch("https://192.168.176.80:3003/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create category");
  }

  return response.json();
};
