'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function LogOut(){
    return(
        <button onClick={()=>signOut()}
        className="bg-blue-600 ml-3 py-2 px-4 rounded-md text-white inline-flex gap-2 items-center"> 
        LogOut 
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
    )
}