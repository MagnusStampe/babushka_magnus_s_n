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
        clone.querySelector("[data-dishImage]").style.backgroundImage = "url(img/" + sizeLong + dish.billede + sizeShort + ".jpg)";


        //clone.querySelector("[data-dishImage]").src = "img/" + sizeLong + dish.billede + sizeShort + ".jpg";
        //clone.querySelector("[data-dishImage]").alt = dish.billede;

        //Make description
        clone.querySelector("[data-dishShortDescribtion]").textContent = dish.kortbeskrivelse;

        //Make pricetag
        clone.querySelector("[data-dishPrice]").textContent = dish.pris + " kr";

        //Make ID
        clone.querySelector("[data-dish]").setAttribute("data-id", dish.id);

        //Make clickable
        clone.querySelector("[data-dish]").addEventListener("click", openModal);

        //Insert the cloned elements
        dest.appendChild(clone);
    });
}

function openModal() {

    // Set myId to the ID of clicked element [data-dish]
    let myId = this.getAttribute("data-id");

    let single = menu.find(dish => {

        //If cliked dish (myId) equals id of the dish
        if (myId == dish.id) {

            //Make modal visible
            document.querySelector("#popup").style.visibility = "visible";

            //Set popup title
            document.querySelector("[data-popupTitle]").textContent = dish.navn;

            //Set popup image
            document.querySelector("[data-popupImage]").src = "img/" + sizeLong + dish.billede + sizeShort + ".jpg";
            document.querySelector("[data-popupImage]").alt = dish.billede;

            //Set popup price
            document.querySelector("[data-popupPrice]").textContent = dish.pris + " kr";

            //Set long describtion
            document.querySelector("[data-popupLongDescribtion]").textContent = dish.langbeskrivelse;

        }
    })

    //display id of clicked dish in console
    console.log(myId);

    //If .close is clicked, hide popup
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector("#popup").style.visibility = "hidden";
    });

    //If .back_close is clicked, hide popup
    document.querySelector(".back_close").addEventListener("click", () => {
        document.querySelector("#popup").style.visibility = "hidden";
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
    document.querySelector("#alle2").addEventListener("click", () => {
        show(menu, "Hele menuen");
    });

    document.querySelector("#forretter").addEventListener("click", () => {
        show(forretter, "Forretter");
    });
    document.querySelector("#forretter2").addEventListener("click", () => {
        show(forretter, "Forretter");
    });

    document.querySelector("#hovedretter").addEventListener("click", () => {
        show(hovedretter, "Hovedretter");
    });
    document.querySelector("#hovedretter2").addEventListener("click", () => {
        show(hovedretter, "Hovedretter");
    });

    document.querySelector("#desserter").addEventListener("click", () => {
        show(desserter, "Desserter");
    });
    document.querySelector("#desserter2").addEventListener("click", () => {
        show(desserter, "Desserter");
    });

    document.querySelector("#drikkevarer").addEventListener("click", () => {
        show(drikkevarer, "Drikkevarer");
    });
    document.querySelector("#drikkevarer2").addEventListener("click", () => {
        show(drikkevarer, "Drikkevarer");
    });

    document.querySelector("#sideorders").addEventListener("click", () => {
        show(sideorders, "Sideorders");
    });
    document.querySelector("#sideorders2").addEventListener("click", () => {
        show(sideorders, "Sideorders");
    });
}
