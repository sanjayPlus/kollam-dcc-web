"use client";
import BottomNav from "@/components/BottomNav";
import MobileContainer from "@/components/MobileContainer";
import SERVER_URL from "@/config/SERVER_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import "./article.css";
import GalleryTopNavbar from "@/components/GalleryTopNavbar";
import { MdArrowBackIosNew } from "react-icons/md";

function Article() {
    const router = useRouter();
    const [article, setArticle] = useState([]);

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
            .get(SERVER_URL + "/admin/article")
            .then((response) => {
                setArticle(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    useEffect(() => {
        axios.get(SERVER_URL + "/admin/article").then((response) => {
            setArticle(response.data);
        });
    }, []);


    return (
        <>
            <MobileContainer>
                <div className='w-full flex flex-col justify-center items-center bg-white/90'>
                    <MdArrowBackIosNew className='text-base cursor-pointer absolute top-7 left-5 text-black' onClick={() => router.back()} />
                    <h1 className='text-black text-xl font-bold text-center my-6 '>Articles</h1>

                    <div
                        className="gallery-container w-full  flex flex-col justify-center items-center relative"
                        style={{
                            backgroundImage: "url('/images/backimg.jpeg')",
                            backgroundSize: "cover",
                        }}
                    >
                        <div className="w-full flex flex-col justify-center items-center pt-1 rounded-md  pb-16 ">

                            {article.map((item: any, index: any) => (
                                <>
                                    <div className="flex flex-col bg-white w-[90%] mb-5 mt-2 mx-5 px-3 py-2 rounded-3xl justify-center items-center ">
                                        <img
                                            src={item.image}
                                            
                                            
                                            className="w-[90%] h-[320px] object-cover rounded-xl items-center justify-center mt-4"
                                        />


                                    


                                    <h3 className="text-xl font-semibold  mt-5">{item.name}</h3>
                                    <p className="text-sm">{item.description.substring(0, 200)}</p>
                                    <button className="w-[30%] py-2 px-1 bg-indigo-800 text-white rounded-lg mt-5 mb-3" onClick={() => router.push("/article-description/" + item._id)}>See More</button>
                                </div >

                                </>
                            ))}
                    </div>
                </div>
            </div>
            <BottomNav activeItem="gallery" />
        </MobileContainer >
        </>
    );
}

export default Article;
