console.log('I SEE YOU IN THE CONSOLE')

const h1selector = document.querySelector('h1')
h1selector.classList.add("animate");
h1selector.setAttribute('style', `animation-delay: .1s`)

const logOut = document.querySelector('.logOut')
console.log(logOut.innerText)
logOut.onclick = () => {
    
  }