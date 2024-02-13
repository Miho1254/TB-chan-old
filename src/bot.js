require("dotenv").config();
module.exports = { sendNonCommandEmbed, setSleep, getUser, setUserInfo, setAddingRole, expDownInterval, getClient, getGuildMembers
, getBotID, interactBot, interactBotUser, setEmbedMap, destroyEmbedMap, setChangingNickName, getRooms, earnMoney, getCurrrentCouting
, setCurrentCount, getAttendance, setAttendance, getGuild, createNewUserInfo, setReactRoles, setBuyRoles, setReportEmoji,
setReportedChat, getReportedChat, test}

const SERVERID = "793734164846215198";
const BOTNICKNAME = "Tóc Bạc-chan";
const BOTID = "810841911014588446";
function getBotID(){ return BOTID; }
const PREFIX = "/";
const EPREFIX = "/";
const TIMEZONE = 7;
const notHavePer = "Xin lỗi <0>, hiện tại mình không thể thực hiện lệnh này.\nBạn hãy kiểm tra lại channel, role và quyền hạn nhé.";
const notEnoughAffection = "<0> bạn chưa đủ thân với mình để thực hiện lệnh này.";
var isSleeping = false;
var addingRole = false;
function setAddingRole(isAdding){ addingRole = isAdding; }
function setSleep(sleep){ isSleeping = sleep; }


const { Client, Message, ClientApplication, DiscordAPIError } = require("discord.js");
const client = new Client();
function getClient(){ return client; }
function getGuild(){ return client.guilds.cache.get(SERVERID); }
function getGuildMembers(){ return client.guilds.cache.get(SERVERID).members.cache; }
const Discord = require("discord.js");
const axios = require("axios");
const fs = require("fs");
const mCommand = require("./commands.js");
const mLevel = require("./level.js");
var embedMap;
var attendance = [];
function getAttendance(){ return attendance; }
function setAttendance(value){ attendance = value; }
var reactRoles;
function setReactRoles(value){
    reactRoles = value; 
    for(var prop in reactRoles){
        if(prop.length == 18) client.channels.cache.get(reactRoles.channel).messages.fetch(prop);
    }
}
var buyRoles;
function setBuyRoles(value){
    buyRoles = value;
    client.channels.cache.get(buyRoles.channel).messages.fetch(buyRoles.message);
}
var reportEmoji;
function setReportEmoji(value){ reportEmoji = value; }
var reportedChat = {};
async function setReportedChat(value){ 
    reportedChat = value;
    for(var i=0; i<reportedChat.logmes.length; i++)
        client.channels.cache.get(reportEmoji.channel).messages.fetch(reportedChat.logmes[i]);
}
var notlogMessage = [];
function getReportedChat(){ return reportedChat; }
function setEmbedMap(){ embedMap = require("./embedMap.js").getEmbedMap(); }
function destroyEmbedMap(){ embedMap = undefined; }
const embedCondition = require("./embedMap.js").getConditions();
const nonCommandEmbedMap = require("./embedMap.js").getNonCommandEmbedMap();
const commands = require("./commands.js").getCommands();
const commandCondition = require("./commands.js").getConditions();
const mConst = require("./const.js");
const channelList = require("./const.js").getChannelConst();
const checkCondtion = require("./condition.js").checkCondtion;
const { report } = require("process");
const { cloudidentity } = require("googleapis/build/src/apis/cloudidentity");
var userInfo = require("./commands.js").getUserInfo();
function setUserInfo(ui){ userInfo = ui; }
function getUser(userid){
    if(userInfo[userid] == undefined)
        userInfo[userid] = createNewUserInfo(userid);
    return userInfo[userid];
}
function createNewUserInfo(userid){
    return userInfo[userid] = {
        userid: userid,
        exp: 0,
        level: 1,
        role: [],
        fanexp: 0,
        fanlevel: 1,
        lasteng: Date.now(),
        lastchat: Date.now(),
        money: 0,
        lastshare: Date.now(),
        items: [],
        monthlyfan: 0,
        mango: [],
    }
}
var lastChatContent = {};

function test(){
    oneHourInterval();
}

var hourInterval;
var lastGreeting = undefined;
var greetingReplied = new Set();
var chucSet = new Set();
function getVNHour(){
    var hour = new Date().getUTCHours() + TIMEZONE;
    if(hour >= 24) hour -= 24;
    else if(hour < 0) hour += 24;

    return hour;
 }
function getVNDay(){
    const hour = getVNHour();
    var day = new Date().getUTCDay();
    if(hour - TIMEZONE < 0)
        day += 1;

    if(day < 0) day = 6;
    else if(day > 6) day = 0;

    return day;
}

client.login(process.env.WAMVN_BOT_TOKEN);
client.on("ready", clientStart);
async function clientStart(){
    console.log(client.user.username + " has logged in!");

    // Set interval for save user data
    setInterval(async function(){
        await commands.save();
    }, 10800000);

    // Set interval for 1 hour things
    hourInterval = setInterval(oneHourInterval, 3600000);

    // Set interval for 5 minus things
    setInterval(fiveMinuteInterval, 300000);

    // Set interval for 1 munute things
    setInterval(async () => {
        const now = Date.now();
        var muted = mCommand.getMutedAt();
        for(var prop in muted){
            for(var i=0; i<muted[prop].ids.length; i++){
                if(now >= muted[prop].time[i]){
                    if(prop == "ALL") await getGuildMembers().get(muted[prop].ids[i]).roles.remove(mConst.getRoleConst().muted);
                    muted[prop].ids.splice(i, 1);
                    muted[prop].time.splice(i, 1);
                    i--;
                }
            }
            if(muted[prop].ids.length == 0) delete muted[prop];
        }
    }, 60000);

    await require("./commands.js").accessSpreadsheet();

    initializeTitan();
    setInterval(spawnTitan, mConst.getMGameConst().aotspawn);
    spawnTitan();
    
    // fs.readFile('./src/links.txt', 'utf8', function(err, data) {
    //     if (err) throw err;
    //     var str = data.split(/\r?\n/);
    //     client.channels.cache.get(channelList.test).send(str[0]);
    // });

    // Set interval for expdown
    //const expConst = mConst.getEXPConst();
    //expDown = setInterval(expDownInterval, expConst.minusInterval);

    //Run To get All guild member info and save to google drive
    // var guild = client.guilds.cache.get(SERVERID);
    // guild.members.cache.each(member => {
    //     createNewUserInfo(member.id);
    // });
}

client.on("guildMemberAdd", async member => {
    if(member.guild.id != SERVERID) return;

    userInfo[member.id] = createNewUserInfo(member.id);

    var image = nonCommandEmbedMap.get("join");
    var embed = new Discord.MessageEmbed();
    embed.setDescription(image.getText(member));
    embed.setImage(image.url[Math.floor((Math.random()*image.url.length))]);
    embed.setColor(image.color);
    //await client.channels.cache.get(channelList.general).send(embed);
    //await client.channels.cache.get(channelList.welcome).send(embed);
    await client.channels.cache.get(channelList.general).send(member.toString() + "đã tham gia server.\nMọi người cùng nhau chào đón bạn ấy nào! 😆\n<@&" + mConst.getRoleConst().mango + ">");
    await client.channels.cache.get(channelList.welcome).send(member.toString() + "đã tham gia server. 😆");
    await member.roles.add(mConst.getRoleConst().fan);
})

