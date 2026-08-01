import { useRef, useState } from 'react';
import FormStepIndicator from './FormStepIndicator.jsx';
import InlineFieldError from './InlineFieldError.jsx';
import ErrorMessage from './ErrorMessage.jsx';

const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'CLOSED'];
const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH'];

export const emptyTicketForm = {
  title: '',
  description: '',
  category: '',
  priority: 'MEDIUM',
  status: 'OPEN',
  createdBy: '',
  createdAt: new Date().toISOString().slice(0, 16)
};

export default function TicketFormWizard({
  mode = 'create',
  initialValues = emptyTicketForm,
  onSubmit,
  saving = false,
  serverError = '',
  successMessage = ''
}) {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({ ...emptyTicketForm, ...initialValues });
  const [fieldErrors, setFieldErrors] = useState({});
  const reviewCheckboxRef = useRef(null);

  const isEditMode = mode === 'edit';

  function updateField(fieldName, value) {
    setFormValues((current) => ({
      ...current,
      [fieldName]: value
    }));

    // Clear field error as user types
    setFieldErrors((current) => ({
      ...current,
      [fieldName]: ''
    }));
  }

  // Day 13 Exercise 3 Validation Rules
  function validateStep(stepToValidate) {
    const errors = {};

    if (stepToValidate === 1) {
      if (!formValues.title.trim()) {
        errors.title = 'Title is required.';
      }

      if (!formValues.description.trim()) {
        errors.description = 'Description is required.';
      }

      if (!formValues.category.trim()) {
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

      if (!formValues.createdBy.trim()) {
        errors.createdBy = 'Created By is required.';
      }
    }

    if (stepToValidate === 3 && !reviewCheckboxRef.current?.checked) {
      errors.review = 'Please confirm that you reviewed the ticket details.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function goToNextStep() {
    if (validateStep(step)) {
      setStep((current) => Math.min(current + 1, 3));
    }
  }

  function goToPreviousStep() {
    setFieldErrors({});
    setStep((current) => Math.max(current - 1, 1));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const isStep1Valid = validateStep(1);
    const isStep2Valid = validateStep(2);
    const isStep3Valid = validateStep(3);

    if (!isStep1Valid) {
      setStep(1);
      return;
    }

    if (!isStep2Valid) {
      setStep(2);
      return;
    }

    if (!isStep3Valid) {
      return;
    }

    const payload = {
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      category: formValues.category.trim(),
      priority: formValues.priority,
      status: formValues.status,
      createdBy: formValues.createdBy.trim(),
      createdAt: formValues.createdAt
    };

    await onSubmit(payload);
  }

  return (
    <form className="card ticket-form" onSubmit={handleSubmit} noValidate>
      <div className="section-heading">
        <p className="eyebrow">Day 13 Form Validation</p>
        <h2>{isEditMode ? 'Update Ticket' : 'Create Ticket'}</h2>
      </div>

      <FormStepIndicator currentStep={step} />

      {serverError && <ErrorMessage message={serverError} />}

      {/* Visual Success Alert Box */}
      {successMessage && (
        <div
          className="message success-message"
          style={{
            backgroundColor: '#e6f4ea',
            color: '#137333',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid #ceead6',
            fontWeight: 'bold',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>✓</span>
          <span>{successMessage}</span>
        </div>
      )}

      {step === 1 && (
        <section className="form-grid" aria-label="Ticket details">
          <label htmlFor="title">
            Title *
            <input
              id="title"
              value={formValues.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="Enter ticket title"
              aria-describedby="title-error"
            />
            <InlineFieldError id="title-error" message={fieldErrors.title} />
          </label>

          <label htmlFor="category">
            Category *
            <input
              id="category"
              value={formValues.category}
              onChange={(event) => updateField('category', event.target.value)}
              placeholder="e.g. Hardware, Software"
              aria-describedby="category-error"
            />
            <InlineFieldError id="category-error" message={fieldErrors.category} />
          </label>

          <label htmlFor="priority">
            Priority *
            <select
              id="priority"
              value={formValues.priority}
              onChange={(event) => updateField('priority', event.target.value)}
              aria-describedby="priority-error"
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <InlineFieldError id="priority-error" message={fieldErrors.priority} />
          </label>

          <label htmlFor="description" className="form-grid-full">
            Description *
            <textarea
              id="description"
              value={formValues.description}
              onChange={(event) => updateField('description', event.target.value)}
              placeholder="Describe the issue in detail"
              rows="3"
              aria-describedby="description-error"
            />
            <InlineFieldError id="description-error" message={fieldErrors.description} />
          </label>
        </section>
      )}

      {step === 2 && (
        <section className="form-grid" aria-label="Status and Metadata">
          <label htmlFor="status">
            Status *
            <select
              id="status"
              value={formValues.status}
              onChange={(event) => updateField('status', event.target.value)}
              aria-describedby="status-error"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <InlineFieldError id="status-error" message={fieldErrors.status} />
          </label>

          <label htmlFor="createdBy">
            Created By *
            <input
              id="createdBy"
              value={formValues.createdBy}
              onChange={(event) => updateField('createdBy', event.target.value)}
              placeholder="Author name or email"
              aria-describedby="createdBy-error"
            />
            <InlineFieldError id="createdBy-error" message={fieldErrors.createdBy} />
          </label>

          <label htmlFor="createdAt" className="form-grid-full">
            Created At
            <input
              id="createdAt"
              type="datetime-local"
              value={formValues.createdAt}
              onChange={(event) => updateField('createdAt', event.target.value)}
            />
          </label>
        </section>
      )}

      {step === 3 && (
        <section aria-label="Review ticket details">
          <div className="review-grid">
            {Object.entries(formValues).map(([key, value]) => (
              <div key={key} className="info-item">
                <span>{formatLabel(key)}</span>
                <strong>{value || 'Not specified'}</strong>
              </div>
            ))}
          </div>

          <label className="review-check" style={{ marginTop: '1rem', display: 'block' }}>
            <input ref={reviewCheckboxRef} type="checkbox" /> I have reviewed the ticket details and
            they are ready to submit.
          </label>
          <InlineFieldError message={fieldErrors.review} />
        </section>
      )}

      <div className="form-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
        {step > 1 && (
          <button type="button" className="button-link secondary" onClick={goToPreviousStep}>
            Back
          </button>
        )}

        {step < 3 && (
          <button type="button" className="button-link" onClick={goToNextStep}>
            Continue
          </button>
        )}

        {step === 3 && (
          <button type="submit" className="button-link" disabled={saving}>
            {saving ? 'Saving...' : isEditMode ? 'Update Ticket' : 'Create Ticket'}
          </button>
        )}
      </div>
    </form>
  );
}

function formatLabel(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}