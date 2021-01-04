import { axiosInstance } from "./index";
import { sha1 } from "../sha1";

export const languages = {
  //good
  getChannelLanguages: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;
    const queryString = `action=GetChannelLanguages&openKey=${authData.openKey}`;

    const jsonData = JSON.stringify({ channelId: data });

    const signature = sha1(queryString + authData.privateKey + jsonData);
    const formData = new FormData();

    formData.append("jsonData", jsonData);
    formData.append("signature", signature);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return await axiosInstance
      .post(`?${queryString}`, formData, config)
      .then((response) => {
        console.log("RESSSSSSSSSSSSSPOOOOOLLLLLLLLLLLL", response);
        return response;
      })
      .catch((error) => ({ error }));
  },

  updateChannelLanguages: async (data) => {
    const authData = sessionStorage.getItem("bringStreamAuth")
      ? JSON.parse(sessionStorage.getItem("bringStreamAuth"))
      : null;
    if (!authData) return false;

    const queryString = `action=UpdateChannelLanguages&openKey=${authData.openKey}`;

    const jsonData = JSON.stringify({
      channelId: data,
      languages: { en: 1, ru: 0 },
    });
    const signature = sha1(queryString + authData.privateKey + jsonData);
    const formData = new FormData();
    formData.append("jsonData", jsonData);
    formData.append("signature", signature);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return await axiosInstance
      .post(`?${queryString}`, formData, config)
      .then((response) => {
        console.log("UPDATEEEEEEEEEEEEEEEE", response);
        return response;
      })
      .catch((error) => ({ error }));
  },
};
