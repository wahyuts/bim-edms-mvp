export const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  mysql: {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || 3306),
    database: process.env.MYSQL_DATABASE || "edms_db",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
  },
  jwtSecret: process.env.JWT_SECRET || "change_this_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",
  uploadRoot: process.env.UPLOAD_ROOT || "uploads",
  uploadMaxSizeMb: Number(process.env.UPLOAD_MAX_SIZE_MB || 30),
};
