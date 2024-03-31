'use client';
import { RoomProvider } from "../liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./columns";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
 
export default function Board({id }:{id:string}) {
    return(
        <RoomProvider 
        id={id} 
        initialPresence={{}} 
        initialStorage={{
            columns:new LiveList(),
            cards:new LiveList()
        }}>
        <ClientSideSuspense fallback={(<div>LOADING...</div>)}>{()=>(
            <>
            <div className="flex gap-2 justify-end ">
                <Link 
                className="flex gap-2 items-center btn"
                href={`/boards/${id}/settings`}>
                <FontAwesomeIcon icon={faCog}/>
                Settings
                </Link>
            </div>
            <Columns/>
            </>
        )}</ClientSideSuspense>
        </RoomProvider>
    )
}