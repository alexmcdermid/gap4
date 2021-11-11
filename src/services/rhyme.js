export function getRhymes(word){
    const endpoint = ""
    return fetch(endpoint, {mode:'cors'}).then(res=>res.json())
}