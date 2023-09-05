function onSubmit(e) {
  e.preventDefault();

  const promptInput = document.querySelector('#prompt');
  const sizeInput = document.querySelector('#size');
  const msgElement = document.querySelector('.msg');

  msgElement.textContent = '';
  document.querySelector('#image').src = '';

  const prompt = promptInput.value;
  const size = sizeInput.value;

  if (prompt.trim() === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('Image generation failed');
    }

    const data = await response.json();
    const imageUrl = data.data;

    const imageElement = document.querySelector('#image');
    imageElement.src = imageUrl;
    imageElement.style.display = 'block'; // Show the image

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error.message;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
