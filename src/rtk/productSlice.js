import {createSlice} from "@reduxjs/toolkit"                               

const initialState = [];
const productSlice = createSlice({
     name: "product",
     initialState: { products: initialState },
     reducers: { 
          add:(state, action)=>{
               state.products.push(action.payload);
          },
          update: (state, action)=>{
               const index = state.products.findIndex(product => product.id === action.payload.id);
               if (index !== -1) {
               state.products[index] = action.payload;
               }
          },
          remove: (state, action)=>{
               state.products = state.products.filter(product => product.id !== action.payload);
          }
     } 
});
export const { add, update, remove } = productSlice.actions;
export default productSlice;


