const lupa_website='http://lupa.tecccog.net';
const lupa_github='https://github.com/Lupa-Novo-Horizonte';
const lupa_politica='http://lupa.tecccog.net/politica-de-privacidade';
const lupa_termo='http://lupa.tecccog.net/termo-de-uso';
const lupa_tcle='http://lupa.tecccog.net/tcle';
const lupa_tale='http://lupa.tecccog.net/tale';
const lupa_versao='2.0.5';
const lupa_instagram='https://www.instagram.com/projetolupanh';
const lupa_facebook='https://www.facebook.com/projetolupanh';
const lupa_linkedin='https://www.linkedin.com/in/projeto-lupa-nh-70826b240';
const lupa_twitter='https://twitter.com/projetolupanh';
const lupa_youtube='https://www.youtube.com/channel/UCsJzR_BzrP6TkmHjVeH0xcA';

const trashIconColor = require('../Assets/trash-good.png');
const waterIconColor = require('../Assets/water-good.png');
const lightIconColor = require('../Assets/light-good.png');
const sewerIconColor = require('../Assets/sewer-good.png');
const collectIconColor = require('../Assets/collect-good.png');
const asphaltIconColor = require('../Assets/street-good.png');
const publicServiceIconColor = 'indianred';

const trashIconBad = require('../Assets/trash-bad.png');
const waterIconBad = require('../Assets/water-bad.png');
const lightIconBad = require('../Assets/light-bad.png');
const sewerIconBad = require('../Assets/sewer-bad.png');
const collectIconBad = require('../Assets/collect-bad.png');
const asphaltIconBad = require('../Assets/street-bad.png');

const polylineColorGood = 'blue';
const polylineColorBad = 'yellow';

const zoom = 0.00080;

const captureButtonStatus = { iniciar: 'Iniciar', finalizar: 'Finalizar'};
const captureResultStatus = { aguardando: 'aguardando', capturado: 'capturado'};

export default {
    lupa_website, lupa_github, lupa_politica, lupa_versao, sewerIconColor, trashIconColor,
    waterIconColor, lightIconColor, collectIconColor, asphaltIconColor, publicServiceIconColor,
    captureButtonStatus, captureResultStatus, zoom, lupa_instagram, lupa_facebook, lupa_linkedin,
    lupa_twitter, lupa_youtube, trashIconBad, waterIconBad, lightIconBad, sewerIconBad, collectIconBad, asphaltIconBad,
    polylineColorGood, polylineColorBad, lupa_termo, lupa_tcle, lupa_tale
}