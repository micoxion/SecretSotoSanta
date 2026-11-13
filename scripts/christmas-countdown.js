let getDayDifference = function(christmas, currentDate) {
    const oneDay = 1000 * 60 * 60 * 24;

    const millisecondDif = Math.abs(currentDate - christmas)

    return Math.round(millisecondDif / oneDay);
}

document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    const christmas = new Date(currentYear, 11, 25);

    let dayDif = getDayDifference(christmas, new Date()) + 1;
    let daysTillChristmasDiv = document.getElementById("christmas-countdown");
    let christmasPTag = daysTillChristmasDiv.firstElementChild;
    christmasPTag.textContent = dayDif + " Sleeps Till Christmas!"
})