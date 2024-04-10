import { liveblocksClient } from "@/lib/liveblockClient";
import { NextRequest } from "next/server";

export async function PUT(req:NextRequest){
const {id,update}=await req.json();
liveblocksClient.updateRoom(id,update);
return Response.json(true);
}
