// Promesas
const getUser = new Promise((success, reject) => {
    // timer
    // Execute function after 3 seconds
    setTimeout(
        () => success('Success promise'),
        3000
        )
})

getUser
    .then((message) => console.log(message))
    .catch(() => console.log('Reject promise'))

// Execute multiple promises
Promise.all([
    getUser,
    getUser
])
.then((message) => console.log(message))
.catch(() => console.log('Reject promise'))


// ajax with jquery
console.log('AJAX WITH JQUERY')
$.ajax(
    'https://randomuser.me/api',
    {
        method: 'GET',
        success: (data) => console.log(data),
        error: (error) => console.log(error)
    }
)

// ajax with javascript
console.log('AJAX WITH JAVASCRIPT')
fetch('https://randomuser.me/api')
    .then((response) => {
            // get the user data in json format
            return response.json()
        })
    // This print the response of response.json
    .then((user) => console.log(user.results))
    .catch(() => console.log('Error'))