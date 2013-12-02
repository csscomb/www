module.exports = function(req, res){
    var Comb = require('csscomb'),
        comb = new Comb(),
        input = req.body.input,
        syntax = req.body.syntax,
        config = req.body.config,
        configName = req.body.configName,
        output;

    // GATE:
    var acceptedReferers = [
        'http://localhost:4444/online',
        'http://csscomb.jit.su/online'
    ];
    if (acceptedReferers.indexOf(req.headers.referer) < 0)
        res.send('Don\'t be evil');

    // Configure:
    if (configName) config = comb.getConfig(configName);
    else config = JSON.parse(config);
    comb.configure(config);

    // Comb it, baby:
    try {
        output = comb.processString(input, syntax);
    } catch (e) {
        output = e.message;
    }

    res.send(output);
}
