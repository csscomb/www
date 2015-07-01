module.exports = function(req, res){
    var Comb = require('csscomb'),
        comb = new Comb('csscomb'),
        input = req.body.input,
        output;

    // GATE:
    var acceptedReferers = [
        'http://localhost:4444/online',
        'http://csscomb.herokuapp.com/online',
        'https://csscomb.herokuapp.com/online',
        'http://csscomb.com/online',
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
