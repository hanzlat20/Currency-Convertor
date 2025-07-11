const BASE_URL = "https://api.exchangerate-api.com/v4/latest";
let dropdowns = document.querySelectorAll(".drop-down select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");


for(let drop of dropdowns){
    for(currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.innervalue = currCode;
    drop.append(newOption);

    if( drop.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
    }
    else if(drop.name === "to" && currCode === "PKR"){
        newOption.selected = "selected";
    }
}
drop.addEventListener("click", (evt) => {
    updatFlag(evt.target);
});
}

const updatFlag = (element) => {
    let currCode = element.value;
    let flagCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    let newSource = `https://flagsapi.com/${flagCode}/flat/64.png`;
    img.src = newSource;
}

btn.addEventListener("click" , async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".enter input");
    let amtVal = amount.value;
    if(amtVal < 1 || amtVal === ""){
        amtVal = 1;
        amount.value = "1";
    }

    let URL = `${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurr.value];
    let finalAmount = rate * amtVal;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})
