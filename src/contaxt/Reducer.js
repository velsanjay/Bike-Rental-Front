const reducer = (state, action) => {
    switch(action.type){
        case "get-data":
            return {...state, data: action.payload};
        case "get-user":
            return {...state, data:action.payload}
        default:
            return state
    }
};
export default reducer

export const reducer1 = (state1, action) => {
    switch(action.type){
        case "get-user":
            return {...state1, data:action.payload}
        default:
            return state1
    }
};
