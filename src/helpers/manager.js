import { URL } from "./utilFun";

export async function signupUser(userInfo) {
  console.log(userInfo, "🐮");
  const user = JSON.stringify(userInfo);
  const res = await fetch(`${URL}/librarians/add-librarian`, {
    method: "POST",
    body: user,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
}
export async function editDetail(userInfo) {
  const res = await fetch(`${URL}/librarians/edit-librarian-detail`, {
    method: "PATCH",
    body: JSON.stringify(userInfo),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
}
export async function updateProfileInfo(userInfo) {
  const res = await fetch(`${URL}/librarians/update-profile`, {
    method: "PATCH",
    body: userInfo,
    credentials: "include",
  });

  return await res.json();
}
export async function changePassword(data) {
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
export async function removeLibrarian(id) {
  const res = await fetch(`${URL}/librarians/remove-librarian`, {
    method: "PATCH",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
}
export async function getAllLibrarians() {
  const res = await fetch(`${URL}/librarians/all-librarian`, {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}
export async function getAllPatrons() {
  const res = await fetch(`${URL}/librarians/all-patrons`, {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}
export async function getRequests() {
  const res = await fetch(`${URL}/librarians/requests`, {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}
export async function respondToRequests({ id, data }) {
  const res = await fetch(`${URL}/librarians/requests/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status: data }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return await res.json();
}
export async function editSettings(data) {
  const res = await fetch(`${URL}/settings/edit`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
}
/*
export const login = (path) => async (userInfo) => {
  const res = await fetch(
    `${URL}/${path === "manager" ? "librarians" : path}/signin${
      path === "manager" && "-admin"
    }`,
    {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  return await res.json();
};
*/