client.on("guildMemberRemove", async member => {
    if(member.guild.id != SERVERID) return;

    //Remove spouse if has
    if(userInfo[member.id].spouse) userInfo[userInfo[member.id].spouse].spouse = undefined;

    //
    // const user = member.user;
    // console.log(user.username);
    // var text = "Mình rất buồn vì bạn đã rời server 😭. Liệu bạn có thể bỏ chút thời gian ra để cho mình biết lý do bạn rời server không?\n";
    // text += "Nếu được, bạn hãy chọn số của những nguyên nhân đó và chat cho mình biết.\n";
    // text += "1. Bị ping nhiều nên cảm thấy phiền.\n";
    // text += "2. Cảm thấy server không có gì thú vị.\n";
    // text += "3. Cảm thấy khó hòa hợp với người khác trong server.\n";
    // text += "4. Bất mãn về hành vi, thái độ, và quá trình xử lý các vụ việc của Staff.\n";
    // text += "Bạn cũng có thể chat cho mình những nguyên nhân khác không thuộc mấy cái trên, hoặc những góp ý của bạn dành cho server.\n";
    // text += "Mình xin được cảm ơn.";
    // user.send(text);

    var ban = userInfo[member.id].money < 0;
    delete userInfo[member.id];
    var bank = mCommand.getBankInfo();
    for(var prop in bank)
    {
        if(bank[prop].memberid == member.id || bank[prop].bankid == member.id)
            delete bank[prop];
    }
    if(ban) member.ban({ days: 0, reason: "Lợi dụng việc out server để thoát nợ. Nếu không cố ý thì liên lệ các staff để được gỡ ban."});

    var image = nonCommandEmbedMap.get("leave");
    var embed = new Discord.MessageEmbed();
    embed.setDescription(image.getText(member));
    embed.setImage(image.url[Math.floor((Math.random()*image.url.length))]);
    embed.setColor(image.color);
    //await client.channels.cache.get(channelList.general).send(embed)
    //await client.channels.cache.get(channelList.welcome).send(embed);
    //await client.channels.cache.get(channelList.general).send(member.toString() + "đã rời server... 😣");
    await client.channels.cache.get(channelList.welcome).send(member.toString() + " (" + member.displayName + ") đã rời server... 😣");
})

client.on("message", clientMessage);
async function clientMessage (message){
    if(!message.guild){
        await logBotDM(message);
        return;
    }
    if(message.guild.id != SERVERID) return;

    //Check if is sent by bot
    if(message.author.bot === true || isSleeping) return;
 
    if(!message.author.bot && await checkProfany(message)) return;
    if(await checkNotChatChannel(message)) return;
    if(await checkMuted(message)) return;
    if(message.channel.id === channelList.dmtomember) sendDMMember(message);
    if(mConst.getCountingChannel().includes(message.channel.id)) await countingChannel(message);
    else if(message.channel.id == mConst.getChannelConst().golddig) await digGold(message);
    if(mConst.getTitanChannels().includes(message.channel.id) && titan[message.channel.id].idle >= titanIdle){
        titan[message.channel.id].idle = 0;
    }
    if(mConst.getWordChannel().includes(message.channel.id)) await wordGame(message);
    if(mConst.getFishingChannel().includes(message.channel.id)) await fishing(message);
    if(message.reference && message.reference.messageID) await checkReport(message);

    //Gain fan exp
    const now = Date.now();
    if(!userInfo[message.member.id]) userInfo[message.member.id] = createNewUserInfo(message.member.id);
    if(!userInfo[message.member.id].lastchat || now - userInfo[message.member.id].lastchat >= mConst.getEXPConst().gainInterval){
        if(!mConst.getBotChannel().includes(message.channel.id)){
            userInfo[message.member.id].lastchat = now;
            mLevel.addFanEXP(message.member, mConst.getEXPConst().unit, message, true);
            userInfo[message.member.id].monthlyfan += mConst.getEXPConst().unit;
        }
    }

    //Check if replied
    if(message.reference){
        checkRepliedMessage(message);
    }

    if(message.content.startsWith(PREFIX)){
        var [cmd, ...args] = message.content.trim().toLowerCase().substring(PREFIX.length).split(/\s+/);

        //Direct Message
        if(message.channel.type == "dm"){
            DirectMessage(message, cmd, args);
            return;
        }

        // Send embed
        if(cmd.startsWith(EPREFIX)){
            if(await SendEmbed(message, cmd.substring(EPREFIX.length), args))
                await interactBot(message, cmd, args, 0, "");
            return;
        }

        // Run Command
        if(commands[cmd]){
            if(commandCondition[cmd] && !checkCondtion(message, cmd, args, commandCondition[cmd])){
                message.channel.send(notHavePer.replace("<0>", message.member.toString()));
                return;
            }
            else commands[cmd](message, cmd, args);
        }
    }
    else{
        var [bot, ...args] = message.content.trim().toLowerCase().split(/\s+/);
        if(message.mentions.members.get(BOTID)){
            customMessageRespond(message, bot, args)
        }
    }
}

var changingNickname = false;
function setChangingNickName(state){ changingNickname = state; }
client.on("guildMemberUpdate", async (oldMember, newMember) => {  // this event triggers when a member changes their nickname.
    if(newMember.guild.id != SERVERID) return;

    if (newMember.id == BOTID) 
        newMember.setNickname(BOTNICKNAME).catch(console.error);

    if(newMember.displayName != oldMember.displayName && !changingNickname){
        if(!userInfo[newMember.id].lastnicknamechange || (Date.now() - userInfo[newMember.id].lastnicknamechange >= mConst.getEXPConst().nicknamechange)){
            userInfo[newMember.id].lastnicknamechange = Date.now();
        }
        else{
            const time = Date.now() - userInfo[newMember.id].lastnicknamechange;
            changingNickname = true;
            await newMember.setNickname(oldMember.displayName);
            changingNickname = false;
            await newMember.user.send("Bạn còn " + Math.floor((mConst.getEXPConst().nicknamechange - time) / 3600000) + " giờ nữa mới có thể đổi nickname của mình.");
        }
    }

    // Check added role
    if(!addingRole)
        checkAddedRole(oldMember, newMember);
});

client.on("voiceStateUpdate", voiceStateUpdated);

