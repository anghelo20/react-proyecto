export default async function Verificacion(datos) { 
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(datos)
        
    };
    console.log(datos)
    let response = await fetch('http://localhost:8080/api/login',requestOptions)
    let data = response.status
    return data

}