const Discord = require('discord.js');
const fs = require('fs');
const jsonfile = require('jsonfile');
const { CreateCanvas, loadImage } = require("canvas");

const bot = new Discord.Client();


const token = 'NzIyNjY4NjE0NjAzMjQzNTIw.Xumbtg.SV6NM4ZV4zYwt7LJqeTvre5ahPU';

const PREFIX = '!';

bot.on('ready', () =>{
    console.log('This bot is online!');
})

bot.on('guildMemberAdd', member =>{
    const channel = member.guild.systemChannel;
    if(!channel) return;

    channel.send(`${member}님 APID에 오신걸 환영합니다. 먼저 규칙부터 확인해주세요.`)
    member.roles.add('714756993117847604');
});


bot.on('guildMemberRemove', member =>{
    const channel = member.guild.systemChannel;
    if(!channel) return;

    channel.send(`${member}님이 APID에서 떠났습니다. ㅠㅠ`)
});

// var here

let servers = {};


bot.on('message', message=>{
    
    function eror(a){
        const erorr = new Discord.MessageEmbed()
        .setTitle('오류 x404')
        .setColor(0xFF0000)
        .setDescription(a);
        message.channel.send(erorr);
    }

    let args = message.content.slice(PREFIX.length).split(' ');
    if(!message.content.startsWith(PREFIX)) return;

    if(!message.guild.id == 714752155377991731) return message.reply("이 봇은 APID에서만 사용가능합니다.");

    switch(args[0]){

        case '정보':
            if(args[1] == '봇'){
                const embed = new Discord.MessageEmbed()
                .setTitle('봇 정보')
                .setColor(0xE62EA3)
                .addField('봇 이름', 'APID - NOCOPYRIGHT')
                .addField('봇 버전', '1.0.0.1')
                .addField('생성 날짜', '2020-04-24');
                message.channel.send(embed);
            }else if(args[1] == '유저'){
                const user = message.mentions.users.first();
                if (user) {
                    const member = message.guild.member(user);
                    if (member) {
                        const embed = new Discord.MessageEmbed()
                        .setTitle('유저 정보')
                        .setColor(0x00FFFF)
                        .addField('유저 이름', member.user.username)
                        .addField('유저 태그', member.user.tag)
                        .addField('유저 아이디 번호', member.user.id)
                        .addField('소속된 서버', message.guild.name)
                        .setThumbnail(member.user.displayAvatarURL())
                        message.channel.send(embed);
                    } else {
                        eror("사용자를 찾을 수 없습니다.");
                    }
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setTitle('유저 정보')
                    .setColor(0x00FFFF)
                    .addField('유저 이름', message.author.username)
                    .addField('유저 태그', message.author.tag)
                    .addField('유저 아이디 번호', message.author.id)
                    .addField('소속된 서버', message.guild.name)
                    .setThumbnail(message.author.displayAvatarURL());
                    message.channel.send(embed);
                }
            }else if(args[1] == '서버'){
                const embed = new Discord.MessageEmbed()
                .setTitle('서버 정보')
                .setColor(0x0000FF)
                .addField('서버 이름', message.guild.name)
                .addField('서버 소유자', message.guild.owner, true)
                .addField('서버 차단된 유저', message.guild.banner,true)
                .addField('서버 창조일', message.guild.createdAt)
                .addField('서버 유저 수', message.guild.memberCount, true)
                .addField('서버 기본 채널', message.guild.systemChannel, true)
                .setThumbnail(message.guild.iconURL());
                message.channel.send(embed);
            }else{
                eror('잘못된 명령, 도움이 필요하시면 !도움말을 입력하세요.');
            }
        break;


        case '차단':
            if(!message.member.hasPermission("VIEW_AUDIT_LOG")) return eror('관리자 권한이 없습니다.')
                const user = message.mentions.users.first();
                if (user) {
                    const member = message.guild.member(user);

                    if (member) {

                        if(member.hasPermission("VIEW_AUDIT_LOG")) return eror('관리자를 차단시킬수는 없습니다.');

                        member.ban({reason : '서비스 이용약관 어김'}).then(() =>{
                            message.channel.send(`${user.tag}님이 이 서버에서 차단당했습니다.`)
                        })
                    } else {
                        eror("사용자를 찾을 수 없습니다.");
                    }
                } else {
                    eror("사용자를 찾을 수 없습니다.");
                }
        break ;


        case '추방':
            if(!message.member.hasPermission("VIEW_AUDIT_LOG")) return eror('관리자 권한이 없습니다.')
                const usser = message.mentions.users.first();
                if (usser) {
                    const member = message.guild.member(usser);

                    if (member) {

                        if(member.hasPermission("VIEW_AUDIT_LOG")) return eror('관리자를 추방시킬수는 없습니다.');

                        member.kick({reason : '서비스 이용약관 어김'}).then(() =>{
                            message.channel.send(`${usser.tag}님이 이 서버에서 추방당했습니다.`)
                        })
                    } else {
                        eror("사용자를 찾을 수 없습니다.");
                    }
                } else {
                    eror("사용자를 찾을 수 없습니다.");
                }
        break ;

        case '도움말':
            const embed = new Discord.MessageEmbed()
            .setTitle('도움말')
            .setColor(0xE62EA3)
            .addField(PREFIX + '`도움말`', '입력 명령을 알려줍니다.', true)
            .addField(PREFIX + '`정보 <봇|유저|서버>`', '정보를 알려줍니다.')
            .addField(PREFIX + '`청소 <1~99>`', '채널의 메세지를 지웁니다.', true)
            .addField(PREFIX + '`차단 <사용자 태그>`', '사용자를 차단합니다.')
            .addField(PREFIX + '`추방 <사용자 태그>`', '사용자를 추방합니다.',true)
            .addField(PREFIX + '`뮤트 <사용자 태그> <시간(초 단위)>`', '사용자를 메세지를 못 보내게 만듭니다.')
            .addField(PREFIX + '`경고 <사용자 태그> <경고 횟수> <이유>`', '사용자를 경고 시킵니다.', true)
            .addField(PREFIX + '`경고-목록 <사용자 태그>`', '경고 횟수를 알려줍니다.');
            message.channel.send(embed);
        break;

        case '뮤트':
            if(!message.member.hasPermission("VIEW_AUDIT_LOG")) return eror('관리자 권한이 없습니다.');

            if(!args[2]) return eror('잘못된 명령, 도움이 필요하시면 !도움말을 입력하세요.');
                const userm = message.mentions.users.first();
                if (userm) {
                    const member = message.guild.member(userm);

                    if (member) {

                        if(member.hasPermission("VIEW_AUDIT_LOG")) return eror('관리자를 뮤트시킬수는 없습니다.');

                        let time = args[2];

                        let muterole = message.guild.roles.cache.find(role => role.name == "Muted");
                        member.roles.add(muterole.id);
                        
                        message.channel.send(`@${member.user.tag}님이 ${time}초동안 뮤트되었습니다.`)

                        setTimeout(function(){
                            member.roles.remove(muterole.id);
                            message.channel.send(`@${member.user.tag}님의 뮤트가 풀렸습니다.`)
                        }, time*1000);

                    } else {
                        eror("사용자를 찾을 수 없습니다.");
                    }
                } else {
                    eror("사용자를 찾을 수 없습니다.");
                }
        break;

        case '경고':

            var gwarns = {};
            if(fs.existsSync('warns.json')){
                gwarns = jsonfile.readFileSync('warns.json');
            }

            //!warn @member <reason>
            if(!message.member.hasPermission("VIEW_AUDIT_LOG")) return eror('관리자 권한이 없습니다.');
            let wUser = message.guild.member(message.mentions.users.first())
            if(!wUser) return eror('사용자를 찾을 수 없습니다.');
            let reason = args[3];

            if(message.guild.id in gwarns === false){
                gwarns[message.guild.id] = {};
            }

            const warns = gwarns[message.guild.id];
            if(wUser.id in warns === false){
                warns[wUser.id] = {
                    warn: 0
                };
            }

            warns[wUser.id].warn = eval(warns[wUser.id].warn) + eval(args[2]);

            jsonfile.writeFileSync('warns.json', gwarns);

            const warnEm = new Discord.MessageEmbed()
            .setTitle('경고')
            .setColor(0xFF6600)
            .addField('```유저```', wUser.user.tag)
            .addField('```경고된 횟수```', args[2])
            .addField('```총 경고 횟수```', warns[wUser.id].warn)
            .addField('```이유```', reason)
            message.channel.send(warnEm);

            if(warns[wUser.id].warn === 3){
                let muterole = message.guild.roles.cache.find(role => role.name == "Muted");
                wUser.roles.add(muterole.id);
                const mwarn = new Discord.MessageEmbed()
                .setTitle(['경고 3회 뮤트알림'])
                .setColor(0x0000FF)
                .setDescription(wUser.user.username + '님이 경고 3회가 넘었습니다. 10분동안 뮤트가 됩니다.')
                message.channel.send(mwarn)
                setTimeout(function(){
                    wUser.roles.remove(muterole.id);
                    message.channel.send(`@${message.author.tag}님의 뮤트가 풀렸습니다.`)
                }, 600000);
            }

            if(warns[wUser.id].warn === 5){
                const mwarn = new Discord.MessageEmbed()
                .setTitle(['경고 5회 차단알림'])
                .setColor(0x0000FF)
                .setDescription(wUser.user.username + '님이 경고 5회가 넘었습니다. 1시간동안 차단이 됩니다.')
                message.channel.send(mwarn)
                warns[wUser.id].warn = 0;
                jsonfile.writeFileSync('warns.json', warns);
                wUser.ban({reason : '경고 5회'})
                setTimeout(function(){
                    message.guild.members.unban(wUser.id)
                }, 3600000);
            }
        break;
        
        case '청소':
            if(!args[1]) return eror('잘못된 명령, 도움이 필요하시면 !도움말을 입력하세요.');
            if(eval(args[1]) > 99) return eror('청소 범위는 1~99로 해주세요.');
            message.channel.bulkDelete(args[1]);
        break;

        case '경고-목록':
            var gwarns = {};
            if(fs.existsSync('warns.json')){
                gwarns = jsonfile.readFileSync('warns.json');
            }

            const wvUser = message.guild.member(message.mentions.users.first())
            if(!wvUser) return eror('사용자를 찾을 수 없습니다.');

            if(message.guild.id in gwarns === false){
                gwarns[message.guild.id] = {};
            }

            const warnz = gwarns[message.guild.id];
            if(wvUser.id in warnz === false){
                warnz[wvUser.id] = {
                    warn: 0
                };
            }

            jsonfile.writeFileSync('warns.json', gwarns);

            const warnEmb = new Discord.MessageEmbed()
            .setTitle('경고-목록')
            .setColor(0xFF6600)
            .addField('```유저```', wvUser.user.tag)
            .addField('```경고 횟수```', warnz[wvUser.id].warn)
            message.channel.send(warnEmb);

        break;
    }
})

