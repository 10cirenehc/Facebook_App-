import {
    GET_ERRORS,
    GET_LOGS,
} from "../actions/types";

const initialState ={
    logs: {}
};

export default function (state= initialState, action){

    switch (action.type) {


        case GET_LOGS:
            return {
                ...state,
                post: action.payload,
                loading: false
            };

        default : return state;
    }


}

