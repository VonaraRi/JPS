import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketFormWizard from './TicketFormWizard.jsx';

describe('TicketFormWizard component', () => {
  it('shows inline validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<TicketFormWizard onSubmit={vi.fn()} />);

    // Click "Continue" button to trigger step 1 validation
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(screen.getByText('Title is required.')).toBeInTheDocument();
    expect(screen.getByText('Category is required.')).toBeInTheDocument();
    expect(screen.getByText('Description is required.')).toBeInTheDocument();
  });

  it('submits valid form data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TicketFormWizard onSubmit={onSubmit} />);

    // Step 1: Basic details (using regex to ignore ' *' in labels like 'Title *')
    await user.type(screen.getByLabelText(/Title/i), 'Voice call on whatsapp');
    await user.type(screen.getByLabelText(/Category/i), 'Handphone');
    await user.type(screen.getByLabelText(/Description/i), 'Cannot make voice call group on whatsapp.');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    // Step 2: Metadata / Submitter info
    await user.type(screen.getByLabelText(/Created By/i), 'Mikong');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    // Step 3: Review checkbox and submit
    await user.click(
      screen.getByLabelText(/I have reviewed the ticket details and they are ready to submit/i)
    );
    await user.click(screen.getByRole('button', { name: 'Create Ticket' }));

    // Verify submission payload
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Voice call on whatsapp',
        category: 'Handphone',
        description: 'Cannot make voice call group on whatsapp.',
        priority: 'MEDIUM',
        status: 'OPEN',
        createdBy: 'Mikong'
      })
    );
  });
});