

// const APIRootUrl = 'http://47.103.203.188:8000/';
const APIRootUrl = 'http://localhost:8000/';

module.exports = {

    SearchShowUrl: APIRootUrl + 'show/search',
    LoginUrl: APIRootUrl + 'user/usernameLogin',
    LoginTel1Url:APIRootUrl + 'user/telephoneLogin',
    LoginTel2Url:APIRootUrl + 'user/authCodeLogin',
    getAuthCodeUrl: APIRootUrl + 'user/getAuthCode',
    registerUrl: APIRootUrl + 'user/register',
    getUserUrl: APIRootUrl + 'user/info',

    getCategoryListUrl: APIRootUrl + 'category/categoryList',
    getCategoryMapUrl: APIRootUrl + 'category/categoryMap',
    searchUrl: APIRootUrl + 'show/search',

}