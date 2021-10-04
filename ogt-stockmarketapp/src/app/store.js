import { configureStore } from "@reduxjs/toolkit";
import sharesReducer from "../features/sharesDataList/sharesDataList";

export default configureStore({
    reducer: {
        myStocks: sharesReducer
    }
})