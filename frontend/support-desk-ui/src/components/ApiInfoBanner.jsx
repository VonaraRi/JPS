import { useState, useEffect } from 'react';
import { fetchApiInfo } from '../services/api.js';

export default function ApiInfoBanner() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getInfo() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchApiInfo();
        setInfo(data);
      } catch (err) {
        setError(err.message || 'Error connecting to backend server');
      } finally {
        setLoading(false);
      }
    }

    getInfo();
  }, []);

  if (loading) {
    return <div className="status-banner loading">Loading API status...</div>;
  }

  if (error) {
    return <div className="status-banner error">Backend Connection Error: {error}</div>;
  }

  return (
    <div className="status-banner success">
      <strong>Backend connected:</strong> {info?.appName || info?.name || 'Support Desk API'} (v{info?.version || '1.0.0'})
    </div>
  );
}