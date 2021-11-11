export function getRhymes(word){
    const endpoint = `https://rhymebrain.com/talk?function=getRhymes&word=${word}`
    return fetch(endpoint, {mode:'cors'}).then(res=>res.json())
}