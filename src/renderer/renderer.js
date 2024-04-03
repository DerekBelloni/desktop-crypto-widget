const cryptoContainer = document.getElementById('crypto-container');


window.api.onReceiveData((data) => {
  console.log('Received data in renderer process:', data);
  // Handle the received data and update the UI
  data.forEach((datum) => {
    const cryptoElement = document.createElement('div');

    const nameElement = document.createElement('span');
    nameElement.textContent = datum.name;

    cryptoElement.appendChild(nameElement);

    cryptoContainer.appendChild(cryptoElement);
  })
});