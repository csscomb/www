module.exports = function(req, res){
    var Comb = require('csscomb'),
        comb = new Comb('csscomb'),
        input = req.body.input,
        output;

    // GATE:
    var acceptedReferers = [
        'http://localhost:4444/online',
        'http://csscomb.jit.su/online',
        'http://csscomb.com',
        'http://csscomb.ru'
    ];
    if (acceptedReferers.indexOf(req.headers.referer) < 0)
        res.send('Don\'t be evil');

    // Comb it, baby:
    try {
        output = comb.processString(input);
    } catch (e) {
        output = e.message;
    }

    res.send(output);
}
