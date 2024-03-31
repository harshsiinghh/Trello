import { createClient } from "@liveblocks/client";
import {LiveList, LiveObject} from "@liveblocks/core";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 100,
});


export type Presence = {

};
export type Columns={
    name:string,
    id:string,
    index:number
}

export type Cards={
    name:string,
    id:string,
    index:number,
    columnId:string
}

type Storage = {
    columns:LiveList<LiveObject<Columns>>
    cards:LiveList<LiveObject<Cards>>

};


export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  useMutation
} = createRoomContext<
  Presence,
  Storage
>(client);