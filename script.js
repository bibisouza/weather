async function fetchWeather() {
    let buscarInput = document.getElementById("buscar").value;
    const climaDados = document.getElementById("dados-clima");
    climaDados.style.display = "block";
    const apiKey = "fe281205644aa89ea46075cd95ec67a6";

    if (buscarInput == "") {
        climaDados.innerHTML = `
        <div>
            <h2>Input Vazio!</h2>
            <p>tente de novo com uma <u>cidade</u> válida.</p>
        </div>
        `;
        return;
    }

    async function getLonAndLat() {
        const countryCode = 55;
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${buscarInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;
        const resposta = await fetch(geocodeURL);
        if (!resposta.ok) {
            console.log("resposta ruim ", resposta.status);
            return;
        const data = await resposta.json();
        if (data.length == 0) {
            console.log("algo deu errado aqui.");
            climaDados.innerHTML = `
            <div>
                <h2>entrada inválida: "${buscarInput}"</h2>
                <p>tente de novo com uma <u>cidade</u> válida.</p>
            </div>
            `;
            return;
        } else {
            return data[0];
        }
            }
        }

    async function getClimaDados(lon, lat) {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const resposta = await fetch(weatherURL);
        if (!resposta.ok) {
            console.log("resposta ruim ", resposta.status);
            return;
        }

        const data = await resposta.json();
        climaDados.style.display = "flex";
        climaDados.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
        <div>
            <h2>${data.name}</h2>
            <p><strong>temperatura:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
            <p><strong>descrição:</strong> ${data.weather[0].description}</p>
        </div>
        `;
    }

    document.getElementById("buscar").value = "";
    const geocodeData = await getLonAndLat();
    getClimaDados(geocodeData.lon, geocodeData.lat);
}