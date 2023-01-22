import { RootState } from '@/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useRootSelector;
