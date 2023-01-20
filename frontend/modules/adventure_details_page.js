import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventuredata=new URLSearchParams(search);
  let aid= adventuredata.get("adventure");
  // Place holder for functionality to work in the Stubs
  return aid;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  
  try{
    let Adetails=await fetch(config.backendEndpoint+`/adventures/detail/?adventure=${adventureId}`);
    
    let adventuredataAdetails= await Adetails.json();
    return adventuredataAdetails;
    }
  catch(err){return null;}

}

  // Place holder for functionality to work in the Stubs
 // return null;

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let head=document.getElementById("adventure-name")
head.textContent=adventure.name;
let subhead=document.getElementById("adventure-subtitle")
subhead.textContent=adventure.subtitle
adventure.images.forEach((image, imageIndex) => {
 
  let maindiv=document.createElement("div")
  maindiv.className="carousel slide"
  maindiv.id="carousel"
  //maindiv.data-bs-ride ="carousel";

  let submain=document.createElement("div")
  submain.className='carousel-inner'

  maindiv.append(submain);

  let carouselItemDiv = document.createElement("div");
  carouselItemDiv.className = `carousel-item ${
    imageIndex === 0 ? " active" : ""
  }`;
  carouselItemDiv.innerHTML = `<img class="activity-card-image d-block w-100" src=${image}/>`;
submain.append(carouselItemDiv)
  document.getElementById("photo-gallery").appendChild(maindiv);
});

let detail=document.getElementById("adventure-content")
detail.textContent=adventure.content
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");

  photoGallery.innerHTML = `<div id="carouselExampleFade" class="carousel slide carousel-fade">
<div class="carousel-inner" id="carousel-inner">
 
  
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`;

  images.forEach((image, imageIndex) => {
    let carouselItemDiv = document.createElement("div");
    carouselItemDiv.className = `carousel-item ${
      imageIndex === 0 ? " active" : ""
    }`;
    carouselItemDiv.innerHTML = `<img class="activity-card-image" src=${image}/>`;
    document.getElementById("carousel-inner").appendChild(carouselItemDiv);
});
  

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
 
  if (adventure["available"] === true) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
    const costPerHead = document.getElementById("reservation-person-cost");
    costPerHead.innerHTML = adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let perperson= document.getElementById("reservation-person-cost").textContent=adventure.costPerHead;
  let total=perperson*persons;
  document.getElementById("reservation-cost").textContent=total;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let mainform=document.getElementById("myForm");
  
  
  mainform.addEventListener('submit',async(e)=>{
  e.preventDefault();
  let url = config.backendEndpoint + "/reservations/new";
  let formData = mainform.elements;
 
  try {
    const postData = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        "name": formData.name.value,
        "date": formData.date.value,
        "person": formData.person.value,
        "adventure": adventure.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await postData.json();
    alert("sucess!");
    } 
    
    catch (err) {
    alert("failed!")
  }

  })


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
