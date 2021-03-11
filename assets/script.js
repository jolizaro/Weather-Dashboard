$(function(){
    $("#search-form").on("submit",function(event){
        event.preventDefault();
        var city=$("#cityName").val();
        console.log(city)
        getForecast(city)
    })
    function getForecast(cityName){
        var qurl="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=2a0306a930e5a4387b41ca2adaae227d&units=imperial"
    $.ajax({
        url: qurl,
        method:"GET"
    }).then(function(response){
        console.log(response.main.temp)
        console.log(response.main.humidity)
        console.log(response.wind.speed)
        $("#city").text(cityName)
        $("#current-date").text(moment().format("MM/DD/YYYY"))
        $("#today-temp").text("temperature: " + response.main.temp + "F")
        $("#today-windspeed").text("windspeed: " + response.wind.speed)
        $("#today-humidity").text("humidity: " + response.main.humidity + "%")
    })
    }
})