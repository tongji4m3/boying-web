

const APIRootUrl = 'http://47.103.203.188:8000/';
// const APIRootUrl = 'http://localhost:8000/';

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
    getCategoryNameUrl: APIRootUrl + 'category/categoryName',
    searchUrl: APIRootUrl + 'show/search',

    // 个人信息
    getUserInfoUrl: APIRootUrl + 'user/info',
    updateUserInfoUrl: APIRootUrl + 'user/update',
    // 收货地址
    getAddressListUrl: APIRootUrl + 'address/list',
    getAddressUrl: APIRootUrl + 'address',
    getDefaultAddressUrl: APIRootUrl + 'address/getDefault',
    addAddressUrl: APIRootUrl + 'address/add',
    deleteAddressUrl: APIRootUrl + 'address/delete',
    updateAddressUrl: APIRootUrl + 'address/update',
    setDefaultAddressUrl: APIRootUrl + 'address/setDefault',
}