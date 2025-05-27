export const URL = import.meta.env.VITE_API_BASE_URL;
// "http://localhost:7000/api";

export function formatDateToDDMMYYYY(isoDateString) {
  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
export function getDayDifference(dateStr, flip = false) {
  const date = new Date(dateStr);
  let diffInTime;
  if (!flip) diffInTime = Math.abs(new Date() - date);
  else diffInTime = Math.abs(date - new Date());
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  return diffInDays;
}
export function getOrdinalSuffix(num) {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}
export function getPossibleConditions(initialConditions) {
  if (initialConditions === "new") return ["fair", "poor", "lost"];
  if (initialConditions === "fair") return ["poor", "lost"];
  if (initialConditions === "poor") return ["lost"];
  return [];
}
export const login = async (userInfo) => {
  const res = await fetch(`${URL}/login`, {
    method: "POST",
    body: JSON.stringify(userInfo),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
};
export async function logout() {
  const res = await fetch(`${URL}/logout`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
}
export async function checkAuthorization() {
  const res = await fetch(`${URL}/check-auth`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) return null;
  // return { error: "User is not logged in" };
  return await res.json();
}

export async function checkToken() {
  const res = await fetch(`${URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
}

export async function getUploadedPdfs() {
  const res = await fetch(`${URL}/uploaded-books/pdfs`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
}