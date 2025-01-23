// Fetch Function
async function fetchJson() {
    try {
        let response = await fetch("travel_recommendation_api.json");

        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }

        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Fehler beim Abrufen der JSON-Daten:", error);
        return null; 
    }
}


// Erstellung von Div für Suchergebnis
async function result(){
    let objectJson = await fetchJson();
    let input = document.getElementById("form_input_search").value;

    if(input){
        switch(input.toLowerCase()){
            case "beach":
            case "beaches":
                createDivs(objectJson.beaches);
                break;
            case "country":
            case "countries":
                createDivs(objectJson.countries);
                break;
            case "temple":
            case "temples":
                createDivs(objectJson.temples);
                break;
            default:
                let div = document.getElementById("result");
                div.className="";
                div.classList.add("activ");
                let divs = document.getElementById("result").innerHTML = `<h2 style="margin-left:1rem;">There is no match for: ${input} try another search word</h2>`;
                break;
        }
    }
}

// Erstellung von Divs für alle Ergebnisse

function createDivs(results) {
    let div = document.getElementById("result");
    div.className="";
    div.classList.add("activ");
    div.innerHTML = "";
    let i = 0;
    
    results.forEach(result => {
        const name = result.name;
        let imageUrl = result.imageUrl;
        let description = result.description;
        
        div.innerHTML += `<div class="card_${i}">
           <h2 style="margin-left:1rem;">${name}</h2>
            </div>`;
        
        let x = `card_${i}`;
        let divCard = document.getElementsByClassName(x)[0];
        
        if (imageUrl === undefined && description === undefined) {
            result.cities.forEach(city => {
                const cityName = city.name;
                const imageUrla = city.imageUrl;
                const descriptiona = city.description;
                
                divCard.innerHTML += `
                    <div>
                        <h4 style="margin-left:1rem;">${cityName}</h4>
                        <img src="${imageUrla}" class="resultImg">
                        <p" style="margin-left:1rem;">${descriptiona}</p>
                        <button style="margin-left:1rem; padding:4px; background-color:lightgreen; color:white;">Book Now: ${cityName}</button>
                    </div>
                `;
            });
        } else {
            divCard.innerHTML += `
                <div>
                    <img src="${imageUrl}" class="resultImg">
                    <p style="margin-left:1rem;">${description}</p>
                    <button style="margin-left:1rem; padding:4px; background-color:lightgreen; color:white;">Book Now: ${name}</button>
                </div>
            `;
        }
        
        i++;
    });
}

// Clear Funktion

function clearInput() {
    document.getElementById("form_input_search").value = "";
    let div = document.getElementById("result");
    div.innerHTML = "";
    div.className="";
    div.classList.add("inactiv");
}


const search_btn = document.getElementById("btn_search");
const clear_btn = document.getElementById("btn_clear");

// Event listener buttons
search_btn.addEventListener("click",function(event){
    event.preventDefault(); 
    result();
});

clear_btn.addEventListener("click",function(event){
    event.preventDefault(); 
    clearInput();
});
