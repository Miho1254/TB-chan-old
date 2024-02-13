module.exports = { checkCondtion };

function checkCondtion(message, cmd, args, con){
    if((con.channel.length != 0 && !con.channel.includes(message.channel.id)) || con.eChannel.includes(message.channel.id))
        return false;

    if((con.role.length != 0 && !hasRole(message.member, con.role)) || hasRole(message.member, con.eRole))
        return false;

    if((con.permission.length != 0 && !message.member.hasPermission(con.permission)) || (con.ePermission.length != 0 && message.member.hasPermission(con.ePermission)))
        return false;

    return true;
}

function hasRole(member, roleList){
    for(var i=0; i<roleList.length; i++){
        if(member.roles.cache.has(roleList[i]))
            return true;
    }
    return false;
}