import { describe, it, expect } from 'vitest';
import {
  validateTicketFormStep,
  normalizeTicketFormPayload,
  formatTicketFormLabel,
  emptyTicketForm
} from './ticketFormValidation.js';

describe('Ticket Form Validation Utility', () => {
  describe('validateTicketFormStep()', () => {
    // Required field test
    it('returns validation errors when required Step 1 fields are missing or whitespace-only', () => {
      const invalidForm = { ...emptyTicketForm, title: '', description: '   ', category: '' };
      const errors = validateTicketFormStep(1, invalidForm);

      expect(errors).toHaveProperty('title');
      expect(errors).toHaveProperty('description');
      expect(errors).toHaveProperty('category');
      expect(errors.title).toBe('Title is required.');
      expect(errors.description).toBe('Description is required.');
      expect(errors.category).toBe('Category is required.');
    });

    // Invalid priority or status test
    it('rejects invalid priority values on Step 1 and invalid status values on Step 2', () => {
      const invalidPriorityForm = { ...emptyTicketForm, priority: 'URGENT_NOT_ALLOWED' };
      const step1Errors = validateTicketFormStep(1, invalidPriorityForm);

      expect(step1Errors.priority).toBe('Priority is required.');

      const invalidStatusForm = { ...emptyTicketForm, status: 'PENDING_APPROVAL' };
      const step2Errors = validateTicketFormStep(2, invalidStatusForm);

      expect(step2Errors.status).toBe('Status is required.');
    });

    it('returns errors for Step 2 missing fields and Step 3 review confirmation', () => {
      const invalidStep2 = { ...emptyTicketForm, createdBy: '  ' };
      const errorsStep2 = validateTicketFormStep(2, invalidStep2);
      expect(errorsStep2.createdBy).toBe('Created By is required.');

      const errorsStep3NotReviewed = validateTicketFormStep(3, emptyTicketForm, false);
      expect(errorsStep3NotReviewed.review).toBe('Please confirm that you reviewed the ticket details.');

      const errorsStep3Reviewed = validateTicketFormStep(3, emptyTicketForm, true);
      expect(errorsStep3Reviewed.review).toBeUndefined();
    });
  });

  describe('normalizeTicketFormPayload()', () => {
    // Payload normalization test
    it('normalizes form values by trimming whitespace from text fields', () => {
      const rawForm = {
        title: '   Keyboard Not Working   ',
        description: '   Spacebar stuck   ',
        category: '  Hardware  ',
        priority: 'HIGH',
        status: 'OPEN',
        createdBy: '  Lee  ',
        createdAt: '2026-08-09T12:00'
      };

      const normalized = normalizeTicketFormPayload(rawForm);

      expect(normalized.title).toBe('Keyboard Not Working');
      expect(normalized.description).toBe('Spacebar stuck');
      expect(normalized.category).toBe('Hardware');
      expect(normalized.createdBy).toBe('Lee');
      expect(normalized.priority).toBe('HIGH');
    });
  });

  describe('formatTicketFormLabel()', () => {
    it('formats camelCase keys into capitalized labels', () => {
      expect(formatTicketFormLabel('createdBy')).toBe('Created By');
      expect(formatTicketFormLabel('createdAt')).toBe('Created At');
      expect(formatTicketFormLabel('title')).toBe('Title');
      expect(formatTicketFormLabel('')).toBe('');
    });
  });
});