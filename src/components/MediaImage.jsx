const MEDIA_PREFIX = "/media/";
const BASE_URL = import.meta.env.BASE_URL || "/";

function normalizedBasePath() {
  if (BASE_URL && BASE_URL !== "./") {
    const cleanBase = BASE_URL.startsWith("/") ? BASE_URL : `/${BASE_URL}`;
    return cleanBase.endsWith("/") ? cleanBase : `${cleanBase}/`;
  }

  if (typeof window === "undefined") {
    return "/";
  }

  const firstPathSegment = window.location.pathname.split("/").filter(Boolean)[0];
  return firstPathSegment ? `/${firstPathSegment}/` : "/";
}

export function publicAssetSrc(src) {
  if (!src || /^https?:\/\//i.test(src) || src.startsWith("data:") || src.startsWith("#")) {
    return src;
  }

  const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
  const path = `${normalizedBasePath()}${cleanSrc}`;

  if (typeof window === "undefined") {
    return path;
  }

  return new URL(path, window.location.origin).href;
}

export function optimizedMediaSrc(src) {
  if (!src || !src.startsWith(MEDIA_PREFIX)) {
    return publicAssetSrc(src);
  }

  const extensionIndex = src.lastIndexOf(".");

  if (extensionIndex === -1) {
    return publicAssetSrc(src);
  }

  return publicAssetSrc(
    `${MEDIA_PREFIX}optimized/${src.slice(MEDIA_PREFIX.length, extensionIndex)}.webp`
  );
}

export function mediaImageSet(src) {
  const optimized = optimizedMediaSrc(src);

  if (!optimized || optimized === src) {
    return `url("${publicAssetSrc(src)}")`;
  }

  return `image-set(url("${optimized}") type("image/webp"), url("${publicAssetSrc(src)}"))`;
}

export default function MediaImage({
  src,
  alt,
  className,
  eager = false,
  sizes,
  ...props
}) {
  const optimized = optimizedMediaSrc(src);
  const fallback = publicAssetSrc(src);
  const loading = eager ? "eager" : "lazy";
  const fetchPriority = eager ? "high" : "auto";

  if (!optimized || optimized === fallback) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        sizes={sizes}
        {...props}
      />
    );
  }

  return (
    <picture className="media-picture">
      <source srcSet={optimized} type="image/webp" sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        sizes={sizes}
        {...props}
      />
    </picture>
  );
}
