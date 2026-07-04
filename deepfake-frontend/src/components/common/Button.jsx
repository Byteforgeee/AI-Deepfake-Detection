const VARIANTS = {
  primary:
    "bg-verify-500 text-base-950 hover:bg-verify-400 focus-visible:outline-verify-400",
  ghost:
    "bg-transparent text-ink-100 border border-base-600 hover:border-ink-500 focus-visible:outline-ink-300",
};

export default function Button({
  children,
  variant = "primary",
  isLoading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-body text-sm font-semibold
        transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${VARIANTS[variant]} ${className}`}
    >
      {isLoading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
