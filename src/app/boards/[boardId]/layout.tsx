'use client'

import { BoardContextProvider } from "@/app/components/boardContext"
import { RoomProvider } from "@/app/liveblocks.config"
import { LiveList } from "@liveblocks/client"
import { useParams } from "next/navigation"
import React from "react"


type PageProps={
    children:React.ReactNode,
    modal:React.ReactNode
}

export default function BoardLayout({children , modal}:PageProps){
    const params=useParams();
    return(
        <BoardContextProvider>
            <RoomProvider id={params.boardId.toString()} 
            initialStorage={{
                columns:new LiveList(),
                cards:new LiveList()
            }} 
            initialPresence={{}}>
                {children}
                {modal}
            </RoomProvider>
        </BoardContextProvider>
    )
}