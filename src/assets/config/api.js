

// const APIRootUrl = 'http://47.103.203.188:8000/';
const APIRootUrl = 'http://localhost:8000/';

module.exports = {

    SearchShowUrl: APIRootUrl + 'show/search',
    LoginUrl: APIRootUrl + 'user/usernameLogin',
    getAuthCodeUrl: APIRootUrl + 'user/getAuthCode',
    registerUrl: APIRootUrl + 'user/register',
}