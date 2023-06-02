export default async function createPerson(datos) {
  let response = await fetch("http://localhost:8080/api/person", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos)
  })

  let data = await response.text()
  return data
}
