export default {
    secret: process.env.JWT_SECRET || "mysecret",
    expiresIn: "180m",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "myanothersecret",
    refreshExpiresIn: "365d"
  };