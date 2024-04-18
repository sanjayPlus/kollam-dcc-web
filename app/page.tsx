"use client"
import MobileContainer from "@/components/MobileContainer";
import SERVER_URL from "@/config/SERVER_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    setTimeout(() => {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get(SERVER_URL + "/user/protected", {
            headers: {
              "x-access-token": token,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              router.push("/home");
            }
          })
          .catch((error) => {
            localStorage.removeItem("token");
            router.push("/login");
          });
      } else {
        router.push("/login");
      }
      setLoading(false);
    }, 2000);
    
  }, []);

  return (
    <>
      <MobileContainer>
        <img
          src="./images/Kollam.jpg"
          className="w-screen h-screen object-cover"
          alt=""
        />
      </MobileContainer>
    </>
  );
}
