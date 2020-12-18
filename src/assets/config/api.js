

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
    searchUrl: APIRootUrl + 'show/search',

    // 个人信息
    getUserInfo: APIRootUrl + 'user/info',
    updateUserInfo: APIRootUrl + 'user/update',
    // 收货地址
    getAddressList: APIRootUrl + 'address/list',
    getAddress: APIRootUrl + 'address',
    getDefaultAddress: APIRootUrl + 'address/getDefault',
    addAddress: APIRootUrl + 'address/add',
    deleteAddress: APIRootUrl + 'address/delete',
    updateAddress: APIRootUrl + 'address/update',
    setDefaultAddress: APIRootUrl + 'address/setDefault',
}