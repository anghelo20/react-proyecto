import { createContext } from "react";

const GlobalContext = createContext({
    stateNotificacion : true,
    daysAfter : 2,
    stateEdit: true,
    stateDelete:true,
    memosLimite: 5,
})

export default GlobalContext