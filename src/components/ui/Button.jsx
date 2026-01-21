function PrimaryButton({
  text,
  icon: Icon,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        px-6 py-2.5 rounded-full
        bg-[var(--color-secondary)] text-white
        font-medium text-sm
        transition-all duration-200
        hover:opacity-90
        disabled:opacity-50 cursor-pointer
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {text && <span>{text}</span>}
    </button>
  );
}

function SecondaryButton({
  text,
  icon: Icon,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        px-6 py-2.5 rounded-full
        bg-white
        border border-[var(--color-secondary)]
        text-[var(--color-secondary)]
        font-medium text-sm
        transition-all duration-200
        hover:bg-[var(--color-secondary)] hover:text-white
        disabled:opacity-50 cursor-pointer
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {text && <span>{text}</span>}
    </button>
  );
}

export { PrimaryButton, SecondaryButton };
