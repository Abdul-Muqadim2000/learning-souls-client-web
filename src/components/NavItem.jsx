import Link from "next/link";

function NavItem({ href, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        flex items-center gap-2
        text-lg font-medium text-(--color-secondary)
        hover:text-(--color-tertiary)
        transition-colors duration-200
      "
    >
      <span>{label}</span>
    </Link>
  );
}

export default NavItem;
