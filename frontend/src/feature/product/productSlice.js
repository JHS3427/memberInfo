import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    product: {} // 1. (중요) {} 대신 null로 초기화
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        createProduct(state, action) {
            const { products } = action.payload;
            state.products = products;
        },

        setProduct(state, action) {
            state.product = action.payload;
        },

        filterProduct(state, action) {
            const { pid } = action.payload;
            state.product = state.products.find(item=> item.pid === pid);
        }
    },
})

export const { createProduct, setProduct, filterProduct } = productSlice.actions

export default productSlice.reducer