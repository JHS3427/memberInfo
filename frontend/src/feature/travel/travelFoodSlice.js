import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    travelFoodList: [], //원본 - 1차원 배열
    travelFood: {}, //객체 하나
//    travelFoodDetailList: [],
//    travelFoodDetail: {},
}

export const travelFoodSlice = createSlice({
  name: 'travelFood',
  initialState,
  reducers: {
    createFood(state, action) {
        const { travelFoodList, travelFood } = action.payload;
        
        state.travelFoodList = travelFoodList;
        state.travelFood = travelFood;
    },

//    createFoodDetail(state, action){
//        const { travelFoodDetailList, travelFoodDetail } = action.payload;
//
//        state.travelFoodDetailList = travelFoodDetailList;
//        state.travelFoodDetail = travelFoodDetail;
//    }
  },
})

export const { createFood, createFoodDetail } = travelFoodSlice.actions //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default travelFoodSlice.reducer


