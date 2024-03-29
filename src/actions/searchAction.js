import { cardEvent } from "./restaurantCardAction";

export const searchAction = () => {
    document.getElementById("field-search-restaurant").addEventListener("keyup", function(){
        if(this.value !== ""){
            let res = search(this.value);
            createResultBox(this, res);
        }else{
            let mainBlock = document.getElementById("block-result-search");
            if(mainBlock){
                mainBlock.remove();
            }
        }
    })
}

function search(value){
    let val = value.toLowerCase();
    let restaurants = JSON.parse(window.localStorage.getItem("restaurants"));
    return restaurants.map(element => {
        if((element.name).toLowerCase().startsWith(val)
        || (element.phone).toLowerCase().startsWith(val)
        || (element.city).toLowerCase().startsWith(val)
        || (element.postal_code).toString().startsWith(val)){
            return element;
        }
    });
}

function createResultBox(el, res){
    let mainBlock = document.getElementById("block-result-search");
    if(mainBlock){
        mainBlock.remove();
    }
    let parent = el.parentNode;
    let mainBlockdocument = document.createElement("div");
    mainBlockdocument.setAttribute("class", "block-result-search");
    mainBlockdocument.setAttribute("id", "block-result-search");
    res.map(el => {
        if(el !== undefined){
            let cta = document.createElement("button");
            cta.setAttribute("class", "cta-result-search flex");
            cta.setAttribute("title", el.name);
            cta.setAttribute("data-postalcode", el.postal_code);
            cta.setAttribute("data-name", el.name);
            cta.setAttribute("data-id", el.id);
            let resImg = document.createElement("div");
            resImg.setAttribute("class", "img");
            resImg.setAttribute("style", `background-image: url(${el.background_image});`);
            let resContent = document.createElement("div");
            resContent.setAttribute("class", "flex column resut-text-content");

            let p1 = document.createElement("p");
            p1.append(el.name)

            let p2 = document.createElement("p");
            p2.append(el.adresse + ", " + el.postal_code + " " + el.city);

            let p3 = document.createElement("p");
            p3.append(el.phone);

            mainBlockdocument.append(cta);
            cta.append(resImg);
            cta.append(resContent);
            resContent.append(p1);
            resContent.append(p2);
            resContent.append(p3);
            parent.append(mainBlockdocument);

            cardEvent(cta);
        }
    })
}