export const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'CLOSED'];
export const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH'];

export const emptyTicketForm = {
  title: '',
  description: '',
  category: '',
  priority: 'MEDIUM',
  status: 'OPEN',
  createdBy: '',
  createdAt: new Date().toISOString().slice(0, 16)
};

export function validateTicketFormStep(stepToValidate, formValues, isReviewed = false) {
  const errors = {};

  if (stepToValidate === 1) {
    if (!formValues.title || !formValues.title.trim()) {
      errors.title = 'Title is required.';
    }

    if (!formValues.description || !formValues.description.trim()) {
      errors.description = 'Description is required.';
    }

    if (!formValues.category || !formValues.category.trim()) {
      errors.category = 'Category is required.';
    }

    if (!formValues.priority || !PRIORITY_OPTIONS.includes(formValues.priority)) {
      errors.priority = 'Priority is required.';
    }
  }

  if (stepToValidate === 2) {
    if (!formValues.status || !STATUS_OPTIONS.includes(formValues.status)) {
      errors.status = 'Status is required.';
    }

    if (!formValues.createdBy || !formValues.createdBy.trim()) {
      errors.createdBy = 'Created By is required.';
    }
  }

  if (stepToValidate === 3 && !isReviewed) {
    errors.review = 'Please confirm that you reviewed the ticket details.';
  }

  return errors;
}

export function normalizeTicketFormPayload(formValues) {
  return {
    title: formValues.title ? formValues.title.trim() : '',
    description: formValues.description ? formValues.description.trim() : '',
    category: formValues.category ? formValues.category.trim() : '',
    priority: formValues.priority,
    status: formValues.status,
    createdBy: formValues.createdBy ? formValues.createdBy.trim() : '',
    createdAt: formValues.createdAt
  };
}

export function formatTicketFormLabel(key) {
  if (!key) return '';
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}