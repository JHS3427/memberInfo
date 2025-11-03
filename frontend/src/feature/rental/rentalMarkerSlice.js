import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bikeList : [],
}

export const rentalSlice = createSlice({
    name: 'rentalBike',
    initialState,
    reducers: {
        addData: (state,action) =>{
            state.bikeList = [...state.bikeList, ...action.payload];
        }
    }
})

// Action creators are generated for each case reducer function
export const { addData } = rentalSlice.actions //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default rentalSlice.reducer //store import