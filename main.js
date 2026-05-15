/* In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:

    Recuperare la ricetta da https://dummyjson.com/recipes/{id}
    Estrarre la proprietà userId dalla ricetta
    Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
    Restituire la data di nascita dello chef

     Note del docente
Scrivi la funzione getChefBirthday(id), che deve:

    Essere asincrona (async).
    Utilizzare await per chiamare le API.
    Restituire una Promise con la data di nascita dello chef.
    Gestire gli errori con try/catch
    */
   
/* - fetchJson sta facendo una chiamata (fetch) alla url che gli mandi -> poi mette il json della risposta dentro l'oggetto -> e lo ritorna (quindi hai accesso a quel dato nel return dove hai chiamato la funzione)
- getPost sta dando la url per far fare la chiamata -> nel caso vada in errore dice di aver fallito -> altrimenti se nell'oggetto che arriva dalla chiamata ci sta un .message dice "eh no sono andato in errore per quest'altro motivo"
- nella stessa funzione poi dai la url per user -> se fallisce al momento non fai nulla (dovresti aggiungere almeno un console.log(error) -> se ha successo torni tutto l'oggetto di risposta del post e l'user (solo che in questo caso se non ci metti i ... davanti torna l'oggetto così com'è senza spiattellarsi nell'oggetto della risposta) */
    


//faccio una chiamata fetch alla url che mi daranno, questo mi servirà nella funzione getChefBirthday
async function fetchJson(url) {
    const response = await fetch(url);
    const obj = await response.json();   
    return obj;
}
//creo la funzione getChefBirthday(id)
const getChefBirthday = async (id) => {
    let recipes;
    try{
        recipes = await fetchJson(`https://dummyjson.com/recipes/${id}`);
    } catch(error){
        throw new Error(`Spiacente, non è possibile recuperare recipe id ${id}`);
    } 
    if(recipes.message){
        throw new Error(recipes.message);
    }
    //ora devo estrarre la proprietà userID 
    let user;
    try{
        user = await fetchJson(`https://dummyjson.com/users/${recipes.userId}`)
    } catch(error){
        throw new Error(`Non è possibile recuperare le informazioni sullo chef`);

    }
    return user.birthDate; //ho aggiunto birthId  -- dopo aver commitato, trovata proprietà birthDate, quindi aggiungo al mio return 
}
   
   getChefBirthday(1)
 .then(birthday => console.log("Data di nascita dello chef:", birthday))
 .catch(error => console.error("Errore:", error.message));