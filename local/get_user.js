module.exports = function (req) {
  var user = (req.user) ? req.user._json : null;
  if (!user) return null;
  return {
    login: user.login,
    avatar_url: user.avatar_url,
    email: user.email
  };
};
