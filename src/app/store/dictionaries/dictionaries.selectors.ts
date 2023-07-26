import {createSelector, createFeatureSelector} from '@ngrx/store';
import { DictionariesState } from './dictionaries.reducer';

export const getDictionariesState = createFeatureSelector<DictionariesState>('dictionaries');

export const getDictionaries = createSelector(
    getDictionariesState,
    (state: any) => state.entities
)

export const getLoading = createSelector(
    getDictionariesState,
    (state: any) => state.loading
)

export const getIsReady = createSelector(
    getDictionariesState,
    (state: any) => state.entities && !state.loading
)

export const getRoles = createSelector(
    getDictionaries,
    (state: any) => state?.roles
)

export const getQualifications = createSelector(
    getDictionaries,
    (state: any) => state?.qualifications
)

export const getkills = createSelector(
    getDictionaries,
    (state: any) => state?.skills
)

export const getSpecializations = createSelector(
    getDictionaries,
    (state: any) => state?.specializations
)