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

    const $form = document.getElementById('form')
    const $home = document.getElementById('home')
    const $featuringContainer = document.querySelector('#featuring')
    $featuringContainer.style.display = 'none'

    function setAttributes($element, attributes) {
        for(const attribute in attributes) {
           $element.setAttribute(attribute, attributes[attribute])
        }
    }

    const BASE_API = 'https://yts.am/api/v2/'

    function featuringTemplate(movie) {
        return (
            `
                <div class="featuring">
                    <div class="featuring-image">
                        <img src="${movie.medium_cover_image}" width="70" height="100" alt="">
                    </div>
                    <div class="featuring-content">
                        <p class="featuring-title">Película encontrada</p>
                        <p class="featuring-album">${movie.title}</p>
                    </div>
                </div>
            `
        )
    }

    // Events: submit
    $form.addEventListener('submit', async (event) => {
        // prevent reloading page
        event.preventDefault()
        $featuringContainer.style.display = ''
        $home.classList.add('search-active')

        // Create elements and set attributes
        const $loader = document.createElement('img')
        setAttributes($loader, {
            src: 'src/images/loader.gif',
            height: 50,
            width: 50
        })
        $featuringContainer.append($loader)

        // Forms
        const data = new FormData($form)
        const movie = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
        
        if (movie.data.movie_count != 0) {
            const Html = featuringTemplate(movie.data.movies[0])
            $featuringContainer.innerHTML = Html
        }
        else {
            movieNotFound = {
                medium_cover_image: 'src/images/html5.jpg',
                title: 'No se encontro la película'
            }
                
            const Html = featuringTemplate(movieNotFound)
            $featuringContainer.innerHTML = Html
        }
        
        
    })

    const actionList = await getData(`${BASE_API}list_movies.json?genre=action`)
    const dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`)
    const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`)

    // Selectors with Jquery
    // const $actionContainer = $('#action')
    // Selectors with javascript
    const $actionContainer = document.querySelector('#action')
    const $dramaContainer = document.querySelector('#drama')
    const $animationContainer = document.querySelector('#animation')

    const $modal = document.getElementById('modal')
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')

    // Search in element
    const $modalTitle = $modal.querySelector('h1')
    const $modalImage = $modal.querySelector('img')
    const $modalDescription = $modal.querySelector('p')

    // Templates
    function videoItemTemplate(src, title) {
        return (
            `<div class="primaryPlaylistItem">
                <div class="primaryPlaylistItem-image">
                    <img src="${src}">
                </div>  
                <h4 class="primaryPlaylistItem-title">
                    ${title}
                </h4>
            </div>`
        )
    }

    function showModal() {
        $overlay.classList.add('active')
        $modal.style.animation = 'modalIn .8s forwards'
    }

    function hideModal() {
        $overlay.classList.remove('active')
        $modal.style.animation = 'modalOut .8s forwards'
    }

    $hideModal.addEventListener('click', hideModal)

    // Create a virtual dom and return a html append
    function createTemplate(Html) {
        const virtualDomHtml = document.implementation.createHTMLDocument()
        virtualDomHtml.body.innerHTML = Html
        
        return virtualDomHtml.body.children[0]
    }

     // Events: click
     function addEventClick($element) {
        $element.addEventListener('click', () => {
            showModal()
        })
    }

    function renderMovieList(list, $container) {
        // remove loading gif
        $container.children[0].remove();
        
        // Print elements in dom
        list.forEach((movie) => {
            const Html = videoItemTemplate(movie.medium_cover_image, movie.title)
            const movieElement = createTemplate(Html);
            
            $container.append(movieElement)

            // Call function with event listener
            addEventClick(movieElement)
        })
    }

    // Call the function for print elements in dom
    renderMovieList(actionList.data.movies, $actionContainer)
    renderMovieList(dramaList.data.movies, $dramaContainer)
    renderMovieList(animationList.data.movies, $animationContainer)
})()