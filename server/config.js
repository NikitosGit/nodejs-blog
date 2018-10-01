module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: "mongodb://localhost:27017/blog",
  IS_PRODUCTION: process.env.NODE_ENV === "production"
};
