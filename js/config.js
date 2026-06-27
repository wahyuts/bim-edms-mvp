window.EDMS_CONFIG = {
  API_BASE_URL:
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:4000/api/v1"
      : "https://bim-edms-mvp-production.up.railway.app/api/v1",
};