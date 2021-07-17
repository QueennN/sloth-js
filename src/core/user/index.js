module.exports = async function(ctx){
    ctx.rule("check_auth", require("./rule/check_auth"));
    ctx.rule("has_pwemail", require("./rule/has_pwemail"));
    //ROLES
    ctx.role("loggedin", require("./role/loggedin"));
    ctx.role("everybody", require("./role/everybody"));
    ctx.role("nobody", require("./role/nobody"));
    ctx.role("system_admin", require("./role/system_admin"));
    ctx.role("system", require("./role/system"));
}