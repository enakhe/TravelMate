let city;
fetch('https://api.geoapify.com/v1/ipinfo?apiKey=0c6b0d29d0bf42babfa65b1debf1deeb')
    .then(response => response.json())
    .then(data => {
        // You can now access the location data in the "data" object
        let request = new XMLHttpRequest();
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${data.city.name}&appid=00ae23d574e24eade80df35317317197`;

        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);
                getElements(response);
            }
        };

        request.open("GET", url, true);
        request.send();

        const getElements = (response) => {
            document.querySelector('.showHumidity').innerHTML = `The humidity in <span class="text-primary">${data.city.name} ${response.sys.country}</span> is ${response.main.humidity < 50 ? `<span class="text-danger">${response.main.humidity}</span>` : `<span class="text-success">${response.main.humidity}</span>`}%, ${response.weather[0].description}`;
            document.querySelector('.showTemp').innerHTML = `The temperature in Kelvins is <span class="text-success">${response.main.temp}</span> degrees.`;
            document.querySelector('.location').value = data.city.name;
        }

    })

document.addEventListener("DOMContentLoaded", () => {
    let toastElList = [].slice.call(document.querySelectorAll('.toast'));
    let toastList = toastElList.map((el) => {
        return new bootstrap.Toast(el);
    })
    toastList.forEach(toast => {
        toast.show();
    });

    const currentDate = new Date();
    document.querySelector('.date').value = currentDate.toDateString();
})