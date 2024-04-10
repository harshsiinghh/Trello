'use server'

import { liveblocksClient } from "@/lib/liveblockClient";
import NewBoardAccess from "@/app/components/forms/newBoardAccessForm";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getUserEmail } from "@/lib/userclient";
import AccessEmailList from "@/app/components/emailsList";
import BoardDeleteButton from "@/app/components/boardDeleteButton";

type PageProps={
    params:{
        boardId:string
    }
}

export default async function BoardSettings({params}:PageProps){
    const {boardId}=params;
    const boardInfo=await liveblocksClient.getRoom(boardId);
    const userEmail=await getUserEmail()

    if(!boardInfo.usersAccesses[userEmail]){
        return"Access Denied";
    }
    return(
    <div>
        <div className="flex justify-between">
            <Link className="inline-flex gap-1 mb-4 items-center btn" href={`/boards/${boardId}`}>
            <FontAwesomeIcon icon={faArrowLeft}/>Go Back To Board
            </Link>
            <BoardDeleteButton boardId={boardId}/>
        </div>
        
        <h1 className="text-2xl">Access to Board: {boardInfo.metadata.boardName}</h1>
        <div className="mb-8">
        <AccessEmailList boardId={boardId} usersAccesses={boardInfo.usersAccesses}/>
        </div>
        <NewBoardAccess boardId={boardId}/>
    </div>
    )
}


// 4:16:54 / 8:57:33