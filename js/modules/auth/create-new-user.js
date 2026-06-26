import { form } from "../../components/form.js";
import { showToast } from "../../components/toast.js";
import { createUser } from "../../services/auth.js";
import { ROUTES, USER_ROLES } from "../../utils/constants.js";
import { serializeForm } from "../../utils/dom.js";
import { navigateTo } from "../../utils/helper.js";

export function render(container) {
  container.innerHTML = `<section class="rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-5 shadow-xl">
    <h2 class="mb-4 text-xl font-semibold">Create New User</h2>
    ${form({
      id: "create-new-user-form",
      fields: [
        { name: "name", label: "Name", required: true },
        { name: "username", label: "Username", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "password", label: "Password", type: "password", required: true },
        { name: "department", label: "Department", required: true },
        { name: "role", label: "Role", required: true, options: USER_ROLES },
      ],
      submitLabel: "Create",
    })}
  </section>`;

  const createNewUserForm = container.querySelector("#create-new-user-form");
  createNewUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const result = await createUser(serializeForm(event.currentTarget));
    if (!result.success) {
      showToast(result.message, "error");
      return;
    }
    showToast("User created", "success");
    navigateTo(ROUTES.profile);
  });

  createNewUserForm.querySelector("[data-action='close-modal']").addEventListener("click", () => {
    navigateTo(ROUTES.profile);
  });
}
