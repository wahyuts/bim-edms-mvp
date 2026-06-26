import { form } from "../../components/form.js";
import { showToast } from "../../components/toast.js";
import { deleteUserProfile, getUsers, updateUserProfile } from "../../services/auth.js";
import { ROUTES, USER_ROLES } from "../../utils/constants.js";
import { serializeForm } from "../../utils/dom.js";
import { navigateTo } from "../../utils/helper.js";

function findUserByName(users, name) {
  return users.find((user) => user.name === name) || null;
}

function setEditableFields(formElement, isEnabled) {
  ["username", "email", "password", "department", "role"].forEach((fieldName) => {
    formElement.elements.namedItem(fieldName).disabled = !isEnabled;
  });
  formElement.querySelector("button[type='submit']").disabled = !isEnabled;
  const deleteButton = formElement.querySelector("[data-action='delete-user']");
  if (deleteButton) {
    deleteButton.disabled = !isEnabled;
  }
}

function populateUser(formElement, user) {
  formElement.dataset.selectedUserId = user.id;
  formElement.elements.namedItem("name").value = user.name || "";
  formElement.elements.namedItem("username").value = user.username || "";
  formElement.elements.namedItem("email").value = user.email || "";
  formElement.elements.namedItem("password").value = "";
  formElement.elements.namedItem("department").value = user.department || "";
  formElement.elements.namedItem("role").value = user.role || USER_ROLES[0];
  setEditableFields(formElement, true);
}

function clearUserData(formElement) {
  formElement.dataset.selectedUserId = "";
  ["username", "email", "password", "department"].forEach((fieldName) => {
    formElement.elements.namedItem(fieldName).value = "";
  });
  formElement.elements.namedItem("role").value = USER_ROLES[0];
  setEditableFields(formElement, false);
}

export async function render(container) {
  const users = await getUsers();
  const userNameOptions = users.map((user) => user.name);

  container.innerHTML = `<section class="rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-5 shadow-xl">
    <h2 class="mb-4 text-xl font-semibold">Edit User Profile</h2>
    ${form({
      id: "edit-user-profile-form",
      fields: [
        { name: "name", label: "Name", required: true, options: userNameOptions, placeholder: "Select registered user" },
        { name: "username", label: "Username", required: true, disabled: true },
        { name: "email", label: "Email", type: "email", required: true, disabled: true },
        { name: "password", label: "New Password", type: "password", placeholder: "Leave blank to keep current password", disabled: true },
        { name: "department", label: "Department", required: true, disabled: true },
        { name: "role", label: "Role", required: true, options: USER_ROLES, disabled: true },
      ],
      submitLabel: "Update",
    })}
  </section>`;

  const editUserProfileForm = container.querySelector("#edit-user-profile-form");
  editUserProfileForm.querySelector(".flex.justify-end").insertAdjacentHTML(
    "afterbegin",
    `<button type="button" data-action="delete-user" disabled class="rounded-[10px] bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">Delete</button>`,
  );
  setEditableFields(editUserProfileForm, false);

  editUserProfileForm.elements.namedItem("name").addEventListener("change", (event) => {
    const selectedUser = findUserByName(users, event.target.value);
    if (selectedUser) {
      populateUser(editUserProfileForm, selectedUser);
      return;
    }
    clearUserData(editUserProfileForm);
  });

  editUserProfileForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const selectedUserId = event.currentTarget.dataset.selectedUserId;
    const result = await updateUserProfile(selectedUserId, serializeForm(event.currentTarget));
    if (!result.success) {
      showToast(result.message, "error");
      return;
    }
    showToast("User profile updated", "success");
    navigateTo(ROUTES.dashboard);
  });

  editUserProfileForm.querySelector("[data-action='delete-user']").addEventListener("click", async () => {
    const selectedUserId = editUserProfileForm.dataset.selectedUserId;
    const selectedName = editUserProfileForm.elements.namedItem("name").value || "selected user";
    if (!selectedUserId) {
      showToast("Select a user first", "warning");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete ${selectedName}?`)) {
      return;
    }

    const result = await deleteUserProfile(selectedUserId);
    if (!result.success) {
      showToast(result.message, "error");
      return;
    }
    showToast("User deleted", "success");
    if (result.deletedCurrentUser) {
      window.location.href = `./login.html#${ROUTES.login}`;
      return;
    }
    navigateTo(ROUTES.dashboard);
  });

  editUserProfileForm.querySelector("[data-action='close-modal']").addEventListener("click", () => {
    navigateTo(ROUTES.dashboard);
  });
}
