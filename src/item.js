module.exports = { getItemEffects };

const Discord = require("discord.js");
const mCommand = require("./commands.js");
const mConst = require("./const.js");
const bot = require("./bot.js");

function getItemEffects(){ return itemEffects; }
var itemEffects = {

    "1": async function(message, cmd, args, item, member, index){
        await message.channel.send(message.member.toString() + " đã dùng " + item.name + " " + item.value4 + "...");
        await message.channel.send("https://media.giphy.com/media/Tk9XZvX8qmsiVvhXzI/giphy.gif");
    },

    "2": async function(message, cmd, args, item, member, index){
        const userInfo = mCommand.getUserInfo();
        userInfo[member.id].items.splice(index, 1);
        await message.channel.send(message.member.toString() + " đã ăn " + item.name + " " + item.value4 + " và tăng 1kg.");
        await message.channel.send("https://media.giphy.com/media/M9Eb4CeUbHyMd6EWps/giphy.gif");
    },

    "3": async function(message, cmd, args, item, member, index){
        const target = message.mentions.members.first();

        if(target && !target.user.bot){
            const userInfo = mCommand.getUserInfo();

            if(Date.now() - userInfo[target.id].lastchat >= mConst.getDictionary().stealleastonline){
                await message.channel.send(message.member.toString() + ", bạn không thể trộm những người không online.");
                return;
            }

            userInfo[member.id].items.splice(index, 1);
            await message.channel.send(message.member.toString() + " đang vào trộm kho tiền của " + target.toString());
            message.channel.awaitMessages(m => !m.author.bot && m.channel.id == message.channel.id && m.content.toLowerCase().includes("cảnh sát"), {max: 1, time: mConst.getDictionary().stealtime, errors: ["time"]})
            .then(async collected => {
                var bao = collected.first().member;
                var fine = getRanInteger(item.value7, item.value8);
                var thuong = Math.floor(fine * 3 / 4);
                mCommand.addMoney(message.member.id, -fine, true);
                mCommand.addMoney(bao.id, thuong, true);
                await message.channel.send(bao.toString() + " đã báo cảnh sát bắt " +  message.member.toString() + "! 👨‍✈️\n" + message.member.toString() + " bị cảnh sát phạt " + fine + " " + mConst.getDictionary().currency + " vì tội trộm cắp.\n" + bao.toString() + " nhận được " + thuong + " " + mConst.getDictionary().currency + " vì đã giúp cảnh sát bắt trộm. 💰");
            })
            .catch(async collected => {
                var chance = mConst.getDictionary().stealfail;
                if(target.roles.cache.has(mConst.getRoleConst().bank)) chance = mConst.getDictionary().bankstealfail;
                const success = getRanInteger(1, 100) >= chance;
                if(success == true){
                    var damage = getRanInteger(item.value1, item.value2);
                    if(damage > userInfo[target.id].money){
                        damage = userInfo[target.id].money;
                        if(damage < 0) damage = 0;
                    }
                    mCommand.addMoney(target.id, -damage, false);
                    mCommand.addMoney(message.member.id, damage, true);
                    await message.channel.send(message.member.toString() + " đã trộm thành công " + damage + " tiền của " + target.displayName + ". 💸");
                    const embed = new Discord.MessageEmbed()
                    .setTitle("VỤ TRỘM")
                    .addField("Người trộm", message.member.toString(), true)
                    .addField("Người bị trộm", target.toString(), true)
                    .addField("Số tiền", damage)
                    .addField("Channel", message.channel.toString(), true)
                    .addField("Link chat", message.url)
                    .setColor("#fc3c3c")
                    .setFooter(`Chat ID: ${message.id}`);
                    await bot.getGuild().channels.cache.get(mConst.getChannelConst().transactionlog).send(embed);
                }
                else{
                    var fine = getRanInteger(item.value7, item.value8);
                    mCommand.addMoney(message.member.id, -fine, true);
                    await message.channel.send("Hành động trộm tiền của " +  message.member.toString() + " đã bị cảnh sát phát hiện! 👨‍✈️\n" + message.member.toString() + " bị phạt " + fine + " " + mConst.getDictionary().currency + " vì tội trộm cắp.");
                }
            });
              
            
        }
    },

    "4": async function(message, cmd, args, item, member, index){
        const target = message.mentions.members.first();
        if(target && !target.user.bot && target.id != message.member.id){
            const userInfo = mCommand.getUserInfo();

            if(userInfo[message.member.id].spouse){
                await message.channel.send(message.member.toString() + ", bạn hiện tại đã kết hôn với người khác rồi.");
                return;
            }
            else if(userInfo[target.id].spouse){
                await message.channel.send(message.member.toString() + ", tiếc là " + target.displayName + " đã kết hôn với người khác rồi. 😟");
                return;
            }
            else{
                await message.channel.send(target.toString() + ", " + message.member.toString() + " muốn kết hôn với bạn. " + item.value4 + "\nNếu bạn đồng ý thì hãy trả lời ok.");
                message.channel.awaitMessages(m => m.member.id == target.id && m.channel.id == message.channel.id && m.content.toLowerCase().includes("ok"), {max: 1, time: 10000, errors: ["time"]})
                .then(async collected => {
                    userInfo[message.member.id].items.splice(index, 1);
                    userInfo[target.id].items.push("-1");
                    userInfo[message.member.id].items.push("-1");
                    userInfo[message.member.id].spouse = target.id;
                    userInfo[target.id].spouse = message.member.id;
                    await message.channel.send("Chúc mừng " + message.member.toString() + " và " + target.toString() + "! 🎉\nHai bạn đã chính thức kết hôn với nhau! 💒");
                    await message.channel.send("https://media.giphy.com/media/DKXbWUTooWMAnGXvXD/giphy.gif");
                    message.guild.channels.cache.get(mConst.getChannelConst().welcome).send(message.member.toString() + " đã kết hôn với " + target.toString() + "! 💒");
                })
                .catch(async collected => {
                    await message.channel.send(message.member.toString() + ", " + member.toString() + " đã không chấp nhận kết hôn với bạn. 😟");
                });    
                return;
            }
        }
        else{
            await message.channel.send(message.member.toString() + " đã dùng " + item.name + " " + item.value4 + " để khoe sự giàu có của mình.");
            await message.channel.send("https://media.giphy.com/media/kRhVd9XIpIP5jkaz26/giphy.gif");
        }
    },

    boom: async function(message, cmd, args, item, member, index){
        const target = message.mentions.members.first();
        if(!target) return;

        if(!target.roles.cache.has(mConst.getRoleConst().bank)){
            const userInfo = mCommand.getUserInfo();
            const min = item.value1;
            const max = item.value2;
            const damage = getRanInteger(min, max);
            mCommand.addMoney(target.id, -damage, false);
            userInfo[member.id].items.splice(index, 1);
            await message.channel.send(message.member.toString() + " đã ném " + item.name + " " + item.value4 + " vào kho tiền của " + target.displayName + ". 💥\n" + target.displayName + " bị mất " + damage + " WAMĐ.");    
            await message.channel.send("https://media.giphy.com/media/Z3Jz8EyQrQHjwvUezm/giphy.gif");
        }
        else{
            await message.channel.send(message.member.toString() + ", bạn không thể ném " + item.name + " vào ngân hàng. 🏦");
        }
    },

    "5": async function(message, cmd, args, item, member, index){ this.boom(message, cmd, args, item, member, index); },
    "6": async function(message, cmd, args, item, member, index){ this.boom(message, cmd, args, item, member, index); },
    "7": async function(message, cmd, args, item, member, index){ this.boom(message, cmd, args, item, member, index); },

    "8": async function(message, cmd, args, item, member, index){
        const target = message.mentions.members.first();
        if(target && !target.user.bot){
            const userInfo = mCommand.getUserInfo();

            if(target.id != userInfo[message.member.id].spouse){
                await message.channel.send(message.member.toString() + ", bạn hiện tại không có kết hôn với " + target.displayName);
                return;
            }
            else{
                await message.channel.send(target.toString() + ", " + message.member.toString() + " muốn ly hôn với bạn. " + item.value4 + "\nNếu bạn đồng ý thì hãy trả lời ok.");
                message.channel.awaitMessages(m => m.member.id == target.id && m.channel.id == message.channel.id && m.content.toLowerCase().includes("ok"), {max: 1, time: 10000, errors: ["time"]})
                .then(async collected => {
                    userInfo[message.member.id].items.splice(index, 1);
                    userInfo[message.member.id].spouse = undefined;
                    userInfo[target.id].spouse = undefined;
                    await message.channel.send(message.member.toString() + " và " + target.toString() + " đã ly hôn với nhau... 💔");
                    message.guild.channels.cache.get(mConst.getChannelConst().welcome).send(message.member.toString() + " và " + target.toString() + " đã ly hôn với nhau... 💔");
                })
                .catch(async collected => {
                    await message.channel.send(message.member.toString() + ", " + member.toString() + " đã không chấp nhận ly hôn với bạn.");
                });    
                return;
            }
        }
        else{
            await message.channel.send(message.member.toString() + ", bạn phải tag người mình đã kết hôn vào để dùng item này.");
        }
    },

    "9": async function(message, cmd, args, item, member, index){
        const userInfo = mCommand.getUserInfo();
        userInfo[member.id].items.splice(index, 1);
        await message.channel.send(message.member.toString() + " đã ăn " + item.name + " " + item.value4 + " và tăng 0.5kg.");
        await message.channel.send("https://media.giphy.com/media/bOifRrU23QcTU1jCww/giphy.gif");
    },

    "10": async function(message, cmd, args, item, member, index){
        const userInfo = mCommand.getUserInfo();
        userInfo[member.id].items.splice(index, 1);
        await message.channel.send(message.member.toString() + " đã ăn " + item.name + " " + item.value4 + " và tăng 0.5kg.");
        await message.channel.send("https://media.giphy.com/media/bOifRrU23QcTU1jCww/giphy.gif");
    },

    "11": async function(message, cmd, args, item, member, index){
        const target = message.mentions.members.first();
        if(!target) return;

        if(!target.roles.cache.has(mConst.getRoleConst().bank)){
            const userInfo = mCommand.getUserInfo();
            const min = item.value1;
            const max = item.value2;
            var damage = getRanInteger(min, max);
            if(damage > userInfo[target.id].money) damage = userInfo[target.id].money;
            if(damage < 0) damage = 0;
            mCommand.addMoney(target.id, -damage, false);
            userInfo[member.id].items.splice(index, 1);
            await message.channel.send(message.member.toString() + " đã ném " + item.name + " " + item.value4 + " vào " + target.displayName + ".\n" + target.displayName + " rơi " + damage + " " + mConst.getDictionary().currency + " ra đất.");
            await message.channel.send("https://lh3.googleusercontent.com/pw/ACtC-3dBd6fFerRjlmhrWwvaXD6sXO0J-9AoyWfJlIM07cbpDKyl3-V8MT_q00eMXvjantFrp0i-to57Zw_HhOloDK0I8BbE31CcW8vPpS6I-hp-m4od2Mi_pqKYp-oKtecaLURPTWrlGo9DCgl_5IJlCsiF=s868-no?authuser=0");
            message.channel.awaitMessages( m => !m.author.bot && m.channel.id == message.channel.id && (m.content.toLowerCase().includes("nhặt") || m.content.toLowerCase().includes("lụm")), {max: 999999999, time: 10000, errors: ["time"]})
            .then(async collected => {})
            .catch(async collected => {
                const list = collected.array();
    
                const amount = Math.floor(damage / collected.size);
                const loot = {};
                for(var i=0; i<list.length; i++){
                    if(!loot[list[i].author.id]) loot[list[i].author.id] = { member: bot.getGuildMembers().get(list[i].author.id).toString(), amount: 0 };
                    loot[list[i].member.id].amount += amount;
                }
                var text = "";
                if(list.length == 0) text = "Không có ai nhặt tiền rơi ra từ " + target.toString() + " cả.";
                else text = "Số tiền rơi ra từ " + target.toString() + " đã được những người sau đây nhặt:\n";
                for(var prop in loot){
                    mCommand.addMoney(prop, loot[prop].amount, true);
                    text += "- " + loot[prop].member + " " + loot[prop].amount + " " + mConst.getDictionary().currency + "\n";
                }
                await message.channel.send(text);
            });    
        }
        else{
            await message.channel.send(message.member.toString() + ", bạn không thể ném " + item.name + " vào ngân hàng. 🏦");
        }
    },

    "12": async function(message, cmd, args, item, member, index){
        if(getRanInteger(1, 100) > 50){
            await message.channel.send(message.member.toString() + " đã dùng pantsu của mình để đội lên đầu... 😅");
            await message.channel.send("https://media.giphy.com/media/kelz3RBQUyD4vhyZrD/giphy.gif");
        }
        else{
            await message.channel.send(message.member.toString() + " khoe pantsu của mình với mọi người... 😅");
            await message.channel.send("https://media.giphy.com/media/tuPv0SIWJlsQJ9XD8o/giphy.gif");
        }
    },

    "13": async function(message, cmd, args, item, member, index){
        const userInfo = mCommand.getUserInfo();
        const min = item.value1;
        const max = item.value2;
        var damage = getRanInteger(min, max);
        userInfo[member.id].items.splice(index, 1);
        await message.channel.send(message.member.toString() + " đã tung hộp quà từ thiện.\n" + damage + " " + mConst.getDictionary().currency + " văng ra đất.");
        await message.channel.send("https://media.giphy.com/media/KHIXeQ82kWruZr9wVO/giphy.gif");
        message.channel.awaitMessages( m => !m.author.bot && m.channel.id == message.channel.id && (m.content.toLowerCase().includes("nhặt") || m.content.toLowerCase().includes("lụm")), {max: 999999999, time: 10000, errors: ["time"]})
        .then(async collected => {})
        .catch(async collected => {
            const list = collected.array();

            const amount = Math.floor(damage / collected.size);
            const loot = {};
            for(var i=0; i<list.length; i++){
                if(!loot[list[i].author.id]) loot[list[i].author.id] = { member: bot.getGuildMembers().get(list[i].author.id).toString(), amount: 0 };
                loot[list[i].member.id].amount += amount;
            }
            var text = "";
            if(list.length == 0) text = "Không có ai nhặt tiền " + member.toString() + " tung ra cả... 😅";
            else text = "Số tiền " + member.toString() + " tung ra đã được những người sau đây nhặt:\n";
            for(var prop in loot){
                mCommand.addMoney(prop, loot[prop].amount, true);
                text += "- " + loot[prop].member + " " + loot[prop].amount + " " + mConst.getDictionary().currency + "\n";
            }
            message.channel.send(text);
            const embed = new Discord.MessageEmbed()
                .setTitle("TUNG TIỀN")
                .setDescription(text)
                .addField("Channel", message.channel.toString(), true)
                .addField("Link chat", message.url)
                .setColor("#fff18b")
                .setFooter(`Chat ID: ${message.id}`);
            bot.getGuild().channels.cache.get(mConst.getChannelConst().transactionlog).send(embed);
        });        
    },

    "14": async function(message, cmd, args, item, member, index){
        const target = message.mentions.members.first();
        if(target && !target.user.bot && target.id != message.member.id){
            const userInfo = mCommand.getUserInfo();

            userInfo[message.member.id].items.splice(index, 1);
            await message.channel.send(target.toString() + ", " + message.member.toString() + " muốn mời bạn ăn " + item.name + ". " + item.value4 + "\nNếu bạn chấp nhận lời mời thì hãy chat \"ăn\" hoặc \"măm\".");
            message.channel.awaitMessages(m => m.member.id == target.id && m.channel.id == message.channel.id && (m.content.toLowerCase().includes("ăn") || m.content.toLowerCase().includes("măm")), {max: 1, time: 10000, errors: ["time"]})
            .then(async collected => {
                var debugChannel = bot.getGuild().channels.cache.get(mConst.getChannelConst().test);
                //debugChannel.send("Before checking");
                var dif = Date.now() - target.joinedTimestamp;
                if(!userInfo[target.id].mango) userInfo[target.id].mango = [];
                if(dif <= mConst.getDictionary().mangoinvite && !userInfo[target.id].mango.includes(message.member.id)){
                    //debugChannel.send("Calculating Money");
                    userInfo[target.id].mango.push(message.member.id);
                    var amount1 = getRanInteger(item.value1, item.value2);
                    var amount2 = getRanInteger(item.value7, item.value8);
                    mCommand.addMoney(message.member.id, amount1, true);
                    mCommand.addMoney(target.id, amount2, true);
                    //debugChannel.send("Added Money");
                    await message.channel.send(target.toString() + " đã ăn " + item.name + " " + item.value4 + " của " + message.member.toString() + " mời và nhận được " + amount2 + " " + mConst.getDictionary().currency + ". 😆\n" + message.member.toString() + " cũng nhận được " + amount1 + " " + mConst.getDictionary().currency + " vì sự hiếu khách của mình. 💰");
                    await message.channel.send("https://media.giphy.com/media/SYNa7VWGjR3fsGImhC/giphy.gif");
                }
                else{
                    //debugChannel.send("Nothing");
                    await message.channel.send(target.toString() + " đã ăn " + item.name + " " + item.value4 + " của " + message.member.toString() + " mời và... không có gì xảy ra cả. 😅");
                    await message.channel.send("https://media.giphy.com/media/SYNa7VWGjR3fsGImhC/giphy.gif");
                }
                //debugChannel.send("Finished sending message!\n---------------------\n");
            })
            .catch(async collected => {
                await message.channel.send(message.member.toString() + ", " + target.toString() + " đã không thèm ăn " + item.name + " của bạn. 😟\nXoài của bạn để lâu và bị hỏng, không ăn được nữa.");
            });    
            return;
        }
        else{
            await message.channel.send(message.member.toString() + " đã ăn " + item.name + " " + item.value4 + " và... không có gì xảy ra cả. 😅");
            await message.channel.send("https://media.giphy.com/media/SYNa7VWGjR3fsGImhC/giphy.gif");
        }
    },

    "-1": async function(message, cmd, args, item, member, index){
        const userInfo = mCommand.getUserInfo();
        if(userInfo[message.member.id].spouse){
            await message.channel.send(message.member.toString() + " đã dùng " + item.name + " " + item.value4 + " để khoe rằng mình đã kết hôn. 😆");
            await message.channel.send("https://media.giphy.com/media/7AgFAIy0TOkg92hUWm/giphy.gif");
        }
        else await message.channel.send(message.member.toString() + " đã dùng nhẫn đôi để...? 🤔");
    },

    "-2": async function(message, cmd, args, item, member, index){
        var boms = mCommand.getBomToExplode();
        
        for(var i=0; i<boms.length; i++){
            if(boms[i].value == message.member.id + index){
                await message.channel.send(message.member.toString() + "\"" + item.name + "\" mà bạn đang cầm đã được kích hoạt. Bạn phải dùng lệnh /choitem thay vì là /dungitem.");
                return;
            }
        }

        const userInfo = mCommand.getUserInfo();
        const target = message.mentions.members.first();
        if(!target || target.user.bot || (Date.now() - userInfo[target.id].lastchat > 1800000) || target.roles.cache.has(mConst.getRoleConst().bank)) return;

        var itemID = userInfo[message.member.id].items.splice(index, 1);
        userInfo[target.id].items.push("-3");

        const channel = message.channel;
        const time = item.value7;
        const id = Date.now();
        
        boms.push({
            id: id,
            value: target.id + (userInfo[target.id].items.length-1),
            channel: message.channel.id,
            channelname: message.channel.name,
        });
        var timer = setInterval( async (id) => {
            clearInterval(timer);

            var index = -1;
            for(var i=0; i< boms.length; i++){
                if(boms[i].id == id){
                    index = i;
                    break;
                }
            }

            if(index > -1){
                const memberid = boms[i].value.substring(0, 18);
                var slot = -1;
                for(var i=userInfo[memberid].items.length-1; i>=0; i--){
                    if(userInfo[memberid].items[i] == "-3"){
                        slot = i;
                        break;
                    }
                }
                const member = bot.getGuildMembers().get(memberid);

                var amount = getRanInteger(item.value1, item.value2);
                mCommand.addMoney(memberid, -amount, true);
                
                if(slot > -1) userInfo[memberid].items.splice(slot, 1);
                boms.splice(index, 1);

                var text = "Cứt đã phát nổ! 💥\n" + member.toString() + " nhập viện và phải trả " + amount + " tiền viện phí. 💸";
                await channel.send(text);
                await channel.send("https://media.giphy.com/media/Z3Jz8EyQrQHjwvUezm/giphy.gif");
            }

        }, time, id);

        await channel.send(message.member.toString() + " đã kích hoạt " + item.name + " " + item.value4 + " và đưa cho " + target.toString() + ". 😱");
    },
};

function getRanInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}