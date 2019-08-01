function moveWords(){
  const muyBien = document.querySelector('.muyBien')
  const h1selector = document.querySelector('h1')
  const newString = muyBien.innerText;
  muyBien.style.display = 'none';
  for(let i =0; i<newString.length; i++){
    const character = document.createElement('span')
    character.classList.add("animate");
    character.innerText = newString[i]
    character.setAttribute('style', `animation-delay: ${i/8}s`)
    h1selector.appendChild(character)
  }
}

moveWords();

