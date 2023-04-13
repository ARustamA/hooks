import { RootState } from '../store/store';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
