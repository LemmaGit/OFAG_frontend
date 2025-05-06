import { URL } from "./utilFun";

export async function updateProfileInfo(userInfo) {
  const res = await fetch(`${URL}/patrons/update-profile`, {
    method: "PATCH",
    body: userInfo,
    credentials: "include",
  });

  return await res.json();
}
export async function changePassword(data) {
  const res = await fetch(`${URL}/patrons/change-password`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
}
export async function getGoogleBooks(queries) {
  const res = await fetch(`${URL}/patrons/online-books-list`, {
    method: "POST",
    body: JSON.stringify(queries),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return await res.json();
}
export async function getGoogleBook(id) {
  const res = await fetch(`${URL}/patrons/online-book/${id}`, {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}
export async function getCheckedoutBooks() {
  const res = await fetch(`${URL}/patrons/checkedout-books`, {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}
export async function getOverdueBooks() {
  const res = await fetch(`${URL}/patrons/overdues`, {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}
export async function getReservations() {
  const res = await fetch(`${URL}/patrons/reservation`, {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}
export async function removeReservation(id) {
  const res = await fetch(`${URL}/patrons/reservation/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return await res.json();
}
export async function placeReservation(bookId) {
  const res = await fetch(`${URL}/patrons/reservation/`, {
    method: "POST",
    body: JSON.stringify({ bookId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return await res.json();
}
export const getBooks = async () => {
  const res = await fetch(`${URL}/books/book-list`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
export const getBooksInReservationOrCheckout = async () => {
  const res = await fetch(`${URL}/patrons/check-for-books`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
export const getBookDetails = (id) => async () => {
  const res = await fetch(`${URL}/books/${id}`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
export const getRequest = async () => {
  const res = await fetch("${URL}/patrons/requests", {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
};
export async function submitRequest(data) {
  const res = await fetch(`${URL}/patrons/submit-request`, {
    method: "POST",
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return await res.json();
}

/* 
export async function login(userInfo) {
  console.log(userInfo);
  const res = await fetch(`${URL}/patrons/signin`, {
    method: "POST",
    body: JSON.stringify(userInfo),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
}
  */
