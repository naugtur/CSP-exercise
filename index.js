const express = require('express');
const removeNewline = require('newline-remove');

const app = express();

app.post('/report', (req, res) => {
    req.on('end', () => res.end('ok')).pipe(process.stdout)
})

app.use((req, res, next) => {
    res.set(
        'Content-Security-Policy',
        removeNewline(`
        script-src 'nonce-Nc3n83cnSAd3wc3Sasdfn939hc3' 'self';
        default-src 'self';
        script-src 'self';
        img-src 'self';
        style-src 'self';
        `)
    );
    next()
});

// public static site
app.use('/', express.static('public'));

// Have to choose some port, right
app.listen(1337);

console.log('Open http://localhost:1337/')
