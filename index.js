MOVIE = "http://localhost:3000/films"

var localData;


document.addEventListener("DOMContentLoaded", () => {
    addForm = document.querySelector("#create-movie")
    fetchData();
    searchMovie()
    // createMovie();

    addForm.addEventListener('submit', e => {
        e.preventDefault()

        // movieObj = {

        //     "title": addForm.title.value,
        //     "description": addForm.description.value

        

        fetch(MOVIE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "title": addForm.title.value, "description": addForm.description.value })

        })



        // postMovie(movieObj)

    })

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

    const searchButton = document.querySelector("#search-button");


    searchButton.addEventListener("submit", function () {
        findMovie(searchInput)
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

// function createMovie() {

//     createButton.addEventListener("click", function () {
//         findMovie(input.value)
//     })

// }