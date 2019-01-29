// // Promesas
// const getUser = new Promise((success, reject) => {
//     // timer
//     // Execute function after 3 seconds
//     setTimeout(
//         () => success('Success promise'),
//         3000
//         )
// })

// getUser
//     .then((message) => console.log(message))
//     .catch(() => console.log('Reject promise'))

// // Execute multiple promises
// Promise.all([
//     getUser,
//     getUser
// ])
// .then((message) => console.log(message))
// .catch(() => console.log('Reject promise'))


// // ajax with jquery
// console.log('AJAX WITH JQUERY')
// $.ajax(
//     'https://randomuser.me/api',
//     {
//         method: 'GET',
//         success: (data) => console.log(data),
//         error: (error) => console.log(error)
//     }
// )

// // ajax with javascript
// console.log('AJAX WITH JAVASCRIPT')
// fetch('https://randomuser.me/api')
//     .then((response) => {
//             // get the user data in json format
//             return response.json()
//         })
//     // This print the response of response.json
//     .then((user) => console.log(user.results))
//     .catch(() => console.log('Error'));

// async functions
console.log('ASYNC FUNCTIONS');
(async function load() {
    //await
    async function getData(url) {
        const response = await fetch(url)
        const data = await response.json()

        return data
    }
    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
    const dramaList = await getData('https://yts.am/api/v2/list_movies.json?genre=drama')
    const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation')

    console.log(actionList, dramaList, animationList)

    // Selectors with Jquery
    // const $actionContainer = $('#action')
    // Selectors with javascript
    const $actionContainer = document.querySelector('#action')
    const $dramaContainer = document.querySelector('#drama')
    const $animationContainer = document.querySelector('#animation')
    const $featuringContainer = document.querySelector('#featuring')

    const $modal = document.getElementById('modal')
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')
    const $form = document.getElementById('#form')
    const $home = document.getElementById('#home')

    // Search in element
    const $modalTitle = $modal.querySelector('h1')
    const $modalImage = $modal.querySelector('img')
    const $modalDescription = $modal.querySelector('p')
})()