import { useEffect, useState } from "react";

const EXIT_DURATION = 780;

export default function MenuOverlay({ open, items, onClose, onSelect }) {
  const [hoveredId, setHoveredId] = useState(items[0]?.id ?? "");
  const [rendered, setRendered] = useState(open);
  const [phase, setPhase] = useState(open ? "open" : "closed");

  useEffect(() => {
    let timerId;
    let frameId;
    let secondFrameId;

    if (open) {
      setRendered(true);
      setPhase("preparing");
      frameId = window.requestAnimationFrame(() => {
        secondFrameId = window.requestAnimationFrame(() => {
          setPhase("entering");
          timerId = window.setTimeout(() => setPhase("open"), EXIT_DURATION);
        });
      });
    } else if (rendered) {
      setPhase("leaving");
      timerId = window.setTimeout(() => {
        setRendered(false);
        setPhase("closed");
      }, EXIT_DURATION);
    }

    return () => {
      window.clearTimeout(timerId);
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(secondFrameId);
    };
  }, [open, rendered]);

  if (!rendered) {
    return null;
  }

  return (
    <div className={`menu-overlay menu-overlay--${phase}`} aria-hidden={!open}>
      <div className="menu-overlay__blur" />
      <div className="menu-overlay__content">
        {items.map((item, index) => {
          const hovered = hoveredId === item.id;

          return (
            <div
              key={item.id}
              className={`menu-overlay__row menu-overlay__row--${item.hintSide} ${hovered ? "is-hovered" : ""}`}
              style={{
                "--item-index": index,
                "--item-exit-index": items.length - 1 - index
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onFocus={() => setHoveredId(item.id)}
            >
              {item.hintSide === "left" ? (
                <span className="menu-overlay__hint menu-overlay__hint--left">{item.hint}</span>
              ) : null}

              <button
                type="button"
                className="menu-overlay__item"
                onClick={() => onSelect(item)}
                data-cursor-label={item.label.toUpperCase()}
                data-cursor-variant="large"
              >
                {item.label}
              </button>

              {item.hintSide === "right" ? (
                <span className="menu-overlay__hint menu-overlay__hint--right">{item.hint}</span>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="menu-overlay__footer">
        <span>OLD MONK RESERVE</span>
        <span>AGED SINCE 1954</span>
        <span>SIP RESPONSIBLY</span>
      </div>
    </div>
  );
}
