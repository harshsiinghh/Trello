import { ReactSortable } from "react-sortablejs";
import { cardTypes } from "./board";
import { SetStateAction } from "react";
import { log } from "console";

type columnProps={
    columnId:string
    name:string;
    cards:cardTypes[];
    setCards:SetStateAction<any>;
}   

export default function Column({columnId ,name , cards , setCards}: columnProps){
function setCardsForColumns(sortedCards:cardTypes[] , newColumnId:string){
    setCards((prevCards:cardTypes[])=>{
        const newCards=[...prevCards]
        sortedCards.forEach((sortedCard:cardTypes , newIndex:number)=>{
            const foundCard=newCards.find(newCard=>newCard.id===sortedCard.id)
            if(foundCard){
                foundCard.index=newIndex
                foundCard.columnId=newColumnId
            }
        });
    return newCards;
    })
}

    return(
        <div className="w-48 shadow-sm bg-white rounded-md p-2">
            <h3>{name} </h3>
            <ReactSortable 
            list={cards} 
            setList={items=>setCardsForColumns( items,columnId )}
            group="cards"
            className="min-h-12"
            ghostClass="opacity-40"
            >
            {cards.map(card=>(
                <div key={card.id}className="border p-4 my-2 rounded-md">
                    <span>{card.name}</span>
                </div>
            ))}
            </ReactSortable>
        </div>
    )
}