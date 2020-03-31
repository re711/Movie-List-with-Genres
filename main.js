(function () {
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'
    const data = []
    const genresList = document.querySelector('#genres-list')
    const dataPanel = document.querySelector('#data-panel')
    const genres = {
        "1": "Action",
        "2": "Adventure",
        "3": "Animation",
        "4": "Comedy",
        "5": "Crime",
        "6": "Documentary",
        "7": "Drama",
        "8": "Family",
        "9": "Fantasy",
        "10": "History",
        "11": "Horror",
        "12": "Music",
        "13": "Mystery",
        "14": "Romance",
        "15": "Science Fiction",
        "16": "TV Movie",
        "17": "Thriller",
        "18": "War",
        "19": "Western"
      }

    axios.get(INDEX_URL).then((response) => {
        data.push(...response.data.results)
        displayDataList(data)
    }).catch((err) => console.log(err))

    genresList.addEventListener('click', event => {
      // console.log(event.target.id)
      let clickGenresId = Number(event.target.id)
      let results = []
      results = data.filter(function (movie) {
        return movie.genres.includes(clickGenresId)
      })
      displayDataList(results)  
    })
    
    function displayGenreList(data) {
      let listContent = ''
      for (let i in data) {
          listContent += `
          <button type="button" class="list-group-item list-group-item-action" id="${[i]}">${genres[i]}</button>        
          `
      }
      genresList.innerHTML = listContent
   }   
    displayGenreList(genres)

    function displayDataList (data) {
        let htmlContent = '' 
        data.forEach(function (item, index) {
          movieGenres = item.genres
          let genresContent =''
          for (let id of movieGenres) {
            genresContent +=`
            <h6 class="badge badge-pill badge-secondary">${genres[id]}</h6>
            `
          }
          htmlContent += `
            <div class="col-sm-4">
              <div class="card mb-2">
                <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
                <div class="card-body movie-item-body">
                  <h6 class="card-title">${item.title}</h6>
                  <div class="row">${genresContent}</div>
                </div>
              </div>
            </div>
          `
        })
        dataPanel.innerHTML = htmlContent
    }

})()