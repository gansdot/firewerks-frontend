const BASE_API_URL = import.meta.env.VITE_API_BASE;

export async function fetchApi(endpoint: string, options: any = {}) {
  const token = localStorage.getItem("token");
  console.log(`${BASE_API_URL}${endpoint}`);
  const res = await fetch(`${BASE_API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : { Authorization: `` })
    },
    method: options.method || "GET",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) throw await res.json();
  return res.json();
}

export const truncateWords = (text: string, wordLimit: number) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

export function calculateDiscountedPrice(
  price: number,
  discount: number,
  isPercentage = true
) {
  if (typeof price !== "number" || isNaN(price)) return 0;
  if (!discount) return price;
  return isPercentage ? price - (price * discount) / 100 : price - discount;
}