import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
   const response = await fetch(config.backendEndpoint +"/cities"); 
  const c= await response.json();
  return c;
  
	}
catch(err)
{
 return null;
}
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
let inner=`<a href="pages/adventures/?city=${id}" id=${id}>
<div class="tile">
      <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
      </div>
      <img src="${image}" alt=${city}class="">
</div>  
</a>`
let datacontainer=document.getElementById("data")
let card=document.createElement("div");
card.setAttribute("class","col-lg-3 col-md-6 col-xm-12 m-3")
card.innerHTML=inner;
datacontainer.append(card)
}

export { init, fetchCities, addCityToDOM };
