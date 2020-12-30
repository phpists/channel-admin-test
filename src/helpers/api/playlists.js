import { axiosInstance } from "./index";
import { sha1 } from "../sha1";

export const playlists = {
  addPlaylist: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;

    const queryString = `action=AddPlaylist&openKey=${authData.openKey}`;
    const jsonData = JSON.stringify({ fields: data });
    const signature = sha1(queryString + authData.privateKey + jsonData);
    const formData = new FormData();

    formData.append("jsonData", jsonData);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signature: signature,
    };

    return await axiosInstance
      .post(`?${queryString}`, formData, config)
      .then((response) => {
        return response;
      })
      .catch((error) => ({ error }));
  },

  deletePlaylist: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;

    const queryString = `action=DeletePlaylist&openKey=${authData.openKey}`;
    const jsonData = JSON.stringify({id: data});
    const signature = sha1(queryString + authData.privateKey + jsonData);
    const formData = new FormData();
    formData.append("jsonData", jsonData);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signature: signature,
    };

    return await axiosInstance
        .post(`?${queryString}`, formData, config)
        .then((response) => {
          return response;
        })
        .catch((error) => ({ error }))
  },

  updatePlaylist: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;

    const queryString = `action=UpdatePlaylist&openKey=${authData.openKey}`;

    const jsonData = JSON.stringify({ fields: data });
    const signature = sha1(queryString + authData.privateKey + jsonData);
    const formData = new FormData();
    formData.append("jsonData", jsonData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signature: signature,
    };

    return await axiosInstance
        .post(`?${queryString}`, formData, config)
        .then((response) => {
          return response;
        })
        .catch((error) => ({ error }))
  },

    getPlaylists: async (data) => {
        const authData = sessionStorage.getItem("bringStreamAuth")
            ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
            : null;
        if (!authData) return false;
        const queryString = `action=GetPlaylists&openKey=${authData.openKey}`;

        const jsonData = JSON.stringify({ where: 'channel_id = :cid', params: { cid: data.id }, offset: data.count, count: 25 });
        const signature = sha1(queryString + authData.privateKey + jsonData);
        const formData = new FormData();
        formData.append("jsonData", jsonData);
        formData.append('signature', signature)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };


        return await axiosInstance
            .post(`?${queryString}`, formData, config)
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error }));
    },

  getOnePlaylist: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;
    const queryString = `action=GetPlaylists&openKey=${authData.openKey}&where=id=${data.id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return await axiosInstance
      .get(`?${queryString}`, config)
      .then((response) => {
        return response;
      })
      .catch((error) => ({ error }));
  },
};
