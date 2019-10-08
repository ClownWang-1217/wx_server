var express = require('express')
var app = express()
var parseString = require('express-xml-bodyparser');
var bodyParser = require('body-parser')
var crypto = require('crypto');
var https = require('./https')
// create application/json parser
app.use(bodyParser.json())
app.use(parseString())
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', function (req, res) {
    var token = 'wtwx'
    var timestamp = req.query.timestamp
    var nonce = req.query.nonce
    var signature = req.query.signature
    var echostr = req.query.echostr
    console.log('token>>>>' + token + '\n' + 'timestamp>>>>' + timestamp + '\n' + 'nonce>>>>' + nonce + '\n' + 'signature>>>>' + signature)

    var arr = [token, timestamp, nonce]
    console.log('arr.tostring' + arr.toString())
    arr = arr.sort()
    console.log('arr.sort.tostring' + arr.toString())
    var newArr = ''
    for (const iterator of arr) {
        newArr += iterator
    }
    console.log('newArr' + newArr)
    console.log('signature' + signature)
    console.log('sha1(newArr)' + sha1(newArr))
    if (signature == sha1(newArr)) {
        res.send(echostr)
    }
})

app.post('/', function (req, res) {

    var msg=''
    var MsgType = req.body.xml.msgtype
    var ToUserName = req.body.xml.tousername
    var FromUserName = req.body.xml.fromusername
    var CreateTime = req.body.xml.createtime
    console.log(MsgType.toString())
    if (MsgType.toString() === 'text')//文字消息
    {     
        msg = "<xml>\
                    <ToUserName><![CDATA["+ FromUserName + "]]></ToUserName> \
                    <FromUserName><![CDATA["+ ToUserName + "]]></FromUserName>\
                    <CreateTime>"+ CreateTime +"</CreateTime>\
                    <MsgType><![CDATA["+ MsgType +"]]></MsgType>\
                    <Content><![CDATA["+ req.body.xml.content + "]]></Content>\
                    <MsgId>1234567890123456</MsgId>\
                </xml>"
                        
    }
    else if (MsgType.toString() === 'image')//图片消息
    {
        msg = "<xml>\
        <ToUserName><![CDATA["+ FromUserName + "]]></ToUserName>\
        <FromUserName><![CDATA["+ ToUserName + "]]></FromUserName>\
        <CreateTime>"+ CreateTime +"</CreateTime>\
        <MsgType><![CDATA["+ MsgType +"]]></MsgType>\
        <Image>\
          <MediaId><![CDATA[" + req.body.xml.mediaid + "]]></MediaId>\
        </Image>\
      </xml>"

    }
    else if(MsgType.toString() === 'event')
    {

    }

    console.log(msg)
    //var accesstoken = https.get_access_token()
    //https.get_create_main_menu()
    //https.get_create_main_menu_wxAPI()
    res.send(msg)
})

function sha1(str) {
    return crypto.createHash('sha1').update(str).digest('hex');
}
app.listen(80, function (err) {
    console.log('listening...')
})