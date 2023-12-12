addEventListener("DOMContentLoaded", async () => {

    const div_cupcakes = document.getElementById("cupcakes");
    const array_divs = await getCupcakes();
    array_divs.forEach(appendCupcakes);
    
    function appendCupcakes(each_div) {
        div_cupcakes.append(each_div);
    };
});

async function getCupcakes() {
    const obj_data = await axios.get("/api/cupcakes");
    const array_cupcakes = obj_data.data.cupcakes;
    const html_cupcakes = array_cupcakes.map(makeCupcakeHTML);

    return html_cupcakes;
};

function makeCupcakeHTML(obj_cupcake) {
    const div = document.createElement("div");

    const flavor = document.createElement("p");
    flavor.innerHTML = `<b>Flavor: </b>${obj_cupcake.flavor}`;
    div.append(flavor);

    const size = document.createElement("p");
    size.innerHTML = `<b>Size: </b>${obj_cupcake.size}`;
    div.append(size);

    const rating = document.createElement("p");
    rating.innerHTML = `<b>Rating: </b>${obj_cupcake.rating}`;
    div.append(rating);

    const image = document.createElement("img");
    image.setAttribute("src", obj_cupcake.image);
    image.setAttribute("height", "200")
    div.append(image);

    return div;
};
