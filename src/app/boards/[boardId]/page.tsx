'use server'

import Board from "@/app/components/board"
import { liveblocksClient } from "@/lib/liveblockClient"
import { getUserEmail } from "@/lib/userclient"

type PageProps={
    params:{
        boardId:string
    }
}

export default async function BoardPage(props:PageProps){
    const boardId=props.params.boardId;
    const userEmail=await getUserEmail();
    const boardInfo = await liveblocksClient.getRoom(boardId);
    const userAccess=boardInfo.usersAccesses?.[userEmail];
    const hasAccess=userAccess && [...userAccess].includes("room:write");
    if(!hasAccess){
        return(
            <div>Access Denied</div>
        )
    }

    return (
        <div>
        <Board name={boardInfo.metadata.boardName.toString()} id={boardId}/>
        </div>
    )
} 