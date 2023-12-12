// import getAppData from "./addAppCart.js"

import getAppData from "./add_app_cart"

const moreBtn = document.querySelector('.load_more_btn')
const countElements = 6
let page_Count = 6

moreBtn.addEventListener('click', (e) => {
    page_Count = page_Count + countElements
    getAppData(page_Count)
})