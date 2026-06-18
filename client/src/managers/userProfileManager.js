const _apiUrl = "/api/userprofile";

export const getProfiles = () => {
  return fetch(`${_apiUrl}/withroles`).then((res) => res.json());
};

export const getProfile = (id) => {
  return fetch(`${_apiUrl}/userprofile/${id}`).then((res) => res.json());
};
