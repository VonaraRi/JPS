export default function PriorityBadge({ priority }) {
  if (!priority) return null;
  return (
    <span className={`priority-badge priority-${priority.toLowerCase()}`}>
      {priority}
    </span>
  );
}