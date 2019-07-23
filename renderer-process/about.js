$('body').on('click', '#supporting-resources-link a', (event) => {
    event.preventDefault();
    let link = event.target.href;
    require("electron").shell.openExternal(link);
  });