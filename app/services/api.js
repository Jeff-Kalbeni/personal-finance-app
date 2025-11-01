import { isOnline } from "../utils/network";

//const API_BASE_URL = 'https://api.example.com';
// Replace with your API base URL

const generateIdempotencyKey = () => {
  return `key_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const createTransaction = async (transactionData) => {
  const online = await isOnline();
  const idempotencyKey = generateIdempotencyKey();

  await AsyncStorage.setItem("last_idempotency_key", idempotencyKey);

  return apiCall("/api/transactions", {
    method: "POST",
    body: JSON.stringify({
      ...transactionData,
      isOnline: online,
      idempotencyKey,
    }),
  });
};

const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if ((!response.ok && options, method === "POST")) {
      const retryKey = await AsyncStorage.getItem("last_idempotency_key");

      if (retryKey && options.body) {
        const body = JSON.parse(options.body);
        return await fetch(url, {
          ...options,
          body: JSON.stringify({ ...body, idempotencyKey: retryKey }),
        });
      }
    }
    return response;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }

  // const defaultOptions = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     ...options.headers,
  //   },
  // };

  // // For GET requests: add isOnline as query parameter
  // if (options.method === "GET" || !options.method) {
  //   const separator = URL.includes("?") ? "&" : "?";
  //   url = `${url}${separator}isOnline=${online}`;
  // }
  // // For POST/PUT/DELETE: add isOnline to body
  // else if (options.body) {
  //   options.body = JSON.stringify({
  //     ...JSON.parse(options.body),
  //     isOnline: online,
  //   });
  // }

  // const response = await fetch(url, { ...defaultOptions, ...options });
  // return response.json();
};

export default createTransaction;

/*
  // Usage examples:
export const createTransaction = (transactionData) => {
  return apiCall('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(transactionData),
  });
};

export const getTransactions = () => {
  return apiCall('/api/transactions'); // GET is default
};

export const updateTransaction = (id, updates) => {
  return apiCall(`/api/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
};
*/
