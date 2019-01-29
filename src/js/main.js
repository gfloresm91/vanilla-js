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