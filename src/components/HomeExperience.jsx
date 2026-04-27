import { useEffect, useRef, useState } from "react";
import { featuredCards, homeScenes, mediaFrames } from "../data/siteData";
import MediaImage, { mediaImageSet } from "./MediaImage";
import OutlineButton from "./OutlineButton";

const DESKTOP_BREAKPOINT = 980;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function HeroScene({ offset, mobile, onOpenProduct }) {
  return (
    <section
      className="scene scene--hero"
      style={{
        "--offset": offset,
        "--hero-bg-position": mobile ? "56% center" : "center center",
        "--hero-bg-image": mediaImageSet("/media/1-2560x1152.jpg"),
        "--hero-mobile-bg": mediaImageSet("/media/1xs.jpg")
      }}
      data-scene="hero"
    >
      <div className="scene__bg scene__bg--hero" />
      <div className="scene__shade" />
      <div className="scene__content scene__content--hero">
        <div className="scene__copy">
          <p className="scene__eyebrow" data-cursor-hit>
            AGED DARK RUM FOR AFTER-HOURS LEGENDS
          </p>
          <h2 className="display-title display-title--xl" data-cursor-hit>
            <span>POUR THE</span>
            <span>LEGEND</span>
          </h2>
          <div className="scene__button-row">
            <OutlineButton
              type="button"
              onClick={() => onOpenProduct("gold-reserve")}
              data-cursor-label={"EXPLORE\nRUM"}
              data-cursor-variant="large"
            >
              EXPLORE THE RESERVE
            </OutlineButton>
          </div>
          <p className="scene__footnote" data-cursor-hit>
            Dark caramel, vanilla warmth, and a cult-classic finish since 1954.
          </p>
        </div>
        {!mobile ? (
          <div className="scene__signature" data-cursor-hit>
            Made by Abhishek
          </div>
        ) : null}
      </div>
    </section>
  );
}

function StoryScene({ offset, mobile, onOpenProduct }) {
  const image = mobile ? "/media/SS-home-2-1-mobile.jpg" : "/media/SS-home-2-1.jpg";

  return (
    <section className="scene scene--story" style={{ "--offset": offset }} data-scene="story">
      <div className="scene__story-visual">
        <MediaImage
          src={image}
          alt="Old Monk portrait with glass"
          sizes={mobile ? "100vw" : "48vw"}
        />
      </div>
      <div className="scene__story-copy">
        <h2 className="display-title display-title--serif" data-cursor-hit>
          CULT STATUS.
          <br />
          WINTER NIGHTS.
          <br />
          SLOW POURS.
        </h2>
        <p data-cursor-hit>
          Old Monk belongs to shared glasses, midnight music, and stories that last
          longer than the evening. This experience turns that familiar ritual into
          a slow-moving cinematic journey.
        </p>
        <OutlineButton
          type="button"
          onClick={() => onOpenProduct("gold-reserve")}
          data-cursor-label={"DISCOVER"}
        >
          DISCOVER THE CELLAR
        </OutlineButton>
      </div>
    </section>
  );
}

