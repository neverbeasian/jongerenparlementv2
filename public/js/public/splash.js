var axios
document.getElementById(`results`).style = "display: none"
document.getElementById(`request`).style = "display: none"
setTimeout(() => {
    document.getElementById(`loader`).classList.remove(`is-active`)
}, 200)


document.getElementById(`name`).addEventListener(`input`, async function (Event) {
    document.getElementById(`name`).classList.remove(`is-danger`)
    document.getElementById(`query`).classList.remove(`is-danger`)
    document.getElementById(`query-desc`).classList.remove(`is-danger`)
})

document.getElementById(`query`).addEventListener(`input`, async function (Event) {
    document.getElementById(`name`).classList.remove(`is-danger`)
    document.getElementById(`query`).classList.remove(`is-danger`)
    document.getElementById(`query-desc`).classList.remove(`is-danger`)
})

document.getElementById(`query-desc`).addEventListener(`input`, async function (Event) {
    document.getElementById(`name`).classList.remove(`is-danger`)
    document.getElementById(`query`).classList.remove(`is-danger`)
    document.getElementById(`query-desc`).classList.remove(`is-danger`)
})

document.getElementById(`search`).addEventListener(`click`, () => {
    if (document.getElementById(`name`).value == `` && document.getElementById(`query`).value == `` && document.getElementById(`query-desc`).value == ``) {
        document.getElementById(`name`).classList.add(`is-danger`)
        document.getElementById(`query`).classList.add(`is-danger`)
        document.getElementById(`query-desc`).classList.add(`is-danger`)
        return;
    }

    if (document.getElementById(`query`).value == `` && document.getElementById(`query-desc`).value == ``) {
        document.getElementById(`query`).classList.add(`is-danger`)
        document.getElementById(`query-desc`).classList.add(`is-danger`)
        return;
    }

    if (document.getElementById(`name`).value == `` && document.getElementById(`query-desc`).value == ``) {
        document.getElementById(`name`).classList.add(`is-danger`)
        document.getElementById(`query-desc`).classList.add(`is-danger`)
        return;
    }

    if (document.getElementById(`name`).value == `` && document.getElementById(`query`).value == ``) {
        document.getElementById(`name`).classList.add(`is-danger`)
        document.getElementById(`query`).classList.add(`is-danger`)
        return;
    }

    if (document.getElementById(`name`).value == ``) {
        document.getElementById(`name`).classList.add(`is-danger`)
        return;
    }

    if (document.getElementById(`query`).value == ``) {
        document.getElementById(`query`).classList.add(`is-danger`)
        return;
    }

    if (document.getElementById(`query-desc`).value == ``) {
        document.getElementById(`query-desc`).classList.add(`is-danger`)
        return;
    }
    document.getElementById(`search`).classList.add(`is-loading`)
    document.getElementById(`company`).classList.remove(`animate__fadeInDown`)
    document.getElementById(`company`).classList.add(`animate__fadeOutUp`)
    setTimeout(async () => {

        document.getElementById(`searching`).classList.add(`animate__fadeOutleft`)
        document.getElementById(`loader`).classList.add(`is-active`)
        var Query = document.getElementById(`query`).value, Results
        await axios.get(`http://localhost:8000/api/v1/search?quest=${Query}`).then(async function (response) {
            var Results = response.data
            for (let Data in Results) {
                var Audio = Results[Data].items
                for (let Data in Audio) {
                    var Albumcache = [], Artistscache = []
                    Artist = Audio[Data].album.artists
                    Images = Audio[Data].album.images
                    for (let Data in Artist) {
                        Artistscache.push(` ` + Artist[Data].name)
                    }
                    for (let Data in Images) {
                        if (Images[Data].height == 640) {
                            Albumcache.push(Images[Data].url)
                        }
                    }

                    document.getElementById(`list`).insertAdjacentHTML(`beforeend`, `
                <div class="column is-2 is-offset-0 animate__animated has-text-centered" id="album-${Audio[Data].id}">
                    <figure class="image is-inline-block is-48x58 animate__animated"><img
                            class="is-radius" src="${Albumcache}" id="img-${Audio[Data].id}"></figure><br><br>
                    <h1 class="title is-5 animate__animated" id="title">${Audio[Data].name}</h1>
                    <h1 class="subtitle is-7 animate__animated" id="subtitle">${Artistscache}</h1>
                    <audio id="preview-${Audio[Data].id}" src="${Audio[Data].preview_url}"></audio>
                    <a id="audio-${Audio[Data].id}" value="${Audio[Data].id}" class="button button-special is-rounded animate__animated">
                        <span class="icon has-text-discord"><i class="fad fa-check"></i></span>
                        <span>Kies dit</span>
                    </a>
                </div>
                `)
                    document.getElementById(`audio-${Audio[Data].id}`).addEventListener(`click`, () => {
                        document.getElementById(`results`).classList.add(`animate__fadeOutUp`)
                        document.getElementById(`results`).style = "display: none"
                        document.getElementById(`request`).style = "display: block"
                        document.getElementById(`request`).classList.remove(`animate__fadeOutDownBig`)
                        document.getElementById(`request`).classList.add(`animate__fadeInUp`)
                        var AudioId = Audio[Data].id
                        for (let Data in Audio) {
                            if (Audio[Data].id == AudioId) {
                                var Albumcache = [], Artistscache = []
                                Artist = Audio[Data].album.artists
                                Images = Audio[Data].album.images
                                for (let Data in Artist) {
                                    Artistscache.push(` ` + Artist[Data].name)
                                }
                                for (let Data in Images) {
                                    if (Images[Data].height == 640) {
                                        Albumcache.push(Images[Data].url)
                                    }
                                }
                                document.getElementById(`is-request`).insertAdjacentHTML(`beforeend`, `
                                <div class="column is-6 is-offset-1">
                                <h1 class="title is-1 animate__animated" id="title">Jouw <span class="is-green">favoriete</span>
                                stukje muziek</h1>
                            <h1 class="title is-5 animate__animated" id="title">Hier kan je snel nog wat dingetjes veranderen</h1>
                            <h1 class="subtitle is-6 animate__animated" id="subtitle">Dit is de laatste stap voor dat je het aanvraagt, wil je snel nog iets veranderen want dit is je kans. Wij hebben het recht om liedjes dat ongepast zijn te verwijderen van onze playlisten.</h1>
                            <br>
                            <div class="column is-offset-0 is-7 has-text-centered animate__animated animate__fadeInUp"
                            id="columns">
                            <div class="field animate__animated animate__fadeInUp">
                                <input id="name-final" class="input" type="text" placeholder="${document.getElementById(`name`).value}">
                            </div>
                            <div class="control" id="box">
                                <textarea id="query-desc-final"" class="textarea"
                                    placeholder="${document.getElementById(`query-desc`).value}"></textarea>
                            </div>

                                    <br><br>
            
                                    <a id="request-${Audio[Data].id}" class="button button-special is-rounded animate__animated animate__fadeInUp">
                                        <span class="icon has-text-discord"><i class="fad fa-plus"></i></span>
                                        <span><strong>${Audio[Data].name}</strong> aanvragen</span>
                                    </a>
                                </div>
                                </div>
                                <div class="column is-3 is-offset-1 animate__animated has-text-centered" id="album">
                                    <br><br><br>
                                    <figure class="image is-inline-block is-48x58 animate__animated animate__fadeInUp"><img
                                            class="is-radius" src="${Albumcache}" id="img-${Audio[Data].id}"></figure><br><br>
                                    <h1 class="title is-5 animate__animated animate__fadeInUp" id="title">${Audio[Data].name}</h1>
                                    <h1 class="subtitle is-7 animate__animated animate__fadeInUp" id="subtitle">${Artistscache}</h1>
                                </div>
                    `)
                                document.getElementById(`request-${Audio[Data].id}`).addEventListener(`click`, async () => {
                                    document.getElementById(`loader`).classList.add(`is-active`)
                                    document.getElementById(`request`).classList.remove(`animate__fadeOutDownBig`)
                                    document.getElementById(`request`).classList.add(`animate__fadeOutLeft`)
                                    console.log(`b`)
                                    var AudioId = Audio[Data].id
                                    for (let Data in Audio) {
                                        if (Audio[Data].id == AudioId) {
                                            var Albumcache = [], Artistscache = []
                                            Artist = Audio[Data].album.artists
                                            Images = Audio[Data].album.images
                                            for (let Data in Artist) {
                                                Artistscache.push(` ` + Artist[Data].name)
                                            }
                                            for (let Data in Images) {
                                                if (Images[Data].height == 640) {
                                                    Albumcache.push(Images[Data].url)
                                                }
                                            }
                                            console.log(`requested`)
                                            axios.get(`http://localhost:8000/api/v1/request?id=${Audio[Data].id}&authors=${Artistscache}&album=${Albumcache}&name=${Audio[Data].name}&requester=${document.getElementById(`name`).value}&desc=${document.getElementById(`query-desc`).value}`).then(async function (response) { })
                                            setTimeout(() => {
                                                window.location.replace(`/requested`)
                                                document.getElementById(`loader`).classList.remove(`is-active`)
                                            }, 800)
                                        }
                                    }
                                })

                            }
                        }
                    })
                }
            }
        })
        setTimeout(() => {
            document.getElementById(`results`).style = "display: block"
            document.getElementById(`searching`).style = "display: none"
            document.getElementById(`company`).classList.remove(`animate__fadeOutUp`)
            document.getElementById(`company`).classList.add(`animate__fadeInDown`)
            document.getElementById(`loader`).classList.remove(`is-active`)
            document.getElementById(`results`).classList.remove(`animate__fadeOutDownBig`)
            document.getElementById(`results`).classList.add(`animate__fadeInUp`)
        }, 500)
    }, 500)
})


document.getElementById(`backsearching`).addEventListener(`click`, () => {
    document.getElementById(`loader`).classList.add(`is-active`)
    document.getElementById(`list`).innerHTML = ""
    document.getElementById(`results`).classList.remove(`animate__fadeInUp`)
    document.getElementById(`results`).classList.add(`animate__fadeOutDownBig`)
    document.getElementById(`search`).classList.remove(`is-loading`)
    document.getElementById(`company`).classList.remove(`animate__fadeInDown`)
    document.getElementById(`company`).classList.add(`animate__fadeOutUp`)
    setTimeout(() => {
        document.getElementById(`searching`).classList.remove(`animate__fadeOutleft`)
        document.getElementById(`searching`).classList.add(`animate__fadeInleft`)
        document.getElementById(`results`).style = "display: none"
        document.getElementById(`searching`).style = "display: block"
        document.getElementById(`loader`).classList.remove(`is-active`)
    }, 500)
}, 500)

