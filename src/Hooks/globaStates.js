import { useContext } from "react";
import globalContext from "../Context/GlobalContext";

export default () =>{
    return useContext(globalContext)
}