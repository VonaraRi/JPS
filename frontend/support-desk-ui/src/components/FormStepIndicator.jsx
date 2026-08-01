const steps = ['Ticket details', 'Status & metadata', 'Review'];

export default function FormStepIndicator({ currentStep }) {
  return (
    <ol className="step-indicator" aria-label="Ticket form progress">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isComplete = currentStep > stepNumber;

        return (
          <li
            key={step}
            className={isActive ? 'active' : isComplete ? 'complete' : ''}
            aria-current={isActive ? 'step' : undefined}
          >
            <span>{stepNumber}</span>
            <span className="step-label">{step}</span> {/* 👈 Clean spacing */}
          </li>
        );
      })}
    </ol>
  );
}