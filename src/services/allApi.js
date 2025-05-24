import { baseUrl } from "./baseurl"
import { comonApi } from "./comonApi"

//to post
export const collectList=async(userData)=>{
    return await comonApi("POST",`${baseUrl}/taskInfo`,userData)
}

//to display
export const displayList=async()=>{
    return await comonApi("GET",`${baseUrl}/taskInfo`,"")
}

//to delete
export const deleteTask=async(id)=>{
    return await comonApi("DELETE",`${baseUrl}/taskInfo/${id}`,{})
}