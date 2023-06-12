import { createContext, useContext, useEffect, useReducer } from "react";
import reducer, { reducer1 } from "./Reducer";
import { Data } from "../Routs/data";


const AppContext = createContext();

const AppProvider = ({children}) =>{
    const initialState = {data:[]};
    const initialState1 = {data:[]};
    const [state, dispatch] = useReducer( reducer, initialState);
    const [state1, dispatch1] = useReducer( reducer1, initialState1);


    

    useEffect(()=>{
        const fetchData = async () =>{ 
            try {
                dispatch({type:"get-data",payload:Data})
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    },[])
    return(
        <AppContext.Provider
        value={{
            state,
            dispatch,
            state1,
            dispatch1
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const AppState = () =>{
    return useContext(AppContext)
}

export default AppProvider