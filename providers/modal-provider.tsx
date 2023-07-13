"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { useEffect, useState} from "react";

export const ModalProvider = () => {
    const [isMounted,setIsMounted] = useState(false);

    useEffect(()=>{
    setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return (
        <>
        <StoreModal/>         
        </>
    )
}

//   we are maki this store Modal globally avaialinble from anywhere