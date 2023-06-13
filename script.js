const container = document.getElementById("container");



const capitals = ['london', 'delhi', 'paris']

const getData = async () => {
    for (let i = 0; i < capitals.length; i++) {
        await fetch(`https://restcountries.com/v3.1/capital/${capitals[i]}`)
            .then((res) => res.json())
            .then((data) => {
                const card = document.createElement("div");
                card.classList.add("card");
                const name = document.createElement("div");
                name.classList.add("name");
                name.innerText = `Name:${data[0].name.common}`
                const image = document.createElement("img");
                image.classList.add("image");
                image.src = data[0].flags.png;
                const capital = document.createElement("div");
                capital.classList.add("capital");
                capital.innerText = `Capital:${data[0].capital[0]}`
                const region = document.createElement("div");
                region.classList.add("region");
                region.innerText = `Region:${data[0].region}`
                const code = document.createElement("div");
                code.classList.add("code");
                code.innerText = ` Code:${data[0].cioc}`
                const button = document.createElement("button");
                button.classList.add("button");
                button.innerText = "Click for Weather data"

                weather = async () => {
                    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data[0].capital[0]}&appid=38e4258a9e6a31ad3f122e9de1785108`).then((res) => res.json())
                        .then((data) => {
                            const dialog = document.getElementById('myDialog');
                            dialog.innerHTML = '';

                            const content = document.createElement('p');
                            content.textContent = `
                            Weather Report for ${data.name}`;

                            const secondLine = document.createElement('p');
                            secondLine.textContent = `Weather: ${data.weather[0].description}`;


                            const thirdLine = document.createElement('p');
                            thirdLine.textContent = `Humidity: ${data.main.humidity}%
                            Wind Speed: ${data.wind.speed} km/h`;


                            dialog.appendChild(content);
                            dialog.appendChild(secondLine);
                            dialog.appendChild(thirdLine);
                            dialog.open = true;
                        })
                }

                button.addEventListener('click', weather);

                card.appendChild(name);
                card.appendChild(image);
                card.appendChild(capital);
                card.appendChild(region);
                card.appendChild(code);
                card.appendChild(button);

                container.appendChild(card);


            })
    }
}


getData()

document.addEventListener('click', function (event) {
    var dialog = document.getElementById('myDialog');
    if (event.target !== dialog && !dialog.contains(event.target)) {
        dialog.open = false;
    }
});