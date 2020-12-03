import { createStore } from "redux";

// async function getInitial() {
//     const res = await fetch("http://localhost:8000/getfilters/");
//     const initialState = await res.json();
//     console.log({filters: initialState})
//     return {filters: initialState};
// }

const initialState = {
    filters: {}
}

const reducerFilters = (state = initialState, action) => {
    if (action.type === "SET_FILTERS") {
        return {
            ...state,
            filters: action.filters
        }
    }
    return state;
}

// reducerFilters(initialState, getInitial());

export default createStore(reducerFilters);