client.on("messageReactionAdd", async (messageReaction, user) => {
    if(messageReaction.message.guild.id != SERVERID) return;

    // Add reaction from bot message
    if(messageReaction.message.member.id == BOTID){
        await interactBotUser(messageReaction.message, user, 0, false);
    }

    if(reactRoles[messageReaction.message.id] && messageReaction.emoji.name == "👍"){
        await getGuildMembers().get(user.id).roles.add(reactRoles[messageReaction.message.id]);
    }

    // if(reportEmoji.report == messageReaction.emoji.name && !messageReaction.message.member.user.bot){
    //     await messageReaction.users.remove(user.id);
    //     if(!reportedChat.chatid.includes(messageReaction.message.id)){
    //         reportedChat.chatid.push(messageReaction.message.id);
    //         reportedChat.reporter.push(user.id);
    //         reportedChat.channel.push(messageReaction.message.channel.id);
    //         var text = getGuildMembers().get(user.id).displayName + " đã report chat dưới đây của " + messageReaction.message.member.displayName + ":\n-----\n";
    //         text += messageReaction.message.content + "\n-----\nLink của chat: " + messageReaction.message.url;
    //         var mes = await getGuild().channels.cache.get(reportEmoji.channel).send(text);
    //         reportedChat.logmes.push(mes.id);
    //         await mes.react(reportEmoji.accept);
    //         await mes.react(reportEmoji.reject);
    //         await user.send("Cảm ơn bạn đã report chat của " + messageReaction.message.member.displayName + ".\nMình sẽ thông báo kết quả cho bạn sau khi các Staff xử lý.");
    //     }
    //     else await user.send("Đã có người report chat này của " + messageReaction.message.member.displayName + ".\nChat này đang được chờ để các Staff xử lý.");
    // }
    //aaa

    if(!user.bot && messageReaction.message.channel == reportEmoji.channel && reportedChat.logmes.includes(messageReaction.message.id)){
        var reportedIndex = reportedChat.logmes.indexOf(messageReaction.message.id);
        var staff = getGuildMembers().get(user.id);
        var text = staff.toString();
        var toMemText = "Staff của server";
        var mem = getGuildMembers().get(reportedChat.reporter[reportedIndex]);
        var fineMem;
        var mes = await getGuild().channels.cache.get(reportedChat.channel[reportedIndex]).messages.fetch(reportedChat.chatid[reportedIndex]).catch(() => {
            fineMem = getGuildMembers().get(reportedChat.chatid[reportedIndex]);
        });
        if(!fineMem) fineMem = mes.member;
        var log = false;
        var fine = false;
        if(messageReaction.emoji.name == reportEmoji.accept){
            StopEmiting = true;
            if(fineMem){
                text += " đã chọn xử phạt và xóa chat của " + fineMem.displayName + ".";
                toMemText += " đã chọn xử phạt và xóa chat của " + fineMem.displayName + " mà bạn đã report.\nBạn nhận được " + reportEmoji.present + " tiền thưởng.";
                mCommand.addMoney(reportedChat.reporter[reportedIndex], reportEmoji.present, true);
                userInfo[fineMem.id].exp -= mConst.getEXPConst().unit * 25;
                userInfo[fineMem.id].fanexp -= mConst.getEXPConst().unit * 25;
                mCommand.addMoney(fineMem.id, -1000, true);
                var toFineMem = "";
                
            }
            if(mes){
                toFineMem = "Chat dưới đây của bạn vi phạm quy tắc của server và đã bị xóa:\n----------\n" + mes.content + "\n----------";
                await mes.delete();
            }    
            StopEmiting = false;
            log = true;
            fine = true;
            messageReaction.message.edit(messageReaction.message.content + "\n-----\n" + staff.toString() + " đã chọn xử phạt và xóa chat.");
            if(fineMem && toFineMem.length > 0) fineMem.user.send(toFineMem);
        }
        else if(messageReaction.emoji.name == reportEmoji.reject){
            text += " đã chọn không xử phạt.";
            if(fineMem)
                toMemText += " đã xem xét và thấy chat của " + fineMem.displayName + " mà bạn đã report không vi phạm quy tắc của server.";
            log = true;
            messageReaction.message.edit(messageReaction.message.content + "\n-----\n" + staff.toString() + " đã chọn không xử phạt.");
        }
        if(log == true){
            reportedChat.chatid.splice(reportedIndex, 1);
            reportedChat.logmes.splice(reportedIndex, 1);
            reportedChat.reporter.splice(reportedIndex, 1);
            reportedChat.channel.splice(reportedIndex, 1);
            await messageReaction.message.reactions.removeAll();
            messageReaction.message.react("🆗");
            //await getGuild().channels.cache.get(reportEmoji.channel).send(text);
            mem.user.send(toMemText);
            if(fineMem && fine == true) getGuild().channels.cache.get(channelList.welcome).send(fineMem.toString() + " đã bị phạt vì đã chat hoặc đăng nội dung không tuân theo quy tắc của server.");
        }
    }

    if(buyRoles.message == messageReaction.message.id){
        if(buyRoles[messageReaction.emoji.name]){
            var member = getGuildMembers().get(user.id);
            if(userInfo[user.id].money >= mConst.getDictionary().rolecost || member.roles.cache.has(buyRoles[messageReaction.emoji.name])){
                if(!member.roles.cache.has(buyRoles[messageReaction.emoji.name])){
                    var role = getGuild().roles.cache.get(buyRoles[messageReaction.emoji.name]);
                    member.roles.add(buyRoles[messageReaction.emoji.name]);
                    mCommand.addMoney(user.id, -mConst.getDictionary().rolecost, true);
                    var reply = await messageReaction.message.channel.send(member.toString() + " đã dùng " + mConst.getDictionary().rolecost + " " + mConst.getDictionary().currency + " để mua role \"" + role.name + "\". 😆");
                    setTimeout(() => reply.delete(), 5000);
                }
            }
            else{
                userInfo[user.id].removingReaction = true;
                await messageReaction.users.remove(user.id);
                var reply = await messageReaction.message.channel.send(member.toString() + ", bạn hiện tại không có đủ tiền để mua role.");
                setTimeout(() => reply.delete(), 5000);
                userInfo[user.id].removingReaction = undefined;
            }
        }
        else{
            messageReaction.users.remove(user.id);
            var reply = await messageReaction.message.channel.send("Không có role nào tương ứng với emoji " + messageReaction.emoji.name + " cả.");
            setTimeout(() => reply.delete(), 5000);
        }
    }

    const inven = mCommand.getXemItem();
    if(inven[user.id]){
        var page = inven[user.id].page;
        var pages = Math.floor(userInfo[user.id].items.length / mConst.getDictionary().itempagelimit);
        if(userInfo[user.id].items.length % mConst.getDictionary().itempagelimit == 0) pages -= 1;
        var member = getGuildMembers().get(user.id);
        var show = false;
        if(messageReaction.emoji.name == "⬅️"){
            page -= 1;
            if(page < 0) page = pages;
            show = true; 
        }
        else if(messageReaction.emoji.name == "➡️"){
            page += 1;
            if(page > pages) page = 0;
            show = true;
        }

        inven[user.id].page = page;
        if(show == true){
            var from = page * mConst.getDictionary().itempagelimit;
            var text = "";
            for(var i=0; i<mConst.getDictionary().itempagelimit; i++){
                if(i+from >= userInfo[user.id].items.length) text += "#" + (i+from) + ": ❌ [RỖNG]\n";
                else text += "#" + (i+from) + ": " + mCommand.getShopItem()[userInfo[user.id].items[i+from]].value4 + " " + mCommand.getShopItem()[userInfo[user.id].items[i+from]].name + "\n";
            }
            const embed = new Discord.MessageEmbed()
            .setTitle("DANH SÁCH \"" + member.displayName + "\" ĐANG SỞ HỮU")
            .setDescription(text)
            .setColor("#bee8f6")
            .setThumbnail(member.user.avatarURL())
            .setFooter("Trang " + (page+1) + "/" + (pages+1));
            messageReaction.message.edit(embed);
            messageReaction.users.remove(user.id);
        }
    }
});


client.on("messageReactionRemove", async (messageReaction, user) => {
    if(messageReaction.message.guild.id != SERVERID) return;
    
    // Remove reaction from bot message
    if(messageReaction.message.member.id == BOTID){
        await mLevel.addBotEXP(messageReaction.message.guild.member(user), -mConst.getEXPConst().unit, messageReaction.message, true);
    }
    
    if(reactRoles[messageReaction.message.id] && messageReaction.emoji.name == "👍"){
        await getGuildMembers().get(user.id).roles.remove(reactRoles[messageReaction.message.id]);
    }

    if(buyRoles.message == messageReaction.message.id && buyRoles[messageReaction.emoji.name] && !userInfo[user.id].removingReaction){
        var member = getGuildMembers().get(user.id);
        var role = getGuild().roles.cache.get(buyRoles[messageReaction.emoji.name]);
        member.roles.remove(buyRoles[messageReaction.emoji.name]);
        var reply = await messageReaction.message.channel.send(member.toString() + " không còn là \"" +  role.name + "\".");
        setTimeout(() => reply.delete(), 5000);
    }
});

var StopEmiting = false;
client.on("messageDelete", async (message) => {

    var reportedIndex = reportedChat.chatid.indexOf(message.id);
    if(StopEmiting == false && reportedIndex > -1){
        // await getGuildMembers().get(reportedChat.reporter[reportedIndex]).user.send(message.member.displayName + " đã xóa chat bạn report trước khi các Staff xử lý.");
        // var mes = await getGuild().channels.cache.get(reportEmoji.channel).messages.fetch(reportedChat.logmes[reportedIndex]);
        // await mes.delete();
        // reportedChat.chatid.splice(reportedIndex, 1);
        // reportedChat.logmes.splice(reportedIndex, 1);
        // reportedChat.reporter.splice(reportedIndex, 1);
        // reportedChat.channel.splice(reportedIndex, 1);
        reportedChat.chatid[reportedIndex] = message.member.id;
    }

    if(!message.author.bot && !message.content.toLocaleLowerCase().includes("/noithay") && !message.content.toLocaleLowerCase().includes("/report")){

        if(!notlogMessage.includes(message.id)){
            await Discord.Util.delayFor(1000);
            const fetchedLogs = await message.guild.fetchAuditLogs({
                limit: 6,
                type: 'MESSAGE_DELETE'
            }).catch(() => ({
                entries: []
            }));
    
            var auditEntry = fetchedLogs.entries.find(a =>
                // Small filter function to make use of the little discord provides to narrow down the correct audit entry.
                a.target.id == message.author.id &&
                a.extra.channel.id === message.channel.id
            );    
            
            // If entry exists, grab the user that deleted the message and display username + tag, if none, display 'Unknown'.
            const member = auditEntry ? getGuildMembers().get(auditEntry.executor.id) : undefined;
    
            // <Discord>.MessageEmbed for v12, <Discord>.RichEmbed for older.
            if(!member || !member.user.bot){
                const DeleteEmbed = new Discord.MessageEmbed()
                .setTitle("Có một chat đã bị xóa thủ công!")
                .setColor("#fc3c3c")
                // New field for user which deleted the message.
                .addField("Channel", message.channel, true)
                .addField("Chat của", message.member.toString(), true)
                .addField("Người xóa", member ? member.toString() : "Không rõ", true)
                // Messages can be empty too, but I won't be going over how to include embeds/attachments, just displaying 'None' instead to avoid undefined/null.
                .addField("Nội dung", message.content)
                .addField("Link của chat", message.url)
                .setFooter(`Chat ID: ${message.id}`);
                getGuild().channels.cache.get(channelList.deletedchatlog).send(DeleteEmbed);
            }    
        }
        else{
            notlogMessage.splice(notlogMessage.indexOf(message.id), 1);
        }
    }
    
})

