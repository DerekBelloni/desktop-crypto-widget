const cryptoContainer = document.getElementById('crypto-item');
ticker.className = 'ticker';


window.api.onReceiveData((data, isUpdate) => {
  	console.log('is update: ', isUpdate);

  if (!isUpdate) {
		data.forEach((datum) => {
			const cryptoElement = document.createElement('div');
			cryptoElement.className = 'crypto-element';
			cryptoElement.setAttribute('data-id', datum.id);

			const nameElement = document.createElement('span');
			nameElement.textContent = datum.name;
			nameElement.className = 'logo-class';

			const infoDiv = document.createElement('div');
			infoDiv.className = 'info-class'

			const imageElement = document.createElement('img');
			imageElement.src = datum.logo;
			imageElement.className = 'image-class';

			const priceElement = document.createElement('span');
			priceElement.textContent = reformatPrice(datum);
			priceElement.className = 'price-class';

			infoDiv.appendChild(imageElement);
			infoDiv.appendChild(nameElement);
			infoDiv.appendChild(priceElement);

			cryptoElement.appendChild(infoDiv);

			ticker.appendChild(cryptoElement);
    	}) 
  } else {
		data.forEach((datum) => {
			const cryptoElement = document.querySelector(`.crypto-element[data-id="${datum.id}"]`);
			console.log('selected crypto element in update: ', cryptoElement);
			if (cryptoElement) {
				const priceElement = cryptoElement.querySelector('.price-class');
				const updatedPrice = reformatPrice(datum);

				priceElement.textContent = updatedPrice;
				priceElement.classList.add('updated');
				setTimeout(() => {
					priceElement.classList.remove('updated');
				}, 2000);
			}
		})
  }
});


function reformatPrice(data) {
    let formattedPrice;
    if (data.quote.USD.price >= 1) {
      formattedPrice = `$${data.quote.USD.price.toFixed(2)} / ${data.symbol}`;
    } else {
      formattedPrice = `$${data.quote.USD.price.toFixed(7)} / ${data.symbol}`;
    }
    return formattedPrice;
}