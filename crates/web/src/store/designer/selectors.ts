import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

const selectDesignerFeature = (state: RootState) => state.designer;

export const selectObjectQueue = createSelector(
    selectDesignerFeature,
    (state) => state.createQueue
);
