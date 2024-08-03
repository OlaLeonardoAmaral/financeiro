export default {
    secret: process.env.JWT_SECRET || "mysecret",
    expiresIn: "10s",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "myanothersecret",
    refreshExpiresIn: "365d"
  };