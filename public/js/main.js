// console.log('Client side javascript loaded')

const weatherForm = document.getElementById('weather-form')
const search = document.getElementById('search-input')
const messageOne = document.getElementById('message-one')
const messageTwo = document.getElementById('message-two')

weatherForm.addEventListener('submit', ev => {
    ev.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const address = search.value ? search.value.trim() : ''
    console.log('Form submitted')

    fetch('http://localhost:3000/weather?address=' + address)
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                console.log(response.error)
                messageOne.textContent = response.error
            } else {
                console.log(response)
                messageOne.textContent = response.address.split(' ').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')
                messageTwo.textContent = response.forecast
            }
        })
        .catch(error => {
            console.log(error)
            messageOne.textContent = JSON.stringify(error)
        })
})
