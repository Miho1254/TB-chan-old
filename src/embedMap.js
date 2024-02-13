module.exports = { getEmbedMap, getConditions, getNonCommandEmbedMap };

const bot = require("./bot.js");
const mLevel = require("./level.js");
const mConst = require("./const.js");
const mURL = require("./commands.js");
const checkCondtion = require("./condition.js").checkCondtion;

var commandList = {
    yandere: "yandere",
    cat: ":3",
    pacman: ":v",
    no: "no",
    loli: "loli",
    fbi: "fbi",
    die: "die",
    nohorny: "nohorny",
    vaichuong: "vaichuong",
    mlem: "mlem",
    what: "what",
    nhahaha: "nhahaha",
    hawawa: "hawawa",
    ohno: "ohno",
    hmm: "hmm",
    stalk: "rinhrap",
    hug: "om",
    kiss: "kiss",
    pat: "xoadau",
    lick: "liem",
    punch: "dam",
}

var commandInstructions = {
    hug: " <ngườibịôm> <ngườiôm>"
    ,kiss: " [ngườibịkiss] <ngườikiss>"
    ,stalk: " <ngườimuốnrìnhrập>"
    ,pat: " <ngườimuốnxoađầu>"
    ,lick: " <ngườimuốnliếm>"
    ,punch: " <ngườimuốnđấm>"
}

