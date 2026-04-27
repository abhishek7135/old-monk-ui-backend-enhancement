import { publicAssetSrc } from "./MediaImage";

const MAGNET_RANGE = 18;

export default function SiteChrome({
  menuOpen,
  onMenuToggle,
  onLogoClick,
  onBagClick,
  onNewsletterOpen,
  cartCount,
  screen
}) {
  function handleMagnetMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * MAGNET_RANGE;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * MAGNET_RANGE;

    event.currentTarget.style.setProperty("--magnet-x", `${x}px`);
    event.currentTarget.style.setProperty("--magnet-y", `${y}px`);
  }

  function handleMagnetLeave(event) {
    event.currentTarget.style.setProperty("--magnet-x", "0px");
    event.currentTarget.style.setProperty("--magnet-y", "0px");
  }

  return (
    <>
      <div className="site-chrome__rail">
        <button
          type="button"
          className="site-chrome__logo"
          onClick={onLogoClick}
          data-cursor-label={"HOME"}
        >
          <img src={publicAssetSrc("/old-monk-logo.png")} alt="Old Monk home" />
        </button>
        <button
          type="button"
          className={`site-chrome__menu ${menuOpen ? "is-open" : ""}`}
          onClick={onMenuToggle}
          onPointerMove={handleMagnetMove}
          onPointerLeave={handleMagnetLeave}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          data-cursor-label={menuOpen ? "CLOSE" : "MENU"}
          data-cursor-variant="large"
        >
          <span className="site-chrome__menu-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <a
          href="https://www.instagram.com/abhi_71404"
          target="_blank"
          rel="noreferrer"
          className="site-chrome__newsletter"
          onPointerMove={handleMagnetMove}
          onPointerLeave={handleMagnetLeave}
          aria-label="Open Abhishek Instagram"
          data-cursor-label={"INSTAGRAM"}
        >
          <span className="site-chrome__instagram" aria-hidden="true" />
        </a>
      </div>

      <div className="site-chrome__topbar">
        <button type="button" className="text-button site-chrome__signin">
          SIGN IN
        </button>
        <button
          type="button"
          className="site-chrome__bag"
          onClick={onBagClick}
          data-cursor-label={screen === "products" ? "CRATE" : "SHOP"}
        >
          <span className="site-chrome__bag-icon" aria-hidden="true" />
          <span className="site-chrome__bag-count">({cartCount})</span>
        </button>
      </div>
    </>
  );
}
