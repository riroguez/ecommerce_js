import { pagination as e, contentCourses as t, listCart as o, totalPrice as s, numberCourses as r, insertMethodPay as a } from "./selectors.js"; let courseData = [], total = 0; export function showCourses(o) {
    for (; t.firstChild;)t.removeChild(t.firstChild); for (o.forEach(e => {
        let { image: o, title: s, price: r, id: a } = e, c = document.createElement("DIV"); c.classList.add("course__info"), c.innerHTML = `
            <img src="${o}" alt="image course">
            <div class="course__content">
                <h3>${s}</h3>
                <p>Geovanny Rios</p>
                <div class="course__start">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div class="course__price">
                    <p>$200</p>
                    <p class="price">$${r}</p>
                </div>
                <button type="button" class="btnAdd" id="addCourse" data-id="${a}">Add To Cart</button>
            </div>
        `, t.appendChild(c); let l = document.querySelectorAll("#addCourse"); l.forEach(e => e.addEventListener("click", selectCourse))
    }); e.firstChild;)e.removeChild(e.firstChild)
} function selectCourse(e) { let t = e.target.parentElement.parentElement; dataCourse(t) } function dataCourse(e) { let t = { image: e.querySelector("img").src, title: e.querySelector("h3").textContent, price: e.querySelector(".price").textContent, id: e.querySelector('button[type="button"]').dataset.id, quantity: 1 }; if (courseData.some(e => e.id === t.id)) { let o = courseData.map(e => (e.id === t.id && e.quantity++, e)); (courseData = [...o]).forEach(e => { showAlert(`El curso se agrego ${e.quantity} veces`, "success") }) } else courseData = [...courseData, t], showAlert("El curso se agrego correctamente", "success"); courseHTML(), total = getTotal(), countCourses() } function courseHTML() {
    cleanHTML(), courseData.forEach(e => {
        let { image: t, title: s, price: r, quantity: a, id: c } = e, l = document.createElement("tr"); l.innerHTML = `
            <td>
                <img class="img-cart" src="${t}" width="100">
            </td>
            <td>${s}</td>
            <td>${r}</td>
            <td>${a}</td>
            <td>
                <button type="button" class="delete-course" id="delete-course" data-id="${c}">
                    X
                </button>
            </td>
        `, o.appendChild(l)
    }); let e = document.querySelectorAll("#delete-course"); e.forEach(e => e.addEventListener("click", deleteCourse)), showButtonPay(), courseStorage()
} function courseStorage() { localStorage.setItem("courseData", JSON.stringify(courseData)) } function cleanHTML() { for (; o.firstChild;)o.removeChild(o.firstChild) } function showAlert(e, t) { let o = document.querySelector(".alert"); o && o.remove(); let s = document.createElement("div"); s.textContent = e, s.classList.add("alert", t), document.body.appendChild(s), setTimeout(() => { let e = document.querySelector(".alert"); e.classList.add("emptyAlerts"), setTimeout(() => { s.remove() }, 400) }, 3e3) } function deleteCourse(e) { let t = parseInt(e.target.dataset.id); courseData = courseData.filter(e => parseInt(e.id) !== t), courseHTML(), getTotal(), countCourses(), showAlert("El curso se elimino exitosamente", "success") } export function emptyAllCart() { courseData = [], cleanHTML(), showAlert("El carrito est\xe1 vac\xedo", "success"), getTotal(), countCourses(), showButtonPay() } function getTotal() { let e, t = courseData.reduce((t, o) => e = t + parseFloat(o.price.slice(1)) * o.quantity, 0); s.textContent = `$${t.toFixed(2)}` } function countCourses() { r.textContent = courseData.length } function showButtonPay() { let e = courseData.length, t = document.querySelector(".btn-pay"); t && t.remove(); let o = document.createElement("button"); o.type = "button", o.textContent = "Pay Now", o.classList.add("btn-pay"), e > 0 ? a.appendChild(o) : o.remove() } export function showStorage() { courseData = JSON.parse(localStorage.getItem("courseData")) || [], courseHTML(), countCourses() }