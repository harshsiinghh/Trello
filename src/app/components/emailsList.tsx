'use client'

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeEmailFromBoard} from "../actions/boardActions";
import { useRouter } from "next/navigation";
import { RoomAccesses } from "@liveblocks/node";

export default function AccessEmailList({boardId,usersAccesses}:{boardId:string,usersAccesses:RoomAccesses}){
    const router=useRouter();
    async function handleDelete(emailToDelete:string){
        await removeEmailFromBoard(boardId,emailToDelete);
        router.refresh()
    }

    return(
        <div className="max-w-xs">
        {Object.keys(usersAccesses).map(email=>(
            <div key={email} className="flex gap-2 my-2 items-center justify-between max-w-xs border rounded-md">
                {email} <button className="btn" onClick={()=>handleDelete(email)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </div>
        ))}
        </div>
    )




}



// 4:36:35 / 8:57:33