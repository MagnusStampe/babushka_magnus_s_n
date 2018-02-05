let menu;

let sizeLong = "medium/";
let sizeShort = "-md";

document.addEventListener("DOMContentLoaded", () => {

    getJson();

});

async function getJson() {

    //Fetch JSON
    let jsonData = await fetch("menu.json");

    //Set menu to JSON
    menu = await jsonData.json();

    //Display menu in HTML
    show(menu, "Hele menuen");

    dishFilter();
}



function show(menu, dishHeadline) {



    //Destination where code will be cloned to
    let dest = document.querySelector("[data-dishList]");

    //Template of code to be cloned
    let temp = document.querySelector("[data-dishTemplate]");

    //Reset HTML in destination
    dest.innerHTML = "";

    //Set headline
    document.querySelector("#dish_headline").textContent = dishHeadline;

    menu.forEach(dish => {

        //Makes "clone" deciding what is to be cloned
        let clone = temp.cloneNode(true).content;

        //Make title
        clone.querySelector("[data-dishTitle]").textContent = dish.navn;

        //Make photo
        clone.querySelector("[data-dishImage]").src = "img/" + sizeLong + dish.billede + sizeShort + ".jpg";
        clone.querySelector("[data-dishImage]").alt = dish.billede;

        //Make description
        clone.querySelector("[data-dishDescribtion]").textContent = dish.kortbeskrivelse;

        //Make pricetag
        clone.querySelector("[data-dishPrice]").textContent = dish.pris + " kr";

        //Insert the cloned elements
        dest.appendChild(clone);
    });
}

function dishFilter() {
    console.log("Filters");

    let forretter = menu.filter(dish => dish.kategori == "forretter");
    let hovedretter = menu.filter(dish => dish.kategori == "hovedretter");
    let desserter = menu.filter(dish => dish.kategori == "desserter");
    let drikkevarer = menu.filter(dish => dish.kategori == "drikkevarer");
    let sideorders = menu.filter(dish => dish.kategori == "sideorders");

    document.querySelector("#alle").addEventListener("click", () => {
        show(menu, "Hele menuen");
    });

    document.querySelector("#forretter").addEventListener("click", () => {
        show(forretter, "Forretter");
    });

    document.querySelector("#hovedretter").addEventListener("click", () => {
        show(hovedretter, "Hovedretter");
    });

    document.querySelector("#desserter").addEventListener("click", () => {
        show(desserter, "Desserter");
    });

    document.querySelector("#drikkevarer").addEventListener("click", () => {
        show(drikkevarer, "Drikkevarer");
    });

    document.querySelector("#sideorders").addEventListener("click", () => {
        show(sideorders, "Sideorders");
    });
}
