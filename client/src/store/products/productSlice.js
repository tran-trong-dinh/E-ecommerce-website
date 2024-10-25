import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';
export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        isLoading: false,
        errorMessage: '',
    },
    reducers: {
        //   logout: (state) => {
        //        state.isLoading = true;
        //   },
    },
    // Code logic XÚ ly async action
    extraReducers: (builder) => {
        //Bát dau thurc hién action login(Promise pending)
        builder.addCase(actions.getNewProducts.pending, (state) => {
            // Bãt trang thái loading
            state.isLoading = true;
            // Khi thirc hién action login thanh cong (Promise fulfilled)\
        });
        builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
            // Tát trang thai loading, luu thong tin user vão store
            state.isLoading = false;
            state.newProducts = action.payload;
        });
        // Khi thur hiên action login that bai (Promise rejected)
        builder.addCase(actions.getNewProducts.rejected, (state, action) => {
            // Tát trang thái loading, luru thông báo loi vào store
            state.isLoading = false;
            state.errorMessage = action?.payload?.message;
        });
    }, // End extraReducer
});
//export const {} = productSlice.actions;
export default productSlice.reducer;
