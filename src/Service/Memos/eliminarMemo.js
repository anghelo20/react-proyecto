export default async function eliminarMemo(datos) { 
    
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(datos)
        
    };
    fetch('http://localhost:8080/api/memo/delete',requestOptions)
    

}