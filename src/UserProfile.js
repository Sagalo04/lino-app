var UserProfile = (function () {
    var email = "";
    var provider = false;

    var getMail = function () {
        return email;    // Or pull this from cookie/localStorage
    };

    var setMail = function (mail) {
        email = mail;
        // Also set this in cookie/localStorage
    };

    var getProvide = function () {
        return provider;    // Or pull this from cookie/localStorage
    };

    var setProvide = function (provide) {
        provider = provide;
        // Also set this in cookie/localStorage
    };

    return {
        getMail: getMail,
        setMail: setMail,
        getProvide: getProvide,
        setProvide : setProvide
    }

})();

export default UserProfile;