// services/dealerService.js

export const fetchDealerProfile = async (userId) => {
  const res = await fetch(`http://localhost:5000/api/dealer/profile/${userId}`);
  if (!res.ok && res.status !== 404)
    throw new Error("Failed to fetch dealer profile");
  return res.status === 404 ? null : res.json();
};

export const saveDealerProfile = async (data, isUpdate = false) => {
  const url = isUpdate
    ? "http://localhost:5000/api/dealer/profile"
    : "http://localhost:5000/api/dealer";

  const res = await fetch(url, {
    method: isUpdate ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();
  if (!res.ok)
    throw new Error(responseData.message || "Failed to save profile");

  return responseData;
};
