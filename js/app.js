import { initRouter } from "./router.js";
import { seed } from "./services/storage.js";

seed();
initRouter();
