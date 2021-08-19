/*
(function () {
  document.documentElement.className += " wf-inactive"

  // Optimization for Repeat Views
  if (sessionStorage.foutFontsLoaded) {
    document.documentElement.classList.remove("wf-inactive")
    document.documentElement.classList.add("wf-active")
    return
  }

  var fontA = new FontFaceObserver("Amstelvar VF", {})
  var fontB = new FontFaceObserver("Output Sans VF", {})

  Promise.all([fontA.load(), fontB.load()]).then(function () {
    document.documentElement.classList.remove("wf-inactive")
    document.documentElement.classList.add("wf-active")

    // Optimization for Repeat Views
    sessionStorage.foutFontsLoaded = true
  })
})()
*/
