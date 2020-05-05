const form = document.getElementById("film-form");

const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clearAll = document.getElementById("clear-films");
// UI objesini Başlatma
const ui = new UI();

//Storage objesi üret
const storage = new Storage();
//Tüm eventleri yükleme

eventListener();

function eventListener() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = storage.getFilmsFromStorage();
        ui.LoadAllFilms(films);
    });

    cardBody.addEventListener("click", deleteFilm);
    clearAll.addEventListener("click", clearAllFilms);

}

function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
    if (title === "" || director === "" || url === "") {
        //Hata
        ui.displayMessages("Tüm alanları doldurun...", "danger"); //Arayüze film ekleme
    }
    else {
        //Yeni Film
        const newFilm = new Film(title, director, url);
        ui.addFilmtoUI(newFilm);
        storage.addFilmToStorage(newFilm);
        ui.displayMessages("Film başarıyla eklendi...", "success");
    }
    ui.clearInputs(titleElement, directorElement, urlElement);
    e.preventDefault();
}

function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme işlemi başarılı...", "success");
    }

}

function clearAllFilms() {
    if (confirm("Emin misiniz?")) {
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }

}