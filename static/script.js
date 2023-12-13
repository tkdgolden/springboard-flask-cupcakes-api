/* 
 * wait until DOM is loaded, fetch and display current cupcakes, adds event listener to button
 */
addEventListener('DOMContentLoaded', async () => {

    const divCupcakes = document.getElementById('cupcakes');
    const arrayDivs = await getCupcakes();
    const btn = document.getElementById('button');

    /* 
     * adds cupcake htmlElement to div container
     */
    function appendCupcakes(each_div) {
        divCupcakes.append(each_div);
    };

    arrayDivs.forEach(appendCupcakes);

    btn.addEventListener('click', buttonClick)

});

/* 
 * prevents button default submit, gets form values and calls send function which gives a cupcake object which is sent to makeCupcakeHTML function to return cupcake html element
 * @returns {htmlElement} the html required to display the cupcake
 */
async function buttonClick(event) {
    event.preventDefault()
    const flavorInput = event.target.parentElement.firstElementChild.nextElementSibling;
    const sizeInput = flavorInput.nextElementSibling.nextElementSibling;
    const ratingInput = sizeInput.nextElementSibling.nextElementSibling;
    const imageInput = ratingInput.nextElementSibling.nextElementSibling;

    const newCupcake = await sendForm(flavorInput.value, sizeInput.value, ratingInput.value, imageInput.value);

    const newHtmlCupcake = makeCupcakeHTML(newCupcake);

    appendCupcakes(newHtmlCupcake);
}

/* 
 * sends axios request for all cupcakes in database, returns an array of cupcake HTML elements
 * @returns {htmlElement[]} array of the html required to display each cupcake
 */
async function getCupcakes() {
    const objData = await axios.get('/api/cupcakes');
    const arrayCupcakes = objData.data.cupcakes;
    const htmlCupcakes = arrayCupcakes.map(makeCupcakeHTML);

    return htmlCupcakes;
};

/* 
 * takes a cupcake object and creates the html elements required to display it and appends them all to a div that contains that cupcake
 * @returns {htmlElement} a div containing all the cupcake html
 */
function makeCupcakeHTML(objCupcake) {
    const div = document.createElement('div');

    const flavor = document.createElement('p');
    flavor.innerHTML = `<b>Flavor: </b>${objCupcake.flavor}`;
    div.append(flavor);

    const size = document.createElement('p');
    size.innerHTML = `<b>Size: </b>${objCupcake.size}`;
    div.append(size);

    const rating = document.createElement('p');
    rating.innerHTML = `<b>Rating: </b>${objCupcake.rating}`;
    div.append(rating);

    const image = document.createElement('img');
    image.setAttribute('src', objCupcake.image);
    image.setAttribute('height', '200');
    div.append(image);

    return div;
};

/* 
 * sends the form data as a post request to the api and returns the cupcake object
 * @returns {object} the newly created cupcake as an object
 */
async function sendForm(flavorValue, sizeValue, ratingValue, imageValue) {
    const objectData = {
        flavor: flavorValue,
        size: sizeValue,
        rating: ratingValue,
        image: imageValue
    };

    const objResult = await axios.post('/api/cupcakes', objectData);
    return objResult.data.cupcake;
};