"use client"
import MobileContainer from '@/components/MobileContainer'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import image1 from './assets/navasankalp.png'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './respresentatives.css'
import SERVER_URL from '@/config/SERVER_URL';

function Representatives() {
    const [categorydetails,setcategorydetails]=useState<any>([])
const [alldetails,setalldetails]=useState<any>([])
const[name,setname]=useState<string>("")

const getcategory=async()=>{
  const res=await axios.get(`${SERVER_URL}/admin/category-representative`)
  setcategorydetails(res.data)
}

const getdetails=async(categoryname:any)=>
{
  console.log(categoryname);
  setname(categoryname)
  const res=await axios.get(`${SERVER_URL}/admin/representatives?category=${categoryname}`)
  setalldetails(res.data[0].representatives);
}

useEffect(()=>
{
  getcategory()
  getdetails("Lok Sabha")
},[])
  return (
    <>
        <MobileContainer>
        <div >

    {/* header */}
    
    <div className="mt-4 d-flex flex-column">
      <h4>People's Representatives</h4>
      <div className="mt-4">
        {categorydetails && categorydetails.map((data:any,index:any)=>(<button
            key={index}
          className="btn btn-white border border-teritiary w-100 mb-3" type='button' onClick={()=>getdetails(data.category)}
        >{data.category}
        </button>))}
        
      </div>
      <div className="d-flex justify-content-start align-items-center mt-2">
        <h4>{name}</h4>
        {name==="Lok Sabha" &&<button
          className="btn btn-white border border-teritiary ms-5"
        >
          2019-2024
        </button>}
      </div>
     {alldetails?.length>0?
     alldetails.map((item:any)=>(<div className="d-flex flex-column justify-content-center align-items-center mt-4">
     <Card style={{ width: '100%' }} className='d-flex flex-column justify-content-center align-items-center'>
     <Card.Img variant="top" src={item.image} style={{width:'100px'}} className='mt-3'/>
     <Card.Body className='text-center'>
       <Card.Title>{item.name}</Card.Title>
       <Card.Text>
                <p className="fw-bold mt-4">Office Address</p>
                <p>{item.address}</p>
                <p><i className="fa-solid fa-phone me-2" style={{color:' #2b7fbf'}}></i>{item.phone}</p>
                <p><i className="fa-solid fa-envelope me-2"></i>{item.email}</p>
       </Card.Text>
     </Card.Body>
   </Card>
     </div>))
      :<p></p>}


    </div>
  </div>
        </MobileContainer>
    </>
  )
}

export default Representatives