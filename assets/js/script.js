var submitBtn = document.querySelector("#sumbit-button");

submitBtn.addEventListener("click", function () {
    //makes sure local storage is cleared before adding to it so results aren't corrupted
    localStorage.clear();

    var cityName = document.querySelector("input").value;

    localStorage.setItem("cityName", cityName);

    //loads results page
    location.replace("./results.html")
});

