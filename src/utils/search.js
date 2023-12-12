import addTemplates from "./addTemplates";
import getData from "./getData";
import searchFillTemplate from "../templates/largCart.hbs";

const form = document.querySelector(".search_form");
const cartBox = document.querySelector(".app_box");

form.addEventListener("submit", onSearchFormSubmit);

function onSearchFormSubmit(e) {
  e.preventDefault();
  console.log(e);
  let searchData = e.target.children[1].value;
  console.log(searchData);
  getData(`http://localhost:8000/apps?q=${searchData}`).then((data) =>
    addTemplates(searchFillTemplate, cartBox, data)
  );
  e.target.children[1].value = "";
}
