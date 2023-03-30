import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

const initialState = [];

export const fetchCollection = createAsyncThunk('fetchCollection', async(userId)=>{
    try{
        const {data} = await supabase.from('collections').select('*').eq('user_id', userId);
        return data
    } catch(err){
        console.log(err)
    }
});

export const addToCollection = createAsyncThunk('addToCollection', async({userId,randomCardId})=>{
    try{
        const {data} = await supabase.from('collections').insert([
            { 
                user_id: userId,
                cards_id: randomCardId,
            },
        ]).select().single()
        return data
    } catch(err){
        console.log(err)
    }
});

export const updateCardQuantity = createAsyncThunk('updateCardQuantity', async({updatedQuantity, randomCardId, userId})=>{
    try{
        const {data} = await supabase.from('collections')
                .update({ quantity: updatedQuantity })
                .eq('cards_id', randomCardId)
                .eq('user_id', userId)
                .select()
                .single();
        return data
    } catch(err){
        console.log(err)
    }
})

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(fetchCollection.fulfilled, (state,action)=>{
            return action.payload
        })
        builder.addCase(addToCollection.fulfilled, (state,action)=>{
            state.push(action.payload)
            return state
        })
        builder.addCase(updateCardQuantity.fulfilled, (state,action)=>{
            const newState = state.map(item => {
                if (item.id === action.payload.id) {
                  return action.payload;
                } else {
                  return item;
                }
              });
            return newState
        })
    }
});

export const collectionCards = (state) =>{
    return state.collection;
}

export default collectionSlice.reducer;