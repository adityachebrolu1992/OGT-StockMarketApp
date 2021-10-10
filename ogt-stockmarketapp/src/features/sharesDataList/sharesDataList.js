import { createSlice } from "@reduxjs/toolkit";


export const sharesDataList = createSlice({
    name: "myStocks",
    initialState: {
        value: []
    },
    reducers: {
        add: (state, action) => {
            // state.value.push(action.payload);
            // fetch 
            state.value = action.payload
        },
        edit: (state, action) => {
            state.value[action.payload[0]]["numberOfShares"] = Number(state.value[action.payload[0]]["numberOfShares"]) + Number(action.payload[1]);
            state.value[action.payload[0]]["costOfPurchase"] = Number(state.value[action.payload[0]]["costOfPurchase"]) + Number(action.payload[2]);
        },
        deleteStock: (state, action) => {
            state.value.splice(action.payload, 1);
            state.value = state.value;
        },
        reduceNumberOfShares: (state, action) => {
            state.value[action.payload[0]]["numberOfShares"] = Number(action.payload[1]);
            state.value[action.payload[0]]["costOfPurchase"] = state.value[action.payload[0]]["costOfPurchase"] - action.payload[2]
        }

    }
})

export const { add, edit, deleteStock, reduceNumberOfShares } = sharesDataList.actions
export default sharesDataList.reducer;