import { describe, it, expect } from 'vitest';
import { countByStatus, filterTickets } from './tickets';
import { sampleTickets } from '../test/testUtils.jsx';

describe('ticket utility functions', () => {
  it('filters tickets by search text', () => {
    const result = filterTickets(sampleTickets, 'email', 'ALL');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T001');
  });

  it('filters tickets by status', () => {
    const result = filterTickets(sampleTickets, '', 'IN_PROGRESS');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T002');
    expect(result[0].title).toBe('Laptop running slowly');
  });

  it('filters tickets by search text and status together', () => {
    const result = filterTickets(sampleTickets, 'password', 'CLOSED');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T003');
  });

  it('returns all tickets when search is empty and status is ALL', () => {
    const result = filterTickets(sampleTickets, '', 'ALL');

    expect(result).toHaveLength(3);
    expect(result).toEqual(sampleTickets);
  });

  it('counts tickets by status', () => {
    expect(countByStatus(sampleTickets, 'OPEN')).toBe(1);
    expect(countByStatus(sampleTickets, 'IN_PROGRESS')).toBe(1);
    expect(countByStatus(sampleTickets, 'CLOSED')).toBe(1);
  });
});