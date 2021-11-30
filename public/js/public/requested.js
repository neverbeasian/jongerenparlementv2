document.getElementById(`return`).addEventListener(`click`, () => {
    window.location.replace(`/`)
})

setTimeout(() => {
    document.getElementById(`loader`).classList.remove(`is-active`)
}, 800)