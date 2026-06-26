import { showToast } from "../../components/toast.js";
import { changePassword } from "../../services/auth.js";
import { ROUTES } from "../../utils/constants.js";
import { navigateTo } from "../../utils/helper.js";

export function render(container) {
  container.innerHTML = `<section class="max-w-2xl rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-5 shadow-xl">
    <h2 class="mb-4 text-xl font-semibold">Change Password</h2>
    <form id="password-form" class="space-y-4">
      <label class="block text-sm font-medium" for="currentPassword">Current Password <input id="currentPassword" name="currentPassword" type="password" required class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2" /></label>
      <label class="block text-sm font-medium" for="newPassword">New Password <input id="newPassword" name="newPassword" type="password" required minlength="8" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2" /></label>
      <label class="block text-sm font-medium" for="confirmPassword">Confirm Password <input id="confirmPassword" name="confirmPassword" type="password" required minlength="8" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2" /></label>
      <div class="flex justify-end gap-3">
        <button type="button" data-action="cancel-password" class="rounded-[10px] bg-slate-700 px-4 py-2 font-semibold">Cancel</button>
        <button type="submit" class="rounded-[10px] bg-blue-600 px-4 py-2 font-semibold">Save</button>
      </div>
    </form>
  </section>`;
  container.querySelector("#password-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("newPassword") !== formData.get("confirmPassword")) {
      showToast("Password confirmation must match", "error");
      return;
    }
    const result = await changePassword(
      formData.get("currentPassword"),
      formData.get("newPassword"),
      formData.get("confirmPassword"),
    );
    showToast(result.success ? "Password updated" : result.message, result.success ? "success" : "error");
    if (result.success) {
      event.currentTarget.reset();
    }
  });
  container.querySelector("[data-action='cancel-password']").addEventListener("click", () => {
    navigateTo(ROUTES.dashboard);
  });
}
