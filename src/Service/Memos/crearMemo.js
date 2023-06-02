export default async function CrearMemo(datos) { 
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(datos),
        responseType: 'blob',
        
    };
    console.log(datos)
    let response = await fetch('http://localhost:8080/api/pdf/create',requestOptions)
    generatePdf(response)
    return response.status
}

const generatePdf = (response) =>{
  const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          a.remove();
    // in case the Blob uses a lot of memory
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      });
}