let img = document.querySelector("img");
let post = document.querySelector(".post");
let input = document.querySelector("input");
let h2 = document.querySelector(".name");
let tag = document.querySelector(".tag");
let year = document.querySelector(".year");
let h4 = document.querySelector("h4");
let summery = document.querySelector(".summery");
let button = document.querySelector(".btn");

button.addEventListener("click", returnValue);

async function returnValue(e) {
  let movieName = input.value.trim();
  let newUrl = `https://www.omdbapi.com/?s=${movieName}&page=1&apikey=651802ca`;

  try {
    var movieData = await getImg(newUrl);
    addMovies(movieData);
    if (movieData && movieData.length > 0) {
      updateUI(movieData[0]); // Update UI with the first result
    } else {
      // Clear UI if no results found
      clearUI();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getImg(url) {
  try {
    let response = await axios.get(url);
    return response.data.Search;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function updateUI(movie) {
  img.src = movie.Poster;
  post.src = movie.Poster;
  year.innerText = movie.Year;
  h4.innerText = movie.imdbID;
  h2.innerText = movie.Title;
  tag.innerText = movie.Title;
  summery.innerText = movie.Plot;
}

function clearUI() {
  img.src = "";
  post.src = "";
  year.innerText = "";
  h4.innerText = "";
  h2.innerText = "";
  tag.innerText = "";
  summery.innerText = "";
}

function addMovies(movieData) {
  if (movieData && movieData.length > 0) {
    let clutter = "";
    movieData.forEach(movie => {
      clutter += `
        <div class="suggest-list">
          <div class="small-pic">
            <img src="${movie.Poster}" alt="" class="thumbnail">
          </div>
          <div>
            <h2 class="search-title tag">${movie.Title}</h2>
          </div>
        </div>`;
    });
    document.querySelector(".main-suggest").innerHTML = clutter;
  } else {
    document.querySelector(".main-suggest").innerHTML = "<p>No movies found.</p>";
  }
}
