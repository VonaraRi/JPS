import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import TicketFormWizard, { emptyTicketForm } from '../components/TicketFormWizard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { createTicket, fetchTicketById, updateTicket } from '../services/api.js';

export default function TicketFormPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [initialValues, setInitialValues] = useState(emptyTicketForm);
  const [loading, setLoading] = useState(Boolean(ticketId));
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isEditMode = Boolean(ticketId);
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    let ignore = false;

    async function loadTicketForEdit() {
      // 1. Guard against firing before token or ticketId is present
      if (!ticketId || !token) {
        return;
      }

      try {
        setLoading(true);
        setLoadError('');
        const ticket = await fetchTicketById(ticketId, token);

        if (!ignore && ticket) {
          setInitialValues({
            title: ticket.title ?? '',
            description: ticket.description ?? '',
            category: ticket.category ?? '',
            priority: ticket.priority ?? 'MEDIUM',
            status: ticket.status ?? 'OPEN',
            createdBy: ticket.createdBy ?? user?.email ?? '',
            createdAt: ticket.createdAt
              ? new Date(ticket.createdAt).toISOString().slice(0, 16)
              : new Date().toISOString().slice(0, 16)
          });
        }
      } catch (err) {
        if (!ignore) {
          setLoadError(err.message || 'Could not load ticket for editing.');
          console.error('Fetch edit ticket error:', err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTicketForEdit();

    return () => {
      ignore = true;
    };
  }, [ticketId, token, user]);

  async function handleSubmit(payload) {
    if (!token) {
      setServerError('Authentication token missing or expired. Please log in again.');
      return;
    }

    try {
      setSaving(true);
      setServerError('');
      setSuccessMessage('');

      if (isEditMode) {
        await updateTicket(ticketId, token, payload);
        setSuccessMessage('Ticket updated successfully.');
      } else {
        const createPayload = {
          title: payload.title,
          description: payload.description,
          category: payload.category,
          priority: payload.priority,
          status: payload.status,
          createdBy: payload.createdBy || user?.email || 'admin'
        };

        await createTicket(token, createPayload);
        setSuccessMessage('New ticket is created successfully.');
      }
    } catch (err) {
      setServerError(err.message || 'Could not save ticket.');
      console.error('Submit error:', err);
    } finally {
      setSaving(false);
    }
  }

  if (!isAdmin) {
    return (
      <section className="card">
        <div className="section-heading">
          <p className="eyebrow">Admin only</p>
          <h2>Ticket form is restricted</h2>
          <p>Only ADMIN users can create or update tickets in this demo.</p>
        </div>
        <Link className="button-link" to="/app/tickets">
          Back to Tickets
        </Link>
      </section>
    );
  }

  if (loading) {
    return <LoadingMessage message="Loading ticket details..." />;
  }

  if (loadError) {
    return (
      <div style={{ marginTop: '1rem' }}>
        <ErrorMessage message={loadError} />
        <div style={{ marginTop: '1rem' }}>
          <Link className="button-link secondary" to="/app/tickets">
            ← Back to Tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ticket-form-page">
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <Link className="button-link secondary" to="/app/tickets">
          ← Back to Tickets
        </Link>

        {successMessage && (
          <button
            type="button"
            className="button-link"
            onClick={() => navigate('/app/tickets')}
          >
            View Tickets
          </button>
        )}
      </div>

      <TicketFormWizard
        key={ticketId || 'create'}
        mode={isEditMode ? 'edit' : 'create'}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        saving={saving}
        serverError={serverError}
        successMessage={successMessage}
      />
    </div>
  );
}