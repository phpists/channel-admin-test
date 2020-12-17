import { axiosInstance } from "./index";
import { sha1 } from "../sha1";

export default {
  addVideoToPlaylist: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;

    const queryString = `action=AddVideoToPlaylist&openKey=${authData.openKey}`;
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

    return await axiosInstance
      .post(`?${queryString}`, formData, config)
      .then((response) => {
        return response;
      })
      .catch((error) => ({ error }));
  },

  removeVideoFromPlaylist: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;

    const queryString = `action=RemoveVideoFromPlaylist&openKey=${authData.openKey}`;
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

    return await axiosInstance
      .post(`?${queryString}`, formData, config)
      .then((response) => {
        return response;
      })
      .catch((error) => ({ error }));
  },

  updateVideo: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;

    const queryString = `action=UpdateVideo&openKey=${authData.openKey}`;

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

  getVideos: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;
    const queryString = `action=GetVideos&openKey=${authData.openKey}&offset=${data.count}&where=channel_id=${data.id}`;
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

  getVideosByPage: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
    ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
    : null;
  if (!authData) return false;
  const queryString = `action=GetVideos&openKey=${authData.openKey}&offset=${data.count}&where=channel_id=${data.id}`;
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

  getOneVideo: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
    ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
    : null;
  if (!authData) return false;
  const queryString = `action=GetVideos&openKey=${authData.openKey}&where=id=${data}`;
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

  getVideosByPlaylists: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;
    const queryString = `action=GetVideosByPlaylists&openKey=${authData.openKey}&where=playlist_id=${data}`;
    const jsonData = JSON.stringify({ where: data });
    const formData = new FormData();
    formData.append("jsonData", jsonData);
    const signature = sha1(queryString + authData.privateKey + jsonData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      signature: signature,
    };

    return await axiosInstance
      .get(`?${queryString}`, formData, config)
      .then((response) => {
        return response;
      })
      .catch((error) => ({ error }));
  },

  getVideosByPlaylistsByPage: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;
    const queryString = `action=GetVideosByPlaylists&openKey=${authData.openKey}&where=playlist_id=${data}offset=${data}`;
    const jsonData = JSON.stringify({ where: data });
    const formData = new FormData();
    formData.append("jsonData", jsonData);
    const signature = sha1(queryString + authData.privateKey + jsonData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      signature: signature,
    };

    return await axiosInstance
      .get(`?${queryString}`, formData, config)
      .then((response) => {
        return response;
      })
      .catch((error) => ({ error }));
  },
};
