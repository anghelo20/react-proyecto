export default async function getChartQuery() { 
    
    const requestOptions = {
        method: 'GET',
        
    };
    let response = await fetch('http://localhost:8080/api/chart/data',requestOptions)
    let data = await response.json()
    return data

}