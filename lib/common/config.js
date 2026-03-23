"use strict";
// Note: anything added here will be leaked to the public, use caution!
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_OAUTH_SIGNIN_SCOPES = exports.GOOGLE_OAUTH_SCOPE_USERINFO_PROFILE = exports.GOOGLE_OAUTH_SCOPE_USERINFO_EMAIL = exports.GOOGLE_OAUTH_SCOPE_OPENID = exports.HEADER_INTERNAL_SECRET_KEY = exports.HEADER_CURRENT_USER_ID_KEY = exports.publicConfig = void 0;
var public_config_1 = require("@airdev/next/adapter/public-config");
Object.defineProperty(exports, "publicConfig", { enumerable: true, get: function () { return public_config_1.publicConfigAdapter; } });
exports.HEADER_CURRENT_USER_ID_KEY = 'X-CURRENT-USER-ID';
exports.HEADER_INTERNAL_SECRET_KEY = 'X-INTERNAL-SECRET';
exports.GOOGLE_OAUTH_SCOPE_OPENID = 'openid';
exports.GOOGLE_OAUTH_SCOPE_USERINFO_EMAIL = 'https://www.googleapis.com/auth/userinfo.email';
exports.GOOGLE_OAUTH_SCOPE_USERINFO_PROFILE = 'https://www.googleapis.com/auth/userinfo.profile';
exports.GOOGLE_OAUTH_SIGNIN_SCOPES = [
    exports.GOOGLE_OAUTH_SCOPE_OPENID,
    exports.GOOGLE_OAUTH_SCOPE_USERINFO_EMAIL,
    exports.GOOGLE_OAUTH_SCOPE_USERINFO_PROFILE,
];
//# sourceMappingURL=config.js.map