function CollectionScene({ offset, onOpenProduct }) {
  return (
    <section
      className="scene scene--RUMS"
      style={{ "--offset": offset }}
      data-scene="collection"
    >
      <div className="scene--RUMS__wordmark">OLD MONK</div>
      <div className="scene--RUMS__cards">
        {featuredCards.map((card) => (
          <article key={card.id} className={`wine-card wine-card--${card.id}`}>
            <div className="wine-card__image-wrap">
              <MediaImage
                src={card.image}
                alt={card.title}
                className={`wine-card__image wine-card__image--${card.id}`}
                eager
                sizes="(max-width: 640px) 54vw, (max-width: 979px) 30vw, 22vw"
              />
            </div>
            <div className="wine-card__meta">
              <h3 data-cursor-hit>{card.title}</h3>
              <p data-cursor-hit>{card.price}</p>
              <OutlineButton
                type="button"
                onClick={() => onOpenProduct(card.id)}
                data-cursor-label={card.title.toUpperCase()}
              >
                SHOP NOW
              </OutlineButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CraftedScene({ offset, mobile, onOpenProduct }) {
  const active = offset < 0.8;
  const image = mobile
    ? "/media/SS-ithequeen-redblend-table-mobile.jpg"
    : "/media/SS-ithequeen-redblend-table.jpg";

  return (
    <section
      className={`scene scene--crafted ${active ? "is-active" : ""}`}
      style={{ "--offset": offset }}
      data-scene="crafted"
    >
      <div className="scene--crafted__content">
        <div className="scene--crafted__copy">
          <h2
            className="display-title display-title--xl small-tight scene--crafted__reveal"
            style={{ "--item-index": 0 }}
            data-cursor-hit
          >
            AGED IN OAK
          </h2>
          <p
            className="scene--crafted__caption scene--crafted__reveal"
            style={{ "--item-index": 1 }}
            data-cursor-hit
          >
            BUILT FOR SLOW POURS
          </p>
          <p
            className="scene--crafted__reveal"
            style={{ "--item-index": 2 }}
            data-cursor-hit
          >
            From Gold Reserve depth to White Rum brightness, the lineup leans into
            molasses warmth, vanilla lift, toasted spice, and a finish that lingers.
          </p>
          <div className="scene--crafted__reveal" style={{ "--item-index": 3 }}>
            <OutlineButton
              type="button"
              onClick={() => onOpenProduct("white-rum")}
              data-cursor-label={"EXPLORE"}
            >
              EXPLORE THE BOTTLES
            </OutlineButton>
          </div>
        </div>
        <div className="scene--crafted__image">
          <MediaImage
            src={image}
            alt="Styled Old Monk bottle arrangement"
            sizes={mobile ? "100vw" : "48vw"}
          />
        </div>
      </div>
    </section>
  );
}

function MediaScene({ offset, onOpenProduct }) {
  const [playing, setPlaying] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const active = Math.abs(offset) < 0.4;

  useEffect(() => {
    if (active) {
      setPlaying(true);
    }
  }, [active]);

  useEffect(() => {
    if (!active) {
      setFrameIndex(0);
    }
  }, [active]);

  useEffect(() => {
    if (!playing || !active) {
      return;
    }

    const timerId = window.setInterval(() => {
      setFrameIndex((value) => (value + 1) % mediaFrames.length);
    }, 1800);

    return () => window.clearInterval(timerId);
  }, [active, playing]);

  return (
    <section className="scene scene--media" style={{ "--offset": offset }} data-scene="media">
      <div className="scene--media__still">
        <MediaImage
          src="/media/SS-ithequeen-redblend-table.jpg"
          alt="Old Monk still life"
          sizes="100vw"
        />
      </div>
      <div className={`scene--media__video-shell ${playing ? "is-playing" : ""}`}>
        <div className="scene--media__reel">
          {mediaFrames.map((frame, index) => (
            <div
              key={frame.id}
              className={`scene--media__frame scene--media__frame--${frame.fit} ${index === frameIndex ? "is-active" : ""}`}
            >
              <MediaImage src={frame.src} alt={frame.alt} sizes="73vw" />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="scene--media__play"
          onClick={() => setPlaying((value) => !value)}
          data-cursor-label={playing ? "PAUSE" : "PLAY"}
        >
          <span>{playing ? "PAUSE THE REEL" : "PLAY THE REEL"}</span>
        </button>
      </div>
      <div className="scene--media__callout">
        <OutlineButton
          type="button"
          onClick={() => onOpenProduct("midnight-trio")}
          data-cursor-label={"VIEW"}
        >
          VIEW COLLECTOR CASES
        </OutlineButton>
      </div>
    </section>
  );
}

function FinalScene({ offset, onOpenProduct }) {
  const active = offset < 0.8;

  return (
    <section
      className={`scene scene--final ${active ? "is-active" : ""}`}
      style={{ "--offset": offset }}
      data-scene="cta"
    >
      <div className="scene--final__copy">
        <h2
          className="display-title display-title--xl scene--final__reveal"
          style={{ "--item-index": 0 }}
          data-cursor-hit
        >
          <span>READY FOR</span>
          <span>AFTER HOURS?</span>
        </h2>
        <div className="scene--final__reveal" style={{ "--item-index": 1 }}>
          <OutlineButton
            type="button"
            onClick={() => onOpenProduct("gold-reserve")}
            data-cursor-label={"SHOP\nRUM"}
            data-cursor-variant="large"
          >
            SHOP THE RESERVE
          </OutlineButton>
        </div>
        <div className="scene--final__meta scene--final__reveal" style={{ "--item-index": 2 }}>
          <span>OLD MONK | SINCE 1954</span>
          <span>GOLD RESERVE | SOLAN BLACK | WHITE RUM</span>
          <span>SIP RESPONSIBLY</span>
        </div>
      </div>
      <div className="scene--final__image">
        <MediaImage src="/media/newsoon.jpg" alt="Old Monk collector portrait" sizes="54vw" />
      </div>
      <footer className="scene--final__footer">
        <span>2026©OLD MONK</span>
        <span>ABHISHEK-FULL STACK DEVELOPER</span>
        <a href="mailto:pandeya71404@gmail.com" data-cursor-label={"EMAIL"}>
          PANDEYA71404@GMAIL.COM
        </a>
        <a href="tel:+919106657309" data-cursor-label={"CALL"}>
          +91 9106657309
        </a>
      </footer>
    </section>
  );
}

function SceneDesktop({ progress, onOpenProduct }) {
  const sections = homeScenes.map((scene) => scene.id);

  return (
    <div className="home-stage home-stage--desktop">
      {sections.map((sceneId, index) => {
        const offset = index - progress;
        const nearViewport = Math.abs(offset) < 1.45;

        if (!nearViewport) {
          return null;
        }

        if (sceneId === "hero") {
          return <HeroScene key={sceneId} offset={offset} onOpenProduct={onOpenProduct} />;
        }

        if (sceneId === "story") {
          return <StoryScene key={sceneId} offset={offset} onOpenProduct={onOpenProduct} />;
        }

        if (sceneId === "collection") {
          return (
            <CollectionScene key={sceneId} offset={offset} onOpenProduct={onOpenProduct} />
          );
        }

        if (sceneId === "crafted") {
          return <CraftedScene key={sceneId} offset={offset} onOpenProduct={onOpenProduct} />;
        }

        if (sceneId === "media") {
          return <MediaScene key={sceneId} offset={offset} onOpenProduct={onOpenProduct} />;
        }

        return <FinalScene key={sceneId} offset={offset} onOpenProduct={onOpenProduct} />;
      })}
    </div>
  );
}

function SceneMobile({ onOpenProduct, sectionRefs }) {
  return (
    <div className="home-stage home-stage--mobile">
      <div ref={(node) => (sectionRefs.current[0] = node)}>
        <HeroScene offset={0} mobile onOpenProduct={onOpenProduct} />
      </div>
      <div ref={(node) => (sectionRefs.current[1] = node)}>
        <StoryScene offset={0} mobile onOpenProduct={onOpenProduct} />
      </div>
      <div ref={(node) => (sectionRefs.current[2] = node)}>
        <CollectionScene offset={0} onOpenProduct={onOpenProduct} />
      </div>
      <div ref={(node) => (sectionRefs.current[3] = node)}>
        <CraftedScene offset={0} mobile onOpenProduct={onOpenProduct} />
      </div>
      <div ref={(node) => (sectionRefs.current[4] = node)}>
        <MediaScene offset={0} onOpenProduct={onOpenProduct} />
      </div>
      <div ref={(node) => (sectionRefs.current[5] = node)}>
        <FinalScene offset={0} onOpenProduct={onOpenProduct} />
      </div>
    </div>
  );
}

export default function HomeExperience({
  focusScene,
  disabled,
  onOpenProduct
}) {
  const [isDesktop, setIsDesktop] = useState(
    typeof window === "undefined" ? true : window.innerWidth >= DESKTOP_BREAKPOINT
  );
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!focusScene) {
      return;
    }

    if (isDesktop) {
      targetRef.current = focusScene.index;
    } else {
      sectionRefs.current[focusScene.index]?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [focusScene, isDesktop]);

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    let frameId = 0;

    function tick() {
      const difference = targetRef.current - currentRef.current;

      if (Math.abs(difference) < 0.001) {
        if (currentRef.current !== targetRef.current) {
          currentRef.current = targetRef.current;
          setProgress(targetRef.current);
        }

        frameId = window.requestAnimationFrame(tick);
        return;
      }

      const next =
        currentRef.current + difference * 0.1;

      currentRef.current = next;

      setProgress(currentRef.current);
      frameId = window.requestAnimationFrame(tick);
    }

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop || disabled) {
      return;
    }

    function handleWheel(event) {
      event.preventDefault();
      targetRef.current = clamp(
        targetRef.current + event.deltaY * 0.0012,
        0,
        homeScenes.length - 1
      );
    }

    function handleKeyDown(event) {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        targetRef.current = clamp(targetRef.current + 1, 0, homeScenes.length - 1);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        targetRef.current = clamp(targetRef.current - 1, 0, homeScenes.length - 1);
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disabled, isDesktop]);

  return isDesktop ? (
    <SceneDesktop progress={progress} onOpenProduct={onOpenProduct} />
  ) : (
    <SceneMobile onOpenProduct={onOpenProduct} sectionRefs={sectionRefs} />
  );
}
