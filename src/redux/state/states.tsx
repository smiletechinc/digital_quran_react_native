import {useSelector, TypedUseSelectorHook} from 'react-redux';

export interface RootState {
  routing: SurahState;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
