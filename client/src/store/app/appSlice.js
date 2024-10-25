import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: null,
        isLoading: false,
        isShowModal: false,
        modalChildren: null,
    },
    reducers: {
        //   logout: (state) => {
        //        state.isLoading = true;
        //   },
        showModal: (state, action) => {
            state.isShowModal = action.payload.isShowModal;
            state.modalChildren = action.payload.modalChildren;
        },
    },
    // Code logic XÚ ly async action
    extraReducers: (builder) => {
        //Bát dau thurc hién action login(Promise pending)
        builder.addCase(actions.getCategories.pending, (state) => {
            // Bãt trang thái loading
            state.isLoading = true;
            // Khi thirc hién action login thanh cong (Promise fulfilled)\
        });
        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            // Tát trang thai loading, luu thong tin user vão store
            state.isLoading = false;
            state.categories = action.payload;
        });
        // Khi thur hiên action login that bai (Promise rejected)
        builder.addCase(actions.getCategories.rejected, (state, action) => {
            // Tát trang thái loading, luru thông báo loi vào store
            state.isLoading = false;
            state.errorMessage = action?.payload?.message;
        });
    }, // End extraReducer
});
export const { showModal } = appSlice.actions;
export default appSlice.reducer;
