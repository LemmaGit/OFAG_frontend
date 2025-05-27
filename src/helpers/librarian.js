import { URL } from "./utilFun";
export const getPatrons = async () => {
  const res = await fetch(`${URL}/librarians/all-patrons`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
export const removePatron = async (id) => {
  const res = await fetch(`${URL}/librarians/remove-patron`, {
    method: "PATCH",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
};
export const searchPatrons = async (searchQuery) => {
  const res = await fetch(
    `${URL}/librarians/search-patrons?searchQuery=${searchQuery}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return await res.json();
};
export const searchBooks = async (searchQuery) => {
  const res = await fetch(
    `${URL}/librarians/search-books?searchQuery=${searchQuery}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return await res.json();
};
export const getHolds = async () => {
  const res = await fetch(`${URL}/librarians/holds`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
export const renew = async ({ patronId, bookId }) => {
  const res = await fetch(`${URL}/librarians/renew`, {
    method: "PATCH",
    body: JSON.stringify({ patronId, bookId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
};
export const checkin = async (data) => {
  const res = await fetch(`${URL}/librarians/checkin`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
};
export const checkout = async ({ patronId, bookId }) => {
  const res = await fetch(`${URL}/librarians/checkout`, {
    method: "PATCH",
    body: JSON.stringify({ patronId, bookId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
};
export const getCheckedoutBooks = async () => {
  const res = await fetch(`${URL}/librarians/checkedout-books`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
export const getCheckedinBooks = async () => {
  const res = await fetch(`${URL}/librarians/checkedin-books`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
export const getNewlyRegisteredPatrons = async () => {
  const res = await fetch(`${URL}/librarians/newly-registered-patrons`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
export const getNewlyAcquiredBooks = async () => {
  const res = await fetch(`${URL}/librarians/newly-acquired-books`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
export const getMostlyCirculatedBooks = async () => {
  const res = await fetch(`${URL}/librarians/most-circulated-books`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
export const addBook = async (data) => {
  const res = await fetch(`${URL}/books/`, {
    method: "POST",
    body: data,
    credentials: "include",
  });

  return await res.json();
};
export const editBook = async (data) => {
  console.log(data);
  const res = await fetch(`${URL}/books/edit-book`, {
    method: "PATCH",
    body: data,
    // headers: {
    //   "Content-Type": "application/json",
    // },
    credentials: "include",
  });

  return await res.json();
};
//! NOt delete delete just move it to store
export const deleteBook = async (id) => {
  const res = await fetch(`${URL}/books/remove-book`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
};
export const registerPatron = async (data) => {
  console.log(data, "🐮");
  const res = await fetch(`${URL}/librarians/add-patron`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
};
export const updateProfile = async (data) => {
  const res = await fetch(`${URL}/librarians/update-profile`, {
    method: "PATCH",
    body: data,
    credentials: "include",
  });

  return await res.json();
};
export const getBooks = async () => {
  const res = await fetch(`${URL}/books/book-list`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
export const getBookDetails = (id) => async () => {
  console.log(id, "🐮");
  const res = await fetch(`${URL}/books/${id}`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
};
export async function changePassword(data) {
  console.log(data);
  const res = await fetch(`${URL}/librarians/change-password`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
}
export async function getSettings() {
  const res = await fetch(`${URL}/settings/`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
}
export const uploadPdf = async (data) => {
  const res = await fetch(`${URL}/uploaded-books/upload`, {
    method: "POST",
    body: data,
    credentials: "include",
  });

  return await res.json();
};
/*
export const login = (path) => async (userInfo) => {
  const res = await fetch(`${URL}/${path}/signin`, {
    method: "POST",
    body: JSON.stringify(userInfo),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
};

*/
