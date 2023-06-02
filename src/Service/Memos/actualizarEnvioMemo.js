export default async function actualalizarEnvio(datos) { 
    
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(datos)
        
    };
    console.log(datos)
    let response = await fetch('http://localhost:8080/api/memo/update',requestOptions)
    let data = response.status
    return data

}