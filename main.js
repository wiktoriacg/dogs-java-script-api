let timer
let deleteFirstPhotoDelay
async function start() {
    try{
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        createBreedList(data.message);
    }catch(e){
        console.log("There was a problem fetching the breed list")
    }
}

start();

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
          <option>Choose a dog breed</option>
          ${Object.keys(breedList).map(function (breed) {
              return `<option>${breed}</option>`;
          }).join('')}
    </select>
    `;
}

async function loadByBreed(breed) {
    if (breed !== "Choose a dog breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json();
        createSlideShow(data.message);
    }
}

function createSlideShow(images) {
    let currentPosition = 0;
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
    if(images.length >1){
        const slideshow = document.getElementById("slideshow");
        slideshow.innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}');"></div>
        <div class="slide" style="background-image: url('${images[1]}');"></div>
        `;
        currentPosition = 2;
        if(images.length == 2)currentPosition = 0
        timer = setInterval(nextSlide, 3000);
    }else{
        const slideshow = document.getElementById("slideshow");
        slideshow.innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}');"></div>
        <div class="slide"></div>
        `;
    }
    

    function nextSlide() {
        if (currentPosition >= images.length) {
            currentPosition = 0;
        }

    
        const newSlide = document.createElement("div");
        newSlide.classList.add("slide");
        newSlide.style.backgroundImage = `url('${images[currentPosition]}')`;
        slideshow.appendChild(newSlide);

        
        deleteFirstPhotoDelay= setTimeout(() => {
            const slides = document.querySelectorAll(".slide");
            if (slides.length > 2) {
                slides[0].remove();
            }
        }, 1000);

        currentPosition++;
    }
}
