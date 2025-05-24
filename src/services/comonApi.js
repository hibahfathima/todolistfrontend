import axios from "axios"

export const comonApi=async(httpmethod,baseUrl,userData)=>{
    let reqConfig={
        method:httpmethod,
        url:baseUrl,
        data:userData,
        headers:{
            "Content-type":"application/json"
        }

    }
    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}