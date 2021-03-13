$(function(){
    $("#search-form").on("submit",function(event){
        event.preventDefault();
        var city=$("#cityName").val();
        console.log(city)
        getForecast(city)
        fiveDayF(city)
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
        var imageUrl = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        $("#current-date").append($("<img src=" + imageUrl + "></img>"));
        $("#today-temp").text("temperature: " + response.main.temp + "F")
        $("#today-windspeed").text("windspeed: " + response.wind.speed)
        $("#today-humidity").text("humidity: " + response.main.humidity + "%")
        storeSearchHistory(cityName)
    })
    }
    function fiveDayF(cityName){
        var qurl="https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=2a0306a930e5a4387b41ca2adaae227d&units=imperial"
        $.ajax({
            url:qurl,
            method: "GET"
        }).then(function(response){
            var forecast=[]
            forecast.push(response.list[7])
            forecast.push(response.list[15])
            forecast.push(response.list[23])
            forecast.push(response.list[31])
            forecast.push(response.list[39])
            $("#Forecast").html("")
            for(var i=0;i < forecast.length; i++){
                var div1=$("<div>")
                var div2=$("<div>")
                var date=forecast[i].dt_txt
                var dateElement=$("<div>").text(moment(date).format("MM/DD/YYYY"))
                var imageUrl = "https://openweathermap.org/img/w/" + forecast[i].weather[0].icon + ".png"
                var imageElement=$("<img src="+imageUrl+"></img>")
                var temperatureElement=$("<div>").text("temperature: " + forecast[i].main.temp + "F")
                var humidityElement=$("<div>").text("humidity: " + forecast[i].main.humidity + "%")
                div2.append(dateElement,imageElement, temperatureElement,humidityElement)
                div1.append(div2)
                $("#Forecast").append(div1)
            }
        })
        

    }
    function storeSearchHistory(cityName){
        var search=[]
        if(localStorage.getItem("searchCity")!=null||localStorage.getItem("searchCity")!=undefined){
            search =JSON.parse(localStorage.getItem("searchCity"))
            if(jQuery.inArray(cityName,search)===-1){
                search.push(cityName)
            }
        }else{
            search.push(cityName) 
        }
        localStorage.setItem("searchCity",JSON.stringify(search))
    }
})