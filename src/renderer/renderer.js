const cryptoContainer = document.getElementById('crypto-item');
ticker.className = 'ticker';


window.api.onReceiveData((data) => {
  data.forEach((datum) => {

    const cryptoElement = document.createElement('div');
    cryptoElement.className = 'crypto-element';

    const nameElement = document.createElement('span');
    nameElement.textContent = datum.name;
    nameElement.className = 'logo-class';

    const imageElement = document.createElement('img');
    imageElement.src = datum.logo;
    imageElement.className = 'image-class';

    const priceElement = document.createElement('span');
    priceElement.textContent = `$ ${datum.quote.USD.price}`;
    priceElement.className = 'price-class';

    // cryptoElement.appendChild(elementContainer);
    cryptoElement.appendChild(imageElement);
    cryptoElement.appendChild(nameElement);
    cryptoElement.appendChild(priceElement);

    ticker.appendChild(cryptoElement);
  })
});