async function SendEmbed(message, cmd, args){
    if(!embedMap) setEmbedMap();

    var image = embedMap.get(cmd);
    if(image == undefined) return false;

    if(embedCondition[cmd] && !checkCondtion(message, cmd, args, embedCondition[cmd])){
        await message.channel.send(notHavePer.replace("<0>", message.member.toString()));
        return false;
    }

    var embed = new Discord.MessageEmbed();
    embed.setDescription(image.getText(message, cmd, args));
    if(image.url) embed.setImage(image.url[Math.floor((Math.random()*image.url.length))]);
    if(image.color) embed.setColor(image.color);
    if(embed.description != "::abort"){
        await message.channel.send(embed);
        return true;
    }
    else return false;
}

function DirectMessage(message, cmd, args){
    message.author.send("Hello!");
}

async function sendNonCommandEmbed(embedKey, channel, args, user){
    var image = nonCommandEmbedMap.get(embedKey);
    var embed = new Discord.MessageEmbed();
    embed.setDescription(image.getText(args));
    embed.setImage(image.url[Math.floor((Math.random()*image.url.length))]);
    embed.setColor(image.color);
    var mess = undefined;
    if(channel) mess = await client.channels.cache.get(channel).send(embed);
    if(user) await user.send(embed);
    return mess;
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

async function checkAddedRole(oldMember, newMember){
    if(newMember.user.bot) return;

    const dif = newMember.roles.cache.difference(oldMember.roles.cache);
    const added = dif.keyArray()[0];
    if(!added) return;

    const botRoles = mConst.getBotRoles().slice();
    const fanRoles = mConst.getFanRoles().slice();
    var isAdding;

    if(newMember.roles.cache.has(added)) isAdding = true;
    else isAdding = false;

    botRoles.splice(botRoles.indexOf(added), 1);
    fanRoles.splice(fanRoles.indexOf(added), 1);

    addingRole = true;
    if(mConst.getBotRoles().includes(added)){
        await newMember.roles.remove(botRoles);
    }
    if(mConst.getFanRoles().includes(added)){
        await newMember.roles.remove(fanRoles);
    }

    // Check if has atleast 1 fan role or staff. If not, add Fan
    if(!newMember.roles.cache.has(mConst.getRoleConst().staff)){
        var hasFan = false;
        for(var i=0; i<mConst.getFanRoles().length; i++){
            if(newMember.roles.cache.has(mConst.getFanRoles()[i])){
                hasFan = true;
                break;
            }
        }
        if(!hasFan) await newMember.roles.add(mConst.getRoleConst().fan);
    }
 
    // Check at set exp
    if(newMember.roles.cache.has(mConst.getRoleConst().topfan)){
        if(userInfo[newMember.id].fanexp < mConst.getEXPConst().topfan)
            userInfo[newMember.id].fanexp = mConst.getEXPConst().topfan + mConst.getEXPConst().minus;
    }
    // else if(oldMember.roles.cache.has(mConst.getRoleConst().topfan) && userInfo[newMember.id].fanexp >= mConst.getEXPConst().topfan)
    //     userInfo[newMember.id].fanexp = 0;

    addingRole = false;
}

async function expDownInterval(){
    const expConst = mConst.getEXPConst();
    var list = Object.keys(userInfo);
    const now = Date.now();
    for(var i=0; i<list.length; i++){
        if(!userInfo[list[i]].lastchat) userInfo[list[i]].lastchat = now;
        var off = now - userInfo[list[i]].lastchat;

        if(off >= expConst.minusInterval){
            userInfo[list[i]].lastchat += expConst.minusInterval;
            const member = client.guilds.cache.get(SERVERID).members.cache.get(list[i]);
            mLevel.addFanEXP(member, -expConst.minus, undefined, true);
        }


        if(!userInfo[list[i]].lasteng) userInfo[list[i]].lasteng = now;
        off = now - userInfo[list[i]].lasteng;

        if(off >= expConst.minusInterval){
            userInfo[list[i]].lasteng += expConst.minusInterval;
            const member = client.guilds.cache.get(SERVERID).members.cache.get(list[i]);
            mLevel.addBotEXP(member, -expConst.minus, undefined, true);
        }
    }
}

async function interactBot(message, cmd, args, expPlus = 0, addReaction = [], defaultReaction = "❤️"){
    const now = Date.now();
    if(!userInfo[message.member.id].lasteng || now - userInfo[message.member.id].lasteng >= mConst.getEXPConst().gainInterval){
        userInfo[message.member.id].lasteng = now;
        if(defaultReaction.length > 0) await message.react(defaultReaction);
        for(var i=0; i<addReaction.length; i++)
            await message.react(addReaction[i]);
        await mLevel.addBotEXP(message.member, mConst.getEXPConst().unit + expPlus, message, true);
        return true;
    }
    return false;
}

async function interactBotUser(message, user, expPlus = 0){
    const now = Date.now();
    if(!userInfo[user.id].lasteng || now - userInfo[user.id].lasteng >= mConst.getEXPConst().gainInterval){
        userInfo[user.id].lasteng = now;
        await mLevel.addBotEXP(message.guild.member(user), mConst.getEXPConst().unit + expPlus, message, true);
        return true;
    }
    return false;
}

async function earnMoney(message, moneyPlus = 0, addReaction = [], defaultReaction = "<:wam:813647968515129344>"){
    const now = Date.now();
    if(!userInfo[message.member.id].lastshare || now - userInfo[message.member.id].lastshare >= mConst.getEXPConst().gainInterval){
        userInfo[message.member.id].lastshare = now;
        if(defaultReaction.length > 0) await message.react(defaultReaction);
        for(var i=0; i<addReaction.length; i++)
            await message.react(addReaction[i]);
        await mCommand.addMoney(message.member.id, mConst.getDictionary().uploadmoneyunit + moneyPlus);
        return true;
    }
    return false;
}

async function oneHourInterval(){
    
    // Send greeting message
    const hour = getVNHour();
    const day = getVNDay();

    if(hour == 11 && (new Date().getUTCDate() == mConst.getDictionary().monthlyfanreset)){
        const list = Object.values(userInfo);
        list.sort((a, b) => b.monthlyfan - a.monthlyfan);
        var text = "Bảng xếp hạng fan tích cực trong tháng:\n";
        for(var i=0; i<10; i++){
            text += "#" + (i+1) + ": " + getGuildMembers().get(list[i].userid).displayName + "\n";
            for(var j=0; j<mConst.getDictionary().cutphatnocount; j++)
                userInfo[list[i].userid].items.push("-2");
        }
        text += "Điểm fan trong tháng sẽ được reset lại về 0."
        await getGuild().channels.cache.get(mConst.getChannelConst().welcome).send(text);
        for(var prop in userInfo)
            userInfo[prop].monthlyfan = 0;
    }

    //getGuild().channels.cache.get(mConst.getChannelConst().test).send(hour);

    if(hour == 4){
        attendance = [];
        //mCommand.payTax(client.guilds.cache.get(SERVERID).members.cache);
    }

    if(hour == 8){
        lastGreeting = await sendNonCommandEmbed("morning", mConst.getChannelConst().general, day);
        greetingReplied.clear();
    }
    else if(hour == 22){
        lastGreeting = await sendNonCommandEmbed("night", mConst.getChannelConst().general, day);
        greetingReplied.clear();
    }
    else if(hour == 7 || hour == 20) chucSet.clear();

    //item for chồng & người yêu
    if(hour == 12 || hour == 19){
        var lovers = client.guilds.cache.get(SERVERID).roles.cache.get(mConst.getRoleConst().lover).members.array();
        for(var i=0; i<lovers.length; i++)
            userInfo[lovers[i].id].items.push("9");
        lovers = client.guilds.cache.get(SERVERID).roles.cache.get(mConst.getRoleConst().spouse).members.array();
        for(var i=0; i<lovers.length; i++)
            userInfo[lovers[i].id].items.push("10");
    }

    // Quý tộc gift
    if(hour == 0 || hour == 12){
        var text = "Những bạn quý tộc sau đây sẽ nhận được \"Hộp Quà Từ Thiện\" 🎁:\n";
        const quytoc = getGuild().roles.cache.get(mConst.getRoleConst().quytoc).members.array();
        for(var i=0; i<quytoc.length; i++){
            userInfo[quytoc[i].id].items.push("13");
            text += "- " + quytoc[i].displayName + "\n";
        }
        getGuild().channels.cache.get(channelList.welcome).send(text);
        getGuild().channels.cache.get(channelList.general).send(text);
    }

    //Server booster gift
    if(hour == 6 || hour == 18){
        var text = "Những bạn Server Booster sau đây sẽ nhận được \"Cứt Phát Nổ\" 💩🔥:\n";
        const booster = getGuild().roles.cache.get(mConst.getRoleConst().booster).members.array();
        for(var i=0; i<booster.length; i++){
            userInfo[booster[i].id].items.push("-2");
            //userInfo[booster[i].id].items.push("-2");
            text += "- " + booster[i].displayName + "\n";
        }
        getGuild().channels.cache.get(channelList.welcome).send(text);
        getGuild().channels.cache.get(channelList.general).send(text);
    }


    //GA Bentou
    if(hour == 7 || hour == 8 || hour == 9 || hour == 11 || hour == 12 || hour == 13 || hour == 18 || hour == 19 || hour == 20){
        var text;
        if(hour < 11) text = "sáng";
        else if (hour < 15) text = "trưa";
        else text = "tối";
        const channel = getGuild().channels.cache.get(mConst.getChannelConst().general);
        await channel.send("Mình có làm bentou bữa " + text + " cho mọi người đây, bạn nào ăn không? 😋\n<@&" + mConst.getRoleConst().bentou + ">");
        await channel.send("https://lh3.googleusercontent.com/pw/ACtC-3dP8J7VDh8mMP8u6uw7o6xnW6BpQ0U6WQ_D6RjK0Lgu6IbRuaJnsneA2a0yR3hg2UrZJrkv5KS19xeWXvxNi7O3HlxdWabjFNzUtpLyfbatCwNUNKRwsEcIPIDUc8tzn4YSza3a6rqO2DPg9tJiwAAk=w300-h280-no?authuser=0");
        
        channel.awaitMessages(m => !m.author.bot && m.channel.id == channel.id && m.content.toLowerCase().includes("ăn"), {max: 999999999, time: mConst.getDictionary().gatime, errors: ["time"]})
        .then(async collected => {})
        .catch(async collected => {
            const list = collected.array();
            const received = [];
            for(var i=0; i<list.length; i++){
                if(!received.includes(list[i].member.toString())){
                    received.push(list[i].member.toString());
                    userInfo[list[i].member.id].items.push("9");
                    await mLevel.addBotEXP(list[i].member, mConst.getEXPConst().unit * 5, list[i], true);
                    await list[i].react("❤️");
                }
            }
            if(received.length > 0) await channel.send("Chúc các bạn ngon miệng nhé! 🍱");
            else await channel.send("Hu hu... chẳng ai thèm ăn bentou mình làm cả 😭");
        });    
    }
}

async function fiveMinuteInterval(){
    // Check livestream and give money
    const channels = client.guilds.cache.get(SERVERID).channels.cache.filter(c => c.type === 'voice');

    for (const [channelID, channel] of channels) {
        for (const [memberID, member] of channel.members) {
            mCommand.addMoney(member.id, mConst.getDictionary().streamearn, true);
        }
    }
    
}

async function checkRepliedMessage(message){

    //Check with greeting
    if(lastGreeting && message.reference.messageID == lastGreeting.id){
        const greeting = message.channel.messages.cache.get(message.reference.messageID);
        if(greeting && !greetingReplied.has(message.member.id) && message.createdTimestamp - greeting.createdTimestamp <= 3600000 ){
            greetingReplied.add(message.member.id);
            mLevel.addBotEXP(message.member, mConst.getEXPConst().unit * 20, message, true);
            const react = ["💖", "🌟", "❤️", "✨", "💕"];
            for(var i=0; i<react.length; i++)
                await message.react(react[i]);
        }
    }
}

async function customMessageRespond(message, cmd, args){
    const text = message.content.toLowerCase();

    //Giới thiệu bản thân
    if(text.includes("giới thiệu bản thân"))
    {
        await message.channel.send("Mình là Tóc Bạc-chan, được tạo bởi papa <0>.\nNhiệm vụ của mình là phục vụ và chơi cùng với các bạn. Nếu cần thì hãy gọi mình nhé!\nĐể tìm hiểu thêm cách gọi mình, các bạn có thể dùng lệnh \"/xemlenh\" và \"//xemlenh\"."
        .replace("<0>", getGuildMembers().get(mConst.getUserConst().kami.toString())));
        await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3fIilBVfcNGnws1zwYnkZl966DG-gZKo1b12CpfFj0IyIJWwT3HxPzZzzES8iQm6zOUHUUfUKrCSD3W_NokPKeTk9WTAAAT2gRTDJ4hv6D_7uFquNvicjGLYXCq7D8poaIOhJGksscr0ie5QQc-LUZF=s846-no?authuser=0");
        //await sendNonCommandEmbed("intro", message.channel.id, getGuildMembers().get(mConst.getUserConst().kami));
    }
    if(text.includes("ngực lép") || text.includes("phẳng"))
    {
        //ngực lép
        await mLevel.addBotEXP(message.member, -mConst.getEXPConst().unit * 5, message, true);
        await message.react(mConst.getReactConst().loose);
        await message.channel.send("Mồ... 😫");
        await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3eePw8h8EflZ9SDCBSGuXOMJWnVckYGb32r6qwzVIkPi6N70yx2Cqmloz8nXhwcXykD-nnyqKQe8p8p4CKd5q5M62QBCJ6iIesdyEza4JzO8C_UMASQhLFquWmWcVDekKex1x58zpGLcLAtsFKl8xx3=s712-no?authuser=0");
    }
    if(text.includes("dễ thương"))
    {
        interactBot(message, cmd, args, mConst.getEXPConst().unit * 3, ["💖"]);
        await message.reply(" he he, ngại quá! 💞");
        await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3fMRMWf_Ga-WYGj_ZHxH6cKqiuN7dbtQKp_Ayci87_P3if-EG1ktQw_uMpFXN2D3KEXyfj3dDlwJRIaVJaOZXfQ6SJM0CfQKIDlvJorgZJStHYiyI9ZnnEjqEPOHz6vAOCu1X5Rba_hD_RAWEBSymWC=s726-no?authuser=0");
    }
    if(text.includes("buổi sáng") && getVNHour() >= 6 && getVNHour() <= 10 && !chucSet.has(message.member.id)){
        chucSet.add(message.member.id);
        await mLevel.addBotEXP(message.member, mConst.getEXPConst().unit * 10, message, true);
        await message.reply(" chào buổi sáng! ☀️\nChúc bạn có một ngày tốt lành!");
        await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3coZm7qZ4LJMzOF8uPeA1cT5GuCJVij9Nfu51YNJhNtEoLHUGR1a8aLxyDEAprL2awFAaMclhKUswHfKG7YCLMmZiKxBgYZDSWVo0m6NXejXBGqq8jdegH-nZ49Jc0-HBM9dDUsLDxyAx2Tt9rSNFNr=s868-no?authuser=0");
        await reactEmoji(message, ["💖", "🌟", "❤️"]);
    }
    if(text.includes("ngủ ngon") && (getVNHour() >= 21 || getVNHour() <= 1) && !chucSet.has(message.member.id)){
        chucSet.add(message.member.id);
        await mLevel.addBotEXP(message.member, mConst.getEXPConst().unit * 10, message, true);
        await message.reply(" chúc bạn ngủ ngon! 🌙");
        await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3dBSbh_K4PYaRwNmv8ITztctXQuAStC-Qjk7u7hN4M-lgEY511hAQw3Av0Wq6Y1cHh0jVziywtqvHFbG9_bvq8WkcGgrCp8jBLMxWNJyimjgMG5ZAVtE7f3KWsPq8i5qPoaFpYocljIliX1WpDKD4nW=s823-no?authuser=0");
        await reactEmoji(message, ["💖", "🌟", "❤️"]);
    }
}

async function checkProfany(message){
    if(!mCommand.getProfaniesList()) return;
    //Profany checks
    var text = message.content.toLowerCase();
    var texts = text.split(" ");
    if(mCommand.getProfanyList().some( word => texts.includes(word)) || mCommand.getProfaniesList().some(word => text.includes(word))){
        const channel = message.channel;
        const member = message.member;
        notlogMessage.push(message.id);
        await message.delete();
        await channel.send(member.toString() + ", bạn đừng dùng những từ ngữ hay emoji đó nữa nhé! 😫");
        const url = ["https://lh3.googleusercontent.com/pw/ACtC-3cjPFsAT8YNUagSOUciskt0JiKIPe372-xNLsCdTTWWWAbosnGAmpcbVjxm4jcsf15MvydsWXh55sfhTOG3pOukPW7UG_wJgyrjjPqoO_PSBQGdMPxDXdRKUo7mdTBG9Nq0EO5TGOchVJaTCWUXwg6q=s581-no?authuser=0"
                    ,"https://lh3.googleusercontent.com/pw/ACtC-3eePw8h8EflZ9SDCBSGuXOMJWnVckYGb32r6qwzVIkPi6N70yx2Cqmloz8nXhwcXykD-nnyqKQe8p8p4CKd5q5M62QBCJ6iIesdyEza4JzO8C_UMASQhLFquWmWcVDekKex1x58zpGLcLAtsFKl8xx3=s712-no?authuser=0"
        ];
        await channel.send(url[Math.floor(Math.random() * url.length)]);
        // await mLevel.addBotEXP(message.member, -mConst.getEXPConst().unit * 25, message, true);
        // await mLevel.addFanEXP(message.member, -mConst.getEXPConst().unit * 25, message, true);
        // mCommand.addMoney(message.member.id, -1000, true);
        fineProfany(message);
        return true;
    }

    return false;
}

async function fineProfany(message){
    await mLevel.addBotEXP(message.member, -mConst.getEXPConst().unit * 25, message, true);
    await mLevel.addFanEXP(message.member, -mConst.getEXPConst().unit * 25, message, true);
    mCommand.addMoney(message.member.id, -1000, true);
}

async function checkNotChatChannel(message){
    const text = message.content.toLowerCase();
    const member = message.member;
    const channel = message.channel;

    if(mConst.getNotChatChannel().includes(message.channel.id)){
        if(text.length > 0){
            notlogMessage.push(message.id);
            await message.delete();
            const reply = await channel.send(member.toString() + ", ở đây chỉ đăng ảnh hoặc video, không được chat nhé bạn. 😅\nHãy xem lại mục thứ 4 trong các quy tắc của server." );
            setTimeout(() => reply.delete(), 5000);
            return true;
        }
    }

    if(mConst.getNotCommandChannel().includes(message.channel.id)){
        if(text.substring(0, 1) == PREFIX && !message.member.roles.cache.has(mConst.getRoleConst().staff)){
            notlogMessage.push(message.id);
            await message.delete();
            const reply = await channel.send(member.toString() + ", không dùng lệnh này ở đây nhé bạn. 😅");
            setTimeout(() => reply.delete(), 5000);
            return true;
        }
    }

    // Earn Money
    if(mConst.getEarnMoneyChannel().includes(message.channel.id)){
        earnMoney(message);
    }

    return false;
}

async function checkMuted(message){
    const list = mCommand.getMutedAt();
    if(message.member.roles.cache.has(mConst.getRoleConst().muted) || (list[message.channel.id] && list[message.channel.id].ids.includes(message.member.id))){
        notlogMessage.push(message.id);
        await message.delete();
        return true;
    }
    return false;
}

async function reactEmoji(message, react){
    if(!react) return;
    for(var i=0; i<react.length; i++)
        await message.react(react[i]);
}

var voices = [];
function getRooms(){ return voices; }
async function voiceStateUpdated(oldVoice, newVoice){
    // const channels = mConst.getChannelConst();

    // //Delete channels have no body
    // for(var i=0; i<voices.length; i++){
    //     const c = client.guilds.cache.get(SERVERID).channels.cache.get(voices[i].voice);
    //     if(!c){
    //         voices.splice(i, 1);
    //         i--;
    //     }
    //     else if(!c.members.first()){
    //         await c.guild.channels.cache.get(voices[i].chat).delete();
    //         await c.guild.channels.cache.get(voices[i].voice).delete();
    //         await c.guild.channels.cache.get(voices[i].category).delete();
    //         voices.splice(i, 1);
    //         i--;
    //     }
    // }

    // // Enter channel
    // if(newVoice.channelID != null && mConst.getautoCreateChannel().includes(newVoice.channelID)){
    //     if(newVoice.member.guild.channels.cache.keyArray().length + 3 >= 500){
    //         newVoice.setChannel(null);
    //         return false;
    //     }

    //     var text = {};
    //     var type;
    //     var no;
    //     if(newVoice.channelID == channels.cstream){
    //         type = "stream";
    //         text.category = "Phòng Stream Game ";
    //     }
    //     else if(newVoice.channelID == channels.cmusic){
    //         type = "music";
    //         text.category = "Phòng Nghe Nhạc ";
    //     }
    //     else if(newVoice.channelID == channels.cvideo){
    //         type = "video";
    //         text.category = "Phòng Xem Video ";
    //     }
    //     else if(newVoice.channelID == channels.cvoice){
    //         type = "voice";
    //         text.category = "Phòng Voice Chat ";
    //     }
    //     var no = 1;
    //     var temp = [];
    //     var max = newVoice.member.guild.channels.cache.get(channels.cvideo).position + 1;
    //     for(var i=0; i<voices.length; i++){
    //         if(voices[i].type == type){
    //             temp.push(voices[i].no);
    //         }
    //         if(newVoice.member.guild.channels.cache.get(voices[i].category).position > max)
    //             max = newVoice.member.guild.channels.cache.get(voices[i].category).position;
    //     }
    //     while(temp.includes(no)) no++;
    //     text.category += no;
    //     text.text = "phòng-chat";
    //     text.voice = text.category;


    //     const category = await newVoice.member.guild.channels.create(text.category, {
    //         type: "category",
    //         position: max + 3
    //     })
    //     const voice = await newVoice.member.guild.channels.create(text.voice, {
    //         type: "voice",
    //         position: max + 5,
    //         parent: category
    //     })
    //     await newVoice.setChannel(voice);
    //     const chat = await newVoice.member.guild.channels.create(text.text, {
    //         type: "text",
    //         position: max + 4,
    //         parent: category
    //     })
        

    //     voices.push({
    //         type: type,
    //         no: no,
    //         category: category.id,
    //         chat: chat.id,
    //         voice: voice.id
    //     })

        
    // }
    
    // return true;
}

var countDict = {};
function getCurrrentCouting(){ return countDict; }
function setCurrentCount(curCount){ countDict = curCount; }
async function countingChannel(message){
    // if(userInfo[message.member.id].money < 0){
    //     await message.delete();
    //     return false;
    // }

    const num = parseInt(message.content);
    if(num && message.content.split(" ").length <= 1){
        const currentCountMembers = countDict[message.channel.id].value2;
        if(num == countDict[message.channel.id].value1 + 1){
            countDict[message.channel.id].value1 += 1;
            var currentCount = countDict[message.channel.id].value1;
            if(!currentCountMembers.includes(message.member.id))
                countDict[message.channel.id].value2.push(message.member.id);
            message.react("✅");
            if(currentCount % mConst.getDictionary().countstep == 0){
                const earn = Math.floor(currentCount * mConst.getDictionary().countmoneyearn / 100);
                for(var i=0; i<currentCountMembers.length; i++)
                    mCommand.addMoney(currentCountMembers[i], earn);
                await message.channel.send("Chúc mừng những bạn đã tham gia trò chơi đã đếm chính xác từ 1 đến " + currentCount + ". 🎉\nMỗi bạn sẽ được nhận " + earn + " " + mConst.getDictionary().currency + ". <:wamd:813647968515129344>");
            }
            if(currentCount >= mConst.getCountDict()[message.channel.id]){
                await message.channel.send("Game sẽ được reset lại từ đầu.\n0");
                countDict[message.channel.id].value1 = 0;
                countDict[message.channel.id].value2 = [];
            }
        }
        else{
            var currentCount = countDict[message.channel.id].value1;
            var minus = countDict[message.channel.id].value1 * Math.floor(currentCount / 100);
            mCommand.addMoney(message.member.id, -minus, true);
            if(minus == 0) minus = currentCount;
            countDict[message.channel.id].value1 = 0;
            countDict[message.channel.id].value2 = [];
            message.react("💥");
            await message.channel.send(message.member.toString() + " đã đếm sai và bị trừ " + minus + " WAMĐ. 💥\nGame sẽ được reset lại từ đầu.\n0");
        }
    } 
}

var goldcount = getRanInteger(mConst.getDictionary().golddigmin, mConst.getDictionary().golddigmax);
var curgold = 0;
async function digGold(message){
    const content = message.content.toLowerCase();
    if(content == "đào"){
        curgold += 1;
        if(curgold >= goldcount){
            curgold = 0;
            const oldcount = goldcount;
            goldcount = getRanInteger(mConst.getDictionary().golddigmin, mConst.getDictionary().golddigmax);
            var money = Math.floor(oldcount * getRanInteger(mConst.getDictionary().goldratemin, mConst.getDictionary().goldratemax) / 100);
            if(getRanInteger(1, 100) >= mConst.getDictionary().goldbomrate){
                if(getRanInteger(1, 1000) <= mConst.getDictionary().golddiamondrate){
                    money *= 100;
                    mCommand.addMoney(message.member.id, money);
                    await message.channel.send("Chúc mừng " + message.member.toString() + " đã đào được viên kim cương trị giá " + money + " " + mConst.getDictionary().currency + "! 💎");
                    await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3cUGxH5K6F8E4OKfEvedTc71wMxljDsju3bSN1qK9pKaCuGLoz2jgkAB_Jd-7XmYJqd2O5eJ-k-wML0Y4q_rieWbFmP88-U5o9SYYNyn0TkPmR6rbi7hKnBC2HURCqWOf1KMETuJG-s8WCVbU2_5rKl=w500-h348-no?authuser=0");
                    await getGuild().channels.cache.get(channelList.welcome).send(message.member.toString() + " đã đào được viên kim cương trị giá " + money + " " + mConst.getDictionary().currency + "! 💎");
                }
                else{
                    mCommand.addMoney(message.member.id, money);
                    await message.channel.send("Chúc mừng " + message.member.toString() + " đã đào được cục vàng trị giá " + money + " " + mConst.getDictionary().currency + "! 💰");
                    await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3cYisCVFYvoenmzb4CksS-YhWSQ6Lungq7NTYrNjcT39zUOqRMzVGfloXrI9yawGATllq2vDqCj5GqB6QVzD9QK2DrGlkLKSNKMF5OoV-pIG4E_pJkAuTA5ZneCMZpvrjY1p5F8mm4rGpeIRHyt8K1d=w200-h165-no?authuser=0");
                }
            }
            else{
                //money = Math.floor(money * (1.0 - oldcount / mConst.getDictionary().golddigmax));
                mCommand.addMoney(message.member.id, -money, true);
                await message.channel.send(message.member.toString() + " đã đào trúng quả mìn! 💥\nSau vụ nổ, " + message.member.toString() + " nhập viện và phải trả " + money + " tiền viện phí! 💸");
                await message.channel.send("https://media.giphy.com/media/Z3Jz8EyQrQHjwvUezm/giphy.gif");
            }
        }
        //message.react("⛏️");
    }
}

var titan = {};
function initializeTitan(){
    titan[mConst.getChannelConst().aot] = { curtitan: 0, curtitanhp: 0, idle: 0};
    titan[mConst.getChannelConst().aot2] = { curtitan: 0, curtitanhp: 0, idle: 0};
    titan[mConst.getChannelConst().aot3] = { curtitan: 0, curtitanhp: 0, idle: 0};
}
const titanIdle = 10;
async function spawnTitan(){
    const titanChannels = mConst.getTitanChannels();
    for(var i=0; i<titanChannels.length; i++){
        if(titan[titanChannels[i]].idle < titanIdle){
            const curChannel = titanChannels[i];
            titan[curChannel].curtitan = getRanInteger(mConst.getMGameConst()[curChannel].aothpmin, mConst.getMGameConst()[curChannel].aothpmax);
            titan[curChannel].curtitanhp = titan[curChannel].curtitan;
            const channel = getGuild().channels.cache.get(curChannel);
            await channel.send("Một titan với " + titan[curChannel].curtitanhp + " thể lực đã xuất hiện!");
            await channel.send("https://lh3.googleusercontent.com/pw/ACtC-3f5W68LV8zoYzaimvgrBvVxFOc5IswH2RlubqQh1WyQIHgHwrFBYRQ0dfZ_XD6CqOEOkaZDEG5PINdcdZOmiXwWnOgaC_Zgwdk2f3_3s5kgASfi2fiOflZ57-oGsnJk4kUYXo3Rk300pTHxPgLcgOct=w300-h420-no?authuser=0");
            channel.awaitMessages( m => (m.channel.id == channel.id && m.content.toLowerCase() == "đánh"), {max: titan[curChannel].curtitan, time: mConst.getMGameConst().aotattack, errors: ["time"]})
            .then(async collected => {
                const list = collected.array();
                const members = [];
                for(var i=0; i<list.length; i++)
                    if(!members.includes(list[i].member.id))
                        members.push(list[i].member.id);
                const damage = Math.floor(titan[curChannel].curtitanhp * getRanInteger(mConst.getMGameConst().aotratemin, mConst.getMGameConst().aotratemax) / 100);
                await channel.send("Titan đã bị hạ gục, " + damage + " tiền văng ra đất! <:wamd:813647968515129344>");
                channel.awaitMessages( m => (m.channel.id == channel.id && (m.content.toLowerCase() == "nhặt" || m.content.toLowerCase() == "lụm")), {max: 999999999, time: mConst.getMGameConst().aotloot, errors: ["time"]})
                .then(async collected => {})
                .catch(async collected => {
                    titan[curChannel].idle = 0;
                    const list = collected.array();
                    const amount = Math.floor(damage / collected.size);
                    const loot = {};
                    for(var i=0; i<list.length; i++){
                        if(!loot[list[i].member.id]) loot[list[i].member.id] = { member: getGuildMembers().get(list[i].member.id).toString(), amount: 0 };
                        loot[list[i].member.id].amount += amount;
                    }
                    var text = "";
                    if(list.length == 0) text = "Không có ai nhặt tiền rơi ra từ titan cả.";
                    else text = "Số tiền rơi ra từ titan đã được những người sau đây nhặt:\n";
                    for(var prop in loot){
                        mCommand.addMoney(prop, loot[prop].amount, true);
                        text += "- " + loot[prop].member + " " + loot[prop].amount + " " + mConst.getDictionary().currency + "\n";
                    }
                    await channel.send(text);
                });
            })
            .catch(async collected => {
                const list = collected.array();
                const members = [];
                for(var i=0; i<list.length; i++)
                    if(!members.includes(list[i].member.id))
                        members.push(list[i].member.id);
                const amount = Math.floor(titan[curChannel].curtitanhp * getRanInteger(mConst.getMGameConst().aotratemin, mConst.getMGameConst().aotratemax) / 100);
                if(members.length > 0){
                    titan[curChannel].idle = 0;
                    const mamount = Math.floor(amount * mConst.getMGameConst().aotdhurtrate / 100 / 1);
                    for(var i=0; i<members.length; i++)
                        mCommand.addMoney(members[i], -mamount, true);
                    await channel.send("Titan đã cung một đòn đánh vào các bạn đang tấn công nó. 👊\nMỗi bạn phải nhập viện và mất " + mamount + " tiền viện phí. 💸");
                    await channel.send("https://media.giphy.com/media/xUPGcFYIYWUHKEZOrm/giphy.gif");
                }
                else{
                    titan[curChannel].idle += 1;
                    await channel.send("Titan đã bỏ đi nơi khác...");
                }
            });
        }
    }
    
    
}

const wordPlaying = {};
async function wordGame(message){
    const text = message.content.toLowerCase();
    //if(text.includes("chơi")) wordPlaying = true;

    if(text == "chơi" && !wordPlaying[message.channel.id]){
        wordPlaying[message.channel.id] = true;
        const channel = getGuild().channels.cache.get(mConst.getChannelConst().word);
        const words = mCommand.getWords();
        const word = words[Math.floor(Math.random() * words.length)];
        const num = getRanInteger(mConst.getMGameConst().wordmin, mConst.getMGameConst().wordmax);
        var i=0;
        var w = word;
        while(i < num){
            var at = w.charAt(Math.floor(Math.random() * w.length));
            if(at != " " && at != "-"){
                w = w.substring(0, w.indexOf(at)) + "-" + w.substring(w.indexOf(at)+1);
                i++;
            }
        }

        await message.channel.send(message.member.toString() + ", hãy đoán từ dưới đây:\n" + w);
        message.channel.awaitMessages(m => !m.author.bot && m.channel.id == message.channel.id, {max: 1, time: mConst.getMGameConst().wordtime, errors: ["time"]})
        .then(async collected => {
            const mes = collected.first();
            const ans = mes.content.toLowerCase();
            const amount = num * mConst.getMGameConst().wordearn;
            if(ans == word){
                mCommand.addMoney(mes.member.id, amount, true);
                await mes.channel.send(mes.member.toString() + ", bạn đã trả lời chính xác và nhận được " + amount + " " + mConst.getDictionary().currency + "! 🌟");
            }
            else{
                mCommand.addMoney(mes.member.id, -amount * mConst.getMGameConst().wordminusmultiply, true);
                await mes.channel.send(mes.member.toString() + ", bạn trả lời sai và bị trừ " + (amount * mConst.getMGameConst().wordminusmultiply) + " " + mConst.getDictionary().currency + ". 🌧️\nTừ chính xác là: \"" + word + "\".");
            }
            wordPlaying[mes.channel.id] = undefined;
        })
        .catch(async collected => {
            await message.channel.send("Hết thời gian!\nTừ chính xác là: \"" + word + "\".");
            wordPlaying[message.channel.id] = undefined;
        });  
    }
}

const fishingmembers = [];
async function fishing(message){
    const content = message.content.toLowerCase();
    if(content.includes("câu")){
        if(fishingmembers.includes(message.member.id)){
            await message.channel.send(message.member.toString() + ", bạn đang thả câu rồi!");
            return;
        }

        await message.channel.send(message.member.toString() + " đã thả câu...");
        fishingmembers.push(message.member.id);
        const time = getRanInteger(mConst.getMGameConst().fishingmin, mConst.getMGameConst().fishingmax);
        //await sleep(time);
        message.channel.awaitMessages(m => !m.author.bot && m.member.id == message.member.id && m.channel.id == message.channel.id && m.content.toLowerCase().includes("rút"), {max: 1, time: time, errors: ["time"]})
        .then(async collected => {
            fishingmembers.splice(fishingmembers.indexOf(message.member.id), 1);
            await message.channel.send(message.member.toString() + ", bạn đã rút câu quá sớm... 😓");
        })
        .catch(async collected => {
            await message.channel.send("Cá đã cắn câu!\n" + message.member.toString() + ", hãy nhanh chóng chat \"rút\" để rút câu lên!");
            message.channel.awaitMessages(m => !m.author.bot && m.member.id == message.member.id && m.channel.id == message.channel.id && m.content.toLowerCase().includes("rút"), {max: 1, time: mConst.getMGameConst().fishingget, errors: ["time"]})
            .then(async collected => {
                fishingmembers.splice(fishingmembers.indexOf(message.member.id), 1);
                var amount = Math.floor(time / 100 / mConst.getMGameConst().fishingdivide);
                if(getRanInteger(1, 100) > mConst.getMGameConst().fishingbomchance){
                    if(getRanInteger(1, 1000) <= mConst.getMGameConst().fishingdiamond){
                        amount *= 250;
                        mCommand.addMoney(message.member.id, amount);
                        await message.channel.send("Chúc mừng " + message.member.toString() + " đã câu được một rương kho báu trị giá " + amount + " " + mConst.getDictionary().currency + "! 💰");
                        await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3d0_OCVkred-NIbTrdcgWKG3p9BdPtmUlra-zOjLvYm55WyTn9hMbqswQKrs6cfvNThbrdlR3lmQVvyazu0q1dBgsL0rrBFldF4XBM0SUz_ulDuT2MFkiEQNV2AddvNB_mYtiXTTWbMkmc4_C9pEQVA=w500-h530-no?authuser=0");     
                        await getGuild().channels.cache.get(channelList.welcome).send(message.member.toString() + " đã câu được một rương kho báu trị giá " + amount + " " + mConst.getDictionary().currency + "! 💰");
                    }
                    else{
                        mCommand.addMoney(message.member.id, amount);
                        await message.channel.send("Chúc mừng " + message.member.toString() + " đã câu được con cá!\nSau khi đem bán, bạn nhận được " + amount + " " + mConst.getDictionary().currency + "! 💰");
                        await message.channel.send("https://media.giphy.com/media/WSpSBDt6Uf8ZPiXv1p/giphy.gif");    
                    }
                }
                else{
                    mCommand.addMoney(message.member.id, -amount, true);
                    await message.channel.send(message.member.toString() + " đã câu trúng con cóc có độc! 🦠\nSau khi dính độc, " + message.member.toString() + " nhập viện và phải trả " + amount + " tiền viện phí! 💸");
                    await message.channel.send("https://media.giphy.com/media/Zmx6G1EXu8EoyFL8Sv/giphy.gif");
                }
            })
            .catch(async collected => {
                fishingmembers.splice(fishingmembers.indexOf(message.member.id), 1);
                await message.channel.send(message.member.toString() + ", bạn đã để con cá chạy mất... <:cry2:811893861021515796>");
            });
        });
        
        
        // const interval = setInterval( (message, interval) => {
            
        // }, time, message);/
    }
}

async function checkReport(message){
    if(message.member.user.bot) return;

    var content = message.content.toLowerCase();
    if(content.includes("❗") || content.includes("báo cáo") || content.includes(reportEmoji.report)){
        if(!reportedChat.chatid.includes(message.reference.messageID)){
            reportedChat.chatid.push(message.reference.messageID);
            var reported = await message.channel.messages.fetch(message.reference.messageID);
            reportedChat.reporter.push(message.member.id);
            reportedChat.channel.push(message.channel.id);
            const text = new Discord.MessageEmbed()
            .setTitle("CHAT BỊ REPORT")
            .setColor("#fc3c3c")
            .addField("Channel", reported.channel.toString(), true)
            .addField("Chat của", reported.member.toString(), true)
            .addField("Người report", message.member.toString(), true)
            .addField("Nội dung", reported.content)
            .addField("Link của chat", reported.url)
            .setFooter(`Chat ID: ${reported.id}`);
            var mes = await getGuild().channels.cache.get(reportEmoji.channel).send(text);
            mes.react(reportEmoji.accept);
            mes.react(reportEmoji.reject);
            reportedChat.logmes.push(mes.id);
            await message.member.user.send("Cảm ơn bạn đã report chat của " + message.member.displayName + ".\nMình sẽ thông báo kết quả cho bạn sau khi các Staff xử lý.");
        }
        else await message.member.user.send("Đã có người report chat này của " + message.member.displayName + ".\nChat này đang được chờ để các Staff xử lý.");
        notlogMessage.push(message.id);
        await message.delete();
    }
}

async function logBotDM(message){
    const author = message.author;
    if(author.bot) return;

    const member = getGuildMembers().get(author.id);
    var text = new Discord.MessageEmbed()
    //.setTitle("TIN NHẮN RIÊNG")
    .setColor("#bee8f6")
    .addField("Từ", (member ? member.toString() : author.tag), true)
    .addField("Nội dung", message.content)
    //.setFooter(`Chat ID: ${message.id}`);
    getGuild().channels.cache.get(channelList.botdm).send(text);
}

async function sendDMMember(message){
    const member = message.mentions.members.first();
    if(member){
        var content = message.content.replace(member.toString(), "");
        var sent = true;
        member.user.send(content).catch(() => {
            sent = false;
            message.channel.send("Lỗi gửi tin nhắn riêng cho " + member.toString() + "!");
        });
        if(sent == true) message.react("✅");
    }
    else await message.channel.send("Hãy tag người muốn gửi tin nhắn riêng vào đầu của chat.");
}

function getRanInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}