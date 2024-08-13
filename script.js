const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";

//GET ALLGAMES
const getAllGames = async (genre, tag, q) => {
  try {
    let URL_GAMES = `${BASE_URL}/games`;
    if (genre) {
      URL_GAMES = `${BASE_URL}/games?genres=${genre}`;
    }
    if (tag) {
      URL_GAMES = `${BASE_URL}/games?tag=${tag}`;
    }
    if (q) {
      URL_GAMES = `${BASE_URL}/games?q=${q}`;
    }

    const response = await fetch(URL_GAMES);
    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    console.log("err", error.message);
  }
};

// getAllGames();

//RENDER ALLGAMES
const renderAllGames = async () => {
  try {
    const games = await getAllGames();
    console.log(games);
    const AllGamesList = document.getElementById("display");

    games.forEach((x, index) => {
      const gameElement = document.createElement("div");
      gameElement.innerHTML = `
                      
            <div class="game_wrapper">
              <div class="cover" onclick="renderGameDetail(${x.appid})">
                <img src=${x.header_image}>
                <div class="game_info">
                  <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${x.name}</font></font></p>
                  <p></p>
                </div>
              </div>
            </div>
            `;
      AllGamesList.appendChild(gameElement);
    });
  } catch (error) {
    console.log("err", error.message);
  }
};
renderAllGames();

//GET genres list
const getGenresList = async () => {
  try {
    const URL_LIST = `${BASE_URL}/genres`;
    const response = await fetch(URL_LIST);
    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    console.log("err", error.message);
  }
};
getGenresList();

//RENDER genres list
const renderGenresList = async () => {
  try {
    const genres = await getGenresList();

    const category = document.getElementById("category");

    const ulCategory = category.children[0];

    ulCategory.innerHTML = "";

    genres.forEach((genre, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
                  <div onclick="renderGameByGenre('${genre.name}')">
                  <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">${genre.name}</font>
                  </font>
                  </div>`;
      ulCategory.appendChild(li);
    });
  } catch (error) {
    console.log("err", error.message);
  }
};
renderGenresList();

//GET TAGS LIST

const getTagsList = async () => {
  try {
    const URL_TAGS = `${BASE_URL}/steamspy-tags`;
    const response = await fetch(URL_TAGS);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log("err", error.message);
  }
};
getTagsList();

//RENDER TAGS LIST
const renderTagsList = async () => {
  try {
    const tags = await getTagsList();

    const tagsList = document.getElementById("tags");

    tagsList.innerHTML = "1";

    jsonData.data.forEach((tag, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
            <div onclick="renderGameByTag('${tag.name}')">

            `;
    });
  } catch (error) {
    console.log("err", error.message);
  }
};

//GET Game Detail
const getGameDetail = async (id) => {
  try {
    const URL_GAME_DETAIL = `${BASE_URL}/single-game/${id}`;

    const response = await fetch(URL_GAME_DETAIL);

    const jsonData = await response.json();

    console.log("data", jsonData);

    return jsonData.data;
  } catch (error) {
    console.log("err", error.message);
  }
};
// getGameDetail(id);

//RENDER Game Detail
const renderGameDetail = async (id) => {
  try {
    const games = await getGameDetail(id);
    console.log(games);
    const gameDisplay = document.getElementById("display");

    gameDisplay.innerHTML = `<div class="showing_detail">
          <div class="title_contain">
            <div class="title">${games.name}</div>
            <div class="price">${games.price}</div>
          </div>
          <div class="img_detail">
            <img src="${games.header_image}" alt="">
          </div>
          <div class="tags_contain">
            Popular user-defined tags for this product:
            <div class="tags">
              <ul>
                <li>Survival</li>
              </ul>
            </div>
          </div>
        </div>`;

    games.genres.forEach((genre) => {
      const genreElement = document.createElement("li");
      genreElement.textContent = genre;
      document.querySelector(".tags ul").appendChild(genreElement);
    });
  } catch (error) {
    console.log("error", error.message);
  }
};

//RENDER CLICK
const renderGameByGenre = async (genre) => {
  const gameByGenre = await getAllGames(genre, null, null);
  console.log("data", gameByGenre);
  const dataGenre = document.getElementById("display");
  dataGenre.innerHTML = "";
  gameByGenre.forEach((game) => {
    const gameElement = document.createElement("div");
    gameElement.innerHTML = `
                      
            <div class="game_wrapper">
              <div class="cover" onclick="renderGameDetail(${game.appid})">
                <img src=${game.header_image}>
                <div class="game_info">
                  <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${game.name}</font></font></p>
                  <p></p>
                </div>
              </div>
            </div>
            `;
    dataGenre.appendChild(gameElement);
  });
};
const renderGameByTag = async (tag) => {
  const data = await getAllGames(null, tag, null);
  console.log("data", data);
  const gameByTag = document.createElement("display");
  gameByTag.innerHTML = "";
  data.forEach((game) => {
    const gameElement = document.createElement("div");
    gameElement.innerHTML = `
        <div class="game_wrapper">
              <div class="cover" onclick="renderGameDetail(${game.appid})">
                <img src=${game.header_image}>
                <div class="game_info">
                  <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${game.name}</font></font></p>
                  <p></p>
                </div>
              </div>
            </div>
        `;
    game.genres.forEach((genre) => {
      const genreElement = document.createElement("li");
      genreElement.textContent = genre;
      document.querySelector(".tags ul").appendChild(genreElement);
    });
  });
};

// 1 select vao form
const form = document.getElementById("search_Form");

// 2 add event submit cho form, lay value từ input
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchValue = event.target[0].value;
  renderGameBySearch(searchValue);
  console.log(event.target[0].value);
});

// 3 function render data search game

const renderGameBySearch = async (search) => {
  try {
    const data = await getAllGames(null, null, search);
    console.log("data", data);
    const gameBySearch = document.getElementById("display");
    gameBySearch.innerHTML = "";
    console.log(gameBySearch);
    data.forEach((game) => {
      const gameElement = document.createElement("div");
      gameElement.innerHTML = `
            <div class="game_wrapper">
              <div class="cover" onclick="renderGameDetail(${game.appid})">
                <img src=${game.header_image}>
                <div class="game_info">
                  <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${game.name}</font></font></p>
                  <p></p>
                </div>
              </div>
            </div>
            `;
      gameBySearch.appendChild(gameElement);
      console.log(gameBySearch);
    });
  } catch (error) {
    console.log("error", message);
  }
};
