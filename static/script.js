addEventListener("DOMContentLoaded", async () => {

    const divCupcakes = document.getElementById("cupcakes");
    const arrayDivs = await getCupcakes();
    const btn = document.getElementById("button")

    function appendCupcakes(each_div) {
        divCupcakes.append(each_div);
    };

    arrayDivs.forEach(appendCupcakes);

    btn.addEventListener("click", async function(event) {
        event.preventDefault()
        const flavorInput = event.target.parentElement.firstElementChild.nextElementSibling
        const sizeInput = flavorInput.nextElementSibling.nextElementSibling
        const ratingInput = sizeInput.nextElementSibling.nextElementSibling
        const imageInput = ratingInput.nextElementSibling.nextElementSibling

        const newCupcake = await sendForm(flavorInput.value, sizeInput.value, ratingInput.value, imageInput.value)

        const newHtmlCupcake = makeCupcakeHTML(newCupcake)

        appendCupcakes(newHtmlCupcake)
    })

});

async function getCupcakes() {
    const objData = await axios.get("/api/cupcakes");
    const arrayCupcakes = objData.data.cupcakes;
    const htmlCupcakes = arrayCupcakes.map(makeCupcakeHTML);

    return htmlCupcakes;
};

function makeCupcakeHTML(objCupcake) {
    const div = document.createElement("div");

    const flavor = document.createElement("p");
    flavor.innerHTML = `<b>Flavor: </b>${objCupcake.flavor}`;
    div.append(flavor);

    const size = document.createElement("p");
    size.innerHTML = `<b>Size: </b>${objCupcake.size}`;
    div.append(size);

    const rating = document.createElement("p");
    rating.innerHTML = `<b>Rating: </b>${objCupcake.rating}`;
    div.append(rating);

    const image = document.createElement("img");
    image.setAttribute("src", objCupcake.image);
    image.setAttribute("height", "200")
    div.append(image);

    return div;
};

async function sendForm(flavorValue, sizeValue, ratingValue, imageValue) {
    const objectData = {
        flavor: flavorValue,
        size: sizeValue,
        rating: ratingValue,
        image: imageValue
    }

    const objResult = await axios.post("/api/cupcakes", objectData)
    console.log(objResult.data.cupcake)
    return objResult.data.cupcake
}