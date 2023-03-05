import { ObjectCreatePayload } from '@/store/designer/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DesignerState {
    createQueue: ObjectCreatePayload[];
}

const initialState: DesignerState = {
    createQueue: [],
};

export const designerSlice = createSlice({
    name: 'designer',
    initialState,
    reducers: {
        addObjectToQueue: (
            state,
            { payload }: PayloadAction<ObjectCreatePayload>
        ) => {
            state.createQueue.push(payload);
        },
        removeObjectFromQueue: (
            state,
            { payload }: PayloadAction<{ id: string }>
        ) => {
            state.createQueue = state.createQueue.filter(
                (o) => o.id !== payload.id
            );
        },
    },
});

export const { addObjectToQueue, removeObjectFromQueue } =
    designerSlice.actions;

export default designerSlice.reducer;
