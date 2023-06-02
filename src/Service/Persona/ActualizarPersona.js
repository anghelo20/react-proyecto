export default async function actualizarPersona(datos) { 
    
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(datos)
        
    };
    let response = await fetch('http://localhost:8080/api/update',requestOptions)
    let status = response.status;
    return status

}
