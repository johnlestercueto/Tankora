// services/customerService.js

export const fetchCustomerById = async (customerId) => {
  const res = await fetch(`http://localhost:5000/api/customers/${customerId}`);
  if (!res.ok) throw new Error("Failed to fetch customer");
  return res.json();
};

export const fetchCustomerProfile = async (userId) => {
  const res = await fetch(`http://localhost:5000/api/customers/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch customer profile");
  return res.json();
};

export const saveCustomerProfile = async (userId, profileData) => {
  const method = userId ? "PUT" : "POST";
  const url = userId
    ? `http://localhost:5000/api/customers/${userId}`
    : "http://localhost:5000/api/customers";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...profileData, userId }),
  });

  if (!res.ok) throw new Error("Failed to save profile");
  return res.json();
};
