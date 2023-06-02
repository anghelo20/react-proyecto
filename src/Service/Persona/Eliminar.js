export default function Eliminar(datos) { 
    
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(datos)
        
    };
    fetch('http://localhost:8080/api/delete',requestOptions)
    

}
