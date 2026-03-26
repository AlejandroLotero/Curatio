import permissions from "../../../data/selects/permissions.json";

export const getPermissions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(permissions);
    }, 300);
  });
};
