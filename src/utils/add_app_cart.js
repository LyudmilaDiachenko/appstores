import getData from "./getData"

const cartBox = document.querySelector(".app_box")

export default function getAppData(value = 6) {
    getData(`http://localhost:8000/apps?_page=1&_limit=${value}`)
    .then(data => {
        localStorage.setItem("app_data", JSON.stringify(data))
        return data
    })
    .then(data => addElement(data))    
}

function addElement(data) {
    const newCart = data.map(({ id, title, description, app_img, license }) => {
        return `<article class="app_cart">
        <div class="head">
            <img src="${app_img}" class="company_icon" alt="">
            <ul>
            <li class="name">${title}</li>
            <li class="status">${license}</li>
            </ul>
        </div>
        <p class="cart_desc">
            ${description}
        </p>
        <div class="control">
            <div class="icon">
            <svg width="30" height="30">
                <use href="../src/img/symbol-defs.svg#icon-heart"></use>
            </svg>
            <svg width="30" height="30">
                <use href="../src/img/symbol-defs.svg#icon-folder-plus"></use>
            </svg>
            </div>
            <a class="btnApp" href="/appPage.html" data-set="${id}">Visit</a>
        </div>
    </article>`
    }).join('');
    cartBox.innerHTML = newCart;
    const appButtons = document.querySelectorAll(".btnApp")
    appButtons.forEach(button => {
        button.addEventListener("click", e => {
            e.preventDefault()
            localStorage.setItem("currentId", JSON.stringify(button.dataset.set))
            window.location.href = "/appPage.html"
        })
    })
}
getAppData()