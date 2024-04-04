const cryptoContainer = document.getElementById('crypto-container');
cryptoContainer.className = 'crypto-container';


window.api.onReceiveData((data) => {
  console.log('Received data in renderer process:', data);
  // Handle the received data and update the UI
  document.body.style.backgroundColor = "black";
  data.forEach((datum) => {
    // const elementContainer = document.createElement('div');
    // cryptoElement.className = 'element-container';

    const cryptoElement = document.createElement('div');
    cryptoElement.className = 'crypto-element';

    const nameElement = document.createElement('span');
    nameElement.textContent = datum.name;
    nameElement.className = 'logo-class';

    const imageElement = document.createElement('img');
    imageElement.src = datum.logo;
    imageElement.className = 'image-class';

    // cryptoElement.appendChild(elementContainer);
    cryptoElement.appendChild(imageElement);
    cryptoElement.appendChild(nameElement);

    cryptoContainer.appendChild(cryptoElement);
  })
});