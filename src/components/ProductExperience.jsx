import { useEffect, useState } from "react";
import { getVariantById, productVariants } from "../data/siteData";
import MediaImage from "./MediaImage";
import OutlineButton from "./OutlineButton";

function wrapIndex(index) {
  if (index < 0) {
    return productVariants.length - 1;
  }

  if (index >= productVariants.length) {
    return 0;
  }

  return index;
}

function ProductVisual({ variant }) {
  if (variant.kind === "coming-soon") {
    return (
      <div className="product-visual product-visual--coming">
        <div className="product-visual__silhouettes">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (variant.kind === "box") {
    return (
      <div className="product-visual product-visual--box">
        <div className="product-box">
          <div className="product-box__front">{variant.boxLabel}</div>
          <div className="product-box__side">OLD MONK</div>
        </div>
        <div className="product-box__bottles">
          {variant.bundleImages.map((image, index) => (
            <MediaImage
              key={`${variant.id}-${index}`}
              src={image}
              alt=""
              className="product-box__bottle"
              sizes="5rem"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="product-visual product-visual--single">
      <MediaImage
        src={variant.image}
        alt={variant.title}
        className={`product-visual__image product-visual__image--${variant.id}`}
        sizes="34vw"
      />
    </div>
  );
}

export default function ProductExperience({
  activeVariantId,
  onVariantChange,
  onAddToCart
}) {
  const [animationKey, setAnimationKey] = useState(0);
  const activeVariant = getVariantById(activeVariantId);
  const activeIndex = productVariants.findIndex(
    (variant) => variant.id === activeVariant.id
  );

  useEffect(() => {
    setAnimationKey((value) => value + 1);
  }, [activeVariantId]);

  function handleMove(step) {
    const nextVariant = productVariants[wrapIndex(activeIndex + step)];
    onVariantChange(nextVariant.id);
  }

  return (
    <section
      className="product-experience"
      style={{
        "--product-theme": activeVariant.theme,
        "--product-accent": activeVariant.accent
      }}
    >
      <div className="product-experience__wordmark">{activeVariant.brand}</div>
      <div className="product-experience__content" key={animationKey}>
        <button
          type="button"
          className="product-arrow product-arrow--left"
          onClick={() => handleMove(-1)}
          data-cursor-label={"PREV"}
          data-cursor-variant="large"
        >
          <span>&lsaquo;</span>
        </button>

        <div className="product-experience__panel">
          <div className="product-experience__header">
            <span className="product-experience__label">THE CELLAR</span>
            <span className="product-experience__badge">{activeVariant.badge}</span>
          </div>

          <ProductVisual variant={activeVariant} />

          <div className="product-experience__details">
            <h2>{activeVariant.title}</h2>
            <p className="product-experience__script">{activeVariant.script}</p>
            {activeVariant.price ? (
              <p className="product-experience__price">{activeVariant.price}</p>
            ) : (
              <p className="product-experience__price product-experience__price--muted">
                Still aging
              </p>
            )}
            <OutlineButton
              type="button"
              onClick={() => onAddToCart(activeVariant)}
              disabled={activeVariant.kind === "coming-soon"}
              data-cursor-label={
                activeVariant.kind === "coming-soon" ? "SOON" : "ADD\nTO CRATE"
              }
            >
              {activeVariant.kind === "coming-soon" ? "COMING SOON" : "ADD TO CRATE"}
            </OutlineButton>
          </div>

          <div className="product-experience__progress">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <div className="product-experience__track">
              <div
                className="product-experience__fill"
                style={{
                  transform: `scaleX(${(activeIndex + 1) / productVariants.length})`
                }}
              />
            </div>
            <span>{String(productVariants.length).padStart(2, "0")}</span>
          </div>
        </div>

        <button
          type="button"
          className="product-arrow product-arrow--right"
          onClick={() => handleMove(1)}
          data-cursor-label={"NEXT"}
          data-cursor-variant="large"
        >
          <span>&rsaquo;</span>
        </button>
      </div>
    </section>
  );
}
