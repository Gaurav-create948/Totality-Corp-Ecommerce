import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

const initialState = {
  items : [],
  totalPrice : 0
};




export const cartSlice = createSlice({
  name: 'cart',
  name: 'total_Price',
  initialState,
  reducers: {
    setCart: (state, action) => {
      return state.items = action.payload;
    },
    addItem : (state, action) => {
      const foundItem = state.items.find(item => item.id === action.payload.id);
      if(foundItem) return;
      action.payload.quantity = 1;
      state.items.push(action.payload);
      state.totalPrice = calculateTotalPrice(state.items);
    },
    removeItem : (state, action) => {
      state.items = state.items.filter(data => data.id !== action.payload);
      state.totalPrice = calculateTotalPrice(state.items);
    },
    increment: (state, action) => {
      return state.items.forEach(data => {
        if(data.id === action.payload){
          data.quantity += 1;
          state.totalPrice = calculateTotalPrice(state.items);
        }
      });
    },
    decrement: (state, action) => {
      return state.items.forEach(data => {
        if(data.id === action.payload && data.quantity > 1){
          data.quantity -= 1;
          state.totalPrice = calculateTotalPrice(state.items); 
        }
      });
    }
  },
})

function calculateTotalPrice(items) {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

export const { increment, decrement, setCart, addItem, removeItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
