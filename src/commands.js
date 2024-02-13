module.exports = { getCommands, accessSpreadsheet, getUserInfo, getConditions, getProfanyList, getProfaniesList, getURLs, getHenURLs
, getMutedAt, addMoney, getShopItem, payTax, getBankInfo, getWords, getBomToExplode, getXemItem, setQuyToc };

const sendToDebug = false;
const cheatMode = true;
const botSaveDelay = 0;
const checkCondtion = require("./condition.js").checkCondtion;
const channelList = require("./const.js").getChannelConst();
const poker = require("./poker.js");
const Discord = require("discord.js");
const bot = require("./bot.js");
const mLevel = require("./level.js");
const mConst = require("./const.js");
const itemEffects = require("./item.js").getItemEffects();
const google = require("google-spreadsheet");
const creds = require("./client_secret.json");
var doc;
var commands;
async function accessSpreadsheet(){
    doc = new google.GoogleSpreadsheet("1HM_VY-Zp8aIugl57tACt48CNTU3Xbe_xzgcvhFpLZCg");
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    await commands.load();
    return doc;
}
var gameList = {};
const headerRow = ["userid", "exp", "level", "role", "fanexp", "fanlevel", "lasteng", "lastchat", "nickname", "lastnicknamechange", "money", "lastshare", "item", "spouse", "monthlyfan", "mango", "lastvote"];

var userInfo = {};
function getUserInfo(){ return userInfo; }

var bankInfo = {};
function getBankInfo(){ return bankInfo; }

var shopItem = {};
function getShopItem(){ return shopItem; }

var profany;
function getProfanyList(){ return profany; }
var profanies;
function getProfaniesList(){ return profanies; }

var bombToExplode = [];
//key: Date.now(), holding: member + inslot
function getBomToExplode(){ return bombToExplode; }

var xemitemlist = {};
function getXemItem(){ return xemitemlist; }

var words;
function getWords(){ return words; }

var url = {};
function getURLs(){ return url; }

var henUrl = {};
function getHenURLs(){ return henUrl; }

var mutedAt = {};
function getMutedAt(){ return mutedAt; }

var commandList = {
    daily: "diemdanh",
    // iam: "toila",
    // iamnot: "toikhongphai",
    say: "noi",
    saydel: "noithay",
    money: "xemtien",
    givemoney: "chotien",
    claimmoney: "xintien",
    exchange: "doiratien",
    shop: "xemshop",
    inventory: "xemitem",
    buyitem: "muaitem",
    sellitem: "banitem",
    giveitem: "choitem",
    useitem: "dungitem",
    xepitem: "xepitem",
    spawnitem: "taoitem",
    kick: "choradao",
    ban: "cam",
    mute: "khoachat",
    muteat: "khoachattai",
    unmute: "bokhoa",
    unmuteat: "bokhoatai",
    mutedatlist: "dskhoachat",
    deletemes: "xoachat",
    bdeletemes: "bxoachat",
    addrole: "themrole",
    removerole: "borole",
    exp: "xemdiem",
    addexp: "congdiem",
    removeexp: "trudiem",
    botexp: "xemtc",
    addbotexp: "congtc",
    removebotexp: "trutc",
    addmoney: "congtien",
    removemoney: "trutien",
    desmoney: "guitien",
    lendmoney: "duatien",
    withmoney: "ruttien",
    takemoney: "doitien",
    save: "save",
    load: "load",
    changenickname: "doinickname",
    cal: "tinh",
    coinflip: "tungxu",
    dicerole: "xucxac",
    twodice: "2xucxac",
    slot: "slot",
    rps: "tuxi",
    math: "lamtoan",
    tucngu: "tucngu",
    gcoinflip: "gtungxu",
    gdice: "gcaorua",
    gcao: "gcao",
    gjojo: "gjojo",
    gbaucua: "gbaucua",
    gblackjack: "gblackjack",
    gstudpoker: "gstudpoker",
    join: "thamgia",
    exit: "thoatgame",
    start: "batdau",
    end: "huygame",
    gameinfo: "xemgame",
    sendnude: "sendnude",
    sendhen: "guihen",
    bxhfan: "bxhfan",
    bxhfanthang: "bxhfanthang",
    bxhtc: "bxhtc",
    bxhtien: "bxhtien",
    bxhngheo: "bxhngheo",
    xembank: "xembank",
    spouse: "xemkethon",
    profile: "profile",
    vote: "vote",
    test: "test",
}


