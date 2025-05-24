import React, { useEffect } from 'react'
import { useState } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { collectList, deleteTask, displayList } from './services/allApi';
import { toast, ToastContainer } from 'react-toastify';

function List() {

    const [date,setDate]=useState()
    const[display,setDisplay]=useState()
    const [userData,setUserData]=useState({task:"",time:""})
    const [deleteStatus,setDeleteStatus]=useState()

    const handleAdd=async()=>{
        const{task,time}=userData
        if(!task||!time){
            toast.warning("please enter the correct plans")
        }
        else{
const formatedDate=date?date.toLocaleDateString("en-GB"):"";
       const requiredData={
        task:userData.task,
        time:formatedDate
       }
       
       
       console.log("userdata",userData)
       const result=await collectList(requiredData)
       toast.success("task added successfully")
       setUserData({task:"",time:""})
        }
       
    }

    const printList=async()=>{
         const response=await displayList()
         console.log(response)
         setDisplay(response.data)
    }

    useEffect(()=>{
        printList()
    },[display])


    const removeTask=async(id)=>{
        console.log(id)
        const results= await deleteTask(id)
        toast.error("task deleted successfully")
       
    }
  return (
   <>
  <div style={{height:"100vh",width:"100%"}}>
     <h1 className='text-center mt-5' style={{color:"brown"}}>  <i class="fa-solid fa-list-check" style={{color:"brown"}}></i> TO-DO LIST</h1>
    <div className='d-flex justify-content-center m-5'style={{gap:'10px'}}>
         <input type="text" placeholder='Add your task' className='form-control w-25' onChange={(e)=>setUserData({...userData,task:e.target.value})}value={userData.task}/>
         <DatePicker  dateFormat="dd/MM/YYYY" className='form-control' placeholderText='pick your date'selected={userData.time} onChange={(selectedDate)=>{setDate(selectedDate);
            setUserData({...userData,time:selectedDate})
         }} />
         <button className='btn btn-success rounded'onClick={handleAdd}>ADD</button>
    </div>
    <div className='mt-5 d-flex justify-content-center'>
<table className='table table-bordered'style={{width:'70%'}}>
    <thead>
        <tr>
           
            <th style={{width:'70%'}}>TASK</th>
            <th style={{width:'30%'}}>DATE</th>
        </tr>
    </thead>
    <tbody>
      {
    display && display.length > 0 ? (
      display.map((item, index) => (
        <tr key={item.id || index}>
         
          <td className='d-flex justify-content-between'>
            {item.task}
            <button
              style={{ border: "none", outline: "none" }}
              onClick={() => removeTask(item.id)}
            >
              <i className="fa-solid fa-trash text-danger"></i>
            </button>
          </td>
          <td>{item.time}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="3" className="text-center text-muted">No task is added yet</td>
      </tr>
    )
  }
       
    </tbody>
</table>
    </div>
  </div>
  <ToastContainer/>
   </>
  )
}

export default List
