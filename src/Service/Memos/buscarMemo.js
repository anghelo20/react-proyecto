
export default async function BuscarMemo(datos) { 
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(datos)
        
    };
    console.log(datos)
    let response = await fetch('http://localhost:8080/api/memo/search',requestOptions)
    return response

}