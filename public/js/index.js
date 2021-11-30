
setTimeout(() => {
    document.getElementById(`loader`).classList.remove(`is-active`)
}, 500)

document.getElementById(`request`).addEventListener(`click`, ()=>{
    document.getElementById(`request`).classList.add(`is-loading`)
    document.getElementById(`company`).classList.remove(`animate__fadeInDown`)
    document.getElementById(`company`).classList.add(`animate__fadeOutUp`)
    setTimeout(()=>{
      document.getElementById(`page`).classList.add(`animate__fadeOutRight`)
      setTimeout(()=>{
        document.getElementById(`request`).classList.remove(`is-loading`)
        window.location.replace(`/request`)
      }, 200)
    }, 200)
  })


document.getElementById(`playlist`).addEventListener(`click`, ()=>{
  document.getElementById(`playlist`).classList.add(`is-loading`)
  document.getElementById(`company`).classList.remove(`animate__fadeInDown`)
  document.getElementById(`company`).classList.add(`animate__fadeOutUp`)
  setTimeout(()=>{
    document.getElementById(`page`).classList.add(`animate__fadeOutRight`)
    setTimeout(()=>{
      document.getElementById(`playlist`).classList.remove(`is-loading`)
      window.location.replace(`/playlist`)
    }, 200)
  }, 200)
})