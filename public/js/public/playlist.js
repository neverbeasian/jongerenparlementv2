document.getElementById(`return`).addEventListener(`click`, () => {
    setTimeout(async () => {
        document.getElementById(`list`).classList.add(`animate__fadeInUp`)
       window.location.replace(`/`)
}, 200)
})

var axios
setTimeout(async () => {
    document.getElementById(`loader`).classList.remove(`is-active`)
    await axios.get(`http://localhost:8000/api/v1/playlist`).then(async function (response) {
        var Playlist = response.data
        for(let Data in Playlist){
            document.getElementById(`list`).insertAdjacentHTML(`beforeend`, `
                <div class="column is-2 is-offset-1 animate__animated animate__fadeInUp has-text-centered">
                    <figure class="image is-inline-block is-48x58 animate__animated animate__fadeInUp"><img
                            class="is-radius" src="${Playlist[Data].album.img}"></figure><br><br>
                    <h1 class="title is-5 animate__animated animate__fadeInUp" id="title">${Playlist[Data].album.name}</h1>
                    <h1 class="subtitle is-7 animate__animated animate__fadeInUp" id="subtitle">${Playlist[Data].authors.authors}</h1>
                    <h1 class="subtitle is-7 animate__animated animate__fadeInUp" id="subtitle"><strong>${Playlist[Data].likes.count.count}</strong> mensen hebben dit aangevraagd</h1>
                </div>
                `)
        }
    })
}, 800)