import designerSlice from '@/store/designer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        designer: designerSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
