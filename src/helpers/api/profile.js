import { axiosInstance } from './index'
import { sha1 } from '../sha1'

export default {
 
  getUserProfile: async () => {
    const authData = sessionStorage.getItem('bringStreamAuth') ? JSON.parse(sessionStorage.getItem('bringStreamAuth')) : null 
    if(!authData) return false

    const queryString = `?action=GetUserProfile&openKey=${authData.openKey}`
    const signature = sha1(queryString + authData.privateKey);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      signature: signature
    }

    return await axiosInstance.post(queryString, config).then(response => {
      return response
    }).catch(error => ({ error }))
  },
  
  changeUserProfile: async (data) => {
    const authData = sessionStorage.getItem('bringStreamAuth') ? JSON.parse(sessionStorage.getItem('bringStreamAuth')) : null 
    if(!authData) return false

    if(!authData) return false

    const queryString = `action=UpdateUserProfile&openKey=${authData.openKey}`
    
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
}