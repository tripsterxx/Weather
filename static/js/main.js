// all the main constants
const submitBtn = document.getElementById('submitBtn');

const cityname = document.getElementById('cityname');
const city_name = document.getElementById("city_name");

const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector(".middle_layer");
const appid = "053c661820ab6d6e48ead25c9ab72d44"

// Get info from the fetch api 
const getInfo = async(event) =>{
     // it prevents from reloading the page
     event.preventDefault()

     // getting the value from the input
     const cityVal = cityname.value;

     // checking that if the field is empty or not
     if(cityVal === ""){
          city_name.innerText = `Please provide a valid city name`
          datahide.classList.add("data_hide")
     }else{
          // if the name of the city matches then it will enter this try and catch part

          try{
               // defining the url of the weather api 

               let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=053c661820ab6d6e48ead25c9ab72d44`


               // fetching the url then converting it into json format then converting it to an array
               const response = await fetch(url);
               const data = await response.json();
               const arrData = [data];

               // now changing the city name to provided city name and country to its country
               city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

               // entering the tempraure from the json we got from api
               temp_real_val.innerText = `${arrData[0].main.temp}`;

               // here we are defining the temprature status(rain, sunny, clouds, etc)
               const tempMood = arrData[0].weather[0].main;
               

               // condition according to "tempMood"
               if(tempMood == "Clear"){
                    temp_status.innerHTML = 
                    `<i class="fas fa-sun" style='color:#eccc68;'>`
               }else if(tempMood == "Clouds"){
                    temp_status.innerHTML = 
                    `<i class="fas fa-cloud" style='color:#f1f2f6;'>`
               }else if(tempMood == "Rain"){
                    temp_status.innerHTML = 
                    `<i class="fas fa-cloud-rain" style='color:#a4b0be;'>`
               }else{
                    temp_status.innerHTML = 
                    `<i class="fas fa-cloud" style='color:#f1f2f6;'>`
               }

               // removing the datahide class from the middle layer 
               datahide.classList.remove("data_hide");

          }catch{
               // if the city cannot be found then this will catch the error
               // and also adds the data hide class

               city_name.innerText = `Please Provide a Valid City Name`;
               datahide.classList.add("data_hide");
          }
          
     }
}

// if submitBtn is clicked then this part will call teh getinfo function
submitBtn.addEventListener('click', getInfo);