function getConditions(){
    const roles = require("./const.js").getRoleConst();

    var commandConditions = {};

    commandConditions[commandList.ban] = {
        channel: [],
        role: [],
        permission: ["BAN_MEMBERS"],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.kick] = {
        channel: [],
        role: [],
        permission: ["KICK_MEMBERS"],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.mute] = {
        channel: [],
        role: [],
        permission: ["MUTE_MEMBERS"],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.unmute] = {
        channel: [],
        role: [],
        permission: ["MUTE_MEMBERS"],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.muteat] = {
        channel: [],
        role: [],
        permission: ["MUTE_MEMBERS"],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.unmuteat] = {
        channel: [],
        role: [],
        permission: ["MUTE_MEMBERS"],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.mutedatlist] = {
        channel: [],
        role: [],
        permission: ["MUTE_MEMBERS"],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.deletemes] = {
        channel: [],
        role: [],
        permission: ["MANAGE_MESSAGES"],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.bdeletemes] = {
        channel: [mConst.getChannelConst().bank],
        role: [mConst.getRoleConst().bank],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.save] = {
        channel: [],
        role: [roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.load] = {
        channel: [],
        role: [roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.changenickname] = {
        channel: [],
        role: [roles.staff],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.exp] = {
        channel: [],
        role: [],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.addexp] = {
        channel: [],
        role: [roles.treasurer, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.removeexp] = {
        channel: [],
        role: [roles.treasurer, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.botexp] = {
        channel: [],
        role: [],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.addbotexp] = {
        channel: [],
        role: [roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.removebotexp] = {
        channel: [],
        role: [roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.addmoney] = {
        channel: [],
        role: [roles.treasurer, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.removemoney] = {
        channel: [],
        role: [roles.treasurer, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.addrole] = {
        channel: [],
        role: [],
        permission: ["MANAGE_ROLES"],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.removerole] = {
        channel: [],
        role: [],
        permission: ["MANAGE_ROLES"],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.rps] = {
        channel: [],
        role: [roles.closeFriend, roles.lover, roles.spouse, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.math] = {
        channel: [],
        role: [roles.closeFriend, roles.lover, roles.spouse, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.tucngu] = {
        channel: [],
        role: [roles.closeFriend, roles.lover, roles.spouse, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.sendnude] = {
        channel: [channelList.lover, channelList.spouse],
        role: [roles.lover, roles.spouse, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.sendhen] = {
        channel: [channelList.spouse],
        role: [roles.spouse, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.lendmoney] = {
        channel: [],
        role: [roles.bank],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.takemoney] = {
        channel: [],
        role: [roles.bank],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.desmoney] = {
        channel: [channelList.bank],
        role: [],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.withmoney] = {
        channel: [channelList.bank],
        role: [],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.spawnitem] = {
        channel: [],
        role: [roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.test] = {
        channel: [],
        role: [roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    return commandConditions;
 }

const commandInstructions = {
    iam: " [(rolemuốnlấy)]",
    iamnot: " [(rolemuốnbỏ)]",
    say: " [lời muốn nói]",
    saydel: " [lời muốn nói thay]",
    givemoney: " [sốlượng] [ngườinhận]",
    claimmoney: " [sốlượng] [đốitượng]",
    desmoney: " [sốlượng] [ngânhàng]",
    withmoney: " [sốlượng] [ngânhàng]",
    lendmoney: " [sốlượng] [ngườivay]",
    takemoney: " [sốlượng] [ngườinợ]",
    exchange: " [lượngđiểm] (" + mConst.getDictionary().rate + " điểm fan = 1 " + mConst.getDictionary().currency + ")",
    inventory: " <trang>",
    buyitem: " [sốthứtựitem]",
    sellitem: " [vịtríitemtrongkho]",
    giveitem: " [vịtríitemtrongkho] [ngườinhận]",
    useitem: " [vịtríitemtrongkho] <đốitượngnếucó>",
    xepitem: " [vịtríitem1trongkho] [vịtríitem2trongkho]",
    spawnitem: " [itemindex] [số lượng] <người nhận>",
    kick: " [ngườibịrađảo]",
    ban: " [ngườibịcấm]",
    mute: " [ngườibịkhóa] <thờigian> <phút/giờ/ngày/tuần>",
    unmute: " [ngườiđượcgỡ]",
    muteat: " [ngườibịkhóa] [channel] <thờigian> <phút/giờ/ngày/tuần>",
    unmuteat: " [ngườiđượcgỡ] [channel]",
    deletemes: " [sốlượng] <đốitượng>",
    bdeletemes: " [sốlượng]",
    addrole: " [(role)] [đốitượng]",
    removerole: " [(role)] [đốitượng]",
    addexp: " [sốđiểm] [đốitượng]",
    removeexp: " [sốđiểm] [đốitượng]",
    addbotexp: " [sốthiệncảm] [đốitượng]",
    removebotexp: " [sốthiệncảm] [đốitượng]",
    addmoney: " [sốlượng] [ngườinhận]",
    removemoney: " [sốlượng] [ngườibịtrừ]",
    changenickname: " {[nicknamemới]} [đốitượng]",
    cal: " [phép tính]",
    coinflip: " <chọnmặt> <tiềncược>",
    dicerole: " [sốmặt] <chọnmặt> <tiềncược>",
    slot: " [tiềncược]",
    rps: " [kéo/búa/bao]",
    lamtoan: " <độkhótừ1~10>",
    gcoinflip: " [tiềncược] [đốitượngchơichung]",
    gdice: " [tiềncược]",
    gjojo: " [tiềncược] [ngườimuốntháchđấu]",
    join: " [ngườihostgame]",
    exit: " [ngườihostgame]",
    spouse: " <đốitượngmuốnxem>",
    xembank: " <ngânhàngmuốnxem>",
}

function getCommands(){
    commands = {

        // Command List
        xemlenh: function(message, cmd, args){
            const conditions = getConditions();
            var text = "danh sách các lệnh bạn có thể dùng:";
            for(var prop in commandList)
            {
                if(!conditions[commandList[prop]] || checkCondtion(message, cmd, args, conditions[commandList[prop]])){
                    text += "\n/" + commandList[prop];
                    if(commandInstructions[prop])
                        text += commandInstructions[prop];
                }
            }
            text += "\n** Chú thích: [tham số bắt buộc], <tham số tùy ý>"
            message.reply(text);
        },

        diemdanh: async function(message, cmd, args){
            const list = bot.getAttendance();
            if(!list.includes(message.member.id)){
                const daily = mConst.getDictionary().daily;
                list.push(message.member.id);
                const isTopFan = userInfo[message.member.id].fanexp >= mConst.getEXPConst().topfan || message.member.roles.cache.get(mConst.getRoleConst().topfan);
                const isBank = message.member.roles.cache.has(mConst.getRoleConst().bank);
                const isBooster = message.member.roles.cache.has(mConst.getRoleConst().booster);
                var amount = daily.money;
                if(isTopFan) amount *= 2;
                if(isBank) amount += 1000;
                if(isBooster) amount += mConst.getDictionary().dailyboosterplus;
                await message.channel.send("Cảm ơn " + message.member.toString() + " đã điểm danh hôm nay. 🍀\nBạn nhận được " + daily.fan + " điểm fan và " + amount + " WAMĐ. " + (amount >= 1000 ? "💰" : "<:wamd:813647968515129344>"));
                addMoney(message.member.id, amount);
                await mLevel.addBotEXP(message.member, daily.tc * (isTopFan ? 2 : 1), message, true);
                await mLevel.addFanEXP(message.member, daily.fan, message, true);
            }
            else await message.channel.send(message.member.toString() + ", bạn đã điểm danh trong hôm nay rồi.\nĐiểm danh sẽ reset vào 4 giờ sáng mỗi ngày.");
        },

        // I am
        toila: async function(message, cmd, args){
            return;
            const roles = message.content.toLowerCase().substring(message.content.indexOf("(") + 1, message.content.indexOf(")")).split(",");
            const genreRoles = mConst.getGenreRoles();
            for(var i=0; i<roles.length; i++)
            {
                var role = message.guild.roles.cache.find(role => role.name.toLowerCase() === roles[i]);
                if(role && genreRoles.includes(role.id))
                {
                    if(!message.member.roles.cache.has(role.id)){
                        if(userInfo[message.member.id].money >= mConst.getDictionary().rolecost){
                            addMoney(message.member.id, -mConst.getDictionary().rolecost, true);
                            await message.member.roles.add(role.id);
                            await message.channel.send(message.member.toString() + " đã trả " + mConst.getDictionary().rolecost + " " + mConst.getDictionary().currency + " để trở thành \"" + role.name + "\".");
                        }
                        else await message.channel.send(message.member.toString() + ", bạn không có đủ " + mConst.getDictionary().rolecost + " " + mConst.getDictionary().currency + " để mua role \"" + role.name + "\".");
                    }
                    else await message.channel.send(message.member.toString() + ", bạn đang sở hữu role \"" + role.name + "\" rồi.");
                }
                else await message.channel.send(message.member.toString() + ", role \"" + roles[i] + "\" không tồn tại, hoặc không thể mua được.");
            }
        },

        // I am not
        toikhongphai: async function(message, cmd, args){
            return;
            const roles = message.content.toLowerCase().substring(message.content.indexOf("(") + 1, message.content.indexOf(")")).split(",");
            const genreRoles = mConst.getGenreRoles();
            for(var i=0; i<roles.length; i++)
            {
                var role = message.guild.roles.cache.find(role => role.name.toLowerCase() === roles[i]);
                if(role && genreRoles.includes(role.id))
                {
                    if(message.member.roles.cache.has(role.id)){
                        await message.member.roles.remove(role.id);
                        await message.channel.send(message.member.toString() + " không còn là \"" + role.name + "\".");
                    }
                    else await message.channel.send(message.member.toString() + ", bạn hiện tại không sở hữu role \"" + role.name + "\".");
                }
                else await message.channel.send(message.member.toString() + ", role \"" + roles[i] + "\" không tồn tại, hoặc không thể mua được.");
            }
        },

        // Say
        noi: async function(message, cmd, args){
            await message.channel.send(message.content.substring(5));
            await bot.interactBot(message, cmd, args);
        },

        // Say and delete
        noithay: async function(message, cmd, args){
            const channel = message.channel;
            const content = message.content;
            const deleted = await message.delete();
            const mes = message.content.substring(9);
            if(mes.length > 0) await channel.send(mes);
        },

        // Money
        xemtien: async function(message, cmd, args){
            if(args[0] && (message.member.roles.cache.has(mConst.getRoleConst().dev) || message.member.roles.cache.has(mConst.getRoleConst().treasurer) || message.member.roles.cache.has(mConst.getRoleConst().bank))){
                const member = message.mentions.members.first();
                if(member) await message.channel.send(member.toString() + " hiện tại đang có " + userInfo[member.id].money + " " + mConst.getDictionary().currency + ".");
            }
            else{
                const member = message.member;
                await message.channel.send(member.toString() + " hiện tại đang có " + userInfo[member.id].money + " " + mConst.getDictionary().currency + ".");
            }
        },

        // Give Money
        chotien: async function(message, cmd, args){
            const amount = parseInt(args[0]);
            const target = message.mentions.members.first();
            if(amount && amount > 0 && target){
                if(userInfo[message.member.id].money >= amount){
                    addMoney(message.member.id, -amount);
                    addMoney(target.id, amount);
                    await message.channel.send(message.member.toString() + " đã cho " + target.toString() + " " + amount + " " + mConst.getDictionary().currency + ". 💸");
                    bot.getGuild().channels.cache.get(mConst.getChannelConst().transactionlog).send(message.member.toString() + " đã cho " + target.toString() + " " + amount + " " + mConst.getDictionary().currency + ". 💸");
                }
                else await message.channel.send(message.member.toString() + ", bạn hiện tại không có đủ tiền để cho.");
            }
        },

        // Claim Money
        xintien: async function(message, cmd, args){
            const amount = parseInt(args[0]);
            const mem = message.mentions.members.first();
            const banks = bot.getGuild().roles.cache.get(mConst.getRoleConst().bank).members.keyArray();
            if(banks.includes(message.member.id)){
                await message.channel.id(message.member.toString() + ", bạn hiện tại đang làm chủ ngân hàng không thể đi xin tiền người khác được.");
                return;
            }
            if(amount && amount > 0 && mem){
                var text = message.member.toString() + " xin " + mem.toString() + " " + amount + " " + mConst.getDictionary().currency + ".\n";
                text += mem.toString() + " nếu đồng ý cho " + message.member.toString() + " thì hãy nhắn ok.";
                await message.channel.send(text);
                message.channel.awaitMessages(m => !m.author.bot && m.member.id == mem.id && m.channel.id == message.channel.id && m.content.toLowerCase().includes("ok"), {max: 1, time: 10000, errors: ["time"]})
                .then(async collected => {
                    if(userInfo[mem.id].money >= amount){
                        addMoney(mem.id, -amount);
                        addMoney(message.member.id, amount);
                        await message.channel.send(mem.toString() + " đã đồng ý cho bạn " + amount + " " + mConst.getDictionary().currency + ", " + message.member.toString() + ".");
                        bot.getGuild().channels.cache.get(mConst.getChannelConst().transactionlog).send(mem.toString() + " đã cho " + message.member.toString() + " " + amount + " " + mConst.getDictionary().currency + ".");
                    }
                    else await message.channel.send(mem.toString() + ", bạn không có đủ tiền để cho " + message.member.toString() + ".");
                })
                .catch(async collected => {
                    await message.channel.send(message.member.toString() + ", có vẻ như " + mem.toString() + " không muốn cho bạn tiền... <:cry2:811893861021515796>");
                });
            }
        },

        // Des Money
        guitien: async function(message, cmd, args){
            const amount = parseInt(args[0]);
            const target = message.mentions.members.first();
            if(amount && amount > 0 && target){
                if(userInfo[message.member.id].money >= amount){
                    const banks = getBanks();
                    if(banks.includes(target.id)){
                        addMoney(message.member.id, -amount);
                        var rate = getBankRate();
                        if(userInfo[message.member.id].spouse) rate *= mConst.getDictionary().bankfamilyrate / 100;
                        const bamount = Math.floor(amount - amount * rate);
                        addMoney(target.id, bamount);
                        if(!bankInfo[target.id + message.member.id])
                            bankInfo[target.id + message.member.id] = { bankid: target.id, memberid: message.member.id, amount: 0, lastdes: Date.now(), lastwith: 0 };
                        bankInfo[target.id + message.member.id].amount += bamount;
                        if(bankInfo[target.id + message.member.id].amount == 0)
                            delete bankInfo[target.id + message.member.id];
                        await message.channel.send(message.member.toString() + " tiến hành gửi " + amount + " " + mConst.getDictionary().currency + " vào " + target.toString() + ". 🏦\nMức tiền bảo kê là " + (rate * 100).toFixed(2) + "%, số tiền " + message.member.displayName + " gửi vào là " + bamount + " " + mConst.getDictionary().currency + ".");
                        bot.getGuild().channels.cache.get(mConst.getChannelConst().transactionlog).send(message.member.toString() + " đã gửi " + bamount + " WAMĐ vào ngân hàng.");
                    }
                    else await message.channel.send(message.member.toString() + ", bạn chỉ có thể gửi tiền vào ngân hàng.");
                }
                else await message.channel.send(message.member.toString() + ", bạn hiện tại không có đủ tiền để gửi.");
            }
        },

        // With Money
        ruttien: async function(message, cmd, args){
            const amount = parseInt(args[0]);
            const target = message.mentions.members.first();
            if(amount && amount > 0 && target && target.id != message.member.id){
                if(bankInfo[target.id + message.member.id].amount >= amount){
                    const banks = getBanks();
                    if(banks.includes(target.id)){
                        addMoney(message.member.id, amount);
                        addMoney(target.id, -amount);
                        bankInfo[target.id + message.member.id].amount -= amount;
                        if(bankInfo[target.id + message.member.id].amount == 0)
                            delete bankInfo[target.id + message.member.id];
                        await message.channel.send(message.member.toString() + " tiến hành rút " + amount + " " + mConst.getDictionary().currency + " từ " + target.toString() + ". 💵");
                        bot.getGuild().channels.cache.get(mConst.getChannelConst().transactionlog).send(message.member.toString() + " đã rút " + amount + " WAMĐ từ ngân hàng.");
                    }
                    else await message.channel.send(message.member.toString() + ", bạn chỉ có thể rút tiền từ ngân hàng mà bạn đã gửi tiền vào.");
                }
                else await message.channel.send(message.member.toString() + ", bạn hiện tại không có đủ tiền trong ngân hàng để rút.");
            }
        },

        // Give Money
        duatien: async function(message, cmd, args){
            const amount = parseInt(args[0]);
            const target = message.mentions.members.first();
            if(amount && amount > 0 && target){
                if(userInfo[message.member.id].money >= amount){
                    addMoney(message.member.id, -amount);
                    if(!bankInfo[message.member.id + target.id])
                        bankInfo[message.member.id + target.id] = { bankid: message.member.id, memberid: target.id, amount: 0, lastdes: Date.now(), lastwith: 0 };
                    bankInfo[message.member.id + target.id].amount += -amount;
                    if(bankInfo[message.member.id + target.id].amount == 0)
                        delete bankInfo[message.member.id + target.id];
                    addMoney(target.id, amount);
                    await message.channel.send(message.member.toString() + " đã đưa " + amount + " " + mConst.getDictionary().currency + " cho " + target.toString() + ". 🏦");
                }
                else await message.channel.send(message.member.toString() + ", bạn hiện tại không có đủ tiền để đưa.");
            }
        },
        
        // Take Money
        doitien: async function(message, cmd, args){
            const amount = parseInt(args[0]);
            const target = message.mentions.members.first();
            if(amount && amount > 0 && target){
                const info = bankInfo[message.member.id + target.id];
                if(info && Math.abs(info.amount) >= amount){
                    var rate = getBankRate();
                    if(userInfo[target.id].spouse) rate *= mConst.getDictionary().bankfamilyrate / 100;
                    const bamount = Math.floor(amount + amount * rate);
                    addMoney(message.member.id, amount, true);
                    bankInfo[message.member.id + target.id].amount += amount;
                    if(bankInfo[message.member.id + target.id].amount == 0)
                        delete bankInfo[message.member.id + target.id];
                    addMoney(target.id, -bamount, true);
                    await message.channel.send(message.member.toString() + " đã đòi " + amount + " " + mConst.getDictionary().currency + " tiền nợ của " + target.toString() + ". 🏦\nMức tiền bảo kê là " + (rate * 100).toFixed(2) + "%, " + target.displayName + " mất " + bamount + " để trả. 💸");
                }
                else await message.channel.send(target.toString() + " hiện tại không nợ nhiều đến mức đó.");
            }
        },

        // Exchange Money
        doiratien: async function(message, cmd, args){
            const amount = parseInt(args[0]);
            if(amount && amount > 0){
                if(amount <= userInfo[message.member.id].fanexp){
                    const money = Math.floor(amount / mConst.getDictionary().rate);
                    await mLevel.addFanEXP(message.member, -money * mConst.getDictionary().rate, message, true);
                    await addMoney(message.member.id, money);
                    await message.channel.send(message.member.toString() + " đã đổi thành công " + (money * mConst.getDictionary().rate) + " điểm fan thành " + money + " " + mConst.getDictionary().currency + ".\nHiện tại bạn đang có " + userInfo[message.member.id].money + " " + mConst.getDictionary().currency + ".");
                }
                else await message.channel.send(message.member.toString() + ", bạn hiện tại không có đủ " + amount + " điểm fan để đổi.");
            }
        },

        // Inventory
        xemitem: async function(message, cmd, args){
            const items = userInfo[message.member.id].items;
            var pages = Math.floor(items.length / mConst.getDictionary().itempagelimit);
            if(items.length % mConst.getDictionary().itempagelimit != 0) pages += 1;
            var page = parseInt(args[0]);

            if(isNaN(page) || page > pages || page <= 0)
                page = pages;
            page -= 1;

            var from = page * mConst.getDictionary().itempagelimit;

            var text = "";
            for(var i=0; i<mConst.getDictionary().itempagelimit; i++){
                if(i+from >= userInfo[message.member.id].items.length) text += "#" + (i+from) + ": ❌ [RỖNG]\n";
                else text += "#" + (i+from) + ": " + shopItem[items[i+from]].value4 + " " + shopItem[items[i+from]].name + "\n";
            }
            const embed = new Discord.MessageEmbed()
            .setTitle("DANH SÁCH \"" + message.member.displayName + "\" ĐANG SỞ HỮU")
            .setDescription(text)
            .setColor("#bee8f6")
            .setThumbnail(message.author.avatarURL())
            .setFooter("Trang " + (page+1) + "/" + pages);
            const sent = await message.channel.send(embed);
            if(xemitemlist[message.member.id]){
                const m = await bot.getGuild().channels.cache.get(xemitemlist[message.member.id].channel).messages.fetch(xemitemlist[message.member.id].messageid);
                m.reactions.removeAll();
            }
            xemitemlist[message.member.id] = {channel: message.channel.id, messageid: sent.id, page: page};
            sent.react("⬅️");
            sent.react("➡️");

            await Discord.Util.delayFor(mConst.getDictionary().inventtimeout);

            delete xemitemlist[message.member.id];
            sent.reactions.removeAll();
        },

        // Shop
        xemshop: async function(message, cmd, args){
            const items = Object.values(shopItem);
            var text = "";
            for(var i=0; i<items.length; i++){
                if(parseInt(items[i].id) >= 0) text += items[i].id + " - " + items[i].value4 + " " + items[i].cost + " " + items[i].name + "\n";
            }
            const embed = new Discord.MessageEmbed()
                .setTitle("SHOP")
                .setDescription(text)
                .setColor("#ffffff")
            await message.channel.send(embed);
        },

        // Buy item
        muaitem: async function(message, cmd, args){
            const id = args[0];
            if(args[0]){
                const item = shopItem[id];
                if(item && parseInt(id) >= 0){
                    if(userInfo[message.member.id].money >= item.cost){
                        addMoney(message.member.id, -item.cost, true);
                        userInfo[message.member.id].items.push(item.id);
                        await message.channel.send(message.member.toString() + " đã mua " + item.name + " " + item.value4 + ".");
                    }
                    else await message.channel.send(message.member.toString() + ", bạn không đủ tiền để mua " + item.name + ".");
                }
            }
        },

        // Sell item
        banitem: async function(message, cmd, args){
            const index = parseInt(args[0]);
            if(index != "NaN" && userInfo[message.member.id].items.length-1 >= index){
                const item = shopItem[userInfo[message.member.id].items[index]];
                if(item){
                    if(!mConst.getCannotSellItem().includes(item)){
                        addMoney(message.member.id, item.cost / 2, true);
                        userInfo[message.member.id].items.splice(index, 1);
                        await message.channel.send(message.member.toString() + " đã bán " + item.name + " " + item.value4 + " và nhận được " + (item.cost / 2) + " " + mConst.getDictionary().currency + ". 💰");    
                    }
                    else await message.channel.send(message.member.toString() + ", bạn không thể bán " + item.name + " " + item.value4 + ".");
                }
            }
        },

        // Give Item
        choitem: async function(message, cmd, args){
            const index = parseInt(args[0]);
            const member = message.mentions.members.first();
            if(index != "NaN" && userInfo[message.member.id].items.length > index && member){
                const itemID = userInfo[message.member.id].items[index];
                const item = shopItem[itemID];
                if(itemID != "-3"){
                    if(item){
                        userInfo[message.member.id].items.splice(index, 1);
                        if(member.id == bot.getBotID()){
                            const tc = getRanInteger(item.value5, item.value6);
                            await mLevel.addBotEXP(message.member, tc, message, true);
                            if(tc > 0){
                                await message.channel.send("Cảm ơn bạn nhé, " + message.member.toString() + "! 💖");
                                await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3coZm7qZ4LJMzOF8uPeA1cT5GuCJVij9Nfu51YNJhNtEoLHUGR1a8aLxyDEAprL2awFAaMclhKUswHfKG7YCLMmZiKxBgYZDSWVo0m6NXejXBGqq8jdegH-nZ49Jc0-HBM9dDUsLDxyAx2Tt9rSNFNr=s868-no?authuser=0");
                                await message.react("💖");
                            }
                            else if( tc < 0){
                                await message.channel.send("Mồ, sao bạn lại đưa mình thứ này vậy, " + message.member.toString() + "! 😫");
                                await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3eePw8h8EflZ9SDCBSGuXOMJWnVckYGb32r6qwzVIkPi6N70yx2Cqmloz8nXhwcXykD-nnyqKQe8p8p4CKd5q5M62QBCJ6iIesdyEza4JzO8C_UMASQhLFquWmWcVDekKex1x58zpGLcLAtsFKl8xx3=s712-no?authuser=0");
                                await message.react("💔");
                            }
                            else {
                                await message.channel.send("Ưm... cảm ơn bạn... " + message.member.toString() + " 😅");
                                await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3ejKAgQWxDvLzNBX1mIYVcnxTS34oPzBDtJoZ7Ymrye0gepwvtUXZqTyi-z-TXAEtBU2JJgRR1mT7oAGAKH1JOD-9u95lxzK_m6BONIG0LiFgeSs77TEZ2Fo3hyRJdW7zxvvu1k5iUb_gFgEZZNS0BS=s804-no?authuser=0");
                            }
                        }
                        else {
                            if(!member.user.bot) userInfo[member.id].items.push(item.id);
                            await message.channel.send(message.member.toString() + " đã cho " + member.toString() + " " + item.name + " " + item.value4 + ".");
                            bot.getGuild().channels.cache.get(mConst.getChannelConst().transactionlog).send(message.member.toString() + " đã cho " + member.toString() + " " + item.name + " " + item.value4 + ".");
                        }
                    }
                }
                else{
                    //Cứt phát nổ
                    var bomIndex = -1;
                    for(var i=0; i<bombToExplode.length; i++){
                        if(bombToExplode[i].value.includes(message.member.id)){
                            bomIndex = i;
                            break;
                        }
                    }
                    if(bomIndex > -1){
                        if(!member.user.bot && !member.roles.cache.has(mConst.getRoleConst().bank) && (Date.now() - userInfo[member.id].lastchat <= 3600000)){
                            if(message.channel.id == bombToExplode[bomIndex].channel){
                                bombToExplode[bomIndex].value = member.id + userInfo[member.id].items.length;
                            }
                            else{
                                await message.channel.send("Bạn không thể đẩy \"Cứt Phát Nổ\" cho người khác tại channel này.\nHãy đẩy cho người khác tại channel " + bombToExplode[bomIndex].channelname + ".");
                                return;
                            }
                        }
                        else{
                            await message.channel.send(message.member.toString() + ", bạn không thể đẩy \"Cứt Phát Nổ\" 💩🔥 cho " + member.toString() + ".");
                            return;
                        }
                    }
                    userInfo[message.member.id].items.splice(index, 1);
                    if(!member.user.bot) userInfo[member.id].items.push(item.id);
                    await message.channel.send(message.member.toString() + " đã cho " + member.toString() + " " + item.name + " " + item.value4 + ".");
                    bot.getGuild().channels.cache.get(mConst.getChannelConst().transactionlog).send(message.member.toString() + " đã cho " + member.toString() + " " + item.name + " " + item.value4 + ".");  
                }
            }
        },

        // Use Item
        dungitem: async function(message, cmd, args){
            const index = parseInt(args[0]);
            if(userInfo[message.member.id].items && userInfo[message.member.id].items.length-1 >= index){
                const itemID = userInfo[message.member.id].items[index];
                itemEffects[itemID](message, cmd, args, shopItem[itemID], message.member, index);
            }
        },

        // Xep item
        xepitem: async function(message, cmd, args){
            const item1 = parseInt(args[0]);
            const item2 = parseInt(args[1]);
            if(item1 != "NaN" && item2 != "NaN" && item1 < userInfo[message.member.id].items.length && item2 < userInfo[message.member.id].items.length){
                var temp = userInfo[message.member.id].items[item1];
                userInfo[message.member.id].items[item1] = userInfo[message.member.id].items[item2];
                userInfo[message.member.id].items[item2] = temp;
                await message.react("👌");
            }
        },

        // Tao item
        taoitem: async function(message, cmd, args){
            const item = parseInt(args[0]);
            const quantity = parseInt(args[1]);
            const target = message.mentions.members.first();
            if(item != "NaN" && quantity != "NaN"){
                for(var i=0; i<quantity; i++){
                    if(target && userInfo[target.id]) userInfo[target.id].items.push(item);
                    else userInfo[message.member.id].items.push(item);
                }
                await message.react("👌");
            }
        },

        // Add Money
        congtien: async function(message, cmd, args){
            const amount = parseInt(args[0]);
            const mems = message.mentions.members.first();
            if(amount && mems){
                addMoney(mems.id, amount, true);
                await message.channel.send(message.member.toString() + " đã cộng cho " + mems.toString() + " " + amount + " " + mConst.getDictionary().currency + ".");
                const embed = new Discord.MessageEmbed()
                .setTitle("CỘNG TIỀN")
                .addField("Staff", message.member.toString(), true)
                .addField("Đối tượng", mems.toString(), true)
                .addField("Số tiền", amount, true)
                .addField("Link chat", message.url)
                .setColor("#fff18b")
                .setFooter(`Chat ID: ${message.id}`);
                await bot.getGuild().channels.cache.get(channelList.assemblyanounce).send(embed);
            }
        },

        // Subtract Money
        trutien: async function(message, cmd, args){
            const amount = parseInt(args[0]);
            const mems = message.mentions.members.first();
            if(amount && mems){
                addMoney(mems.id, -amount, true);
                await message.channel.send(message.member.toString() + " đã trừ của " + mems.toString() + " " + amount + " " + mConst.getDictionary().currency + ".");
                const embed = new Discord.MessageEmbed()
                .setTitle("TRỪ TIỀN")
                .addField("Staff", message.member.toString(), true)
                .addField("Đối tượng", mems.toString(), true)
                .addField("Số tiền", -amount, true)
                .addField("Link chat", message.url)
                .setColor("#fff18b")
                .setFooter(`Chat ID: ${message.id}`);
                await bot.getGuild().channels.cache.get(channelList.assemblyanounce).send(embed);
            }
        },

        // Kick members
        choradao: async function(message, cmd, args){
            const members = message.mentions.members.array();
            var text = "";
            for(var i=0; i<members.length; i++){
                text += members[i].toString() + (i == members.length-1 ? ", " : "");
                await members[i].kick();
            }
            if(members.length > 0) await message.channel.send(text + " đã bị " + message.member.toString() + " cho ra đảo.");
        },

        // Ban members
        cam: async function(message, cmd, args){
            const members = message.mentions.members.array();
            for(var i=0; i<members.length; i++)
                await members[i].ban();
            if(members.length > 0) await message.channel.send(members.toString().split(",").join(", ") + " đã bị " + message.member.toString() + " ban khỏi server.");
        },

        // Mute members
        khoachat: async function(message, cmd, args){
            const members = message.mentions.members.first();
            if(members){
                var time = parseTime(parseInt(args[1]), args[2]);
                var unit = args[2];
                if(!time) time = 999999999999999;
                if(!mutedAt["ALL"]) mutedAt["ALL"] = { ids: [], time: []}
                var index = mutedAt["ALL"].ids.indexOf(members.id);
                if(index > -1) mutedAt["ALL"].time[index] = time;
                else{
                    mutedAt["ALL"].ids.push(members.id);
                    mutedAt["ALL"].time.push(Date.now() + time);
                }
                await members.roles.add(mConst.getRoleConst().muted);
                await message.channel.send(members.toString() + " đã bị khóa chat" + (time < 999999999999999 ? (" trong " + args[1] + (unit ? " " + unit : " phút")) : "") + ".");
            }
        },

        // Unmute members
        bokhoa: async function(message, cmd, args){
            const members = message.mentions.members.first();
            if(members){
                var index = mutedAt["ALL"].ids.indexOf(members.id);
                if(index > -1){
                    mutedAt["ALL"].ids.splice(index, 1);
                    mutedAt["ALL"].time.splice(index, 1);
                }
                await members.roles.remove(mConst.getRoleConst().muted);
                await message.channel.send(members.toString() + " đã được bỏ khóa chat.");
            }
        },

        // Mute members At
        khoachattai: async function(message, cmd, args){
            const members = message.mentions.members.first();
            const channels = message.mentions.channels.first();
            var time = parseTime(parseInt(args[2]), args[3]);
            var unit = args[3];

            if(members && channels){
                if(!mutedAt[channels.id]) mutedAt[channels.id] = { ids: [], time: []};
                if(!time) time = 999999999999999;
                var index = mutedAt[channels.id].ids.indexOf(members.id);
                if(index > -1) mutedAt[channels.id].time[index] = time;
                else{
                    mutedAt[channels.id].ids.push(members.id);
                    mutedAt[channels.id].time.push(Date.now() + time);
                }
                await message.channel.send(members.toString() + " đã bị khóa chat tại " + channels.toString() + (time < 999999999999999 ? ("trong " + args[2] + (unit ? " " + unit : " phút")) : "") + ".");
            }
        },

        // Unmute members At
        bokhoatai: async function(message, cmd, args){
            const members = message.mentions.members.first();
            const channels = message.mentions.channels.first();

            if(members && channels && mutedAt[channels.id] && mutedAt[channels.id].ids.includes(members.id)){
                var index = mutedAt[channels.id].ids.indexOf(members.id);
                mutedAt[channels.id].ids.splice(index, 1);
                mutedAt[channels.id].time.splice(index, 1);
                if(mutedAt[channels.id].ids.length == 0) delete mutedAt[channels.id]; 
                await message.channel.send(members.toString() + " đã được bỏ khóa chat tại " + channels.toString() + ".");
            }
        },

        // Unmute members At
        dskhoachat: async function(message, cmd, args){
            var text = "";
            var all = "";
            for(var prop in mutedAt){
                if(prop != "ALL"){
                    const channel = message.guild.channels.cache.get(prop).toString();
                    text += channel.toString() + "\n";
                    for(var i=0; i<mutedAt[prop].ids.length; i++){
                        text += message.guild.members.cache.get(mutedAt[prop].ids[i]).displayName + (i < mutedAt[prop].ids.length-1 ? ", " : "");
                    }
                    text += "\n";
                }
                else{
                    for(var i=0; i<mutedAt[prop].ids.length; i++){
                        all += message.guild.members.cache.get(mutedAt[prop].ids[i]).displayName + (i < mutedAt[prop].ids.length-1 ? ", " : "");
                    }
                }
            }

            if(all.length == 0) all = "(RỖNG)";
            const embed = new Discord.MessageEmbed()
            .setTitle("DANH SÁCH KHÓA CHAT")
            .addField("Toàn server", all)
            .setDescription(text)
            .setColor("#ff3939")
            await message.channel.send(embed);
        },

        // Delete message members
        xoachat: async function(message, cmd, args){
            if(!args[0]) return;
            var amount = parseInt(args[0]) + 1;
            while(amount > 100){
                amount -= 100;
                await message.channel.bulkDelete(100);
            }
            await message.channel.bulkDelete(amount);
        },

        // Delete message for bank
        bxoachat: async function(message, cmd, args){
            if(!args[0]) return;
            var amount = parseInt(args[0]) + 1;
            while(amount > 100){
                amount -= 100;
                await message.channel.bulkDelete(100);
            }
            await message.channel.bulkDelete(amount);
        },
    
        // Set Role
        themrole: async function(message, cmd, args){
            const roles = message.content.toLowerCase().substring(message.content.indexOf("(") + 1, message.content.indexOf(")")).split(",");
            const member = message.mentions.members.array();
            const added = [];
            for(var i=0; i<roles.length; i++)
            {
                var role = message.guild.roles.cache.find(role => role.name.toLowerCase() === roles[i]);
                if(role) added.push(role);
            }
            for(var i=0; i< member.length; i++){
                await member[i].roles.add(added[i]);
            }
            if(added.length > 0) await message.channel.send(member.toString().split(",").join(", ") + " đã được " + message.member.toString() + " thêm role " + added.toString().split(",").join(", ") + ".");
        },

        // Bo Role
        borole: async function(message, cmd, args){
            const roles = message.content.toLowerCase().substring(message.content.indexOf("(") + 1, message.content.indexOf(")")).split(",");
            const member = message.mentions.members.array();
            const added = [];
            for(var i=0; i<roles.length; i++)
            {
                var role = message.guild.roles.cache.find(role => role.name.toLowerCase() === roles[i]);
                if(role) added.push(role);
            }
            for(var i=0; i< member.length; i++){
                await member[i].roles.remove(added[i]);
            }
            if(added.length > 0) await message.channel.send(member.toString().split(",").join(", ") + " đã được " + message.member.toString() + " bỏ role " + added.toString().split(",").join(", ") + ".");
        },

        // Check user fan exp
        xemdiem: async function(message, cmd, args){
            const member = args[0] ? message.mentions.members.first() :  message.member;
            const memberid = member.id;
            var text = "<0> hiện tại có <1> điểm.";
            text = text.replace("<0>", member.toString()).replace("<1>", userInfo[memberid].fanexp);
            if(mConst.getEXPConst().topfan - userInfo[memberid].fanexp > 0)
                text += "\nBạn cần "  +(mConst.getEXPConst().topfan - userInfo[memberid].fanexp) + " điểm nữa để đạt được danh hiệu Fan Cứng.";
            await message.channel.send(text);
        },

        // Cong diem
        congdiem: async function(message, cmd, args){
            const memberid = message.mentions.members.first();
            const exp = parseInt(args[0]);
            if(memberid && exp){
                await mLevel.addFanEXP(message.mentions.members.first(), exp, message, true);
                await this.xemdiem(message, cmd, args);
                const embed = new Discord.MessageEmbed()
                .setTitle("CỘNG ĐIỂM")
                .addField("Staff", message.member.toString(), true)
                .addField("Đối tượng", memberid.toString(), true)
                .addField("Số điểm", exp, true)
                .addField("Link chat", message.url)
                .setColor("#fc3c3c")
                .setFooter(`Chat ID: ${message.id}`);
                await bot.getGuild().channels.cache.get(channelList.assemblyanounce).send(embed);
            }
        },

        // Tru diem
        trudiem: async function(message, cmd, args){
            const memberid = message.mentions.members.first();
            const exp = -parseInt(args[0]);
            if(memberid && exp){
                await mLevel.addFanEXP(message.mentions.members.first(), exp, message, true);
                await this.xemdiem(message, cmd, args);
                const embed = new Discord.MessageEmbed()
                .setTitle("TRỪ ĐIỂM")
                .addField("Staff", message.member.toString(), true)
                .addField("Đối tượng", memberid.toString(), true)
                .addField("Số điểm", exp, true)
                .addField("Link chat", message.url)
                .setColor("#fc3c3c")
                .setFooter(`Chat ID: ${message.id}`);
                await bot.getGuild().channels.cache.get(channelList.assemblyanounce).send(embed);
            }
        },

        // Check user bot exp
        xemtc: async function(message, cmd, args){
            const member = message.mentions.members.first() ? message.mentions.members.first() : message.member;
            const memberid = member.id;
            var text = "<0> hiện tại có <1> điểm thiện cảm với mình.";
            if(message.member.roles.cache.get(mConst.getRoleConst().dev) && message.mentions.members.first()){
                text = text.replace("<0>", member.toString()).replace("<1>", userInfo[memberid].exp);
                // if(!member.roles.cache.has(mConst.getRoleConst().spouse))
                //     text += "\nBạn cần "  +(mConst.getEXPConst().friend - userInfo[memberid].exp) + " điểm nữa để trở trở nên thân hơn với mình.";
                await message.channel.send(text);
            }
            else{
                const expConst = mConst.getEXPConst();
                if(userInfo[memberid].exp >= expConst.spouse + 10000)
                    text = "Mình không thể sống thiếu bạn, " + member.toString() + " 💖💖💖💖💖";
                else if(userInfo[memberid].exp >= expConst.spouse)
                    text = "Mình rất yêu bạn, " + member.toString() + " 💖💖💖💖";
                else if(userInfo[memberid].exp >= expConst.lover + (expConst.spouse - expConst.lover) * 2 / 3)
                    text = "Mình yêu bạn, " + member.toString() + " ❤️❤️❤️";
                else if(userInfo[memberid].exp >= expConst.lover + (expConst.spouse - expConst.lover) / 3)
                    text = "Mình rất thích bạn, " + member.toString() + " ❤️❤️";
                else if(userInfo[memberid].exp >= expConst.lover)
                    text = "Mình thích bạn, " + member.toString() + " ❤️";
                else if(userInfo[memberid].exp >= expConst.bestfriend + (expConst.lover - expConst.bestfriend) / 2)
                    text = "Mình thấy bạn rất hợp với mình, " + member.toString() + " 🥰";
                else if(userInfo[memberid].exp >= expConst.bestfriend)
                    text = "Mình thấy bạn khá hợp với mình, " + member.toString() + " 😊";
                else if(userInfo[memberid].exp >= expConst.friend)
                    text = "Mình thấy bạn khá là thú vị, " + member.toString() + " 🤜🤛"; 
                else
                    text = "Ưm... bạn cần gì thì cứ gọi mình," + member.toString() + " 👀";

                var image = "";
                if(userInfo[memberid].exp >= expConst.spouse)
                    image = "https://lh3.googleusercontent.com/pw/ACtC-3euvrapIUnZRMr4r3KGsjRZRcTcDuDIUzV9HBX_SZ7Ng09eYVfNg6VdAacCJ-kQ2g1Q1Q5H7OnhPH0jKFFK1oY1RSkOdQOTTYU6uXg8XCsq_63lLoU47gvZBnk_c-1R1yQ9q9P0ixr3Qdq3l8Oc7a9-=s726-no?authuser=0";
                else if(userInfo[memberid].exp >= expConst.lover)
                    image = "https://lh3.googleusercontent.com/pw/ACtC-3cFrb0UsXrB3imt08lCdAIQFsvrDVjulPP0ve9XpuviB3XyuSpzLFYPfvJvTkSn8fuY4ET5hQeQ6R4_t9jZ90kqj1gE9nQ4WvWnVpThulIndf5awhEJZzS9RvIJW36jc-4QN3c5Yif-lcABh-OrO9XP=s868-no?authuser=0";
                else if(userInfo[memberid].exp >= expConst.bestfriend)
                    image = "https://lh3.googleusercontent.com/pw/ACtC-3e5BjNUB9hfvBbljat__sVLdWtCPFflnfpDGdOgC_7gENLcmOePvmSCwcCqkBvMf7VtlLbh8kUdHvKNi3LEhYYv7NCvOMIL_n1Poxa1GxX5sF1Z-LUkqrjpR__vop1bzqnRmlu8OSx4wnmX8qxjmKB8=s868-no?authuser=0";
                else if(userInfo[memberid].exp >= expConst.friend)
                    image = "https://lh3.googleusercontent.com/pw/ACtC-3eo9UEd-Fm9E2k3nqJS4T7RkX1CWWfZ-Oa0_WAKsEJ0wKe4y9obpT6TAwNSBhMBj4_In3LADozvt7p1XoVbu7Uh2GW8JcDyoJuz6PjwZ4V7hBbNjUSuOsCdWVeQDpuH_gEybt2lWjd2z_HR1BYeJ5q-=s868-no?authuser=0";
                else
                    image = "https://lh3.googleusercontent.com/pw/ACtC-3cC2P9cFXTyqKMfNODjk2yLr2G36v2wAaQug6rHU1w3hDeMPkAgPWp92N4vfYm-oFwE1EQfxsNDoCc8Pa5S53sBvZBdEVbLWN8R4BqFrwZq1Zpy8UiAgucUeVMN8BWAIKGm5nu0lYo3fCDWqDZijGK7=s581-no?authuser=0";

                var embed = new Discord.MessageEmbed();
                embed.setDescription(text);
                embed.setImage(image);
                embed.setColor("#bee8f6");
                await message.channel.send(embed);
            }
        },

        // Cong diem
        congtc: async function(message, cmd, args){
            const memberid = message.mentions.members.first();
            const exp = parseInt(args[0]);
            if(memberid && exp){
                await mLevel.addBotEXP(message.mentions.members.first(), exp, message, true);
                await this.xemtc(message, cmd, args);
            }
        },

        // Tru diem
        trutc: async function(message, cmd, args){
            const memberid = message.mentions.members.first();
            const exp = -parseInt(args[0]);
            if(memberid && exp){
                await mLevel.addBotEXP(message.mentions.members.first(), exp, message, true);
                await this.xemtc(message, cmd, args);
            }
        },

        // Save User Data
        save: async function(message, cmd, args){
            bot.setSleep(true);

            const anounceChannel = mConst.getAnounceChannel();
            for(var i=0; i<anounceChannel.length; i++)
                if(!sendToDebug) bot.sendNonCommandEmbed("save", anounceChannel[i]);

            await bot.expDownInterval();

            var sheet = doc.sheetsByIndex[0];
            await sheet.clear();
            await sheet.setHeaderRow(headerRow);
            var list = Object.values(userInfo);
            const members = bot.getGuildMembers();
            for(var i=0; i<list.length; i++){
                if(members.get(list[i].userid)){
                    list[i].role = list[i].role.toString();
                    list[i].item = list[i].items.toString();
                    list[i].mango = list[i].mango.toString();
                    list[i].nickname = members.get(list[i].userid).displayName;
                    list[i].lastvote = list[i].lastvote.toString();
                }
                else{
                    delete userInfo[list[i].userid];
                    list.splice(i, 1);
                    i--;
                }
            }
            await sheet.addRows(list);

            list = Object.values(bankInfo);
            var sheet = doc.sheetsByIndex[8];
            await sheet.clear();
            await sheet.setHeaderRow(["bankid", "memberid", "amount", "lastdes", "lastwith", "bankname", "membername"]);
            for(var i=0; i<list.length; i++){
                if(members.has(list[i].bankid) && members.has(list[i].memberid)){
                    list[i].bankname = members.get(list[i].bankid).displayName;
                    list[i].membername = members.get(list[i].memberid).displayName;
                }
                else{
                    delete bankInfo[list[i].bankid + list[i].memberid];
                    list.splice(i, 1);
                    i--;
                }
            }
            await sheet.addRows(list);

            sheet = doc.sheetsByIndex[4];
            await sheet.clear();
            await sheet.setHeaderRow(["channel", "ids", "time"]);
            list = [];
            for(var prop in mutedAt){
                list.push({
                    channel: prop,
                    ids: mutedAt[prop].ids.toString(),
                    time: mutedAt[prop].time.toString()
                });
            }
            await sheet.addRows(list);

            sheet = doc.sheetsByIndex[5];
            await sheet.clear();
            await sheet.setHeaderRow(["type", "no", "category", "voice", "chat"]);
            await sheet.addRows(bot.getRooms());

            sheet = doc.sheetsByIndex[6];
            await sheet.clear();
            await sheet.setHeaderRow(["key", "value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10", "value11", "value12", "value13"]);
            const dict = [];
            const counting = bot.getCurrrentCouting();
            for(var prop in counting)
            {
                dict.push({ key: counting[prop].key, value1: counting[prop].value1, value2: counting[prop].value2.toString(), value3: counting[prop].value3 });
            }
            dict.push({ key: "daily", value2: bot.getAttendance().toString() });
            dict.push({ key: "reportedmes", value1: bot.getReportedChat().logmes.toString(), value2: bot.getReportedChat().chatid.toString(), value3: bot.getReportedChat().reporter.toString(), value4: bot.getReportedChat().channel.toString()})
            await sheet.addRows(dict);

            await setQuyToc();

            console.log("Data saved!");
            await sleep(sendToDebug ? 0 : botSaveDelay);

            bot.setSleep(false);
            
            for(var i=0; i<anounceChannel.length; i++)
                if(!sendToDebug) bot.sendNonCommandEmbed("savefinished", anounceChannel[i]);
        },

        // Load User Data
        load: async function(message, cmd, args){
            bot.setSleep(true);

            userInfo = {};
            var sheet = doc.sheetsByIndex[0];
            var rows = await sheet.getRows();
            rows.forEach(row => {
                userInfo[row.userid] = {
                    userid: row.userid,
                    exp: parseInt(row.exp),
                    level: parseInt(row.level),
                    role: row.role ? row.role.split(",") : [],
                    item: row.item ? row.item : undefined,
                    items: row.item ? row.item.split(",") : [],
                    fanexp: parseInt(row.fanexp),
                    fanlevel: parseInt(row.fanlevel),
                    lasteng: row.lasteng ? parseInt(row.lasteng) : undefined,
                    lastchat: row.lasteng ? parseInt(row.lastchat) : undefined,
                    lastnicknamechange: row.lastnicknamechange ? parseInt(row.lastnicknamechange) : undefined,
                    money: row.money ? parseInt(row.money) : 0,
                    lastshare: row.lastshare ? parseInt(row.lastshare) : undefined,
                    spouse: row.spouse ? row.spouse : undefined,
                    monthlyfan: parseInt(row.monthlyfan),
                    mango: row.mango ? row.mango.split(",") : [],
                    lastvote: row.lastvote ? parseInt(row.lastvote) : undefined
                }
            })

            bankInfo = {};
            sheet = doc.sheetsByIndex[8];
            rows = await sheet.getRows();
            rows.forEach(row => {
                bankInfo[row.bankid + row.memberid] = {
                    bankid: row.bankid,
                    memberid: row.memberid,
                    amount: parseInt(row.amount),
                    lastdes: row.lastdes,
                    lastwith: row.lastwith,
                }
            })

            mutedAt = {};
            sheet = doc.sheetsByIndex[4];
            rows = await sheet.getRows();
            rows.forEach(row => {
                mutedAt[row.channel] = { ids: row.ids.split(","), time: row.time.split(",")};
                for(var i=0; i<mutedAt[row.channel].time.length; i++)
                mutedAt[row.channel].time[i] = parseInt(mutedAt[row.channel].time[i]);
            })

            const rooms = bot.getRooms();
            sheet = doc.sheetsByIndex[5];
            rows = await sheet.getRows();
            rows.forEach(row => {
                rooms.push({
                    type: row.type,
                    no: row.no,
                    category: row.category,
                    voice: row.voice,
                    chat: row.chat,
                })
            })

            sheet = doc.sheetsByIndex[6];
            rows = await sheet.getRows();
            const count = {};
            var reportedChat = {};
            rows.forEach( row => {
                if(row.key == "counting"){
                    count[row.value3] = { key: row.key, value1: parseInt(row.value1), value2: row.value2 ? row.value2.split(",") : [], value3: row.value3 }
                }
                else if(row.key == "daily") bot.setAttendance(row.value2 ? row.value2.split(",") : []);
                else if(row.key == "reportedmes"){
                    reportedChat.logmes = row.value1 ? row.value1.split(",") : [];
                    reportedChat.chatid = row.value2 ? row.value2.split(",") : [];
                    reportedChat.reporter = row.value3 ? row.value3.split(",") : [];
                    reportedChat.channel = row.value4 ? row.value4.split(",") : [];
                }
            })
            bot.setCurrentCount(count);

            sheet = doc.sheetsByIndex[7];
            rows = await sheet.getRows();
            shopItem = {};
            rows.forEach( row => {
                shopItem[row.id] = {
                    id: row.id,
                    name: row.name,
                    cost: parseInt(row.cost),
                    value1: row.value1 ? parseInt(row.value1) : undefined,
                    value2: row.value2 ? parseInt(row.value2) : undefined,
                    value3: row.value3 ? parseInt(row.value3) : undefined,
                    value4: row.value4 ? row.value4 : "",
                    value5: row.value5 ? parseInt(row.value5) : undefined,
                    value6: row.value6 ? parseInt(row.value6) : undefined,
                    value7: row.value7 ? parseInt(row.value7) : undefined,
                    value8: row.value8 ? parseInt(row.value8) : undefined,
                    value9: row.value9 ? parseInt(row.value9) : undefined,
                    value10: row.value10 ? parseInt(row.value10) : undefined,
                    value11: row.value11 ? parseInt(row.value11) : undefined,
                }
            })

            console.log("User data loaded!");
            await getDictionaries(doc);
            bot.setReportedChat(reportedChat);
            console.log("Dictionary list loaded!");
            bot.setUserInfo(userInfo);
            bot.setSleep(false);
            if(message) await message.channel.send(message.member.toString() + ", mình vừa load dữ liệu thành công từ database! 😎");
        },

        // Change nick name
        doinickname: async function(message, cmd, args){
            args[0] = message.content.substring(message.content.indexOf("{") + 1, message.content.indexOf("}"));
            if(args[0] && message.mentions.members.first()){
                bot.setChangingNickName(true);
                await message.mentions.members.first().setNickname(args[0]);
                bot.setChangingNickName(false);
                await message.channel.send(message.member.toString() + " đã đổi nickname của " + message.mentions.members.first().user.username + " thành \"" + args[0] + "\".");
            }
        },

        // Calculte
        tinh: async function(message, cmd, args){
            if(args.length >= 3){
                await message.channel.send(message.member.toString() + " " + args.join(" ") + " = " + eval(args.join(" ")) + " nha bạn 📝");
                await bot.interactBot(message, cmd, args);
            }
        },

        // Coinflip
        tungxu: async function(message, cmd, args){
            const amount = parseInt(args[1]);
            var bit = false;
            const sides = ["sấp", "ngửa"];
            var guess = undefined;
            if(args[0]) guess = args[0].toLowerCase();

            if(sides.includes(guess) && amount){
                if(await canGame(message.channel, message.member, amount))
                    bit = true;
                else return;
            }

            if(bit && await checkCoBacBotChannel(message, cmd, args) == false) return;
            
            if(cheatMode == true && bit){
                // sides.push("sấp");
                // sides.push("ngửa");
                sides.push(guess == "sấp" ? "ngửa" : "sấp");
            }
            const result = sides[getRanInteger(0, sides.length-1)];
            await message.channel.send("Mình tung một đồng xu, kết quả ra mặt " + result.toUpperCase() + ".");
            if(result == "ngửa") message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3c09PJwPaXFSYnlAZk3FoKZnNiUkCvtaDr8xzakFxODusTWbYhSFBsuYtzCr8lWNwCyavKRtTG7M6IHydyF0Bgk3xZmFoWVHQvnjc1GG2qPv4-dRZme63F75_LYCrv_MTjlYrz717mEk5aKriRJmVNa=s50-no?authuser=0");
            else message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3cFjL8m5S0BO0XHdi3NdOHpKYGT94GQO7Wm0K4_OcGieZXXwYyQi69vMxYCd73aZWwqCCWEArU_UAPrGfpi4wpkt5qmdmFEKG1htl0Bb4uf-ugw1a2C3TqkBqV_HU0HydKuGxcXSqFMnggd6WDkEQuX=s50-no?authuser=0");
            
            if(bit){
                if(guess == result){
                    addMoney(message.member.id, amount, true);
                    await message.channel.send(message.member.toString() + ", bạn đã đoán chính xác kết quả và nhận được " + amount + " " + mConst.getDictionary().currency + "! 🌟");
                } 
                else{
                    addMoney(message.member.id, -amount, true);
                    await message.channel.send(message.member.toString() + ", bạn đã đoán sai và mất " + amount + " " + mConst.getDictionary().currency + ". 🌧️");
                }
            }
            await bot.interactBot(message, cmd, args);
        },

        // Dice role
        xucxac: async function(message, cmd, args){
            const sides = parseInt(args[0]);
            if(sides && sides > 2 && sides < Infinity){
                const guess = parseInt(args[1]);
                const amount = parseInt(args[2]);
                var bit = false;

                if(guess && amount){
                    if(await canGame(message.channel, message.member, amount)) bit = true;
                    else return;
                }

                if(bit && await checkCoBacBotChannel(message, cmd, args) == false) return;

                var result = getRanInteger(1, sides);
                if (cheatMode == true && bit && result == guess){
                    if(getRanInteger(1, 1000) > 666){
                        while(result == guess)
                            result = getRanInteger(1, sides);
                    }
                }
                await message.channel.send(message.member.toString() + " đã tung một con xúc xắc " + sides + " mặt, kết quả ra mặt \"" + result + "\" 🎲");

                if(bit){
                    if(guess == result){
                        addMoney(message.member.id, amount * (sides-1), true);
                        await message.channel.send(message.member.toString() + ", bạn đã đoán chính xác kết quả và nhận được " + (amount * (sides-1)) + " " + mConst.getDictionary().currency + "! 🌟");
                    }
                    else{
                        addMoney(message.member.id, -amount, true);
                        await message.channel.send(message.member.toString() + ", bạn đã đoán sai và mất " + amount + " " + mConst.getDictionary().currency + ". 🌧️");
                    }
                }
                await bot.interactBot(message, cmd, args);
                return;
            }
            await message.channel.send(message.member.toString() + ", lệnh tung xúc xắc không hợp lệ.\nHãy đảm bảo rằng xúc xắc có ít nhất 3 mặt.");
        },

         // Two Dice role
         "2xucxac": async function(message, cmd, args){
            const sides = parseInt(args[0]);
            var guess = args[1];
            if(sides && sides > 2 && sides < Infinity){
                const amount = parseInt(args[2]);
                var bit = false;
                if(guess) guess = guess.toLowerCase();
                if(guess && (guess.includes("nhỏ") || guess.includes("lớn")) && amount){
                    if(await canGame(message.channel, message.member, amount)) bit = true;
                    else return;
                }

                if(bit && await checkCoBacBotChannel(message, cmd, args) == false) return;

                var result = [getRanInteger(1, sides), getRanInteger(1, sides)];
                if (cheatMode == true && bit && checktwodice(result, sides, guess) == true){
                    if(getRanInteger(1, 1000) < 666){
                        while(checktwodice(result, sides, guess) != false){
                            result[0] = getRanInteger(1, sides);
                            result[1] = getRanInteger(1, sides);
                        }
                    }
                }
                await message.channel.send("Mình tung hai con xúc xắc " + sides + " mặt, kết quả ra \"" + result[0] + "\" và \"" + result[1] + "\" 🎲\nKết quả tổng là " + ((result[0] + result[1]) / 1) + ".");

                if(bit){
                    if(checktwodice(result, sides, guess) == "hòa"){
                        await message.channel.send(message.member.toString() + ", kết quả ra bằng số mặt. Bạn không ăn cũng không thua gì cả.");
                    }
                    else if(checktwodice(result, sides, guess) == true){
                        addMoney(message.member.id, amount, true);
                        await message.channel.send(message.member.toString() + ", bạn đã đoán chính xác kết quả và nhận được " + amount + " " + mConst.getDictionary().currency + "! 🌟");
                    }
                    else{
                        addMoney(message.member.id, -amount, true);
                        await message.channel.send(message.member.toString() + ", bạn đã đoán sai và mất " + amount + " " + mConst.getDictionary().currency + ". 🌧️");
                    }
                }
                await bot.interactBot(message, cmd, args);
                return;
            }
            await message.channel.send(message.member.toString() + ", lệnh tung hai xúc xắc không hợp lệ.\nHãy đảm bảo rằng mỗi xúc xắc có ít nhất 3 mặt.");
        },


        // Slot
        slot: async function(message, cmd, args){
            const bet = parseInt(args[0]);
            if(bet && bet > 0){
                if(bet <= userInfo[message.member.id].money){
                    if(await checkCoBacBotChannel(message, cmd, args) == false) return;

                    const result = [];
                    for(var i=0; i<3; i++)
                        result.push(reels[i][Math.floor(Math.random() * reels[i].length)]);
                    
                    addMoney(message.member.id, -bet, true);

                    // Pay table
                    var amount = 0;
                    if(result[0] == result[1] && result[1] == result[2] && result[2] == "⓻")
                        amount = bet * 200;
                    else if(result[0] == result[1] && result[1] == result[2] && result[2] == "🍫")
                        amount = bet * 100;
                    else if(result[0] == result[1] && result[1] == result[2] && result[2] == "🍉")
                        amount = bet * 100;
                    else if(result[0] == result[1] && result[1] == "🍉" && result[2] == "🍫")
                        amount = bet * 100;    
                    else if(result[0] == result[1] && result[1] == result[2] && result[2] == "🍄")
                        amount = bet * 18;
                    else if(result[0] == result[1] && result[1] == "🍄" && result[2] == "🍫")
                        amount = bet * 18;   
                    else if(result[0] == result[1] && result[1] == result[2] && result[2] == "🍊")
                        amount = bet * 14;
                    else if(result[0] == result[1] && result[1] == "🍊" && result[2] == "🍫")
                        amount = bet * 14;   
                    else if(result[0] == result[1] && result[1] == result[2] && result[2] == "🍋")
                        amount = bet * 10;
                    else if(result[0] == result[1] && result[1] == "🍋" && result[2] == "🍫")
                        amount = bet * 10;
                    else if(result[0] == result[1] && result[1] == "🍒")
                        amount = bet * 5;
                    else if(result[0] == "🍒")
                        amount = bet * 2;
                    
                    addMoney(message.member.id, amount, true);
                    var text = message.member.toString() + " đã bỏ " + bet + " tiền vào máy và quay.\nKết quả quay:  " + result[0] + "  " + result[1] + "  " + result[2] + "\n";
                    if(amount > 0) text += "Chúc mừng bạn đã ăn được " + amount + " " + mConst.getDictionary().currency + "! 💰";
                    else text += "Bạn đã không quay trúng được gì... 💸";
                    await message.channel.send(text);
                }
                else await message.channel.send(message.member.toString() + ", bạn không có đủ tiền để cược.");
            }
            else{
                var text = "- Bội số tiền thưởng:\n";
                text += "⓻  ⓻  ⓻  =  x200\n";
                text += "🍫  🍫  🍫  =  x100\n";
                text += "🍉  🍉  🍉  =  x100\n";
                text += "🍉  🍉  🍫  =  x100\n";
                text += "🍄  🍄  🍄  =  x18\n";
                text += "🍄  🍄  🍫  =  x18\n";
                text += "🍊  🍊  🍊  =  x14\n";
                text += "🍊  🍊  🍫  =  x14\n";
                text += "🍋  🍋  🍋  =  x10\n";
                text += "🍋  🍋  🍫  =  x10\n";
                text += "🍒  🍒  bấtkỳ  =  x5\n";
                text += "🍒  bấtkỳ  bấtkỳ  =  x2\n";
                text += "- Số tiền nhận được sẽ là số tiền cược nhân với bội số tiền thưởng khi quay trúng.";
                await message.channel.send(text);
            }
        },

        // RPS
        tuxi: async function(message, cmd, args){
            if(args[0]){
                const guess = args[0].toLowerCase();
                if(guess == "kéo" || guess == "búa" || guess == "bao"){
                    var r;
                    const rps = ["kéo", "búa", "bao"];
                    const emo = { kéo:"✂️", búa:"🔨", bao:"🗞️"};
                    var result = rps[Math.floor(Math.random() * rps.length)];
                    if(guess == "kéo"){
                        if(result == "búa") r = "loose";
                        else if(result == "bao") r = "win";
                        else if(result == "kéo") r = "draw";
                    }
                    else if(guess == "búa"){
                        if(result == "búa") r = "draw";
                        else if(result == "bao") r = "loose";
                        else if(result == "kéo") r = "win";
                    }
                    else if(guess == "bao"){
                        if(result == "búa") r = "win";
                        else if(result == "bao") r = "draw";
                        else if(result == "kéo") r = "loose";
                    }

                    var text = message.member.toString() + " ra " + guess.toUpperCase() + " " + emo[guess] + ", mình ra " + result.toUpperCase() + " " + emo[result] + ".\n";
                    if(r == "win"){
                        await message.channel.send(text + "Bạn thắng rồi! 🌟");
                        await bot.interactBot(message, cmd, args, mConst.getEXPConst().unit * 2, ["🌟"]);
                        return;
                    }
                    else if(r == "loose"){
                        await message.channel.send(text + "Mình thắng rồi! 😆");
                    }
                    else{
                        await message.channel.send(text + "Chúng ta hòa rồi! 🥴");
                    }
                    await bot.interactBot(message, cmd, args);
                }
            }
        },

        // Math
        lamtoan: async function(message, cmd, args){
            const level = parseInt(args[0]);
            if(level && level >= 1 && level <=10){
                const o = getRanInteger(0, 1) == 0 ? "+" : "-";
                const a = getRanInteger(Math.pow(10, (level-1)), Math.pow(10, (level)));
                const b = getRanInteger(Math.pow(10, (level-1)), Math.pow(10, (level)));
                const result = o == "+" ? a + b : a - b;
                await message.channel.send(message.member.toString() + ", đố bạn " + a + " " + o + " " + b + " = ?");
                message.channel.awaitMessages(m => m.member.id == message.member.id && m.channel.id == message.channel.id, {max: 1, time: 10000, errors: ["time"]})
                .then(async collected => {
                    const ansMessage = collected.first();
                    const ans = parseInt(ansMessage.content);
                    if(ans && ans == result){
                        await message.channel.send(message.member.toString() + " chính xác! Bạn giỏi ghê! 👏");
                        await bot.interactBot(ansMessage, cmd, args, mConst.getEXPConst().unit * level, ["👍", "👏"]);
                    }
                    else{
                        await message.channel.send(message.member.toString() + " sai rồi! 🌧️\n" + a + " " + o + " " + b + " = " + result);
                        await bot.interactBot(ansMessage, cmd, args, 0, ["🌧️"]);
                    }
                })
                .catch(async collected => {
                    await message.channel.send("Hết thời gian rồi, " + message.member.toString() + ".\n" +  a + " " + o + " " + b + " = " + result);
                });
            }
        },

        //Tuc Ngu
        tucngu: async function(message, cmd, args){
            var str = henUrl.tucngu[Math.floor(Math.random() * henUrl.tucngu.length)].toLowerCase();
            const list = str.split(" ");
            var word = list[Math.floor(Math.random() * list.length)];
            word = word.replace(",", "");
            var str = str.replace(word, "...");
            await message.channel.send(message.member.toString() + ", hãy điền vào chỗ ba chấm:\n\"" + str + "\"");
            message.channel.awaitMessages(m => m.member.id == message.member.id && m.channel.id == message.channel.id, {max: 1, time: 10000, errors: ["time"]})
            .then(async collected => {
                const ansMessage = collected.first();
                const ans = ansMessage.content.toLowerCase();
                if(word == ans){
                    await message.channel.send(message.member.toString() + " chính xác! Bạn giỏi ghê! 👏");
                    await bot.interactBot(ansMessage, cmd, args, mConst.getEXPConst().unit * 2, ["👍", "👏"]);
                }
                else{
                    await message.channel.send(message.member.toString() + " sai rồi! 🌧️\n\"" + str.replace("...", word)  + "\"");
                    await bot.interactBot(ansMessage, cmd, args, 0, ["🌧️"]);
                }
            })
            .catch(async collected => {
                await message.channel.send("Hết thời gian rồi, " + message.member.toString() + ".\n\"" + str.replace("...", word) + "\"");
            });
        },

        // Game coin flip
        gtungxu: async function(message, cmd, args){
            const amount = parseInt(args[0]);
            if(amount && message.mentions.members.first()){
                var can = await canGame(message.channel, message.member, amount)
                if(can == false) return;

                const member = message.mentions.members.first();
                await message.channel.send(member.toString() + ", " + message.member.toString() + " muốn chơi tung xu cùng bạn với " + amount + " tiền cược.\nNếu chấp nhận thì hãy nhắn ok.");
                message.channel.awaitMessages(m => !m.author.bot && m.member.id == member.id && m.channel.id == message.channel.id && m.content.toLowerCase().includes("ok"), {max: 1, time: 10000, errors: ["time"]})
                .then(async collected => {
                    if(userInfo[member.id].money >= amount){
                        const result = getRanInteger(0, 1);
                        const str = result == 0 ? "SẤP" : "NGỬA";
                        if(result == 0){
                            addMoney(member.id, -amount);
                            addMoney(message.member.id, amount);
                        }
                        else{
                            addMoney(member.id, amount);
                            addMoney(message.member.id, -amount);
                        }
                        var text = message.member.toString() + " chọn mặt SẤP, " + member.toString() + " chọn mặt NGỬA.\n";
                        text += "Mình tung một đồng xu, kết quả ra mặt \"" + str + "\".\n";
                        await message.channel.send(text);
                        if(result == 1) await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3c09PJwPaXFSYnlAZk3FoKZnNiUkCvtaDr8xzakFxODusTWbYhSFBsuYtzCr8lWNwCyavKRtTG7M6IHydyF0Bgk3xZmFoWVHQvnjc1GG2qPv4-dRZme63F75_LYCrv_MTjlYrz717mEk5aKriRJmVNa=s50-no?authuser=0");
                        else await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3cFjL8m5S0BO0XHdi3NdOHpKYGT94GQO7Wm0K4_OcGieZXXwYyQi69vMxYCd73aZWwqCCWEArU_UAPrGfpi4wpkt5qmdmFEKG1htl0Bb4uf-ugw1a2C3TqkBqV_HU0HydKuGxcXSqFMnggd6WDkEQuX=s50-no?authuser=0");
                        text = "Chúc mừng " + (result == 0 ? message.member.toString() : member.toString()) + " đã chiến thắng và lấy được " + amount + " " + mConst.getDictionary().currency + " từ " + (result == 0 ? member.toString() : message.member.toString()) + "! <:wamd:813647968515129344>";
                        await message.channel.send(text);
                    }
                    else await message.channel.send(member.toString() + ", bạn không có đủ tiền để cược.");
                })
                .catch(async collected => {
                    await message.channel.send(message.member.toString() + ", " + member.toString() + " đã không chấp nhận chơi game cùng bạn.");
                });
            }
        },

        // Game dice
        gcaorua: async function(message, cmd, args){
            const amount = parseInt(args[0]);
            if(amount){
                var can = await canGame(message.channel, message.member, amount);
                if(can == false) return;
                gameList[message.member.id] = {
                    host: message.member.id,
                    game: "cào rùa",
                    gameid: "dice",
                    channel: message.channel.id,
                    channelName: message.channel.name,
                    amount: amount,
                    memberid: [],
                    members: []
                }
                await message.channel.send(message.member.toString() + " đã host game cào rùa với " + amount + " tiền cược.\nBạn nào muốn tham gia hãy dùng lệnh /thamgia [tagbạnấy].");
            }
        },
        
        // Cào
        gcao: async function(message, cmd, args){
            var can =  await canGame(message.channel, message.member, mConst.getDictionary().leastbitamount);
            if(can == false) return;
            gameList[message.member.id] = {
                host: message.member.id,
                game: "bài cào cái",
                gameid: "cao",
                channel: message.channel.id,
                channelName: message.channel.name,
                memberid: [],
                members: []
            }
            await message.channel.send(message.member.toString() + " đã host game bài cào cái.\nBạn nào muốn tham gia hãy dùng lệnh /thamgia [tiềncược] [tagbạnấy].");
        },

        // Game Jojo
        gjojo: async function(message, cmd, args){
            const amount = parseInt(args[0]);
            if(amount && message.mentions.members.first() && !message.mentions.members.first().user.bot){
                var can = await canGame(message.channel, message.member, amount);
                if(can == false) return;

                const member = message.mentions.members.first();
                await message.channel.send(member.toString() + ", " + message.member.toString() + " muốn thách đấu Jojo cùng bạn với " + amount + " tiền cược.\nNếu chấp nhận thì hãy nhắn ok.");
                await message.channel.send("https://media.giphy.com/media/wdWFLclnQqO3ofpaM0/giphy.gif");
                message.channel.awaitMessages(m => m.member.id == member.id && m.channel.id == message.channel.id && m.content.toLowerCase().includes("ok"), {max: 1, time: 10000, errors: ["time"]})
                .then(async collected => {
                    if(userInfo[member.id].money >= amount){
                        await message.channel.send(member.toString() + " đã đồng ý lời thách đấu. Trận đấu bắt đầu!");
                        message.channel.awaitMessages(m => (m.channel.id == message.channel.id && ((m.member.id == member.id && m.content.toLowerCase() == "muda") || (m.member.id == message.member.id && m.content.toLowerCase() == "ora"))), {max: 999999999, time: mConst.getMGameConst().jojofighttime, errors: ["time"]})
                        .then(async collected => {})
                        .catch(async collected => {
                            var ora = 0;
                            var muda = 0;
                            const list = collected.array();
                            for(var i=0; i<list.length; i++){
                                if(list[i].content.toLowerCase() == "ora")
                                    ora += 1;
                                else if(list[i].content.toLowerCase() == "muda")
                                    muda += 1;
                            }

                            if(ora > muda){
                                addMoney(message.member.id, amount, true);
                                addMoney(member.id, -amount, true);
                                await message.channel.send(message.member.toString() + " đã đánh bại " + member.toString() + " với " + ora + " cú đấm và lấy được " + amount + " tiền cược. 💪");
                            }
                            else if(ora < muda){
                                addMoney(message.member.id, -amount, true);
                                addMoney(member.id, amount, true);
                                await message.channel.send(member.toString() + " đã đánh bại " + message.member.toString() + " với " + muda + " cú đấm và lấy được " + amount + " tiền cược. 💪");
                            }
                            else await message.channel.send(message.member.toString() + " và " + member.toString() + ", hai bạn đã hòa nhau với " + ora + " cú đấm.");
                            await message.channel.send("https://media.giphy.com/media/9cLYJ783TPn6d0SSk1/giphy.gif");
                        });
                    }
                    else await message.channel.send(member.toString() + ", bạn không có đủ tiền để chấp nhận thách đấu với " + message.member.toString() + ".");
                })
                .catch(async collected => {
                    await message.channel.send(message.member.toString() + ", " + member.toString() + " đã không chấp nhận chơi game cùng bạn.");
                });
            }
        },

        // Bầu cua
        gbaucua: async function(message, cmd, args){
            var can = await canGame(message.channel, message.member, mConst.getDictionary().leastbitamount);
            if(can == false) return;
            gameList[message.member.id] = {
                host: message.member.id,
                game: "bầu cua",
                gameid: "baucua",
                channel: message.channel.id,
                channelName: message.channel.name,
                memberid: [],
                members: []
            }
            await message.channel.send(message.member.toString() + " đã host game bầu cua.\nBạn nào muốn tham gia hãy dùng lệnh /thamgia [tiềncược] [convật] [tagbạnấy].");
        },
    
        //Black jack
        gblackjack: async function(message, cmd, args){
            var can = await canGame(message.channel, message.member, mConst.getDictionary().leastbitamount);
            if(can == false) return;
            gameList[message.member.id] = {
                host: message.member.id,
                game: "Blackjack (Xì Dách)",
                gameid: "bj",
                channel: message.channel.id,
                channelName: message.channel.name,
                memberid: [],
                members: []
            }
            await message.channel.send(message.member.toString() + " đã host game Blackjack (Xì Dách).\nBạn nào muốn tham gia hãy dùng lệnh /thamgia [tiềncược] [tagbạnấy].");
        },

        // Stud poker
        gstudpoker: async function(message, cmd, args){
            var can = await canGame(message.channel, message.member, mConst.getDictionary().leastbitamount);
            if(can == false) return;

            gameList[message.member.id] = {
                host: message.member.id,
                game: "Stud Poker",
                gameid: "spoker",
                channel: message.channel.id,
                channelName: message.channel.name,
                amount: mConst.getDictionary().leastbitamount,
                limit: mConst.getDictionary().pokerbetlimit,
                memberid: [],
                members: []
            }
            await message.channel.send(message.member.toString() + " đã host game Stud Poker.\nBạn nào muốn tham gia hãy dùng lệnh /thamgia [tagbạnấy].");
        },

        // Join game
        thamgia: async function(message, cmd, args){
            const member = message.mentions.members.first();
            if(!member) return;
            
            if(message.member.id == member.id){
                await message.channel.send(message.member.toString() + ", bạn đang là host game rồi.");
                return;
            }

            const amount = parseInt(args[0]);
            const game = gameList[member.id];
            if(game){
                var can = await canGame(message.channel, message.member, game.amount ? game.amount : amount, game);
                if(can == false) return;
                if(!game.amount && !amount) return;

                if(!game.memberid.includes(message.member.id) || game.gameid == "baucua"){
                    if(game.gameid == "baucua"){
                        if(!args[1] || baucuatext.indexOf(args[1].toLowerCase()) < 0) return;
                        game.members.push({ member: message.member.id, amount: amount, bc: baucuadice[baucuatext.indexOf(args[1].toLowerCase())] });
                    }
                    else{
                        game.members.push(game.amount ? message.member.id : { member: message.member.id, amount: amount });
                        game.memberid.push(message.member.id);
                    }
                    await message.channel.send(message.member.toString() + " đã tham gia game " + game.game + " host tại channel " + game.channelName + (game.amount ? "" : (" với số tiền cược là " + amount) + " " + mConst.getDictionary().currency) + ".");
                }
                else await message.channel.send(message.member.toString() + ", bạn hiện tại đã tham gia vào game " + game.game + " của " + member.displayName + " host tại channel " + game.channelName + ".\nHãy chờ bạn ấy bắt đầu game.");
            }
            else await message.channel.send(message.member.toString() + ", hiện tại " + member.toString() + " không có host game nào để bạn tham gia cả.");
        },

        // Exit game
        thoatgame: async function(message, cmd, args){
            const member = message.mentions.members.first();
            if(!member) return;
            
            const game = gameList[member.id];
            if(game){
                if(game.members.includes(message.member.id)){
                    game.members.splice(game.members.indexOf(message.member.id), 1);
                    await message.channel.send(message.member.toString() + " đã rời game " + game.game + " host tại channel " + game.channelName + ".");
                }
                else if(game.members[0].member){
                    var has = -1;
                    for(var i=0; i<game.members.length; i++){
                        if(game.members[i].member == message.member.id){
                            has = i;
                            break;
                        }
                    }
                    if(has > -1){
                        game.members.splice(has, 1);
                        await message.channel.send(message.member.toString() + " đã rời game " + game.game + " host tại channel " + game.channelName + ".");
                    }
                    else await message.channel.send(message.member.toString() + ", bạn hiện tại không có tham gia vào game " + game.game + " của " + member.displayName + " host tại channel " + game.channelName + ".");
                }
                else await message.channel.send(message.member.toString() + ", bạn hiện tại không có tham gia vào game " + game.game + " của " + member.displayName + " host tại channel " + game.channelName + ".");
                
            }
            else await message.channel.send(message.member.toString() + ", hiện tại " + member.toString() + " không có host game nào.");
        },

        // Start game
        batdau: async function(message, cmd, args){
            const game = gameList[message.member.id];
            if(game){
                if(game.members.length != 0){
                    await startGame(message, game);
                }
                else await message.channel.send(message.member.toString() + ", hiện tại không có ai tham gia game bạn host.");
            }
            else await message.channel.send(message.member.toString() + ", bạn hiện tại không host game nào để có thể bắt đầu.");
        },

        // End game
        huygame: async function(message, cmd, args){
            const game = gameList[message.member.id];
            if(game){
                if(game.cannotcancel){
                    await message.channel.send(message.member.toString() + ", bạn không thể hủy game vào lúc này!");
                }
                else{
                    await message.channel.send(message.member.toString() + " đã hủy game " + game.game + " host tại channel " + game.channelName + ".");
                    delete gameList[message.member.id];
                }
            }
        },

        // Game Info
        xemgame: async function(message, cmd, args){
            const member = message.mentions.members.first();
            var game;
            if(member) game = gameList[member.id];
            else game = gameList[message.member.id];
            if(game){
                var text = "Game " + (member ? member.toString() : message.member.toString()) + " đang host:\n";
                text += "Game: " + game.game + "\nChannel: " + game.channelName + (game.amount ? ("\nTiền cược: " + game.amount) : "") + "\nNgười tham gia: ";
                for(var i=0; i< game.members.length; i++){
                    if(game.members[i].member)
                    {
                        text += message.guild.members.cache.get(game.members[i].member).displayName + (game.amount ? "" : (" (" + game.members[i].amount + ")"));
                        
                        //Game specific
                        if(game.gameid == "baucua") text += " " + game.members[i].bc + "";
                    }
                    else text += message.guild.members.cache.get(game.members[i]).displayName;
                    if(i<game.members.length-1) text += ", ";
                }
                await message.channel.send(text);
            }
            else await message.channel.send(message.member.toString() + ", bạn hiện tại không có host game nào cả.");
        },

        // BXHFan
        bxhfan: async function(message, cmd, args){
            const list = Object.values(userInfo);
            list.sort((a, b) => b.fanexp - a.fanexp);
            var text = "";
            for(var i=0; i<10; i++)
                text += "#" + (i+1) + ": " + message.guild.members.cache.get(list[i].userid).displayName + " - " + list[i].fanexp + "\n";
            const embed = new Discord.MessageEmbed()
                .setTitle("BẢNG XẾP HẠNG ĐIỂM FAN")
                .setDescription(text)
                .setColor("#c944ff")
            message.channel.send(embed);
        },

        // BXHFanThang
        bxhfanthang: async function(message, cmd, args){
            const list = Object.values(userInfo);
            list.sort((a, b) => b.monthlyfan - a.monthlyfan);
            var text = "";
            for(var i=0; i<10; i++)
                text += "#" + (i+1) + ": " + message.guild.members.cache.get(list[i].userid).displayName + " - " + list[i].monthlyfan + "\n";
            const embed = new Discord.MessageEmbed()
                .setTitle("BẢNG XẾP HẠNG FAN TÍCH CỰC TRONG THÁNG")
                .setDescription(text)
                .setColor("#c944ff")
            message.channel.send(embed);
        },

        // BXHTC
        bxhtc: async function(message, cmd, args){
            const list = Object.values(userInfo);
            list.sort((a, b) => b.exp - a.exp);
            var text = "";
            for(var i=0; i<10; i++)
                text += "#" + (i+1) + ": " + message.guild.members.cache.get(list[i].userid).displayName + "\n";
            const embed = new Discord.MessageEmbed()
                .setTitle("BẢNG XẾP HẠNG THIỆN CẢM VỚI MÌNH")
                .setDescription(text)
                .setColor("#ff00b0")
            message.channel.send(embed);
        },

        // BXHTien
        bxhtien: async function(message, cmd, args){
            var list = Object.values(userInfo);
            list.sort((a, b) => b.money - a.money);
            const banks = bot.getGuild().roles.cache.get(mConst.getRoleConst().bank).members.keyArray();
            list = list.filter(item => !banks.includes(item.userid));
            var text = "";
            var sum = getSumMoney();
            for(var i=0; i<list.length; i++){
                if(message.guild.members.cache.get(list[i].userid)){
                    //sum += list[i].money;
                    if(i<10) text += "#" + (i+1) + ": " + message.guild.members.cache.get(list[i].userid).displayName + " - " + list[i].money + "\n";    
                }
                else{
                    delete userInfo[list[i].userid];
                    list.splice(i, 1);
                    i--;
                }
                // if(message.guild.members.cache.has(list[i].userid)){
                    
                // }
                // else{
                //     delete userInfo[list[i].userid];
                //     i--;
                // }
            }
            var sumBank = getBankMoney();
            // var footer = "- Tổng tài sản hiện có của server: " + sum + " " + mConst.getDictionary().currency + ".";
            // text += "\n- Tổng tiền gửi trong các ngân hàng: " + sumBank + " " + mConst.getDictionary().currency + ".";
            // text += "\n- Mức tiền bảo kê khi gửi/lãi suất khi vay ngân hàng: " + (getBankRate() * 100).toFixed(2) + "%.";
            const embed = new Discord.MessageEmbed()
                .setTitle("BẢNG XẾP HẠNG NGƯỜI GIÀU")
                .setDescription(text)
                .addField("Tổng tài sản server", sum + " " + mConst.getDictionary().currency)
                .addField("Tổng tiền trong các ngân hàng", sumBank + " " + mConst.getDictionary().currency)
                .addField("Mức bảo kê khi gửi/lãi suất khi vay", (getBankRate() * 100).toFixed(2) + "%")
                .setColor("#fff18b")
            message.channel.send(embed);
        },
    
        // BXHNgheo
        bxhngheo: async function(message, cmd, args){
            var list = Object.values(userInfo);
            list.sort((a, b) => a.money - b.money);
            const banks = bot.getGuild().roles.cache.get(mConst.getRoleConst().bank).members.keyArray();
            list = list.filter(item => !banks.includes(item.userid));
            var text = "";
            var sum = 0;
            for(var i=0; i<list.length; i++){
                if(message.guild.members.cache.get(list[i].userid)){
                    sum += list[i].money;
                    if(i<10) text += "#" + (i+1) + ": " + message.guild.members.cache.get(list[i].userid).displayName + ": " + list[i].money + "\n";    
                }
                else{
                    delete userInfo[list[i].userid];
                    list.splice(i, 1);
                    i--;
                }
            }
            const embed = new Discord.MessageEmbed()
                .setTitle("BẢNG XẾP HẠNG NGƯỜI NGHÈO")
                .setDescription(text)
                .setColor("#7a7a00")
            message.channel.send(embed);
        },

        // Xem bank
        xembank: async function(message, cmd, args){
            const banks = bot.getGuild().roles.cache.get(mConst.getRoleConst().bank).members.keyArray();
            const bank = message.mentions.members.first();
            if(bank){
                if(banks.includes(bank.id)){
                    if(bankInfo[bank.id + message.member.id]){
                        if(bankInfo[bank.id + message.member.id].amount >= 0)
                            await message.channel.send(message.member.toString() + ", bạn đang gửi " + bankInfo[bank.id + message.member.id].amount + " " + mConst.getDictionary().currency + " vào " + bank.toString() + ".");
                        else await message.channel.send(message.member.toString() + ", bạn đang thiếu nợ " + bank.toString() + " " +  bankInfo[bank.id + message.member.id].amount + " " + mConst.getDictionary().currency + ".");
                    }
                    else await message.channel.send(message.member.toString() + ", bạn không có gửi tiền hay vay tiền từ " + bank.toString() + ".");
                }
                else if(banks.includes(message.member.id)){
                    if(bankInfo[message.member.id + bank.id]){
                        if(bankInfo[message.member.id + bank.id].amount >= 0)
                            await message.channel.send(bank.toString() + " đang gửi " + bankInfo[message.member.id + bank.id].amount + " " + mConst.getDictionary().currency + " vào " + message.member.toString() + ".");
                        else await message.channel.send(bank.toString() + " đang thiếu nợ " + message.member.toString() + " " +  bankInfo[message.member.id + bank.id].amount + " " + mConst.getDictionary().currency + ".");
                    }
                    else await message.channel.send(bank.toString() + " hiện tại không có gửi tiền hay vay tiền từ " + message.member.toString() + ".");
                }
                else await message.channel.send(bank.toString() + " không phải là ngân hàng.");
            }
            else if(banks.includes(message.member.id)){
                var text = "Thông tin về " + message.member.toString() + ":\n";
                const guildMembers = bot.getGuildMembers();
                var list = Object.values(bankInfo);
                list = list.sort( (a, b) => b.amount - a.amount);
                for(var prop=0; prop <list.length; prop++){
                    if(list[prop].bankid == message.member.id)
                    {
                        if(!guildMembers.get(list[prop].memberid))
                        {
                            delete list[prop];
                            i--;
                        }
                        else{
                            text += "- " + guildMembers.get(list[prop].memberid).displayName + ": ";
                            if(list[prop].amount >= 0) text += " gửi " + list[prop].amount;
                            else text += " nợ " + list[prop].amount;
                            text += "\n";    
                        }
                    }
                }
                text += "Mức tiền bảo kê khi gửi/lãi suất khi vay ngân hàng: " + (getBankRate() * 100).toFixed(2) + "%.";
                
                await message.channel.send(text);
            }    
        },

        // Xem vo chong
        xemkethon: async function(message, cmd, args){
            var member = message.mentions.members.first();
            var spouse;
            if(!member) member = message.member;

            spouse = userInfo[member.id].spouse;

            if(spouse) await message.channel.send(member.toString() + " đã kết hôn với " + bot.getGuildMembers().get(spouse).displayName + ".");
            else await message.channel.send(member.toString() + " hiện tại đang độc thân.");
        },

        // Profile
        profile: async function(message, cmd, args){
            var member = message.mentions.members.first();
            if(!member) member = message.member;
            var info = userInfo[member.id];
            
            if(info){
                var color = info.fanexp >= mConst.getEXPConst().topfan ? "#c944ff" : "#ffffff"
                
                const spouse = bot.getGuildMembers().get(info.spouse);
                const embed = new Discord.MessageEmbed()
                .setTitle(member.displayName)
                .setDescription(member.user.tag)
                .addField("Điểm hiện có", info.fanexp, true)
                .addField("Số item trong kho", info.items.length, true)
                .addField("Kết hôn", spouse ? spouse.displayName : "Độc thân", true)
                .setColor(color)
                .setThumbnail(member.user.avatarURL())
                .setFooter("User ID: " + member.id);

                if(member.id == message.member.id || message.member.roles.cache.has(mConst.getRoleConst().treasurer) || message.member.roles.cache.has(mConst.getRoleConst().dev)){
                    embed.addField("Tiền sở hữu", info.money + " " + mConst.getDictionary().currency, true)
                }
                message.channel.send(embed);
            }
        },

        // Vote
        vote: async function(message, cmd, args){
            var left = Date.now() - userInfo[message.member.id].lastvote;
            if(left >= 43200000){
                await message.channel.send(mConst.getDictionary().votelink);
            }
            else{
                await message.channel.send(message.member.toString() + ", bạn hãy chờ " + Math.ceil(left / 60000) + " phút nữa để có thể vote tiếp cho server.");
            }
        },

        // Sendnude
        sendnude: async function(message, cmd, args){
            const channel = message.channel;
            if(!channel.nsfw){
                await channel.send(message.member.toString() + " ưm... mình không thể thực hiện điều này ở đây được... 😓");
                await channel.send("https://lh3.googleusercontent.com/pw/ACtC-3cVkwcjGgDjOU5PYNJGyUgjAh8d0oLfSaVEmOSY2oYd5kjDPQ1jNXJpMXHPLZ-VKbGqluwpWi4nz5EcZaSPkRzRB1eRM8KvhfvEpnsmN87QVLff1Jv7pacPGsdm2A5-XQJegvtbOy7bgbo0a_bJOUom=s868-no?authuser=0");
            }
            else{
                const text = [
                    message.member.toString() + ", ngại quá... >///<"
                    ,"Đừng có nhìn nhiều quá đấy, " + message.member.toString() + " >///<"
                    ,"Xấu hổ quá 😭"
                ];
                await channel.send(text[Math.floor(Math.random()* text.length)]);
                await channel.send(henUrl.silver[Math.floor(Math.random()* henUrl.silver.length)]);
                await bot.interactBot(message, cmd, args, mConst.getEXPConst().unit, ["💞"]);
            }
        },

        // Send hen
        guihen: async function(message, cmd, args){
            const channel = message.channel;
            if(!channel.nsfw){
                await channel.send(message.member.toString() + " ưm... mình không thể thực hiện điều này ở đây được... 😓");
                await channel.send("https://lh3.googleusercontent.com/pw/ACtC-3cVkwcjGgDjOU5PYNJGyUgjAh8d0oLfSaVEmOSY2oYd5kjDPQ1jNXJpMXHPLZ-VKbGqluwpWi4nz5EcZaSPkRzRB1eRM8KvhfvEpnsmN87QVLff1Jv7pacPGsdm2A5-XQJegvtbOy7bgbo0a_bJOUom=s868-no?authuser=0");
            }
            else{
                const text = [message.member.toString() + ", darling thật là damdang >w<"];
                await channel.send(text[Math.floor(Math.random()* text.length)]);
                await channel.send(henUrl.general[Math.floor(Math.random()* henUrl.general.length)]);
                await bot.interactBot(message, cmd, args);
            }
        },

        // Test Functions
        test: async function(message, cmd, args){
            //console.log(poker.checkResult(["5♤", "6♤", "5♡", "6♡", "9♤"]));
            // console.log(pokerText[Math.floor(poker.checkResult(["5♤", "8♤", "2♡", "9♡", "10♧"])/100).toString()] );
            // console.log(pokerText[Math.floor(poker.checkResult(["5♤", "5♤", "2♡", "9♡", "10♧"])/100).toString()] );
            // console.log(pokerText[Math.floor(poker.checkResult(["5♤", "2♤", "5♡", "9♡", "2♧"])/100).toString()] );
            // console.log(pokerText[Math.floor(poker.checkResult(["5♤", "8♤", "5♡", "9♡", "5♧"])/100).toString()] );
            // console.log(pokerText[Math.floor(poker.checkResult(["5♤", "6♤", "7♡", "8♡", "9♧"])/100).toString()] );
            // console.log(pokerText[Math.floor(poker.checkResult(["5♤", "8♤", "2♤", "9♤", "10♤"])/100).toString()] );
            // console.log(pokerText[Math.floor(poker.checkResult(["5♤", "3♤", "5♡", "3♡", "5♧"])/100).toString()] );
            // console.log(pokerText[Math.floor(poker.checkResult(["5♤", "5♤", "5♡", "3♡", "5♧"])/100).toString()] );
            //console.log(pokerText[Math.floor(poker.checkResult(["Q♢", "10♢", "K♢", "7♢", "2♢"])/100).toString()] );
            bot.test();
        }
    }

    return commands;
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}  

function getRanInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

async function getDictionaries(doc){

    //Dictionary
    var data = doc.sheetsByIndex[1];
    var rows = await data.getRows();
    profany = rows[0].value1.split(",");
    profanies = rows[1].value1.split(",");
    words = rows[2].value1.split(",");
    var genreRoles = rows[3].value1.split(",");
    mConst.setGenreRoles(genreRoles);

    var value1 = rows[4].value1.split(",");
    var value2 = rows[4].value2.split(",");
    var reactRoles = {};
    for(var i=0; i< value1.length; i++)
        reactRoles[value2[i]] = value1[i];
    reactRoles.emoji = rows[4].value3;
    reactRoles.channel = rows[4].value4;
    bot.setReactRoles(reactRoles);

    var buyRoles = {};
    value1 = rows[5].value1.split(",");
    value2 = rows[5].value3.split(",");
    for(var i=0; i<value1.length; i++)
        buyRoles[value2[i]] = value1[i];
    buyRoles.message = rows[5].value2;
    buyRoles.channel = rows[5].value4;
    bot.setBuyRoles(buyRoles);

    var reportEmo = {};
    reportEmo.report = rows[6].value1;
    reportEmo.accept = rows[6].value2;
    reportEmo.reject = rows[6].value3;
    reportEmo.channel = rows[6].value4;
    reportEmo.present = parseInt(rows[6].value5);
    bot.setReportEmoji(reportEmo);

    // Meme
    data = doc.sheetsByIndex[2];
    rows = await data.getRows();
    url = {};
    for(var i=0; i<rows.length; i++){
        if(url[rows[i].key]){
            url[rows[i].key].push(rows[i].value);
        }
        else url[rows[i].key] = [rows[i].value];
    }
    bot.destroyEmbedMap();

    
    // Hen
    data = doc.sheetsByIndex[3];
    rows = await data.getRows();
    henUrl = {
        silver: [],
        general: [],
        tucngu: [],
    };
    rows.forEach(row => {
        if(row.silver) henUrl.silver.push(row.silver);
        if(row.general) henUrl.general.push(row.general);
        if(row.tucngu) henUrl.tucngu.push(row.tucngu);
    })
}

async function addMoney(memberID, amount, setbelowzero = true){
    const member = bot.getGuild().members.cache.get(memberID);
    if(!member){
        delete userInfo[memberID];
        return;
    }
    if(member.user.bot) return;
    if(!userInfo[memberID]) userInfo[memberID] = bot.createNewUserInfo(memberID);

    const before = userInfo[memberID].money;
    userInfo[memberID].money += amount;
    if(!setbelowzero && userInfo[memberID].money < 0){
        if(before >= 0) userInfo[memberID].money = 0;
        else userInfo[memberID].money = before;
    }
    
    if(userInfo[memberID].money < mConst.getDictionary().nguoingheo)
        member.roles.add(mConst.getRoleConst().nguoingheo);
    else member.roles.remove(mConst.getRoleConst().nguoingheo);
}

async function canGame(channel, member, amount, game){
    if(userInfo[member.id].money < 0){
        await channel.send(member.toString() + ", bạn đang thiếu nợ tiền server.\nHãy trả hết nợ để có thể chơi các game cá cược.");
        return false;
    }
    else if(userInfo[member.id].money < amount){
        await channel.send(member.toString() + ", bạn không có đủ tiền để tham gia/chơi game.");
        return false;
    }
    
    if(amount < mConst.getDictionary().leastbitamount){
        await channel.send(member.toString() + ", bạn phải cược số tiền tối thiểu là " + mConst.getDictionary().leastbitamount + " " + mConst.getDictionary().currency + ".");
        return false;
    }

    if(gameList[member.id]){
        await channel.send(member.toString() + ", bạn đang host game " + gameList[member.id].game + " tại channel " + gameList[member.id].channelName + ".\nHãy kết thúc nó trước khi host game mới.");
        return false;
    }

    if(game && game.max && game.members.length >= game.max){
        await channel.send(member.toString() + ", game của " + member.guild.members.cache.get(game.host).toString() + " đã đầy người tham gia.");
        return false;
    }

    if(game && game.cannotjoin == true){
        await channel.send(member.toString() + ", bạn không thể thamg gia game của " + member.guild.members.cache.get(game.host).toString() + " vào lúc này.");
        return false;
    }

    return true;
}

function getDeck(){
    const deck = [];
    const no = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const type = ["♤", "♡", "♢", "♧"];
    for(var i=0; i<no.length; i++){
        for(var j=0; j<type.length; j++){
            deck.push(no[i] + type[j]);
        }
    }
    return deck;
}
function getSuit(){ return ["♤", "♡", "♢", "♧"]; }
function getCardNo(){ return ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]; }
const caoValues = { "A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10};
const caoTien = ["J", "Q", "K"];

const bjxi = ["10", "J", "Q", "K"];
const bjValues = { "A": 11, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10};
const bjValues1 = { "A": 10, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10};
const bjValues2 = { "A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10};

const reels = [
    ["⓻", "🍫", "🍫", "🍫", "🍉", "🍉", "🍄", "🍊", "🍊", "🍊", "🍊", "🍊", "🍊", "🍊", "🍋", "🍋", "🍋", "🍋", "🍋", "🍒", "🍒"],
    ["⓻", "🍫", "🍫", "🍉", "🍉", "🍄", "🍄", "🍄", "🍄", "🍄", "🍊", "🍊", "🍊", "🍋", "🍋", "🍋", "🍋", "🍋", "🍒", "🍒", "🍒", "🍒", "🍒", "🍒"],
    ["⓻", "🍫", "🍉", "🍉", "🍄", "🍄", "🍄", "🍄", "🍄", "🍄", "🍄", "🍄", "🍊", "🍊", "🍊", "🍋", "🍋", "🍋", "🍋", "🍐", "🍐", "🍐", "🍐"],
]

const baucuadice = ["🍐", "🦀", "🐟", "🐓", "🦐", "🦌"];
const baucuatext = ["bầu", "cua", "cá", "gà", "tôm", "nai"];
function getBauCuaIcon(text){ return baucuadice[baucuatext.indexOf(text)]; }

const pokerText = {
    "0": "MẬU THẦU",
    "1": "ĐÔI",
    "2": "THÚ",
    "3": "SÁM CÔ",
    "4": "SẢNH",
    "5": "THÙNG",
    "6": "CÙ LŨ",
    "7": "TỨ QUÝ",
    "8": "THÙNG PHÁ SẢNH"
}

async function startGame(message, game){
    
    // Xúc xắc
    if(game.gameid == "dice"){
        var deck = getDeck().slice();
        var text = "Mình bắt đầu chia cho mỗi bạn tham gia 3 lá bài. Kết quả như sau:\n";
        var max = 0;
        game.members.push(game.host);
        var autoWin;
        const values = {};

        for(var i=0; i<game.members.length; i++){
            values[game.members[i]] = {};
            values[game.members[i]].cards = [];
            autoWin = true;
            for(var j=0; j<3; j++){
                if(deck.length <= 0) deck = getDeck().slice();
                const index = getRanInteger(0, deck.length-1);
                values[game.members[i]].cards.push(deck[index]);
                if(!caoTien.includes(deck[index].substring(0, 1))) autoWin = false;
                deck.splice(index, 1);
            }
            values[game.members[i]].point = (caoValues[values[game.members[i]].cards[0].substring(0, values[game.members[i]].cards[0].length-1)] + caoValues[values[game.members[i]].cards[1].substring(0, values[game.members[i]].cards[1].length-1)] + caoValues[values[game.members[i]].cards[2].substring(0, values[game.members[i]].cards[2].length-1)]) % 10;
            if(autoWin == true) values[game.members[i]].point = 30;
            if(values[game.members[i]].point > max) max = values[game.members[i]].point;
            text += message.guild.members.cache.get(game.members[i]).displayName + ":   " + values[game.members[i]].cards.join("   ") + "   = " + (values[game.members[i]].point < 30 ? values[game.members[i]].point : "CÀO TIÊN") + "\n";
        }
        await message.channel.send(text);
        
        const winner = [];
        for(var i=0; i<game.members.length; i++){
            if(values[game.members[i]].point == max) winner.push(game.members[i]);
        }
        const amount = Math.floor(game.amount * (game.members.length - winner.length) / winner.length);
        for(var i=0; i<game.members.length; i++){
            if(winner.includes[game.members[i]]) addMoney(game.members[i], amount, true);
            else addMoney(game.members[i], -game.amount, true);
        }
        const winners = [];
        for(var i=0; i<winner.length; i++)
            winners.push(message.guild.members.cache.get(winner[i]).toString());

        if(winner.length < game.members.length)
            text = "Chúc mừng " + winners.toString().replace(",", ", ") + " đã chiến thắng và nhận được " + amount + " " + mConst.getDictionary().currency + "! 💵";
        else text = "Tất cả các bạn tham gia đã hòa với nhau. 😅";
        await message.channel.send(text);
    }
    else if(game.gameid == "cao"){
        var deck = getDeck().slice();
        var text = "Mình bắt đầu chia cho mỗi bạn tham gia 3 lá bài. Kết quả như sau:\n";
        game.members.push( { member: game.host, amount: 0} );
        var autoWin;
        for(var i=0; i<game.members.length; i++){
            game.members[i].cards = [];
            autoWin = true;
            for(var j=0; j<3; j++){
                if(deck.length <= 0) deck = getDeck().slice();
                const index = getRanInteger(0, deck.length-1);
                game.members[i].cards.push(deck[index]);
                if(!caoTien.includes(deck[index].substring(0, 1))) autoWin = false;
                deck.splice(index, 1);
            }
            game.members[i].point = (caoValues[game.members[i].cards[0].substring(0, game.members[i].cards[0].length-1)] + caoValues[game.members[i].cards[1].substring(0, game.members[i].cards[1].length-1)] + caoValues[game.members[i].cards[2].substring(0, game.members[i].cards[2].length-1)]) % 10;
            if(autoWin == true) game.members[i].point = 30;
            text += message.guild.members.cache.get(game.members[i].member).displayName + ":   " + game.members[i].cards.join("   ") + "   = " + (game.members[i].point < 30 ? game.members[i].point : "CÀO TIÊN") + "\n";
        }
        await message.channel.send(text);
        text = "";
        text += message.guild.members.cache.get(game.host).toString() + ", dưới đây là kết quả ăn tiền và chung tiền của bạn:\n";
        const host = game.members[game.members.length-1];
        for(var i=0; i<game.members.length - 1; i++){
            if(game.members[i].point < host.point){
                addMoney(game.members[i].member, -game.members[i].amount, true);
                addMoney(host.member, game.members[i].amount, true);
                text += "Ăn " + game.members[i].amount + " của " + message.guild.members.cache.get(game.members[i].member).displayName + ".\n";
            }
            else if(game.members[i].point > host.point){
                addMoney(game.members[i].member, game.members[i].amount, true);
                addMoney(host.member, -game.members[i].amount, true);
                text += "Chung " + game.members[i].amount + " cho " + message.guild.members.cache.get(game.members[i].member).displayName + ".\n";
            }
            else{
                text += "Hòa với " + message.guild.members.cache.get(game.members[i].member).displayName + ".\n";
            }
        }
        await message.channel.send(text);
    }
    else if(game.gameid == "baucua"){
        const result = [];
        for(var i=0; i<3; i++)
            result.push(baucuadice[Math.floor(Math.random() * baucuadice.length)]);
        
        var str = {};
        for(var j=0; j<game.members.length; j++){
            var earn = 0;
            for(var i=0; i<result.length; i++){
                if(game.members[j].bc == result[i]){
                    addMoney(game.members[j].member, game.members[j].amount, true);
                    addMoney(game.host, -game.members[j].amount);
                    earn += game.members[j].amount;
                }
            }
            if(earn == 0){
                addMoney(game.members[j].member, -game.members[j].amount, true);
                addMoney(game.host, game.members[j].amount);
                earn = -game.members[j].amount;
            }
            if(!str[game.members[j].member]) str[game.members[j].member] = { amount: earn, text: [game.members[j].bc]};
            else{
                str[game.members[j].member].amount += earn;
                str[game.members[j].member].text.push(game.members[j].bc);
            }
        }

        var text = "Mình tung 3 con xúc xắc bầu cua. Kết quả ra:  " + result[0] + "  " + result[1] + "  " + result[2] + "\n";
        text += message.guild.members.cache.get(game.host).toString() + ", dưới đây là kết quả ăn tiền và chung tiền của bạn:\n";
        for(var prop in str){
            if(str[prop].amount < 0)
                text += "Ăn " + (-str[prop].amount) + " của " + message.guild.members.cache.get(prop).displayName + "  " + str[prop].text.join("  ") + "\n";
            else if(str[prop].amount > 0)
                text += "Chung " + str[prop].amount + " cho " + message.guild.members.cache.get(prop).displayName + "  " + str[prop].text.join("  ") + "\n";
            else text += "Hòa với " + message.guild.members.cache.get(prop).displayName + "  " + str[prop].text.join("  ") + "\n";
        }
        await message.channel.send(text);
    }
    else if(game.gameid == "bj"){
        game.cannotcancel = true;
        game.cannotjoin = true;
        var deck = getDeck().slice();
        var text = "Mình bắt đầu chia cho mỗi bạn tham gia 2 lá bài. Hãy check tin nhắn riêng của mình để xem bài của bạn.\n";
        message.channel.send(text);
        game.members.push( { member: game.host, amount: 0} );
        for(var i=0; i<game.members.length; i++){
            var autoWin = false;
            game.members[i].cards = [];
            for(var j=0; j<2; j++){
                if(deck.length <= 0) deck = getDeck().slice();
                const index = getRanInteger(0, deck.length-1);
                game.members[i].cards.push(deck[index]);
                deck.splice(index, 1);
            }

            // Check Auto win
            if(game.members[i].cards[0].substring(0, game.members[i].cards[0].length-1) == "A"){
                if(bjxi.includes(game.members[i].cards[1].substring(0, game.members[i].cards[1].length-1)))
                {
                    game.members[i].point = 23;
                    autoWin = true;
                }
                else if(game.members[i].cards[1].substring(0, game.members[i].cards[1].length-1) == "A"){
                    game.members[i].point = 24;
                    autoWin = true;
                }
            }
            else if(game.members[i].cards[1].substring(0, game.members[i].cards[1].length-1) == "A"){
                if(bjxi.includes(game.members[i].cards[0].substring(0, game.members[i].cards[0].length-1)))
                {
                    game.members[i].point = 23;
                    autoWin = true;
                }
            }

            if(autoWin == false){
                game.members[i].point = (bjValues[game.members[i].cards[0].substring(0, game.members[i].cards[0].length-1)] + bjValues[game.members[i].cards[1].substring(0, game.members[i].cards[1].length-1)]);
            }
            message.guild.members.cache.get(game.members[i].member).user.send("Bạn hiện tại đang có:   " + game.members[i].cards.join("   "))
            .catch(() => {
                message.channel.send("Lỗi gửi tin nhắn riêng cho " + message.guild.members.cache.get(game.members[i].member).toString() + "...");
            });
        }
        blackjackTurn(message.channel, game, 0, bot.getGuildMembers(), deck);
    }
    else if(game.gameid == "spoker"){
        game.cannotcancel = true;
        game.cannotjoin = true;
        game.maxbet = game.amount;
        var deck = getDeck().slice();
        var text = "Mình bắt đầu chia cho mỗi bạn tham gia 2 lá bài. Hãy check tin nhắn riêng của mình để xem bài của bạn.\n";
        message.channel.send(text);
        var mems = [];
        for(var i=0; i<game.members.length; i++){
            mems.push({
                member: game.members[i],
                amount: game.amount
            })
        }
        game.members = mems;
        game.members.push( { member: game.host, amount: game.amount} );

        // Chia 2 lá bài cho mỗi người
        for(var i=0; i<game.members.length; i++){
            game.members[i].cards = [];
            game.members[i].amount = game.amount;
            for(var j=0; j<2; j++){
                if(deck.length <= 0) deck = getDeck().slice();
                const index = getRanInteger(0, deck.length-1);
                game.members[i].cards.push(deck[index]);
                deck.splice(index, 1);
            }
            await message.guild.members.cache.get(game.members[i].member).user.send("Bạn hiện tại đang có:   " + game.members[i].cards.join("   "))
            .catch(() => {
                message.channel.send("Lỗi gửi tin nhắn riêng cho " + message.guild.members.cache.get(game.members[i].member).toString() + "...");
            });
        }

        game.round = 0;
        game.members[0].bet = true;
        await studPokerTurn(message.channel, game, 0, message.guild.members.cache, deck, true);

    }

    delete gameList[game.host];
}

async function blackjackTurn(channel, game, curIndex, guildMembers, deck){
    if(curIndex < game.members.length){
        const member = guildMembers.get(game.members[curIndex].member);
        if(!member){
            delete game.members[curIndex];
            blackjackTurn(channel, game, curIndex + 1, guildMembers, deck);
        }
        else if(game.members[curIndex].point > 21 || game.members[curIndex].cards.length >= 5){
            blackjackTurn(channel, game, curIndex + 1, guildMembers, deck);
        }
        else{
            await channel.send(member.toString() + ", bạn muốn rút thêm bài hay thôi?\n(Chat \"rút\" hoặc \"thôi\")");
            channel.awaitMessages(m => (!m.author.bot && m.channel.id == channel.id && m.member.id == game.members[curIndex].member && (m.content.toLowerCase().includes("rút") || m.content.toLowerCase().includes("thôi"))), {max: 1, time: mConst.getMGameConst().blackjackthinktime, errors: ["time"]})
            .then(async collected => {
                const mes = collected.first();
                const ans = mes.content.toLowerCase();
                if(ans.includes("rút")){
                    if(game.members[curIndex].point <= 0){
                        await channel.send(member.toString() + ", bạn không thể rút bài với số điểm hiện tại được nữa. 😅");
                        blackjackTurn(channel, game, curIndex + 1, guildMembers, deck);
                    }
                    else{
                        if(deck.length <= 0) deck = getDeck().slice();
                        const index = getRanInteger(0, deck.length-1);
                        const card = deck[index];
                        game.members[curIndex].cards.push(card);
                        deck.splice(index, 1);
                        game.members[curIndex].point = 0;
                        var hasacethree = false;
                        for(var i=0; i<game.members[curIndex].cards.length; i++){
                            if(game.members[curIndex].cards.length == 3){
                                if(game.members[curIndex].cards[i].substring(0, game.members[curIndex].cards[i].length-1) == "A")
                                    hasacethree = true;
                                game.members[curIndex].point += bjValues1[game.members[curIndex].cards[i].substring(0, game.members[curIndex].cards[i].length-1)];
                            }
                            else game.members[curIndex].point += bjValues2[game.members[curIndex].cards[i].substring(0, game.members[curIndex].cards[i].length-1)];
                        }
                        if(game.members[curIndex].point > 21){
                            game.members[curIndex].point = 0;
                            if(hasacethree == true){
                                for(var i=0; i<game.members[curIndex].cards.length; i++)
                                    game.members[curIndex].point += bjValues2[game.members[curIndex].cards[i].substring(0, game.members[curIndex].cards[i].length-1)];
                            }
                        }
                        if(game.members[curIndex].cards.length >= 5 && (game.members[curIndex].point > 0 && game.members[curIndex].point <= 21))
                            game.members[curIndex].point = 22; 
                        member.send("Bạn hiện tại đang có:   " + game.members[curIndex].cards.join("   "))
                        .catch(() => {
                            channel.send("Lỗi gửi tin nhắn riêng cho " + member.toString() + "...");
                        });;
                        blackjackTurn(channel, game, curIndex, guildMembers, deck);
                    }
                }
                else{
                    await channel.send(member.toString() + " đã quyết định thôi không rút bài nữa!\n" + member.toString() + " hiện tại đang có " + game.members[curIndex].cards.length + " lá bài.");
                    blackjackTurn(channel, game, curIndex + 1, guildMembers, deck);
                }
            })
            .catch(async collected => {
                await channel.send("Hết thời gian suy nghĩ!\n" + member.toString() + " hiện tại đang có " + game.members[curIndex].cards.length + " lá bài.");
                blackjackTurn(channel, game, curIndex + 1, guildMembers, deck);
            });    
        }
    }
    else{
        curIndex -= 1;
        const hostMember = guildMembers.get(game.members[curIndex].member);
        const host = game.members[curIndex];
        text = "Lật bài:\n";
        for(var i=0; i<game.members.length; i++){
            if(game.members[i].point > 0 && game.members[i].point < 16) game.members[i].point = -1;
            text += "- " + guildMembers.get(game.members[i].member).displayName + ":  " + game.members[i].cards.join("  ") + "  = " + getBJPoint(game.members[i].point) + "\n";
        }
        text += hostMember.toString() + ", dưới đây là kết quả ăn tiền và chung tiền của bạn:\n";
        for(var i=0; i<game.members.length - 1; i++){
            var amount = game.members[i].amount;
            if(game.members[i].point < host.point){
                if(host.point == 24) amount *= 2;
                addMoney(game.members[i].member, -amount, true);
                addMoney(host.member, amount, true);
                text += "Ăn " + amount + " của " + guildMembers.get(game.members[i].member).displayName + ".\n";
            }
            else if(game.members[i].point > host.point){
                if(game.members[i].point == 24) amount *= 2;
                addMoney(game.members[i].member, amount, true);
                addMoney(host.member, -amount, true);
                text += "Chung " + amount + " cho " + guildMembers.get(game.members[i].member).displayName + ".\n";
            }
            else{
                text += "Hòa với " + guildMembers.get(game.members[i].member).displayName + ".\n";
            }
        }
        await channel.send(text);
    }
}

function getBJPoint(point){
    if(point > 0 && point <= 21) return point.toString();
    else if(point == 22) return "NGŨ LINH";
    else if(point == 23) return "XÌ DÁCH";
    else if(point == 24) return "XÌ BÀNG";
    else if(point == 0) return "QUÁ";
    else return "NON";
}

const pokerSuitRank = ["♧", "♢", "♡", "♤"];
async function studPokerRound(channel, game, curIndex, guildMembers, deck){
    if(game.round < 4){
        var winner = -1;
        var remains = game.members.filter(mem => mem.state != "fold");

        if(remains.length == 1){
            winner = game.members.indexOf(remains[0]);
        }
        else{
            var text = "Mình chia tiếp cho mỗi bạn 1 lá bài. Kết quả như sau:\n";
            for(var k=0; k<game.members.length; k++){
                if(game.members[k].state != "fold"){
                    if(deck.length <= 0) deck = getDeck().slice();
                    const index = getRanInteger(0, deck.length-1);
                    game.members[k].cards.push(deck[index]);
                    deck.splice(index, 1);
                    text += guildMembers.get(game.members[k].member).displayName + ":  X   X  " + game.members[k].cards.slice(2).join("  ") + "\n";
                    await guildMembers.get(game.members[k].member).user.send("Bạn hiện tại đang có:   " + game.members[k].cards.join("   "))
                    .catch(() => {
                        channel.send("Lỗi gửi tin nhắn riêng cho " + guildMembers.get(game.members[k].member).toString() + "...");
                    });
                }
            }
            await channel.send(text);
            for(var i=0; i<game.members.length; i++) game.members[i].bet = false;
            var next = 0;
            for(var i=0; i<game.members.length; i++){
                if(game.members[i].state != "fold"){
                    game.members[i].bet = true;
                    next = i;
                    break;
                }
            }
            await studPokerTurn(channel, game, next, guildMembers, deck, true);
        }

        if(winner > -1){
            var earn = 0;
            for(var j=0; j<game.members.length; j++){
                earn += game.members[j].amount;
            }
            for(var j=0; j<game.members.length; j++){
                if(j == winner){
                    earn -= game.members[j].amount;
                    addMoney(game.members[j].member, earn , true);
                }
                else addMoney(game.members[j].member, -game.members[j].amount, true);
            }

            var text = "Tất cả mọi người đã bỏ cuộc!\n";
            text += "Chúc mừng " + guildMembers.get(game.members[winner].member).toString() + " đã chiến thắng và nhận được " + earn + " " + mConst.getDictionary().currency + "! 💵\n";
            await channel.send(text);
            return;
        }
    }
    else{
        var max = 0;
        var text = "Lật bài:\n";
        var earn = 0;
        
        for(var j=0; j<game.members.length; j++){
            earn += game.members[j].amount;
            if(game.members[j].state != "fold"){
                game.members[j].point = poker.checkResult(game.members[j].cards);
                if(max < game.members[j].point) max = game.members[j].point;
                text += guildMembers.get(game.members[j].member).displayName + ":  " + game.members[j].cards.join("  ") + " = " + pokerText[Math.floor(game.members[j].point/100).toString()] + "\n";
            }
            else game.members[j].point = 0;
        }
        
        var winners = 0;
        for(var j=0; j<game.members.length; j++){
            if(game.members[j].state != "fold" && game.members[j].point == max)
                winners += 1;
        }
        
        earn = Math.floor((earn - (game.maxbet * winners)) / winners);
        if(winners == game.members.length){
            await channel.send(text + "Tất cả những người chơi đều hòa nhau... 😅");
        }
        else{
            text += "Chúc mừng ";
            for(var j=0; j<game.members.length; j++){
                if(game.members[j].point == max){
                    text += guildMembers.get(game.members[j].member).toString() + ", ";
                    addMoney(game.members[j].member, earn, true);
                }
                else addMoney(game.members[j].member, -game.members[j].amount, true);
            }

            text = text.substring(0, text.length - 2);
            text += " đã chiến thắng và nhận được " + earn + " " + mConst.getDictionary().currency + "! 💵\n";
            await channel.send(text); 
        }

    }
}

async function studPokerTurn(channel, game, curIndex, guildMembers, deck, first = false){
    if(first == false && game.members[curIndex].bet == true){
        game.round += 1;
        await studPokerRound(channel, game, 0, guildMembers, deck);
        return;
    }

    var sum = 0;
    for(var i=0; i<game.members.length; i++)
        sum += game.members[i].amount;
    const member = guildMembers.get(game.members[curIndex].member);
    await channel.send("-----\nTổng tiền trong pot là " + sum + " " + mConst.getDictionary().currency + ".\nSố tiền cược hiện tại là " + game.maxbet + " " + mConst.getDictionary().currency + ".\nBạn đang theo với số tiền cược là " + game.members[curIndex].amount + " " + mConst.getDictionary().currency + ".\n" + member.toString() + ", bạn muốn \"tố\", \"theo\", hay \"bỏ\"");
    await channel.awaitMessages(m => (!m.author.bot && m.channel.id == channel.id && m.member.id == game.members[curIndex].member && (m.content.toLowerCase().includes("tố") || m.content.toLowerCase() == "bỏ" || m.content.toLowerCase() == "theo")), {max: 1, time: mConst.getMGameConst().blackjackthinktime, errors: ["time"]})
    .then(async collected => {
        const mes = collected.first();
        const ans = mes.content.toLowerCase();
        const amount = ans.split(" ").length > 1 ? parseInt(ans.split(" ")[1]) : undefined;
        if(ans.includes("tố")){
            if(amount && amount >= mConst.getDictionary().leastbitamount){
                if(game.maxbet + amount <= game.limit){
                    game.maxbet += amount;
                    game.members[curIndex].amount = game.maxbet;
                    for(var i=0; i<game.members.length; i++)
                        game.members[i].bet = false;
                    game.members[curIndex].bet = true;
                    await channel.send(member.toString() + " đã tố thêm " + amount + " " + mConst.getDictionary().currency + ". 💵");
                    await studPokerTurn(channel, game, await getNextPokerIndex(game, curIndex), guildMembers, deck);
                }
                else{   
                    await channel.send(member.toString() + ", mức tiền tố tối đa là " + game.limit + " " + mConst.getDictionary().currency + ".");
                    await studPokerTurn(channel, game, curIndex, guildMembers, deck, true);
                }
            }
            else{
                await channel.send(member.toString() + ", lệnh tố không hợp lệ!");
                await studPokerTurn(channel, game, curIndex, guildMembers, deck, true);
            }
        }
        else if(ans.includes("theo")){
            game.members[curIndex].amount = game.maxbet;
            await channel.send(member.toString() + " đã quyết định theo!");
            await studPokerTurn(channel, game, await getNextPokerIndex(game, curIndex), guildMembers, deck);
        }
        else{
            game.members[curIndex].state = "fold";
            await channel.send(member.toString() + " đã quyết định bỏ cuộc và sẽ mất " + game.members[curIndex].amount + " tiền cược khi ván bài kết thúc!");
            var remains = game.members.filter(mem => mem.state != "fold");
            if(remains.length == 1){
                await studPokerRound(channel, game, curIndex, guildMembers, deck);
            }
            else{
                if(game.members[curIndex].bet == true){
                    game.members[curIndex].bet = false;
                    game.members[await getNextPokerIndex(game, curIndex)].bet = true;
                }
                await studPokerTurn(channel, game, await getNextPokerIndex(game, curIndex), guildMembers, deck);
            }
        }
    })
    .catch(async collected => {
        game.members[curIndex].amount = game.maxbet;
        await channel.send("Hết thời gian suy nghĩ!\n" + member.toString() + " xem như đã quyết định theo!");
        await studPokerTurn(channel, game, await getNextPokerIndex(game, curIndex), guildMembers, deck);
        // game.members[curIndex].state = "fold";
        // await channel.send("Hết thời gian suy nghĩ!\n" + member.toString() + " bị xem như đã bỏ cuộc và sẽ mất " + game.members[curIndex].amount + " tiền cược khi ván bài kết thúc!");
        // var remains = game.members.filter(mem => mem.state != "fold");
        // if(remains.length == 1){
        //     await studPokerRound(channel, game, curIndex, guildMembers, deck);
        // }
        // else{
        //     if(game.members[curIndex].bet == true){
        //         game.members[curIndex].bet = false;
        //         game.members[await getNextPokerIndex(game, curIndex)].bet = true;
        //     }
        //     await studPokerTurn(channel, game, await getNextPokerIndex(game, curIndex), guildMembers, deck);
        // }
    });     
}

async function getNextPokerIndex(game, curIndex){
    var from = curIndex + 1;
    if(from >= game.members.length)
        from = 0;
    var i = from;
    while(game.members[i].state == "fold"){
        i++;
        if(i>=game.members.length)
            i = 0;
    }
    return i;
}

async function setQuyToc(){
    var list = Object.values(userInfo);
    list = list.sort((a, b) => b.money - a.money);
    const banks = bot.getGuild().roles.cache.get(mConst.getRoleConst().bank).members.keyArray();
    list = list.filter(item => !banks.includes(item.userid));

    const members = bot.getGuildMembers();
    const quytoc = [];
    for(var i=0; i<9; i++)
    {
        members.get(list[i].userid).roles.add(mConst.getRoleConst().quytoc);
        quytoc.push(list[i].userid);
    }

    const quytocs = bot.getGuild().roles.cache.get(mConst.getRoleConst().quytoc).members;
    quytocs.forEach( member => {
        if(!quytoc.includes(member.id))
            member.roles.remove(mConst.getRoleConst().quytoc);
    })
}

async function payTax(members){
    var list = Object.values(userInfo);
    list = list.sort((a, b) => b.money - a.money);
    const dict = mConst.getDictionary();

    for(var i=0; i<list.length; i++){
        if(i < 10) userInfo[list[i].userid].money -= Math.ceil(userInfo[list[i].userid].money * dict.taxquytoc / 100);
        else if(userInfo[list[i].userid].money < dict.nguoingheo)
            userInfo[list[i].userid].money -= Math.ceil(userInfo[list[i].userid].money * dict.taxngheo / 100);
        else if(userInfo[list[i].userid].money > 0) userInfo[list[i].userid].money -= Math.ceil(userInfo[list[i].userid].money * dict.tax / 100);
    }
}

function getSumMoney(){
    var sum = 0;
    for(var prop in userInfo)
        sum += userInfo[prop].money;
    return sum;
}

function getBankMoney(){
    var amount = 0;
    // const banks = bot.getGuild().roles.cache.get(mConst.getRoleConst().bank).members.keyArray();
    // for(var i=0; i<banks.length; i++)
    //     amount += userInfo[banks[i]].money;
    for(var prop in bankInfo){
        amount += bankInfo[prop].amount;
    }
    return amount;
}

function getBankRate(){
    return getBankMoney() / getSumMoney() * mConst.getDictionary().bankrate / 100;
}

function getBanks(){ return bot.getGuild().roles.cache.get(mConst.getRoleConst().bank).members.keyArray(); }

async function checkCoBacBotChannel(message, cmd, args){

    const channels = mConst.getCoBacBotChannel();
    if(!channels.includes(message.channel.id)){
        await message.delete();
        const reply = await message.channel.send(message.member.toString() + ", muốn chơi cờ bạc với mình thì hãy vào channel \"chơi với bot\" nhé. 😅");
        setTimeout(() => reply.delete(), 5000);
        return false;
    }

    return true;
}

function checktwodice(resultarray, sides, guess){
    var result = (resultarray[0] + resultarray[1]) / 1;
    if(result < sides && guess.includes("nhỏ")) return true;
    if(result > sides && guess.includes("lớn")) return true;

    if(result == sides) return "hòa";

    return false;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function parseTime(time, unit){
    if(!time) return Number.NaN;

    if(unit == "phút") return time * 1000 * 60;
    else if (unit == "giờ") return time * 1000 * 60 * 60;
    else if (unit == "ngày") return time * 1000 * 60 * 60 * 24;
    else if(unit == "tuần") return time * 1000 * 60 * 60 * 24 * 7;
    else return time * 1000 * 60;
}