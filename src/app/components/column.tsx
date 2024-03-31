import { ReactSortable } from "react-sortablejs";
import { Cards, useMutation, useStorage } from "../liveblocks.config";
import { shallow } from "@liveblocks/client";
import NewCardForm from "./forms/newCardForm";

type columnProps={
    columnId:string
    name:string;
}   

export default function Column({columnId ,name}: columnProps){
    const columnsCards= useStorage<Cards[]>(root=>{
        return root.cards
        .filter(card=>card.columnId===columnId)
        .map(c=>({...c})).sort((a,b)=>a.index-b.index)
    },shallow)

const updateCards= useMutation(({storage} ,index, updateData )=>{
    const card=storage.get('cards').get(index);
    if(card){
        for(let key in updateData){
            card?.set(key as keyof Cards,updateData[key])
        }
    }
},[])


const setTaskOrderForColumns =useMutation(({storage}, sortedCards:Cards[] , newColumnid )=>{
    const idOfSortedCards=sortedCards.map(c=>c.id.toString());
    const allCards:Cards[]=[...storage.get('cards').map(c=>c.toObject())]
    idOfSortedCards.forEach((sortedCardId , colIndex)=>{
        const cardStorageIndex=allCards.findIndex(c=>c.id.toString()===sortedCardId)
        updateCards(cardStorageIndex,{
            columnId:newColumnid,
            index:colIndex
        })
    })
},[])

    return(
        <div className="w-48 shadow-sm bg-white rounded-md p-2">
            <h3>{name} </h3>
            {columnsCards && (
            <>
            <ReactSortable 
            list={columnsCards} 
            setList={items=>setTaskOrderForColumns( items,columnId )}
            group="cards"
            className="min-h-12"
            ghostClass="opacity-40"
            >
            {columnsCards.map(card=>(
                <div key={card.id}className="border p-4 my-2 rounded-md">
                    <span>{card.name}</span>
                </div>
            ))}
            </ReactSortable>
            </>
            )}
            <NewCardForm columnId={columnId}/>
        </div>
    )
}