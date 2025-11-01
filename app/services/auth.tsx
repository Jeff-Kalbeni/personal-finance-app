export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<{ message: string }> => {
  return fetch("https://trackfin.onrender.com/api/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
