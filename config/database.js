module.exports = {
  url: `${process.env.DATABASE_MODE}://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
};
