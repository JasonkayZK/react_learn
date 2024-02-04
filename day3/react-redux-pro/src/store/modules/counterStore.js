import {createSlice} from '@reduxjs/toolkit';

const counterStore = createSlice({
  name: 'counter',
  // 初始化state
  initialState: {
    count: 0,
  },
  // 修改状态的方法 同步方法 支持直接修改
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    addToNum(state, action) {
      state.count = action.payload;
    },
  },
});

// 解构出来actionCreator函数
const {increment, decrement, addToNum} = counterStore.actions;
// 获取reducer
const reducer = counterStore.reducer;

// 以按需导出的方式导出actionCreator
export {increment, decrement, addToNum};
// 以默认导出的方式导出reducer
export default reducer;
