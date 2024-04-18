"use client";
import { useState, useRef, useEffect } from "react";
import MobileContainer from "@/components/MobileContainer";
import { useRouter } from "next/navigation";
import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import axios from "axios";
import SERVER_URL from "@/config/SERVER_URL";

function Page() {
  // const routers = useRouter();

  // const musicData = [
  //     { id: 1, name: 'Music 1', url: '/congressmusic7.mpeg' },
  //     { id: 2, name: 'Music 2', url: '/congressmusic3.mpeg' },
  //     { id: 3, name: 'Music 3', url: '/congressmusic4.mpeg' },
  //     { id: 4, name: 'Music 4', url: '/congressmusic6.mpeg' },
  //     { id: 5, name: 'Music 5', url: '/test2music.mpeg' },
  //     { id: 6, name: 'Music 6', url: '/congressmusic7.mpeg' },
  //     { id: 7, name: 'Music 7', url: '/congressmusic3.mpeg' },
  //     { id: 8, name: 'Music 8', url: '/congressmusic6.mpeg' },
  // ];

  const router = useRouter();
  const [musicData, setMusicData] = useState<any>([]);
  const [currentMusic, setCurrentMusic] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playIconIndex, setPlayIconIndex] = useState<number | null>(null); // Track the index of the currently playing music
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getMusics = async () => {
    const res = await axios.get(SERVER_URL + "/admin/sound-cloud");
    setMusicData(res.data);
  };
  console.log(musicData);

  useEffect(() => {
    getMusics();
  }, []);
  const handleMusicClick = (musicUrl: string, index: number) => {
    if (audioRef.current) {
      if (currentMusic === musicUrl) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          setPlayIconIndex(null);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
          setPlayIconIndex(index);
        }
      } else {
        audioRef.current.pause();
        audioRef.current.src = musicUrl;
        audioRef.current.play();
        setCurrentMusic(musicUrl);
        setIsPlaying(true);
        setPlayIconIndex(index);
      }
    }
  };
  return (
    <>
      <MobileContainer>
        <div
          className="leadership-container w-full min-h-screen flex flex-col justify-start object-scale-down items-center relative"
          style={{
            backgroundImage: "url('/images/backimg.jpeg')",
            backgroundSize: "cover",
          }}
        >
          <div className="SocialMedia-header w-full bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col  ">
            <MdArrowBackIosNew
              className="text-lg cursor-pointer absolute top-6 left-5 text-black z-50"
              onClick={() => router.back()}
            />
            <h1 className=" text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4">
              Congress Songs
            </h1>
          </div>

          <div className="w-full mx-auto flex items-center justify-center flex-col gap-3">
            {musicData.map((music: any, index: any) => (
              <div
                key={music.id}
                className="w-[90%] h-16 bg-white/60  rounded-xl flex items-center justify-between  pl-5 space-x-5 p-5 "
                onClick={() => handleMusicClick(music?.sound, index)}
              >
                <img
                  src="/images/imagecontri.png"
                  className="object-cover w-[18%]"
                  alt=""
                />
                <h1 className="text-black text-xl">music{index + 1}</h1>
                {isPlaying && playIconIndex === index ? (
                  <svg
                    key={music?.sound}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    key={music._id}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="w-full p-2 flex items-center justify-center">
            <button
              className="p-2 bg-white text-black rounded-full"
              onClick={() => window.open("https://soundcloud.com/keralapcc")}
            >
              See More Songs
            </button>
          </div>
        </div>
      </MobileContainer>
      <audio ref={audioRef} />
    </>
  );
}

export default Page;
