import { useState } from "react";
import { mediaImageSet, publicAssetSrc } from "./MediaImage";

export default function AgeGate({ closing, onAccept }) {
  const [hovered, setHovered] = useState("yes");

  return (
    <div className={`age-gate ${closing ? "age-gate--closing" : ""}`}>
      <div
        className="age-gate__backdrop"
        style={{ backgroundImage: mediaImageSet("/media/1-2560x1152.jpg") }}
      />
      <div className="age-gate__veil" />
      <div className="age-gate__content">
        <div className="eyebrow">After Hours Access</div>
        <h1 className="age-gate__title">OLD MONK</h1>
        <p className="age-gate__question">ARE YOU OF LEGAL DRINKING AGE?</p>
        <div
          className={`age-gate__split age-gate__split--${hovered}`}
          onMouseLeave={() => setHovered("yes")}
        >
          <button
            type="button"
            className={`age-gate__option ${hovered === "yes" ? "is-hovered" : ""}`}
            onMouseEnter={() => setHovered("yes")}
            onClick={onAccept}
            data-cursor-label={"ENTER\nSITE"}
            data-cursor-variant="large"
          >
            YES
          </button>
          <button
            type="button"
            className={`age-gate__option ${hovered === "no" ? "is-hovered" : ""}`}
            onMouseEnter={() => setHovered("no")}
            onClick={() => window.open("https://www.responsibility.org/", "_self")}
            data-cursor-label={"EXIT\nSITE"}
          >
            NO
          </button>
        </div>
        <p className="age-gate__copy">
          To enter the OLD MONK experience, you must be of legal drinking age in
          your country of residence. By entering the site, you agree to the terms
          of use, privacy policy, and a slower, more responsible pour.
        </p>
        <div className="age-gate__brand">
          <img src={publicAssetSrc("/old-monk-logo.png")} alt="" loading="lazy" decoding="async" />
          <span>OLD MONK RESERVE ROOM</span>
        </div>
      </div>
    </div>
  );
}
