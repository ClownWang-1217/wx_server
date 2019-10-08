
module.exports = {


    // get_access_token: function () {
    //     var https = require('https')

    //     const options = {
    //         hostname: 'api.weixin.qq.com',
    //         port: 443,
    //         path: '/cgi-bin/token?grant_type=client_credential&appid=wx87744409bc055b8f&secret=90d79f3095775df1fbf9a7c6ecb4a2e3',
    //         method: 'GET'
    //     };

    //     const req = https.request(options, (res) => {
    //         console.log('状态码:', res.statusCode);
    //         console.log('请求头:', res.headers);

    //         res.on('data', (d) => {
    //             console.log('access_token:', JSON.parse(d)['access_token'])
    //             return JSON.parse(d)['access_token']
    //         });
    //     });

    //     req.on('error', (e) => {
    //         console.error(e);
    //     });
    //     req.end()
        
    // },

    // get_create_main_menu: function () {
    //     var https = require('https')   
    //     var stringify_body = JSON.stringify(require("./wx_menu/wx_menu.json"))   
    //     console.log("stringify_body.length>>>>>>>>>>>>>>>>"+stringify_body.length)
    //     var url = 'api.weixin.qq.com/cgi-bin/menu/create?access_token=24_J63EGGgPyffkZmKehhPUZmtycYvgzH5j3ZTsGGEQ0dJAsULzgm3s-RSWdUh_5apI9oazcKIhgoyZsMczgdouYgThkqNKQhO1SrPHU_z6su5FltbTCxhnVxoYBOqRlQRezYrej84aqfkWvWa-MOKaAGAACY'
    //     var content = {
    //         dataType: 'json',
    //         type: 'POST',
    //         data: stringify_body,
    //         headers: {
    //           'Content-Type': 'application/json'
    //         }
    //       }
    //     this.request(url,content,(data,res)=>{
    //         console.log(data)
    //     })

    // },

    //修改菜单栏
    get_create_main_menu_wxAPI:function()
    {
        var config = require('./config/config')
        var API = require('wechat-api')


        var api = new API(config.appid, config.appsecret); 
        //获取token验证
        api.getAccessToken(function (err, token) {  
            console.log(err);  
            console.log(token);  //accessToken
        });  

        var menu = JSON.stringify(require('./wx_menu/wx_menu.json'));  
        api.createMenu(menu, function (err, result) {  
            console.log(result); // { errcode: 0, errmsg: 'ok' }
        });
    }

}
