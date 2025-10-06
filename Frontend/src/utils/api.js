// const base = "/api";

// async function fetchApi(url, opts = {}, retry = true) {
//   const res = await fetch(base + url, {
//     ...opts,
//     credentials: "include",
//     headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
//   });
//   if (res.status !== 401 || !retry) return res;
//   // silently refresh once
//   await fetch(base + "/auth/refresh", { method: "POST", credentials: "include" });
//   return fetchApi(url, opts, false);
// }

// export const api = {
//   login:  (b) => fetchApi("/auth/login",    { method: "POST", body: JSON.stringify(b) }),
//   register:(b) => fetchApi("/auth/register", { method: "POST", body: JSON.stringify(b) }),
//   logout: () => fetchApi("/auth/logout",   { method: "POST" }),
//   me:     () => fetchApi("/auth/me"),
// };