bot.on('message', (message) => {
    if (message.content == '$log') {
        console.log(message.guild);
        console.log(message.guild.roles);
        message.channel.bulkDelete(1);
    }

    if (message.content == '$re') {
        console.log('rebooting ...');
        message.channel.bulkDelete(1);
        setTimeout(function(){maownALJKLWJv ;a3h4.bnkbj}, 1000);
    }
})

bot.on('message', (message) => {

    function bad(){
        message.channel.bulkDelete(1);
        var gwarns = {};
        if(fs.existsSync('warns.json')){
            gwarns = jsonfile.readFileSync('warns.json');
        }
        let wUser = message.member;

        let reason = '욕설';

            if(message.guild.id in gwarns === false){
                gwarns[message.guild.id] = {};
            }

            const warns = gwarns[message.guild.id];
            if(message.author.id in warns === false){
                warns[message.author.id] = {
                    warn: 0
                };
            }

            warns[wUser.id].warn = warns[wUser.id].warn + 1;

            jsonfile.writeFileSync('warns.json', gwarns);

            const warnEm = new Discord.MessageEmbed()
            .setTitle('경고')
            .setColor(0xFF6600)
            .addField('```유저```', wUser.user.tag)
            .addField('```경고 횟수```', warns[wUser.id].warn)
            .addField('```이유```', reason)
            message.channel.send(warnEm);

            if(warns[wUser.id].warn === 3){
                let muterole = message.guild.roles.cache.find(role => role.name == "Muted");
                wUser.roles.add(muterole.id);
                const mwarn = new Discord.MessageEmbed()
                .setTitle(['경고 3회 뮤트알림'])
                .setColor(0x0000FF)
                .setDescription(wUser.user.username + '님이 경고 3회가 넘었습니다. 10분동안 뮤트가 됩니다.')
                message.channel.send(mwarn)
                setTimeout(function(){
                    wUser.roles.remove(muterole.id);
                    message.channel.send(`@${message.author.tag}님의 뮤트가 풀렸습니다.`)
                }, 600000);
            }
            if(warns[wUser.id].warn === 5){
                const mwarn = new Discord.MessageEmbed()
                .setTitle(['경고 5회 차단알림'])
                .setColor(0x0000FF)
                .setDescription(wUser.user.username + '님이 경고 5회가 넘었습니다. 1시간동안 차단이 됩니다.')
                message.channel.send(mwarn)
                warns[wUser.id].warn = 0;
                jsonfile.writeFileSync('warns.json', warns);
                wUser.ban({reason : '경고 5회'})
                setTimeout(function(){
                    message.guild.members.unban(wUser.id)
                }, 3600000);
            }
    }

    bau = ["ㅁㅊ", "ㅅ", "씨발", "시", "발", "ㅅㅂ", "시발", "병신", "병", "개새끼", "새끼", "애미", "신", "^^ㅣ발", "^ㅣ발", "tlqkf", "ㅗ", ":middle_finger:", ":middle_finger: ", "씨바", "슈발"]

    if(message.content == bau[0] || message.content == bau[1] || message.content == bau[2]) {
        bad()
    }
    if(message.content == bau[3] || message.content == bau[4] || message.content == bau[5]) {
        bad()
    }
    if(message.content == bau[6] || message.content == bau[7] || message.content == bau[8]) {
        bad()
    }
    if(message.content == bau[9] || message.content == bau[10] || message.content == bau[11]) {
        bad()
    }
    if(message.content == bau[12] || message.content == bau[13] || message.content == bau[14]) {
        bad()
    }
    if(message.content == bau[15] || message.content == bau[16] || message.content == bau[17]) {
        bad()
    }
    if(message.content == bau[18] || message.content == bau[19] || message.content == bau[20]) {
        bad()
    }
})

bot.login(token);
