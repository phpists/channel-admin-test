import { axiosInstance } from "./index";
import { sha1 } from "../sha1";

export const videos = {
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

        const queryString = `action=GetVideos&openKey=${authData.openKey}`;
        const jsonData = JSON.stringify({ where: 'channel_id = :cid', params: { cid: data.id }, offset: data.count, count: 25 });
        const signature = sha1(queryString + authData.privateKey + jsonData);
        const formData = new FormData();
        formData.append("jsonData", jsonData);
        formData.append('signature', signature)
       const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await axiosInstance
            .post(`?${queryString}`, formData, config)
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

        const queryString = `action=GetVideosByPlaylists&openKey=${authData.openKey}`;

        const jsonData = JSON.stringify({ where: 'channel_id = :cid and playlist_id=:pid', params: { cid: data.channel, pid: data.id }, offset: data.count, count: 25 });
        const signature = sha1(queryString + authData.privateKey + jsonData);
        const formData = new FormData();
        formData.append("jsonData", jsonData);
        formData.append('signature', signature)

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        return await axiosInstance
            .post(`?${queryString}`, formData, config)
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error }));
    },
}