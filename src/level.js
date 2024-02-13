module.exports = { addFanEXP, addBotEXP };



const mCommand = require("./commands.js");
const mConst = require("./const.js");
const bot = require("./bot.js");



async function addFanEXP(member, exp, message, runSetRole = true){
    if(member.user.bot) return;

    const expConst = mConst.getEXPConst();

    user = mCommand.getUserInfo()[member.id];
    if(!user) mCommand.getUserInfo()[member.id] = bot.createNewUserInfo();
    
    user.fanexp += exp;
    if(user.fanexp < 0) user.fanexp = 0;
    else if(user.fanexp > expConst.fanexpLimit) user.fanexp = expConst.fanexpLimit;

    if(runSetRole && (!member.roles.cache.has(mConst.getRoleConst().staff)))
        await setFanRoles(member, user, message, exp < 0);
}

async function setFanRoles(member, user, message, isDown){
    const roleConst = mConst.getRoleConst();
    const expConst = mConst.getEXPConst();

    bot.setAddingRole(true);
    // Check fan role
    if(user.fanexp < expConst.topfan){
        if(member.roles.cache.get(roleConst.topfan)){
            await member.roles.remove(mConst.getFanRoles());
            await member.roles.add(roleConst.fan);
            bot.sendNonCommandEmbed("looseTopFan", message.channel.id, member);
            bot.sendNonCommandEmbed("looseTopFan", mConst.getChannelConst().welcome, member);
        }
    }
    else{
        if(!member.roles.cache.get(roleConst.topfan)){
            await member.roles.remove(mConst.getFanRoles());
            await member.roles.add(roleConst.topfan);
            bot.sendNonCommandEmbed("getTopFan", message.channel.id, member);
            bot.sendNonCommandEmbed("getTopFan", mConst.getChannelConst().welcome, member);
        }
    }
    bot.setAddingRole(false);
}

async function addBotEXP(member, exp, message, runSetRole = true){
    if(member.user.bot) return;

    const expConst = mConst.getEXPConst();

    user = mCommand.getUserInfo()[member.id];
    if(!user) mCommand.getUserInfo()[member.id] = bot.createNewUserInfo();
    
    var pre = user.exp;
    user.exp += exp;
    if(user.exp < 0) user.exp = 0;
    else if(user.exp > expConst.expLimit) user.exp = expConst.expLimit;

    if(runSetRole) await setBotRoles(member, user, message, exp < 0);
}

async function setBotRoles(member, user, message, isDown){
    const roleConst = mConst.getRoleConst();
    const expConst = mConst.getEXPConst();

    bot.setAddingRole(true);

    // Check bot level
    if( user.exp >= expConst.spouse){
        if(!member.roles.cache.get(roleConst.spouse)){
            await member.roles.remove(mConst.getBotRoles());
            await member.roles.add(roleConst.spouse);
            if(!isDown) bot.sendNonCommandEmbed("becomeSpouse", message.channel.id, member);
        }
    }
    else if(user.exp >= expConst.lover){
        if(!member.roles.cache.get(roleConst.lover)){
            await member.roles.remove(mConst.getBotRoles());
            await member.roles.add(roleConst.lover);
            if(!isDown) bot.sendNonCommandEmbed("becomeLover", message.channel.id, member);
            else bot.sendNonCommandEmbed("downLover", undefined, member, member.user);
        }
    }
    else if(user.exp >= expConst.bestfriend){
        if(!member.roles.cache.get(roleConst.closeFriend)){
            await member.roles.remove(mConst.getBotRoles());
            await member.roles.add(roleConst.closeFriend);
            if(!isDown) bot.sendNonCommandEmbed("becomeClose", message.channel.id, member);
            else bot.sendNonCommandEmbed("downClose", undefined, member, member.user);
        }
    }
    else if(user.exp >= expConst.friend){
        if(!member.roles.cache.get(roleConst.friend)){
            await member.roles.remove(mConst.getBotRoles());
            await member.roles.add(roleConst.friend);
            if(!isDown) bot.sendNonCommandEmbed("becomeFriend", message.channel.id, member);
            else bot.sendNonCommandEmbed("downFriend", undefined, member, member.user);
        }
    }
    else if(isDown){
        var hasBotRole = false;
        for(var i=0; i<mConst.getBotRoles().length; i++){
            if(member.roles.cache.has(mConst.getBotRoles()[i])){
                hasBotRole = true;
                break;
            }
        }
        const botRoles = mConst.getBotRoles().slice();
        botRoles.splice(botRoles.indexOf(mConst.getRoleConst().friend), 1);
        await member.roles.remove(botRoles);
        if(hasBotRole && !member.roles.cache.get(roleConst.friend)){
            await member.roles.add(roleConst.friend);
            bot.sendNonCommandEmbed("downFriend", undefined, member, member.user);
        }
    }

    bot.setAddingRole(false);
}