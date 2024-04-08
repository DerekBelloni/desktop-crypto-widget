const cryptoContainer = document.getElementById('crypto-item');
ticker.className = 'ticker';


window.api.onReceiveData((data, isUpdate) => {
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
			priceElement.innerHTML = reformatPrice(datum);
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
			if (cryptoElement) {
				const priceElement = cryptoElement.querySelector('.price-class');
				const updatedPrice = reformatPrice(datum);

				priceElement.innerHTML = updatedPrice;
				priceElement.classList.add('updated');
				setTimeout(() => {
					priceElement.classList.remove('updated');
				}, 2000);
			}
		})
  }
});

function countConsecutiveZeros(data) {
	const str = data.quote.USD.price.toString();
	const match = str.match(/\.0+/);

	if (match) {
		let matchLength = match[0].length -1;
		return matchLength + 4;
	}

	return 4;
}


function reformatPrice(data) {
    let formattedPrice;

    if (data.quote.USD.price >= 1) {
    	formattedPrice = `<span>$${data.quote.USD.price.toFixed(2)}</span> <span class="price-symbol">/ ${data.symbol}</span>`;
    } else {
		let fixed = countConsecutiveZeros(data);
      	formattedPrice = `<span >$${data.quote.USD.price.toFixed(fixed)}</span> <span class="price-symbol">/ ${data.symbol}</span>`;
    }

    return formattedPrice;
}