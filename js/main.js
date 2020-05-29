function init() {
  const button = document.getElementsByTagName("button");
  for (let i = 1; i < button.length; i++) {
    button[i].setAttribute("class", "btn btn-white");
  }
}
init();
