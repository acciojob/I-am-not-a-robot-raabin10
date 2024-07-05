//your code 
document.addEventListener('DOMContentLoaded', () => {
  const imageContainer = document.getElementById('image-container');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const para = document.getElementById('para');
  const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
  let selectedImages = [];
  let clickedImages = [];
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function renderImages() {
    imageContainer.innerHTML = '';
    selectedImages = [];
    clickedImages = [];
    const randomImages = [...images, images[Math.floor(Math.random() * images.length)]];
    shuffle(randomImages);
    randomImages.forEach(imgClass => {
      const img = document.createElement('img');
      img.className = imgClass;
      img.addEventListener('click', handleImageClick);
      imageContainer.appendChild(img);
    });
  }

  function handleImageClick(event) {
    const img = event.target;
    if (img.classList.contains('selected')) return;

    img.classList.add('selected');
    clickedImages.push(img.className);
    
    if (clickedImages.length === 1) {
      resetButton.style.display = 'block';
    } else if (clickedImages.length === 2) {
      verifyButton.style.display = 'block';
    } else if (clickedImages.length > 2) {
      clickedImages.pop();
    }
  }

  resetButton.addEventListener('click', () => {
    renderImages();
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.textContent = '';
  });

  verifyButton.addEventListener('click', () => {
    verifyButton.style.display = 'none';
    if (clickedImages[0] === clickedImages[1]) {
      para.textContent = 'You are a human. Congratulations!';
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  });

  renderImages();
});

