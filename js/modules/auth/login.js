import { showToast } from "../../components/toast.js";
import { login } from "../../services/auth.js";
import { seed } from "../../services/storage.js";
import { ROUTES } from "../../utils/constants.js";

function renderLogin(root) {
  root.innerHTML = `<section class="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#061726] via-[#0B2239] to-[#061726] p-4">
    <div class="w-full max-w-md rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-8 shadow-xl">
      <div class="mb-8 text-center">
        <p class="text-xs uppercase tracking-[0.35em] text-blue-300">BIM</p>
        <h1 class="mt-2 text-3xl font-bold">Engineering Document Management System</h1>
        <!-- <p class="mt-2 text-sm text-slate-400">Sign in with deny / 123456</p> -->
      </div>
      <form id="login-form" class="space-y-4">
        <label class="block text-sm font-medium text-slate-200" for="username">Username <span class="text-red-300">*</span>
          <input id="username" name="username" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30" required />
        </label>
        <label class="block text-sm font-medium text-slate-200" for="password">Password <span class="text-red-300">*</span>
          <div class="mt-1 flex rounded-[10px] border border-[#1E3A5F] bg-[#061726] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
            <input id="password" name="password" type="password" class="w-full rounded-[10px] bg-transparent px-3 py-2 outline-none" required />
            <button type="button" data-action="toggle-password" class="px-3 text-sm text-blue-300" aria-label="Show password">Show</button>
          </div>
        </label>
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-slate-300"><input name="remember" type="checkbox" class="rounded border-[#1E3A5F] bg-[#061726]" /> Remember session</label>
          <a href="#" class="text-blue-300 hover:text-blue-200">Forgot Password?</a>
        </div>
        <button id="login-button" class="w-full rounded-[10px] bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-700" type="submit">Login</button>
      </form>
    </div>
  </section>`;
}

function bindLogin(root) {
  root.addEventListener("click", (event) => {
    if (event.target.dataset.action !== "toggle-password") {
      return;
    }
    const password = root.querySelector("#password");
    const isHidden = password.type === "password";
    password.type = isHidden ? "text" : "password";
    event.target.textContent = isHidden ? "Hide" : "Show";
  });
  root.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const button = root.querySelector("#login-button");
    button.textContent = "Signing in...";
    button.disabled = true;
    const result = await login(form.username.value.trim(), form.password.value, form.remember.checked);
    if (!result.success) {
      button.textContent = "Login";
      button.disabled = false;
      showToast(result.message, "error");
      return;
    }
    showToast("Login berhasil", "success");
    window.location.href = `./index.html#${ROUTES.dashboard}`;
  });
}

seed();
const root = document.getElementById("login-root");
if (root) {
  renderLogin(root);
  bindLogin(root);
}
