export default async function ReportPdf(datos,dataColumns) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
    responseType: "blob",
  };
  console.log(datos);
  if (dataColumns === "person") {
      sendReportPerson(requestOptions)
  }else{
    sendReportMemo(requestOptions)
  }
}


const sendReportPerson = (requestOptions) =>{
    fetch("http://localhost:8080/api/pdf/report/person", requestOptions).then(
        (response) => {
          console.log(response);
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
      );
}

const sendReportMemo = (requestOptions) =>{
    fetch("http://localhost:8080/api/pdf/report/memo", requestOptions).then(
        (response) => {
          console.log(response);
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
      );
}
