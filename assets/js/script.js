var submitBtn = document.querySelector("#sumbit-button");

submitBtn.addEventListener("click", function () {
    var cityName = document.querySelector("input").value;

    console.log(cityName);

    localStorage.setItem("cityName", cityName);

    location.replace("./results.html")
});

