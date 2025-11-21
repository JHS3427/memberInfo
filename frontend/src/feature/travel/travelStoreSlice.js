//import { createSlice } from '@reduxjs/toolkit'
//
//const initialState = {
//    travelStoreList: [], //원본 - 1차원 배열
//    travelStore: {}, //객체 하나
//}
//
//export const travelStoreSlice = createSlice({
//  name: 'travelStore',
//  initialState,
//  reducers: {
//    createStore(state, action) {
//        const { travelStoreList, travelStore } = action.payload;
//
//        state.travelStoreList = travelStoreList;
//        state.travelStore = travelStore;
//    },
//  },
//})
//
//export const { createStore } = travelStoreSlice.actions //API 함수 또는 컴포넌트에서 dispatch(액션함수)
//
//export default travelStoreSlice.reducer
//
//
