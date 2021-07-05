import store from "@/store";

function hasPermission(permission) {
  return store.state.user.roles.some((v) => {
    return v === permission;
  });
}

export function auth(value) {
  let auth;
  if (typeof value === "string") {
    auth = hasPermission(value);
  } else {
    auth = value.some((item) => {
      return hasPermission(item);
    });
  }
  return auth;
}

export function authAll(value) {
  const auth = value.every((item) => {
    return hasPermission(item);
  });
  return auth;
}
