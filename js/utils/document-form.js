import { currentSession } from "../services/auth.js";

export function todayDateInput() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function toDateInput(value) {
  if (!value) {
    return "";
  }

  const rawValue = String(value).trim();
  const isoMatch = rawValue.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
  }

  const usMatch = rawValue.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (usMatch) {
    return `${usMatch[3]}-${usMatch[1].padStart(2, "0")}-${usMatch[2].padStart(2, "0")}`;
  }

  const date = new Date(rawValue);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateDisplay(value) {
  const dateInput = toDateInput(value);
  if (!dateInput) {
    return "";
  }

  const [year, month, day] = dateInput.split("-");
  return `${month}/${day}/${year}`;
}

export function documentUploadDate(record = null) {
  return toDateInput(record?.sla || record?.createdAt || todayDateInput());
}

export function normalizeDocumentFormData(data, record = null) {
  const normalizedData = {
    ...data,
    sla: toDateInput(data.sla || documentUploadDate(record)),
  };

  if (Object.prototype.hasOwnProperty.call(data, "verifyDeadlineDate")) {
    normalizedData.verifyDeadlineDate = toDateInput(data.verifyDeadlineDate);
  }

  return normalizedData;
}

export function applyDocumentReviewFields(fields, record = null, { includeOnCreate = true, clientLocksVerifyDeadline = true } = {}) {
  const shouldIncludeReviewFields = record || includeOnCreate;
  const isClientEdit = Boolean(record && clientLocksVerifyDeadline && currentSession().role === "Client");
  const nextFields = [];

  fields.forEach((fieldConfig) => {
    if (fieldConfig.name !== "sla") {
      nextFields.push(fieldConfig);
      return;
    }

    nextFields.push({
      ...fieldConfig,
      type: "text",
      readonly: true,
      lang: "",
      placeholder: "mm/dd/yyyy",
      value: formatDateDisplay(documentUploadDate(record)),
    });

    if (shouldIncludeReviewFields) {
      nextFields.push(
        {
          name: "verifyDeadlineDate",
          label: "Verify deadline date",
          type: "date",
          value: record?.verifyDeadlineDate || "",
          disabled: isClientEdit,
        },
        {
          name: "reviewComment",
          label: "Review Comment",
          value: record?.reviewComment || "",
          fullWidth: true,
        },
      );
    }
  });

  return nextFields;
}
