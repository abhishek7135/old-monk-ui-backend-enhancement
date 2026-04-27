import { useEffect, useRef, useState } from "react";
import AgeGate from "./components/AgeGate";
import HomeExperience from "./components/HomeExperience";
import MenuOverlay from "./components/MenuOverlay";
import NewsletterModal from "./components/NewsletterModal";
import ProductExperience from "./components/ProductExperience";
import SiteChrome from "./components/SiteChrome";
import { brandMenuItems, getVariantById } from "./data/siteData";

const AGE_KEY = "scepter_age";
const NEWS_KEY = "scepter_news";
const CART_KEY = "cloneapp_cart";

function readFlag(key) {
  try {
    return window.localStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function writeFlag(key, value) {
  try {
    window.localStorage.setItem(key, value ? "true" : "false");
  } catch {
    return;
  }
}

function readCartCount() {
  try {
    return Number(window.localStorage.getItem(CART_KEY) || "0");
  } catch {
    return 0;
  }
}

function writeCartCount(value) {
  try {
    window.localStorage.setItem(CART_KEY, String(value));
  } catch {
    return;
  }
}

function parseRoute() {
  const hashRoute = window.location.hash.replace(/^#/, "");
  const [hashPath = "/", hashSearch = ""] = hashRoute.split("?");
  const params = new URLSearchParams(hashSearch || window.location.search);
  const variantId = params.get("variant") || "gold-reserve";
  const screen =
    hashPath.startsWith("/products") || window.location.pathname.startsWith("/products")
      ? "products"
      : "home";

  return {
    screen,
    variantId: getVariantById(variantId).id
  };
}

function pushRoute(screen, variantId, replace = false) {
  const target =
    screen === "products" ? `#/products?variant=${variantId}` : "#/";

  if (replace) {
    window.history.replaceState({}, "", target);
    return;
  }

  window.history.pushState({}, "", target);
}

export default function App() {
  const initialRoute = parseRoute();
  const transitionTimer = useRef(null);
  const settleTimer = useRef(null);
  const pointerFrame = useRef(0);
  const pointerPayload = useRef(null);
  const [ageAccepted, setAgeAccepted] = useState(readFlag(AGE_KEY));
  const [ageClosing, setAgeClosing] = useState(false);
  const [screen, setScreen] = useState(initialRoute.screen);
  const [activeVariantId, setActiveVariantId] = useState(initialRoute.variantId);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [newsletterDismissed, setNewsletterDismissed] = useState(readFlag(NEWS_KEY));
  const [transitionPhase, setTransitionPhase] = useState("idle");
  const [homeFocus, setHomeFocus] = useState({ index: 0, key: 0 });
  const [cartCount, setCartCount] = useState(readCartCount());
  const [toast, setToast] = useState("");
  const [pointer, setPointer] = useState({
    x: 0,
    y: 0,
    visible: false,
    pressed: false,
    label: "SCROLL\nTO NAVIGATE",
    large: false,
    interactive: false
  });

  useEffect(() => {
    pushRoute(initialRoute.screen, initialRoute.variantId, true);
  }, []);

  useEffect(() => {
    function handlePopState() {
      const route = parseRoute();
      setScreen(route.screen);
      setActiveVariantId(route.variantId);
      setMenuOpen(false);
      setNewsletterOpen(false);
      setTransitionPhase("idle");

      if (route.screen === "home") {
        setHomeFocus({ index: 0, key: Date.now() });
      }
    }

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setToast("");
    }, 2200);

    return () => window.clearTimeout(timerId);
  }, [toast]);

  useEffect(() => {
    if (
      !ageAccepted ||
      newsletterDismissed ||
      newsletterOpen ||
      menuOpen ||
      transitionPhase !== "idle" ||
      screen !== "home"
    ) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setNewsletterOpen(true);
    }, 2600);

    return () => window.clearTimeout(timerId);
  }, [
    ageAccepted,
    menuOpen,
    newsletterDismissed,
    newsletterOpen,
    screen,
    transitionPhase
  ]);

  useEffect(() => {
    if (screen === "products") {
      pushRoute("products", activeVariantId, true);
    }
  }, [activeVariantId, screen]);

  useEffect(() => {
    function handlePointerMove(event) {
      if (window.innerWidth < 980 || !ageAccepted) {
        return;
      }

      const trigger = event.target.closest(
        "[data-cursor-label], [data-cursor-hit], button, a, input, label, select, textarea"
      );
      const interactive = Boolean(trigger);
      const label = interactive || menuOpen || newsletterOpen ? "" : "SCROLL\nTO NAVIGATE";
      const large = !interactive && trigger?.dataset.cursorVariant === "large";

      pointerPayload.current = {
        x: event.clientX,
        y: event.clientY,
        visible: true,
        label,
        large,
        interactive
      };

      if (pointerFrame.current) {
        return;
      }

      pointerFrame.current = window.requestAnimationFrame(() => {
        pointerFrame.current = 0;

        if (!pointerPayload.current) {
          return;
        }

        setPointer((current) => ({
          ...current,
          ...pointerPayload.current
        }));
      });
    }

    function handlePointerDown() {
      setPointer((current) => ({ ...current, pressed: true }));
    }

    function handlePointerUp() {
      setPointer((current) => ({ ...current, pressed: false }));
    }

    function handleMouseLeave() {
      setPointer((current) => ({ ...current, visible: false }));
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.cancelAnimationFrame(pointerFrame.current);
    };
  }, [ageAccepted, menuOpen, newsletterOpen, screen]);

  function clearTransitionTimers() {
    window.clearTimeout(transitionTimer.current);
    window.clearTimeout(settleTimer.current);
  }

  function runScreenTransition(nextScreen, options = {}) {
    const variantId = options.variantId || activeVariantId;
    const homeSceneIndex = options.homeSceneIndex ?? 0;
    const replace = options.replace || false;

    clearTransitionTimers();
    setMenuOpen(false);
    setNewsletterOpen(false);
    setTransitionPhase("out");

    transitionTimer.current = window.setTimeout(() => {
      setScreen(nextScreen);

      if (nextScreen === "products") {
        setActiveVariantId(variantId);
      }

      pushRoute(nextScreen, variantId, replace);

      if (nextScreen === "home") {
        setHomeFocus({ index: homeSceneIndex, key: Date.now() });
      }

      setTransitionPhase("in");

      settleTimer.current = window.setTimeout(() => {
        setTransitionPhase("idle");
      }, 360);
    }, 320);
  }

  function handleAcceptAge() {
    writeFlag(AGE_KEY, true);
    setAgeClosing(true);

    window.setTimeout(() => {
      setAgeAccepted(true);
      setAgeClosing(false);
    }, 900);
  }

  function handleDismissNewsletter() {
    writeFlag(NEWS_KEY, true);
    setNewsletterDismissed(true);
    setNewsletterOpen(false);
  }

  function handleCompleteNewsletter() {
    writeFlag(NEWS_KEY, true);
    setNewsletterDismissed(true);
    setNewsletterOpen(false);
    setToast("Subscribed to the After Hours List.");
  }

  function handleOpenProducts(variantId = "gold-reserve") {
    const nextVariant = getVariantById(variantId).id;

    if (screen === "products") {
      setActiveVariantId(nextVariant);
      pushRoute("products", nextVariant, true);
      return;
    }

    runScreenTransition("products", { variantId: nextVariant });
  }

  function handleReturnHome(sceneIndex = 0) {
    if (screen === "home") {
      setHomeFocus({ index: sceneIndex, key: Date.now() });
      return;
    }

    runScreenTransition("home", { homeSceneIndex: sceneIndex });
  }

  function handleMenuSelect(item) {
    setMenuOpen(false);

    if (item.type === "products") {
      handleOpenProducts(item.variantId);
      return;
    }

    handleReturnHome(item.sceneIndex);
  }

  function handleAddToCart(variant) {
    if (variant.kind === "coming-soon") {
      setToast("This bottle is still aging.");
      return;
    }

    const nextCount = cartCount + 1;
    setCartCount(nextCount);
    writeCartCount(nextCount);
    setToast(`${variant.title} added to your crate.`);
  }

  function handleBagClick() {
    handleOpenProducts(activeVariantId);
  }

  const showChrome = ageAccepted;
  const showCursor =
    ageAccepted &&
    transitionPhase === "idle" &&
    typeof window !== "undefined" &&
    window.innerWidth >= 980;

  return (
    <div className={`app screen--${screen}`}>
      {!ageAccepted ? <AgeGate closing={ageClosing} onAccept={handleAcceptAge} /> : null}

      {showChrome ? (
        <SiteChrome
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((value) => !value)}
          onLogoClick={() => handleReturnHome(0)}
          onBagClick={handleBagClick}
          onNewsletterOpen={() => setNewsletterOpen(true)}
          cartCount={cartCount}
          screen={screen}
        />
      ) : null}

      {ageAccepted && screen === "home" ? (
        <HomeExperience
          focusScene={homeFocus}
          disabled={menuOpen || newsletterOpen || transitionPhase !== "idle"}
          onOpenProduct={handleOpenProducts}
        />
      ) : null}

      {ageAccepted && screen === "products" ? (
        <ProductExperience
          activeVariantId={activeVariantId}
          onVariantChange={setActiveVariantId}
          onAddToCart={handleAddToCart}
        />
      ) : null}

      <NewsletterModal
        open={newsletterOpen}
        onDismiss={handleDismissNewsletter}
        onComplete={handleCompleteNewsletter}
      />

      <MenuOverlay
        open={menuOpen}
        items={brandMenuItems}
        onClose={() => setMenuOpen(false)}
        onSelect={handleMenuSelect}
      />

      <div className={`transition-curtain transition-curtain--${transitionPhase}`} />

      {showCursor ? (
        <div
          className={`custom-cursor ${pointer.large ? "is-large" : ""} ${pointer.pressed ? "is-pressed" : ""} ${pointer.visible ? "is-visible" : ""} ${pointer.interactive ? "is-interactive" : ""}`}
          style={{
            transform: `translate3d(${pointer.x}px, ${pointer.y}px, 0)`
          }}
        >
          <div className="custom-cursor__ring" />
          <div className="custom-cursor__label">{pointer.label}</div>
        </div>
      ) : null}

      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}
