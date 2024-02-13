module.exports = { getRoleConst, getChannelConst, getEXPConst, getBotRoles, getFanRoles, getUserConst, getReactConst, getGenreRoles,
    getNotChatChannel, getautoCreateChannel, getDictionary, getEarnMoneyChannel, getCountingChannel, getDiceChannel, getAnounceChannel,
getCountDict, getMGameConst, getTitanChannels, getCoBacBotChannel, getFishingChannel, setGenreRoles, getWordChannel, getNotCommandChannel,
getBotChannel, getCannotSellItem };

const dictionary = {
    currency: "WAMĐ",
    rate: 1,
    uploadmoneyunit: 50,
    leastbitamount: 100,
    countmax: 1000,
    countstep: 50,
    countmoneyearn: 100,
    streamearn: 200,
    daily: { fan: 100, money: 1000, tc: 100 },
    dailyboosterplus: 5000,
    nguoingheo: 10000,
    taxquytoc: 0,
    tax: 0,
    taxngheo: 0,
    stealtime: 20000,
    stealfail: 50,
    stealleastonline: 1200000,
    bankstealfail: 90,
    gachance: 50,
    gatime: 60000,
    golddigmin: 20,
    golddigmax: 200,
    goldratemin: 200,
    goldratemax: 300,
    goldbomrate: 10,
    golddiamondrate: 5,
    bankrate: 100,
    bankfamilyrate: 50,
    rolecost: 10000,
    monthlyfanreset: 25,
    pokerbetlimit: 100000,
    mangoinvite: 86400000,
    cutphatnocount: 30,
    itempagelimit: 10,
    inventtimeout: 60000,
    votelink: "https://top.gg/servers/793734164846215198/vote"
}
function getDictionary(){ return dictionary; }

function getCountDict(){
    const dict = {};
    dict[channels.ggcouting] = 1000;
    dict[channels.ggcounting2] = 1000;
    dict[channels.ggcounting3] = 1000;
    dict[channels.ggcounting4] = 999999999999;
    return dict;
}

const roles = {
    //Member Roles
    fan: "810507126274392090",
    topfan: "810398579524501504",

    //Staff Roles
    treasurer: "813633155956604939",
    staff: "810724531068731412",
    mod: "810180332837535755",
    smod: "810187544553717800",
    manager: "810168606063198208",
    admin: "810186198017376258",
    bot: "810520302555103264",
    dev: "811073852510699550",
    owner: "808231978158522390",

    //Bot affection roles
    spouse: "811086060917751809",
    lover: "811086440132902932",
    closeFriend: "811086703032008744",
    friend: "811086762402775051",

    //Others
    muted: "810692451307487232",
    booster: "812282818574680076",

    //genre
    quytoc: "814494548486389762",
    nguoingheo: "814494989954187264",
    streamer: "812841433186566166",
    lolicon: "810704590143356928",
    bbcon: "810711030681960499",
    siscon: "810710337305313380",
    neetgod: "810751899531345930",
    gay: "812328765082304532",
    simp: "813399010692825109",
    dancobac: "814732441700925460",
    terrorist: "815147690630316062",
    cterrorist: "815597895792853052",
    rerack: "816953824279134218",
    tramcam: "817657342727553024",
    dj: "815186216231239690",
    bank: "815198671053651968",
    bentou: "818361364761673758",
    mango: "820963415496720427",
}
function getRoleConst(){ return roles; }

const botRoles  = [
    roles.friend,
    roles.closeFriend,
    roles.lover,
    roles.spouse
]
function getBotRoles(){ return botRoles; }

const fanRoles = [
    roles.fan,
    roles.topfan,
]
function getFanRoles(){ return fanRoles; }

var genreRoles = [
    roles.streamer,
    roles.lolicon,
    roles.bbcon,
    roles.siscon,
    roles.neetgod,
    roles.gay,
    roles.simp,
    roles.dancobac,
    roles.terrorist,
    roles.cterrorist,
    roles.dj,
    roles.rerack,
    roles.tramcam,
    roles.bentou,
]
function getGenreRoles(){ return genreRoles; }
function setGenreRoles(value){ genreRoles = value; }

const channels ={
    welcome: "810401410030108712",
    test: "811037489430528041",
    general: "793734166431793184",
    animechat: "812840921484755004",
    mangachat: "812840943249391627",
    gamechat: "812840978887999488",
    lover: "811118031026913320",
    spouse: "811118344631484447",
    gimage: "810171329931509790",
    gnsfw: "812913193013739551",
    gvideonsfw: "820206658150989844",
    gnsfwface: "812638247061684284",
    glinkhen: "810170771728891914",
    gmeme: "812163784625618954",
    cstream: "813403922420465715",
    cmusic: "813404722941657119",
    cvideo: "813404752225501224",
    cvoice: "813428097142882364",
    ggcouting: "813401349201985576",
    ggcounting2: "813706519614455808",
    ggcounting3: "813706541827620925",
    ggcounting4: "815224200582529035",
    ggcoinflip: "813720618821222430",
    ggdice1: "813766320167583764",
    ggdice2: "813766534005653535",
    golddig: "815750754249080902",
    word: "817017014468083742",
    word2: "818445079202889738",
    fishing: "817663464113569823",
    fishing2: "817676503521296395",
    aot: "815750806715760671",
    aot2: "816112838296076348",
    aot3: "816112919863230484",
    cobacbot1: "814381374144118824",
    cobacbot2: "817663977747906570",
    bank: "815227703631544321",
    assemblyanounce: "810507910802440212",
    transactionlog: "822487328807321670",
    deletedchatlog: "825181954852519946",
    botdm: "824983989336408124",
    dmtomember: "825204600159338496",
}

