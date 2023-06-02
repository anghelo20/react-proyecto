
export default async function Verificacion() { 
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        
    };
    const response = await fetch('http://localhost:8080/api/person',requestOptions)
    const data = await response.json()
    return data

}
