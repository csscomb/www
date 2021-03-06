var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

function reportError(subject, text) {
  transporter.sendMail({
    from: 'bugs@csscomb.com',
    to: 'tonyganch+csscomb@gmail.com',
    subject: subject + ' ' + Date.now(),
    text: text,
    html: '<pre>' + text + '</pre>'
  });
}

function reportUnacceptedReferer(referer) {
  reportError('Unaccepted referer', referer);
}

function reportParsingError(css, error) {
  reportError('Parsing error', error.stack + '\n\n\n' + css);
}

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
        'http://csscomb.com/online/'
    ];
    if (acceptedReferers.indexOf(req.headers.referer) < 0)
        reportUnacceptedReferer(req.headers.referer);

    // Comb it, baby:
    try {
        output = comb.processString(input);
    } catch (e) {
        output = 'Something went wrong.\nPlease make sure that you\'re trying ' +
          'to comb a valid CSS (not Sass or Less).\nOr maybe you forgot ' +
          'a closing brace?\n\nHere is an error message:\n\n' + e.message;
        reportParsingError(input, e);
    }

    res.send(output);
}
