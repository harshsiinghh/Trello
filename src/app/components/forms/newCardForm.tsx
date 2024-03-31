'use client'

import { Cards, useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import uniqid from "uniqid"

export default function newCardForm({columnId} :{columnId:string}){
    const addCards=useMutation(({storage}, cardName )=>{
    return storage.get('cards').push(new LiveObject<Cards>({
        name:cardName,
        id: uniqid.time(),
        columnId:columnId,
        index:9999
    }))
    } , [columnId])


    function handleNewCardFormSubmit(ev:FormEvent){
        ev.preventDefault();
        const input = (ev.target as HTMLFormElement).querySelector('input');
        if(input){
            const cardName=input?.value
            addCards(cardName)
            input.value="" 
        }
    }
    return(
        <form onSubmit={handleNewCardFormSubmit}>
        <input type="text" placeholder="New Card Titte"/>
        </form>
    )
}