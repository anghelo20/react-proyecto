export default async function eliminarPdf() { 
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
    };
    let response = await fetch('http://localhost:8080/api/pdf/delete',requestOptions)
    let data = response.status
    return data

}