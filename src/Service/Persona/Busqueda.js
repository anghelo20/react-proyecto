export default async function Busqueda(datos) { 
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(datos)
        
    };
   
        const response = await fetch('http://localhost:8080/api/search',requestOptions)
        if (response.json == null) {
            console.log(response)
        }else{

            const data = await response.json();
            return data
        }
    

}
