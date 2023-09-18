import { ProfileForm } from "./form.models";

import * as formActions from './form.actions';

export type FormState = ProfileForm;

const initialState: FormState = {
    personal: null,
    professional: null
}

export function reducer(state = initialState, action: formActions.All | any) : FormState {
    switch(action.type) {
        case formActions.Types.SET: {
            return {...state, ...action.form}
        }

        case formActions.Types.UPDATE: {
            return {...state, ...action.changes}
        }

        case formActions.Types.CLEAR: {
            return {...initialState}
        }

        default: {
            return state;
        }
    }
}