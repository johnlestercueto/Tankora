// services/shopService.js

export const fetchShops = async () => {
  const res = await fetch("http://localhost:5000/api/shops");
  if (!res.ok) throw new Error("Failed to fetch shops");
  return res.json();
};

export const fetchDealerShop = async (dealerId) => {
  const res = await fetch(`http://localhost:5000/api/shops/dealer/${dealerId}`);
  if (!res.ok) return null;
  return res.json();
};

export const saveShop = async (shopData, shopId) => {
  const url = shopId
    ? `http://localhost:5000/api/shops/${shopId}`
    : `http://localhost:5000/api/shops`;

  const res = await fetch(url, {
    method: shopId ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shopData),
  });

  if (!res.ok) throw new Error("Failed to save shop");
  return res.json();
};
