export default async function ObtenerQuery(datos) { 
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(datos)
        
    };

    console.log('sas')
    console.log(datos)
    if (datos.type === "person") {
        
        let response = await fetch('http://localhost:8080/api/statistics/query/person',requestOptions)
        let data = await response.json()
        console.log(data)
        return data
    }else{
        let response = await fetch('http://localhost:8080/api/statistics/query/memo',requestOptions)
        let data = await response.json()
        return data
    }
    

}