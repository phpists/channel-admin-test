import { axiosInstance } from "./index";
import { sha1 } from "../sha1";

export default {
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

    return await axiosInstance.post(
      `?action=Login`,
      {
        jsonData: JSON.stringify({
          emailLogin: {
            email: "phpists@gmail.com",
            password: "+GTeukbk0UMmWl[",
          },
        }),
      },
      axiosInstance
        .post(`?${queryString}`, formData, config)
        .then((response) => {
          return response;
        })
        .catch((error) => ({ error }))
    );
  },

  deletePlaylist: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;

    const queryString = `action=DeletePlaylist&openKey=${authData.openKey}`;
    const jsonData = JSON.stringify(data);
    const signature = sha1(queryString + authData.privateKey + jsonData);
    const formData = new FormData();
    formData.append("jsonData", jsonData);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signature: signature,
    };

    return await axiosInstance.post(
      `?action=Login`,
      {
        jsonData: JSON.stringify({
          emailLogin: {
            email: "phpists@gmail.com",
            password: "+GTeukbk0UMmWl[",
          },
        }),
      },
      axiosInstance
        .post(`?${queryString}`, formData, config)
        .then((response) => {
          console.log(response)
          return response;
        })
        .catch((error) => ({ error }))
    );
  },

  updatePlaylist: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;

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

    return await axiosInstance.post(
      `?action=Login`,
      {
        jsonData: JSON.stringify({
          emailLogin: {
            email: "phpists@gmail.com",
            password: "+GTeukbk0UMmWl[",
          },
        }),
      },
      axiosInstance
        .post(`?${queryString}`, formData, config)
        .then((response) => {
          console.log(response)
          return response;
        })
        .catch((error) => ({ error }))
    );
  },

  getPlaylists: async () => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;
    
    const queryString = `action=GetPlaylists&openKey=${authData.openKey}`;
    const signature = sha1(queryString + authData.privateKey);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signature: signature,
    };

    return await axiosInstance
      .get(`?${queryString}`, config)
      .then((response) => {
        return response;
      })
      .catch((error) => ({ error }));
  },
};
