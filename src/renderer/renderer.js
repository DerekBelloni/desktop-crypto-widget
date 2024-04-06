const cryptoContainer = document.getElementById('crypto-item');
ticker.className = 'ticker';


window.api.onReceiveData((data) => {
  data.forEach((datum) => {
    // const formattedPrice = reformatPrice(datum);


    const cryptoElement = document.createElement('div');
    cryptoElement.className = 'crypto-element';

    const nameElement = document.createElement('span');
    nameElement.textContent = datum.name;
    nameElement.className = 'logo-class';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info-class'

    const imageElement = document.createElement('img');
    imageElement.src = datum.logo;
    imageElement.className = 'image-class';

    const priceElement = document.createElement('span');
    // priceElement.textContent = datum.quote.USD.price;
    priceElement.textContent = reformatPrice(datum);
    priceElement.className = 'price-class';

    // TEST
    infoDiv.appendChild(imageElement);
    infoDiv.appendChild(nameElement);
    infoDiv.appendChild(priceElement);

    cryptoElement.appendChild(infoDiv);
    // END TEST

    ticker.appendChild(cryptoElement);
  })
});


function reformatPrice(data) {
    let formattedPrice = `$${data.quote.USD.price.toFixed(2)} / ${data.symbol}`;
    return formattedPrice;
}