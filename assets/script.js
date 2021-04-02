$(function(){
    retrieveSearchHistory();
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
        console.log(response)
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
        getUvIndex(response.coord.lat, response.coord.lon);
        
        
       // retrieveSearchHistory();
       var search=JSON.parse(localStorage.getItem("searchCity"));
       console.log(search)
       if (jQuery.inArray(cityName,search)===-1){
           console.log("insideIf")
        var button=$("<button>")
        button.text(cityName)
        button.attr("data-city",cityName).attr("type","button")
        button.addClass("btn btn-light btn-outline-secondary city")
        $("#cityHistory").append(button)
       }
       storeSearchHistory(cityName)
    })
    }
    function getUvIndex(lat, lon){
        var qurl="http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=2a0306a930e5a4387b41ca2adaae227d";
    $.ajax({
        url: qurl,
        method:"GET"
    }).then(function(response){
        $("#today-uv").text("UV Index: " + response.value);
        $("#today-uv").css( 'color', response.value >= 7 ? 'red' : response.value >= 3 ? 'yellow' : 'green');
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
                var column=$("<div>").addClass("col border border-primary rounded bg-primary text-white mr-2")
                var row=$("<div>").addClass("row p-2 bd-highlight")
                var date=forecast[i].dt_txt
                var dateElement=$("<div>").text(moment(date).format("MM/DD/YYYY"))
                var imageUrl = "https://openweathermap.org/img/w/" + forecast[i].weather[0].icon + ".png"
                var imageElement=$("<img src="+imageUrl+"></img>")
                var temperatureElement=$("<div>").text("temperature: " + forecast[i].main.temp + "F")
                var humidityElement=$("<div>").text("humidity: " + forecast[i].main.humidity + "%")
                row.append(dateElement,imageElement, temperatureElement,humidityElement)
                column.append(row)
                $("#Forecast").append(column)
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
    function retrieveSearchHistory(){
        var city=JSON.parse(localStorage.getItem("searchCity"))
        console.log(city)
        if(city!=null||city!=undefined){
            for (var i=0;i<city.length;i++){
                var button=$("<button>")
                button.text(city[i])
                button.attr("data-city",city[i]).attr("type","button")
                button.addClass("btn btn-light btn-outline-secondary city")
                $("#cityHistory").append(button)
            }
        }
    }
    $("#cityHistory").on('click', event => {
        console.log(event)
        var button = $(event.target);
        var city = button.text();
        // call out search function with that city
        getForecast(city);
        fiveDayF(city);
    })
})