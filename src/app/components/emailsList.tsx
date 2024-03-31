'use client'

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeEmailToBoard } from "../actions/boardActions";
import { useRouter } from "next/navigation";

export default function AccessEmailList({boardId,emails}:{boardId:string,emails:string[]}){
    const router=useRouter();
    async function handleDelete(email:string){
        await removeEmailToBoard(boardId,email);
        router.refresh()
    }

    return(
        <div className="max-w-xs">
        {emails.map(email=>(
            <div className="flex gap-2 my-2 items-center justify-between max-w-xs border rounded-md">
                {email} <button className="btn" onClick={()=>handleDelete(email)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </div>
        ))}
        </div>
    )




}



// 4:36:35 / 8:57:33