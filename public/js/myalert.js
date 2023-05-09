function myalert(msg = "Default Message!", time = 1000) {
    const alertbox = document.createElement("div");
    alertbox.innerHTML = msg;
    alertbox.className = "alertbox";
    const body = document.querySelector('body')
    body.appendChild(alertbox);
    setTimeout(() => {
        alertbox.remove();
    }, time);
}
