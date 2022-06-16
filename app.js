const api_url = "http://api.giphy.com/v1/gifs/search"
const api_key = "Ek8Ygc5eyrFlzRg6LKNS5IKRH2kmIgzX"

const searchFormEl = document.querySelector("#search-form")
const searchFormTextEl = document.querySelector("#query")

const gifContainerEl = document.querySelector("#gif-container")

const loadMoreButtonEl = document.querySelector("#load-more")
let currentOffset = 0
let searchTerm = ''

function populateGif(gif){
    gifContainerEl.innerHTML += `<img class="gif" src="${gif.images.fixed_width_small.url}" alt="">`
}

function searchGifs(query, offset){
    fetch(api_url + `?api_key=${api_key}&q=${query}&offset=${offset}&limit=10`).then(response => {
        if(!response.ok) throw new Error(`Request to giphy failed with status ${response.status}`)
        return response.json()
    }).then(data => {
        data.data.forEach((gif) => {
            populateGif(gif)
        })
        currentOffset += data.data.length
        if(loadMoreButtonEl.classList.contains('hidden')){
            loadMoreButtonEl.classList.remove('hidden')
        }
    })
}

window.onload = function () {
    searchFormEl.addEventListener('submit', (event) => {
        event.preventDefault()
        gifContainerEl.innerHTML = ``
        currentOffset = 0
        searchTerm = searchFormTextEl.value
        searchGifs(searchFormTextEl.value, 0)
    })

    loadMoreButtonEl.addEventListener('click', (event) => {
        console.log("Load more")
        console.log(searchTerm)
        console.log(currentOffset)
        searchGifs(searchTerm, currentOffset)
    })
}