import { createSlice } from "@reduxjs/toolkit";
const saveCartToStorage = (cartData) => {
    try {
      sessionStorage.setItem('cart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Lỗi khi lưu giỏ hàng vào sessionStorage:', error);
    }
  };

export const cartSlice  = createSlice({
    name: 'cart',
    initialState: {listSP: [],},
    reducers:{
        themSP: (state, param) => {
            let sp  =param.payload;
            let index  =state.listSP.findIndex(s => sp._id === s._id);
            if(index === -1) {
                sp['soluong'] = 1;
                state.listSP.push(sp);
                saveCartToStorage(state.listSP);
            }
            else state.listSP[index]['soluong']++;
            console.log('Da them sp. So SP = ', state.listSP.length);

        },
        suaSL: (state, action) => {
            let _id = action.payload[0];
            let soluong = action.payload[1];
      
            let index = state.listSP.findIndex(s => s._id === _id);
            if (index !== -1) {
              // Kiểm tra nếu soluong mới nhỏ hơn 1 thì giữ nguyên là 1
              state.listSP[index].soluong = Math.max(Number(soluong), 1);
            }
            saveCartToStorage(state.listSP);
            console.log('Da sua san pham', action.payload);
          },
        xoaSP: (state, param) => {
            let _id = param.payload;
            const index = state.listSP.findIndex(sp => sp._id === _id)
            if(index !== -1) {
                state.listSP.splice(index, 1);
            }
            saveCartToStorage(state.listSP);
        },
        xoaGH: state => { state.listSP  = [];  saveCartToStorage(state.listSP); }
    }
});

export const { themSP, suaSL, xoaGH, xoaSP} = cartSlice.actions
export { saveCartToStorage };
export default cartSlice.reducer;