import { axiosInstance } from './index'
import { sha1 } from '../sha1'

export default {
 
  addChannel: async (data) => {
    const authData = sessionStorage.getItem('bringStreamAuth') ? JSON.parse(sessionStorage.getItem('bringStreamAuth')) : null 
    if(!authData) return false

    const queryString = `action=AddChannel&openKey=${authData.openKey}`
    const jsonData = JSON.stringify({fields: data })
    const signature = sha1(queryString + authData.privateKey + jsonData);
    const formData = new FormData()
   
    formData.append('jsonData', jsonData)
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      signature: signature
    }

    return await axiosInstance.post(`?${queryString}`, formData, config).then(response => {
      return response
    }).catch(error => ({ error }))
  },

  deleteChannel: async (data) => {
    const authData = sessionStorage.getItem('bringStreamAuth') ? JSON.parse(sessionStorage.getItem('bringStreamAuth')) : null 
    if(!authData) return false

    const queryString = `action=DeleteChannel&openKey=${authData.openKey}`
    const jsonData = JSON.stringify(data)
    const signature = sha1(queryString + authData.privateKey + jsonData);
    const formData = new FormData()
   
    formData.append('jsonData', jsonData)
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      signature: signature
    }

    return await axiosInstance.post(`?${queryString}`, formData, config).then(response => {
      return response
    }).catch(error => ({ error }))
  },

  updateChannel: async (data) => {
    const authData = sessionStorage.getItem('bringStreamAuth') ? JSON.parse(sessionStorage.getItem('bringStreamAuth')) : null 
    if(!authData) return false

    if(!authData) return false

    const queryString = `action=UpdateChannel&openKey=${authData.openKey}`
    
    const jsonData = JSON.stringify({fields: data })
    const signature = sha1(queryString + authData.privateKey + jsonData);
    const formData = new FormData()
   
    formData.append('jsonData', jsonData)
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      signature: signature
    }

    return await axiosInstance.post(`?${queryString}`, formData, config).then(response => {
      return response
    }).catch(error => ({ error }))
  },

  
  getChannels: async () => {
    const authData = sessionStorage.getItem('bringStreamAuth') ? JSON.parse(sessionStorage.getItem('bringStreamAuth')) : null 
    if(!authData) return false

    const queryString = `action=GetChannels&openKey=${authData.openKey}`
    const signature = sha1(queryString + authData.privateKey);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      signature: signature
    }

    return await axiosInstance.post(`?${queryString}`, config).then(response => {
      return response
    }).catch(error => ({ error }))
  },
}