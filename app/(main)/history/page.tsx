"use client"
import HistroyCarousel from '@/components/HistroyCarousel'
import MobileContainer from '@/components/MobileContainer'
import { useRouter } from 'next/navigation'
import { MdArrowBackIosNew } from 'react-icons/md'
import SERVER_URL from "@/config/SERVER_URL";
import axios from "axios";
import React, { useEffect, useState } from "react";

function History() {
    const [history, setHistory] = useState<any>({})

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/login");
        }
        axios
            .get(SERVER_URL + "/user/protected", {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            })
            .catch((error) => {
                router.push("/login");
                localStorage.removeItem("token");
            });
        axios
            .get("https://dcc-global-backend.plusitpark.com/api/admin/history")
            .then((response) => {
                setHistory(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    useEffect(() => {
        axios.get("https://dcc-global-backend.plusitpark.com/api/admin/history").then((response) => {
            setHistory(response.data);
        });
    }, []);

    const router = useRouter()
    return (
        <>
            <MobileContainer>
                <div className="history w-full min-h-screen flex flex-col justify-start items-center relative" style={{ backgroundImage: "url('/images/backimg.jpeg')", backgroundSize: "cover" }}>
                    <div className='w-full h-20 bg-white flex items-center flex-col justify-center'>
                    <MdArrowBackIosNew className='text-xl cursor-pointer absolute top-8 left-4 text-black' onClick={() => router.back()} />
                    <h1 className=' text-xl text-center font-bold my-7  drop-shadow-lg text-black mt-9'>History</h1>
                    </div>
            
                                    <div className="flex flex-col bg-white w-[90%] mb-5 mt-2 mx-5 px-3 py-2 rounded-3xl justify-center items-center ">
                         


                                    
                                    <p className="text-sm">{history.history}</p>
                                    
                                </div >

                               
                </div>
            </MobileContainer>
        </>
    )
}

export default History