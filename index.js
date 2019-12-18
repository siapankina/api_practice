MOVIE = "https://ghibliapi.herokuapp.com/films"

var localData;

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    searchMovie()
})



function fetchData() {
    fetch(MOVIE)
        .then(resp => resp.json())
        .then(data => allMovies(data));


}

function allMovies(data) {

    localStorage.setItem('data', JSON.stringify(data));
    localData = JSON.parse(localStorage.getItem("data") || "[]");

    for (let i = 0; i < data.length; i++) {
        postMovie(data[i])
    }
}

function postMovie(movie) {

    const main = document.querySelector("main")
    const movieDiv = document.createElement('div');
    movieDiv.id = "show-panel";
    const showPanel = document.querySelector("#show-panel")
    movieDiv.innerText = movie.title
    const p = document.createElement('p');
    p.innerText = movie.description;
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete Movie";
    movieDiv.append(p, deleteButton);
    deleteButton.addEventListener('click', function () {
        deleteMovie(movie.id, movieDiv)
    })
    main.appendChild(movieDiv);


}

function deleteMovie(movie_id, movie_div) {
    fetch(MOVIE + "/" + movie_id, {
        method: "DELETE"

    });
    movie_div.remove();

}

// search 

function searchMovie() {
    const header = document.querySelector("header")
    const input = document.createElement("input");
    const searchButton = document.createElement("button");
    searchButton.innerText = "Search";

    header.append(input);
    header.append(searchButton);
    searchButton.addEventListener("click", function () {
        findMovie(input.value)
    })
}

// function fetchDataSearch(title) {
//     fetch(MOVIE)
//         .then(resp => resp.json())

//         .then(data => found(data, title));


// }

function findMovie(searchTerm) {

    const found = localData.find(movie => movie.title === searchTerm);
    const divs = document.querySelector('main');
    divs.innerHTML = "";
    postMovie(found);

}

function createMovie(){
    
}