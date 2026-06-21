type PawProps = {
  className?: string;
};

export default function Paw({ className = "" }: PawProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="32" cy="42" rx="14" ry="11" />
      <ellipse cx="14" cy="26" rx="7" ry="8.5" />
      <ellipse cx="30" cy="16" rx="7" ry="8.5" />
      <ellipse cx="48" cy="22" rx="6.5" ry="8" />
      <ellipse cx="54" cy="36" rx="6" ry="7.5" />
    </svg>
  );
}
