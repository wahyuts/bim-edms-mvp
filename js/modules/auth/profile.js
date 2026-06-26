import { form } from "../../components/form.js";
import { showToast } from "../../components/toast.js";
import { currentUser, updateProfile } from "../../services/auth.js";
import { ROUTES } from "../../utils/constants.js";
import { serializeForm } from "../../utils/dom.js";
import { navigateTo } from "../../utils/helper.js";

export function render(container) {
  const user = currentUser();
  container.innerHTML = `<section class="rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-5 shadow-xl">
    <h2 class="mb-4 text-xl font-semibold">Profile</h2>
    ${form({
      id: "profile-form",
      fields: [
        { name: "name", label: "Name", value: user.name, required: true },
        { name: "username", label: "Username", value: user.username, required: true },
        { name: "email", label: "Email", type: "email", value: user.email, required: true },
        { name: "department", label: "Department", value: user.department },
        { name: "role", label: "Role", value: user.role, disabled: true },
      ],
      submitLabel: "Save Profile",
    })}
  </section>`;
  container.querySelector("#profile-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const result = await updateProfile(serializeForm(event.currentTarget));
    showToast(result.success ? "Profile updated" : result.message, result.success ? "success" : "error");
  });
  container.querySelector("[data-action='close-modal']").addEventListener("click", () => {
    navigateTo(ROUTES.dashboard);
  });
}
