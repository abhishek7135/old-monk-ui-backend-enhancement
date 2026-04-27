export default function OutlineButton({
  children,
  className = "outline-button",
  ...props
}) {
  const text = typeof children === "string" ? children : "";

  return (
    <button className={className} {...props}>
      <span className="outline-button__label" data-text={text}>
        {children}
      </span>
    </button>
  );
}
