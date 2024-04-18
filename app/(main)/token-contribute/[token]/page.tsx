"use client"
import Loading from '@/components/Loading'
import MobileContainer from '@/components/MobileContainer'
import SERVER_URL from '@/config/SERVER_URL'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

function TokenContribute() {
    const {token}:any = useParams();
    const [amount, setAmount] = React.useState(0);
    console.log(token)
    const router = useRouter()
 useEffect(() => {
    if(!token){
        router.push('/login')
    }else{
        localStorage.setItem('token',token);
        console.log(token)
            router.push('/contribute')
    }
 },[])
  const handlePayment = () => {
        const token = localStorage.getItem('token');
        axios.get(SERVER_URL + '/payment/checkout/' + amount + '/' + token).then((response) => {
            if (response.status === 200) {
                window.open(response.data.url, '_blank', 'noopener,noreferrer')
            }
        })
    }
    return (
        <>
            <MobileContainer>

                <div className='contri-margin'>

                    <div className='flex relative contri-top shadow-lg shadow-black-500/40'>
                    
                        <div className='absolute left-[40%] ' >
                            <h1 className='text-base text-center font-bold'>Contribute</h1>
                        </div>
                    </div>


                    <div style={{display : 'flex' , flexDirection : 'column'}}>

                        <img src="/images/imagecontri.png" className='img-contri' alt="noImage" style={{ width: '200px', height: '200px' , display: 'flex'  , alignSelf : 'center' }} />
                        
                        <input type="text"  placeholder='₹0' style={{display: 'flex'  , alignSelf : 'center' , textAlign : 'center' , width :'max-content' , border : 'none' , outline : 'none'}} onChange={(e) => setAmount(parseInt(e.target.value))}/>

                        <button onClick={handlePayment} className='bg-blue-800 button-contri' style={{display: 'flex'  , alignSelf : 'center' }}>Pay Now</button>

                    </div>


                </div>




                {/* <div className="contribute w-full h-screen flex flex-col justify-center items-center relative bg-white">
                    <MdArrowBackIosNew className='text-5xl cursor-pointer absolute top-5 left-5' onClick={() => router.back()} />
                    <h1 className='text-black text-3xl font-bold my-20'>Contribute Now</h1>
                    <div className="mb-6"> */}
                        {/* <label
                            htmlFor="large-input"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Amount
                        </label> */}
                        {/* <input
                            type="number"
                            id="large-input"
                            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter amount"
                            
                        /> */}
                    {/* </div> */}
                    {/* <button onClick={handlePayment} className='bg-amber-500 p-2 w-72 rounded-xl text-white font-bold'>Pay Now</button> */}
                {/* </div> */}
            </MobileContainer>   </>
    )
}

export default TokenContribute