const countingChannel = [
    channels.ggcouting, channels.ggcounting2, channels.ggcounting3, channels.ggcounting4
]
function getCountingChannel(){ return countingChannel; }

const wordChannel = [
    channels.word, channels.word2
]
function getWordChannel(){ return wordChannel; }

const anounceChannel = [
    channels.general, channels.ggcouting, channels.ggcounting2, channels.ggcounting3, channels.ggcounting4
]
function getAnounceChannel(){ return anounceChannel; }

const notChatChannel = [
    channels.gimage,
    channels.gnsfw,
    channels.gvideonsfw,
    channels.gnsfwface,
    channels.gmeme,
]
function getNotChatChannel(){ return notChatChannel; }

const notCommandChannel = [
    channels.animechat, channels.mangachat, channels.gamechat
]
function getNotCommandChannel(){ return notCommandChannel; }

const earnMoneyChannel = [
    channels.gimage,
    channels.gnsfw,
    channels.gnsfwface,
    channels.gmeme,
]
function getEarnMoneyChannel(){ return earnMoneyChannel; }

const autoCreateChannel = [
    channels.cstream,
    channels.cmusic,
    channels.cvideo,
    channels.cvoice
]
function getautoCreateChannel(){ return autoCreateChannel; }

const diceChannel = [
    channels.ggdice1,
    channels.ggdice2
]
function getDiceChannel(){ return diceChannel; }

const botCoBacChannel = [
    channels.cobacbot1, channels.cobacbot2
]
function getCoBacBotChannel(){ return botCoBacChannel; }

const botChannel = [
    "810521000696610928", "813243065543819314", "819433722276216832", "819130184619917312", "822482162401411094",
    "821010698284826674", "821381749606318091", channels.golddig //rpg gamble made
]
function getBotChannel(){ return botChannel; }

const fishingChannel = [
    channels.fishing, channels.fishing2
]
function getFishingChannel(){ return fishingChannel; }

function getChannelConst(){ return channels; }

const expUnit = 20;
const expGainInterval = 60000;
const expMinus = 500;
const expMinusInterval = 3600000 * 24;
const expDownInterval = 3600000;
const expConst = {
    unit: expUnit,
    gainInterval: expGainInterval,
    minus: expMinus,
    minusInterval: expMinusInterval,
    downInterval: expDownInterval,
    expLimit: 999999999,
    fanexpLimit: 999999999,
    topfan: 15 * 5 * 300,
    spouse: 60 * 5 * 300,
    lover: 30 * 5 * 300,
    bestfriend: 10 * 5 * 300,
    friend: 1000,
    nicknamechange: 0,
}
function getEXPConst(){ return expConst; }

const userConst = {
    kami: "253476003836461057"
}
function getUserConst(){ return userConst; }

const reactConst = {
    earn: "❤️",
    extra: "💖",
    loose: "💔",
}
function getReactConst(){ return reactConst; }

const mgameConst = {
    aotspawn: 60000,
    aotattack: 40000,
    aotloot: 10000,
    aotratemin: 2000,
    aotratemax: 3000,
    aotdhurtrate: 100,
    jojofighttime: 10000,
    wordtime: 10000,
    wordmin: 1,
    wordmax: 3,
    wordearn: 10,
    wordminusmultiply: 3,
    blackjackthinktime: 30000,
    fishingmin: 10000,
    fishingmax: 20000,
    fishingget: 1000,
    fishingbomchance: 10,
    fishingdivide: 3,
    fishingdiamond: 10,
}
function getMGameConst(){
    if(!mgameConst[channels.aot]) mgameConst[channels.aot] = { aothpmin: 10, aothpmax: 40 };
    if(!mgameConst[channels.aot2]) mgameConst[channels.aot2] = { aothpmin: 41, aothpmax: 100 };
    if(!mgameConst[channels.aot3]) mgameConst[channels.aot3] = { aothpmin: 100, aothpmax: 200 };
    return mgameConst;
 }

const titanChannels = [
    channels.aot, channels.aot2, channels.aot3
]
function getTitanChannels(){ return titanChannels; }

const cannotSellItem = [
    "-3"
]
function getCannotSellItem(){ return cannotSellItem; }