function getConditions(){
    const roles = require("./const.js").getRoleConst();

    var commandConditions = {};

    commandConditions[commandList.hug] = {
        channel: [],
        role: [roles.friend, roles.closeFriend, roles.lover, roles.spouse, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.kiss] = {
        channel: [],
        role: [roles.friend, roles.closeFriend, roles.lover, roles.spouse, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.stalk] = {
        channel: [],
        role: [roles.friend, roles.closeFriend, roles.lover, roles.spouse, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.pat] = {
        channel: [],
        role: [roles.friend, roles.closeFriend, roles.lover, roles.spouse, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.lick] = {
        channel: [],
        role: [roles.friend, roles.closeFriend, roles.lover, roles.spouse, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    commandConditions[commandList.punch] = {
        channel: [],
        role: [roles.friend, roles.closeFriend, roles.lover, roles.spouse, roles.dev],
        permission: [],
        eChannel: [],
        eRole: [],
        ePermission: []
    };

    return commandConditions;
 }

function getNonCommandEmbedMap(){
    embedMap = new Map();

    embedMap.set("intro", {
        text: "Mình là Tóc Bạc-chan, được tạo bởi papa <0>.\nNhiệm vụ của mình là phục vụ và chơi cùng với các bạn. Nếu cần thì hãy gọi mình nhé!\nĐể tìm hiểu thêm cách gọi mình, các bạn có thể dùng lệnh \"/xemthem\" và \"//xemthem\"."
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3fIilBVfcNGnws1zwYnkZl966DG-gZKo1b12CpfFj0IyIJWwT3HxPzZzzES8iQm6zOUHUUfUKrCSD3W_NokPKeTk9WTAAAT2gRTDJ4hv6D_7uFquNvicjGLYXCq7D8poaIOhJGksscr0ie5QQc-LUZF=s846-no?authuser=0"]
        ,getText: function(kami){
            return this.text.replace("<0>", kami.toString());
        }
    });

    embedMap.set("join", {
        text: "<0> đã tham gia <1>!"
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3eAILVjk0WkzGLuND3xyGRa7K3Efjc8ffWj-27PanzbQvqIknQ_pn-rw23GrpegDa6iocflf66cLChkkHc66Obg0APisWpOugo8208vkZbPVyk7gSS2NO6Vxb4lZnkkZNuCR5q-9g8lJepdV-yoQWe4=s762-no?authuser=0"]
        ,getText: function(member){
            return this.text.replace("<0>", member.toString()).replace("<1>", member.guild.name);
        }
    });

    embedMap.set("leave", {
        text: "<0> đã rời <1>..."
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3emL2WpJmAphGiJBUu2m16lJJlXVJN27M44j5cA2MVGel4-DIgt_INrU-N03SmPnqbbQ7a4moi6zfvi-6xiyLBCikstartHnDaJL5tcOqFD0r2dpfFtecRETUrXFbAlduFejsJBLyFZoNCffimAWbE9=s834-no?authuser=0"]
        ,getText: function(member){
            return this.text.replace("<0>", member.toString()).replace("<1>", member.guild.name);
        }
    });

    embedMap.set("morning", {
        text: [
            "Chào buổi sáng!\nChúc mọi người có một ngày tốt lành! ☀️"
            ,"Chào buổi sáng mọi người!\nHãy tận hưởng ngày mới một cách vui vẻ nhất nhé! ✨"
            ,"Ohayou mọi người!\nMình cảm thấy hôm nay các bạn sẽ gặp khá nhiều may mắn đấy! 🌟"
        ]
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3f5ZZoMBJ2ZbRDbTVqep_r0SX8nFI75eHDXINCtm85DfcQMaa8T1w0FnSkbIDUygoLzfTHsxgbS8MN_uYNLDdR2dH2kmIh13EFIuCcv8VKH-sIsEhFLH9FZQiBaEZJZ1nt5AgCHk5S0cb64fBnYa5FH=s868-no?authuser=0"]
        ,getText: function(args){
            //return this.text(args);
            return this.text[Math.floor((Math.random()*this.text.length))];
        }
    });

    embedMap.set("night", {
        text: [
            "Tối rồi, chúc các bạn ngủ ngon nhé! 😴"
            ,"Buổi tối chúc các bạn ngủ ngon. 🌙\nMong rằng các bạn nằm mơ thấy mình >///<"
            ,"Chào buổi tối! Bạn nào buồn ngủ thì hãy ngủ đi nhé. 🥱\nĐừng thức khuya nhiều, ảnh hưởng xấu đến sức khỏe lắm đấy."
        ]
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3cfw2i3a37ms7neY-xo3-NJYdJroMqslraj0NAQLGYQpecZd3ms-SSeVeLaOVJ1WxJaSDzqck_JA6_OShCHtreoaGzJTOpzBb7GxIFBWTrK31VE6szrPlypgtlm8bSyhLEjb0WuVCK_WSko9LfpuVA7=s823-no?authuser=0"]
        ,getText: function(args){
            //return this.text(args);
            return this.text[Math.floor((Math.random()*this.text.length))];
        }
    });

    embedMap.set("getTopFan", {
        text: "Xin chúc mừng <0> đã trở thành Fan Cứng!"
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3eo9UEd-Fm9E2k3nqJS4T7RkX1CWWfZ-Oa0_WAKsEJ0wKe4y9obpT6TAwNSBhMBj4_In3LADozvt7p1XoVbu7Uh2GW8JcDyoJuz6PjwZ4V7hBbNjUSuOsCdWVeQDpuH_gEybt2lWjd2z_HR1BYeJ5q-=s868-no?authuser=0"]
        ,getText: function(member){
            return this.text.replace("<0>", member.toString()).replace("<1>", member.guild.name);
        }
    });

    embedMap.set("looseTopFan", {
        text: "<0> đã mất danh hiệu Fan Cứng..."
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3emL2WpJmAphGiJBUu2m16lJJlXVJN27M44j5cA2MVGel4-DIgt_INrU-N03SmPnqbbQ7a4moi6zfvi-6xiyLBCikstartHnDaJL5tcOqFD0r2dpfFtecRETUrXFbAlduFejsJBLyFZoNCffimAWbE9=s834-no?authuser=0"]
        ,getText: function(member){
            return this.text.replace("<0>", member.toString());
        }
    });

    embedMap.set("becomeSpouse", {
        text: "<0>, mình yêu bạn nhiều lắm! Chúng ta kết hôn đi!"
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3euvrapIUnZRMr4r3KGsjRZRcTcDuDIUzV9HBX_SZ7Ng09eYVfNg6VdAacCJ-kQ2g1Q1Q5H7OnhPH0jKFFK1oY1RSkOdQOTTYU6uXg8XCsq_63lLoU47gvZBnk_c-1R1yQ9q9P0ixr3Qdq3l8Oc7a9-=s726-no?authuser=0"]
        ,getText: function(member){
            return this.text.replace("<0>", member.toString());
        }
    });

    embedMap.set("becomeLover", {
        text: "<0>, ưm... mình thích bạn... làm người yêu mình nhé... >///< "
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3cFrb0UsXrB3imt08lCdAIQFsvrDVjulPP0ve9XpuviB3XyuSpzLFYPfvJvTkSn8fuY4ET5hQeQ6R4_t9jZ90kqj1gE9nQ4WvWnVpThulIndf5awhEJZzS9RvIJW36jc-4QN3c5Yif-lcABh-OrO9XP=s868-no?authuser=0"]
        ,getText: function(member){
            return this.text.replace("<0>", member.toString());
        }
    });

    embedMap.set("becomeClose", {
        text: "<0>, mình khá thích bạn rồi đấy. Chúng ta sẽ là bạn thân của nhau nhé!"
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3e5BjNUB9hfvBbljat__sVLdWtCPFflnfpDGdOgC_7gENLcmOePvmSCwcCqkBvMf7VtlLbh8kUdHvKNi3LEhYYv7NCvOMIL_n1Poxa1GxX5sF1Z-LUkqrjpR__vop1bzqnRmlu8OSx4wnmX8qxjmKB8=s868-no?authuser=0"]
        ,getText: function(member){
            return this.text.replace("<0>", member.toString());
        }
    });

    embedMap.set("becomeFriend", {
        text: "<0>, mình thấy bạn khá thú vị, làm bạn với mình nhé!"
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3eo9UEd-Fm9E2k3nqJS4T7RkX1CWWfZ-Oa0_WAKsEJ0wKe4y9obpT6TAwNSBhMBj4_In3LADozvt7p1XoVbu7Uh2GW8JcDyoJuz6PjwZ4V7hBbNjUSuOsCdWVeQDpuH_gEybt2lWjd2z_HR1BYeJ5q-=s868-no?authuser=0"]
        ,getText: function(member){
            return this.text.replace("<0>", member.toString());
        }
    });

    embedMap.set("downLover", {
        text: "Dạo này bạn chẳng thèm quan tâm mình nhiều.\nMình cảm thấy chúng ta không còn thân thiết với nhau lắm..."
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3fE_HDAgw2e1wgLKcTL-q519CMepL98EEGo1uQt_cUskGmWuYYWy5YZbahevml-9Du7NEbISzuuaw4iuvZv9SVmC11OcMpHsmC-3ZO9zG-qhil-HkcVfAk_xd1puKrPQGXejQkesiF9bAYNRLyl0IYb=s712-no?authuser=0"]
        ,getText: function(member){
            return this.text;
        }
    });

    embedMap.set("downClose", {
        text: "Dạo này bạn chẳng thèm quan tâm mình nhiều.\nMình cảm thấy chúng ta không còn thân thiết với nhau lắm..."
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3fE_HDAgw2e1wgLKcTL-q519CMepL98EEGo1uQt_cUskGmWuYYWy5YZbahevml-9Du7NEbISzuuaw4iuvZv9SVmC11OcMpHsmC-3ZO9zG-qhil-HkcVfAk_xd1puKrPQGXejQkesiF9bAYNRLyl0IYb=s712-no?authuser=0"]
        ,getText: function(member){
            return this.text;
        }
    });

    embedMap.set("downFriend", {
        text: "Dạo này bạn chẳng thèm quan tâm mình nhiều.\nMình cảm thấy chúng ta không còn thân thiết với nhau lắm..."
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3fE_HDAgw2e1wgLKcTL-q519CMepL98EEGo1uQt_cUskGmWuYYWy5YZbahevml-9Du7NEbISzuuaw4iuvZv9SVmC11OcMpHsmC-3ZO9zG-qhil-HkcVfAk_xd1puKrPQGXejQkesiF9bAYNRLyl0IYb=s712-no?authuser=0"]
        ,getText: function(member){
            return this.text;
        }
    });


    embedMap.set("save", {
        text: "Mình đi vệ sinh một chút nhé, các bạn đừng có nhìn lén đấy >///<"
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3d7Kdko4ZoODYZ8Nxe_v04zo0GsVSoG0-q7l5R5HG0yCpw5ChWxonO26QZwBjwnSER5SY8hGIKVRYh7zq9bXGh9yt6MQKjV-8McTu9gM4OUv4IWW-DhmB0lO6c1B7g2Lsq3bg6_Q7kqY4XCheWzyoCE=s804-no?authuser=0"]
        ,getText: function(member){ return this.text; }
    });

    embedMap.set("savefinished", {
        text: "Mình đã trở lại rồi đây 😆"
        ,color: "#bee8f6"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3eAILVjk0WkzGLuND3xyGRa7K3Efjc8ffWj-27PanzbQvqIknQ_pn-rw23GrpegDa6iocflf66cLChkkHc66Obg0APisWpOugo8208vkZbPVyk7gSS2NO6Vxb4lZnkkZNuCR5q-9g8lJepdV-yoQWe4=s762-no?authuser=0"]
        ,getText: function(member){ return this.text; }
    });

    return embedMap;
}

function getEmbedMap(){
    embedMap = new Map();
    
    embedMap.set("xemlenh", {
        getText: function(message, cmd, args){
            var text = "danh sách các lệnh gọi meme bạn có thể dùng:";
            const conditions = getConditions();
            for(var prop in commandList)
            {
                if(!conditions[commandList[prop]] || checkCondtion(message, cmd, args, conditions[commandList[prop]])){
                    text += "\n//" + commandList[prop];
                    if(commandInstructions[prop])
                        text += commandInstructions[prop];
                }
            }
            text += "\n** Chú thích: [tham số bắt buộc], <tham số tùy ý>"
            message.reply(text);
            return "::abort";
        }
    });

    embedMap.set(commandList.yandere, {
        text: ""
        ,color: "#f9b8ce"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3eKchdG4MFfqYbPaphvf1zp6p924N2iiMkgIvdTr5c6wtWBUDXN2u2oKeTB0g7LqEXZSY9sh0VBC6rhkR54HvnQG0DlqGKhrhR8FPSANbNlC8AUV2CK7_InoJwF5kX9pPoaKup0kQ3xu1OEqKdUxV6B=s500-no?authuser=0"]
        ,getText: function(){ return this.text; }
    });
    
    embedMap.set(commandList.hug, {
        text: "<0> ôm <1> ♪"
        ,color: "#f9b8ce"  
        ,url: ["https://media.giphy.com/media/SzpG9N8KJIdnn6EOe2/giphy.gif"
                ,"https://media.giphy.com/media/jl2oHcIbiIhcQZwLCe/giphy.gif"
        ]
        ,getText: function(message, cmd, args){
            if(args.length == 0)
                return this.text.replace("<0>", message.member.toString()).replace("<1>", "không khí...");
            else if(args.length == 1)
            {
                if(args[0].indexOf(bot.getBotID()) > -1){
                    bot.interactBot(message, cmd, args, mConst.getEXPConst().unit, ["💖"]);
                    return this.text.replace("<0>", message.member.toString()).replace("<1> ♪", "mình 😇");
                }
                else return this.text.replace("<0>", message.member.toString()).replace("<1>", args[0]);
            }
            else return this.text.replace("<0>", args[1]).replace("<1>", args[0]);
        }
    });

    embedMap.set(commandList.cat, {
        text: ""
        ,color: "#d9a981"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3eOcFEcm9Ck8xHpXuvrCidcC4ZfVF5lwAK_TSMWunIBTOIoR9QETRSy7LuGRA7RDPsQJXZjQJQrZCqvvRp3uJ2YednTn5YFFjc37gj9dI2nJdkTKQkAi-4N-ajQV-TTPUTpGFW0iNQY82BjyjA8tGxH=w935-h859-no?authuser=0"]
        ,getText: function(){ return this.text; }
    });

    embedMap.set(commandList.pacman, {
        text: ""
        ,color: "#fff156"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3dXZxhLkp5eMedX2XLI7_FqlWoB4xUtscGgwNefhv-NB1iHc0eNIgyG_oE2Jq-BtKLej2hVWfIo6OiQzpMuzpqw5gAPVwwy9WPib7Xa5MpZ1WD1LrxJDAifLY79RcEjhqN8hpVSWY2ceqSTiNLSBNmC=w1068-h720-no?authuser=0"]
        ,getText: function(){ return this.text; }
    });

    embedMap.set(commandList.no, {
        text: ""
        ,color: "#fffffe"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3f5Fcrm91SkZiV6CxnGCFhW9KVr-eM16DgU4uOAqH_4xwykYAcmEq-61qE_nTjBeMuSyN6woCZDsvYWKWZysajHWtjGJM5vwod89yMiHDGoC8I0zQP0VWzTSxy19N7wQ6lGQ9-NdPssrMS36iCytA1t=w433-h364-no?authuser=0"]
        ,getText: function(){ return this.text; }
    });

    embedMap.set(commandList.loli, {
        text: ""
        ,color: "#ff0006"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3dWyOSFb_UnJFy5MNistoA5wW1qDUeOWFxSy2ASp4uH7473Jc8lK6aqCiYZm_nubVEIyXULKWCYNKGqv75EZ0640OS5pSjTshj6NkdeGSCT4kMwdKt7cDNHev5jcgakDOVqzVWGpj1XEZdRUfi_WaF-=w1280-h720-no?authuser=0"
            ,"https://lh3.googleusercontent.com/pw/ACtC-3d94kPMH373pb2YdTN6lbX4cumhdPCpOZOYzyetDgIUvqawuYydFHXywdC9UK3NBHb66IZTLANPC8sOEGT2vhStBJoXQfM_cm1UFnMaj42jhs01NHOJb4dQh2o_x_sN37o44jEyIO16Z_-dMdsankvS=w600-h847-no?authuser=0"
            ,"https://lh3.googleusercontent.com/pw/ACtC-3dCe6r4QmHzkNFNZsLIaZAzGN5xo6T519EHQp2q0_mH5aN9I7oOuoabk4Ss3iGg_IFt6Cx1J-AyQ3jjDtGnq9cU9Jb8T9K_N2-BqqLzPK24GW5l9IC6kdSnzm-jGWLJANY4i9Ad-5xa2eq4VtRgAYT9=w1538-h868-no?authuser=0"
        ]
        ,getText: function(){ return this.text; }
    });

    embedMap.set(commandList.fbi, {
        text: ""
        ,color: "#ff0000"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3eYXNH-J46G7se9ZgHCtcjGBirbcgiE5TSszMKUhGDpcl8D2yM2QxBH6UXDY_NzccEtVZJBlnO0uCa-f_yjZXtivEJ5WaMwLxxgISxOKx425fgeAdMmplOu14cqy5GndSYPr0wF2aDU3q2JLJFhwgVL=s480-no?authuser=0"]
        ,getText: function(){ return this.text; }
    });

    embedMap.set(commandList.die, {
        text: ""
        ,color: "#000000"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3cnSonSzHfie5e8DV0ZeNV58hm8iX1HdO1qeCQusnVcfkOtAr_6ULV0SoWEQx7iukEW6_8uEnbdvgcT35CV-ltxzsMOCQpsHL6h8d4fd9xX9Hxn8y_ThXRJAM67VQhFRFdoRYK5n_9YzSm2toQgUPpC=w920-h551-no?authuser=0"]
        ,getText: function(){ return this.text; }
    });

    embedMap.set(commandList.nohorny, {
        text: ""
        ,color: "#ff0000"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3cWHomGeqmj_0kiXtgR300nJ1xQzO87H4T83Nh0HgwEVtPrTb3k5StlqmJM8ycMkGRZAwMXp70HzvGW6Tlf9Of7v8uWErI-ZM9CAIXuBL42oJi8WEwfy2cq_XgzxKhu4Q4GdH-vfyUYc_ezV5JxU_ty=w721-h593-no?authuser=0"]
        ,getText: function(){ return this.text; }
    });

    embedMap.set(commandList.vaichuong, {
        text: ""
        ,color: "#fef1a2"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3cIRJQt0PKWOIkwYFG4udFWSQ-Gcn06VGkC1p9DGL8_qs7wSZh0-VmV1oHWAqpbwExRNOCXsU7LqCM5dXp5E5gmdUOozplO0hSlxJhI_5qrLVlauISB3b4pBm3aj7RbIqQ0vTM1vsOYP9Xdq0FcLHbn=w480-h339-no?authuser=0"]
        ,getText: function(){ return this.text; }
    });

    embedMap.set(commandList.vaichuong, {
        text: ""
        ,color: "#fef1a2"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3cIRJQt0PKWOIkwYFG4udFWSQ-Gcn06VGkC1p9DGL8_qs7wSZh0-VmV1oHWAqpbwExRNOCXsU7LqCM5dXp5E5gmdUOozplO0hSlxJhI_5qrLVlauISB3b4pBm3aj7RbIqQ0vTM1vsOYP9Xdq0FcLHbn=w480-h339-no?authuser=0"]
        ,getText: function(){ return this.text; }
    });

    const url = mURL.getURLs();
    for(var i in url){
        embedMap.set(i, {
            text: ""
            ,color: "#bee8f6"  
            ,url: url[i]
            ,getText: function(){ return this.text; }
        });
    }

    embedMap.set(commandList.stalk, {
        text: "<0> đang rình rập <1>"
        ,color: "#542007"  
        ,url: ["https://lh3.googleusercontent.com/pw/ACtC-3ctDTzKh98XHwsANwPjpiTt5mrMUI9tT__TtpnI8lRr4OEJZrBflAx6WTSm3w-5s5QF4PHEaiy8pEsgcf_tmEC2DOnOVqqxRSkVHA8Pa-fuwBFrZtgYDZVd_hdruS_tGxS0r2m79gxqCEHdjdF3LwpJ=w954-h868-no?authuser=0"]
        ,getText: function(message, cmd, args){
            if(args.length == 0) return "";
            else {
                if(args[0].indexOf(bot.getBotID()) > -1){
                    return this.text.replace("<0>", message.member.toString()).replace("<1>", "mình... 😅");
                }
                else return this.text.replace("<0>", message.member.toString()).replace("<1>", args[0]);
            }
        }
    });

    embedMap.set(commandList.mlem, {
        text: ""
        ,color: "#fef1a2"  
        ,url: ["https://media.giphy.com/media/IkOAnM4VFTRon1DV2m/giphy.gif"]
        ,getText: function(){ return this.text; }
    });

    embedMap.set(commandList.kiss, {
        text: "<0> kissed <1> ♪"
        ,color: "#f9b8ce"  
        ,url: ["https://media.giphy.com/media/NBxTumpKloCm3ukXxm/giphy.gif"
            ,"https://cdn.weeb.sh/images/ryceu6V0W.gif"
        ]
        ,getText: function(message, cmd, args){
            if(args.length == 0) return "::abort";
            else if(args.length == 1)
            {
                if(args[0].indexOf(bot.getBotID()) > -1){
                    bot.interactBot(message, cmd, args, mConst.getEXPConst().unit, ["💖"]);
                    return this.text.replace("<0>", message.member.toString()).replace("<1> ♪", "ưm... hưm... >///<");
                }
                else return this.text.replace("<0>", message.member.toString()).replace("<1>", args[0]);
            }
            else return this.text.replace("<0>", args[1]).replace("<1>", args[0]);
        }
    });

    embedMap.set(commandList.pat, {
        text: "<0> xoa đầu <1> ♪"
        ,color: "#fa82ff"  
        ,url: ["https://media.giphy.com/media/ZFava2DQKJ9AzeBkP4/giphy.gif"
            ,"https://media.giphy.com/media/lbqVpkqcaTCTbbY6L1/giphy.gif"
            ,"https://media.giphy.com/media/LUt7YUfIFDsY8KiEUJ/giphy.gif"
        ]
        ,getText: function(message, cmd, args){
            if(args.length == 0) return "";
            else {
                if(args[0].indexOf(bot.getBotID()) > -1){
                    bot.interactBot(message, cmd, args, mConst.getEXPConst().unit, ["💖"]);
                    return this.text.replace("<0>", message.member.toString()).replace("<1> ♪", "mình 😆");
                }
                else return this.text.replace("<0>", message.member.toString()).replace("<1>", args[0]);
            }
        }
    });

    embedMap.set(commandList.lick, {
        text: "<0> đang liếm <1> ♪"
        ,color: "#fa82ff"  
        ,url: ["https://media.giphy.com/media/FaRNtCeJGWbL1GnCZ3/giphy.gif"
            ,"https://media.giphy.com/media/16oW4lRivMJ4UdIebl/giphy.gif"
            ,"https://media.giphy.com/media/2WiWc602qepgAv0gBY/giphy.gif"
        ]
        ,getText: function(message, cmd, args){
            if(args.length == 0) return "";
            else {
                if(args[0].indexOf(bot.getBotID()) > -1){
                    bot.interactBot(message, cmd, args, mConst.getEXPConst().unit, ["💖"]);
                    return this.text.replace("<0>", message.member.toString()).replace("<1> ♪", "mình... 🥴");
                }
                else return this.text.replace("<0>", message.member.toString()).replace("<1>", args[0]);
            }
        }
    });

    embedMap.set(commandList.punch, {
        text: "<0> đấm <1>"
        ,color: "#ff0003"  
        ,url: ["https://media.giphy.com/media/8zd98LOgMfsmu71IK2/giphy.gif"]
        ,getText: function(message, cmd, args){
            if(args.length == 0) return "";
            else{
                if(args[0].indexOf(bot.getBotID()) > -1){
                    bot.interactBot(message, cmd, args, -mConst.getEXPConst().unit, [], "");
                    mLevel.addBotEXP(message.member, -mConst.getEXPConst().unit * 5, message, true);
                    message.react("💔");
                    return this.text.replace("<0>", message.member.toString()).replace("<1>", "mình T_T");
                }
                else return this.text.replace("<0>", message.member.toString()).replace("<1>", args[0]);
            }
        }
    });

    return embedMap;
}

