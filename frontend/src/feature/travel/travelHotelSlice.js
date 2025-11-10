import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    travelHotelList: [], //출력용 - 2차원 배열
    travelHotels: [], //원본 - 1차원 배열
    travelHotel: {} //상세페이지 객체 하나
}

export const travelHotelSlice = createSlice({
  name: 'travelHotel',
  initialState,
  reducers: {
    createMenu(state, action) {
        const { travelHotelList, travelHotels } = action.payload;
        
        state.travelHotelList = travelHotelList;
        state.travelHotels = travelHotels;
    }  
  },
})

// Action creators are generated for each case reducer function
export const { createMenu } = travelHotelSlice.actions //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default travelHotelSlice.reducer //store import


