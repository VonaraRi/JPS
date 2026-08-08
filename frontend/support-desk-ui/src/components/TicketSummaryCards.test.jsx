import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import SummaryCards from './SummaryCards.jsx';
import { sampleTickets } from '../test/testUtils.jsx';

describe('SummaryCards component', () => {
  it('renders summary cards with correct values', () => {
    render(<SummaryCards tickets={sampleTickets} />);

    const summary = screen.getByLabelText('Ticket summary');

    expect(within(summary).getByText('Total Tickets')).toBeInTheDocument();
    expect(within(summary).getByText('Open')).toBeInTheDocument();
    expect(within(summary).getByText('In Progress')).toBeInTheDocument();
    expect(within(summary).getByText('Closed')).toBeInTheDocument();

    // Verification of count values based on sampleTickets (Total: 3, Open: 1, In Progress: 1, Closed: 1)
    expect(within(summary).getByText('3')).toBeInTheDocument(); // Total Tickets
  });
});