import { useEffect, useState } from "react";
import OutlineButton from "./OutlineButton";

export default function NewsletterModal({ open, onDismiss, onComplete }) {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setAccepted(false);
      setSuccess(false);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  function handleSubmit() {
    if (!email.trim() || !accepted) {
      return;
    }

    setSuccess(true);
  }

  function handleContinue() {
    onComplete();
  }

  return (
    <div className="modal-shell">
      <div className="modal-shell__backdrop" />
      <div className="newsletter-modal">
        <button
          type="button"
          className="newsletter-modal__close"
          onClick={onDismiss}
          data-cursor-label={"CLOSE"}
        >
          <span />
          <span />
        </button>

        {!success ? (
          <>
            <div className="newsletter-modal__eyebrow">"AFTER HOURS LIST"</div>
            <h2 className="newsletter-modal__title">JOIN THE MAILING LIST</h2>
            <p className="newsletter-modal__subtitle">
              Collector drops, tasting notes, and cellar stories for late-night pours.
            </p>
            <label className="newsletter-modal__field">
              <span>Email address</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
              />
            </label>
            <label className="newsletter-modal__check">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => setAccepted(event.target.checked)}
              />
              <span>I agree to receive updates from this experience.</span>
            </label>
            <div className="newsletter-modal__actions">
              <OutlineButton
                type="button"
                onClick={handleSubmit}
                data-cursor-label={"SUBMIT"}
                data-cursor-variant="large"
              >
                SUBSCRIBE
              </OutlineButton>
              <button
                type="button"
                className="text-button"
                onClick={onDismiss}
                data-cursor-label={"BACK"}
              >
                BACK TO EXPERIENCE
              </button>
            </div>
          </>
        ) : (
          <div className="newsletter-modal__success">
            <div className="newsletter-modal__eyebrow">THANK YOU</div>
            <h2 className="newsletter-modal__title">YOU ARE ON THE LIST</h2>
            <p className="newsletter-modal__subtitle">
              Collector drops, tasting notes, and launch updates will arrive here.
            </p>
            <OutlineButton
              type="button"
              onClick={handleContinue}
              data-cursor-label={"CONTINUE"}
            >
              CONTINUE TO CELLAR
            </OutlineButton>
          </div>
        )}
      </div>
    </div>
  );
}
