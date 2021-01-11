const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let  totalImages = 0;
let photosArray = [];
// unsplash api
const count = 30;
const apiKey ='K88zVupvflSwHyFlZBcOMiIU-bYei1MyLef2K9J8FiQ';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready=true;
        loader.hidden = true;
    }
}

// helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// creats elements for links and Photos, and add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in photoArrey
    photosArray.forEach((photo) => {
    // create <a> to link to unsplash 
    const item = document.createElement('a');
    setAttributes(item, {
        href:photo.links.html,
        target:'_blank'
    });
    // create <img> to for photos
    const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title:photo.alt_description,
    });
    // event listerner check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // put <img> inside <a>, and then put both diside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}
// get photos from unsplash api
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
// catch erro here
    }
}
// check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll',() =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
    }
});
//On Loads
getPhotos();