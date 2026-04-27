export const brandMenuItems = [
  {
    id: "collection",
    label: "Dark Reserve",
    type: "products",
    variantId: "gold-reserve",
    hint: "AGED DARK RUM FOR LATE-NIGHT POURS.",
    hintSide: "left"
  },
  {
    id: "cases",
    label: "Collector Cases",
    type: "products",
    variantId: "midnight-trio",
    hint: "BUILD A BAR WORTH PASSING DOWN.",
    hintSide: "right"
  },
  {
    id: "legend",
    label: "The Legend",
    type: "home",
    sceneIndex: 1,
    hint: "THE STORY BEHIND THE CULT LABEL.",
    hintSide: "left"
  },
  {
    id: "after-hours",
    label: "After Hours",
    type: "home",
    sceneIndex: 4,
    hint: "WE ARE OLD MONK RESERVE ROOM.",
    hintSide: "right"
  }
];

export const homeScenes = [
  { id: "hero", name: "Hero" },
  { id: "story", name: "Story" },
  { id: "collection", name: "Collection" },
  { id: "crafted", name: "Crafted" },
  { id: "media", name: "Media" },
  { id: "cta", name: "Final CTA" }
];

export const mediaFrames = [
  {
    id: "reserve-table",
    src: "/media/SS-ithequeen-redblend-table.jpg",
    alt: "Old Monk Gold Reserve in a cinematic still life",
    fit: "cover"
  },
  {
    id: "gold-reserve",
    src: "/media/SS-ithequeen-redblend.png",
    alt: "Old Monk Gold Reserve bottle",
    fit: "contain"
  },
  {
    id: "solan-black",
    src: "/media/SS-ithequeen-rose.png",
    alt: "Solan Black bottle",
    fit: "contain"
  },
  {
    id: "white-rum",
    src: "/media/SS-ithequeen-chardonnay.png",
    alt: "Old Monk White Rum bottle",
    fit: "contain"
  }
];

export const productVariants = [
  {
    id: "gold-reserve",
    brand: "OLD MONK",
    title: "Gold Reserve",
    script: "7 Years Old Blended",
    price: "$24.99",
    theme: "#090807",
    accent: "#c08a35",
    image: "/media/SS-ithequeen-redblend.png",
    kind: "single",
    badge: "750 ML | dark rum"
  },
  {
    id: "solan-black",
    brand: "SOLAN BLACK",
    title: "Solan Black",
    script: "Rare & Premium Whisky",
    price: "$29.99",
    theme: "#0b0b0c",
    accent: "#b88d43",
    image: "/media/SS-ithequeen-rose.png",
    kind: "single",
    badge: "750 ML | whisky"
  },
  {
    id: "white-rum",
    brand: "OLD MONK",
    title: "White Rum",
    script: "Premium White Rum",
    price: "$21.99",
    theme: "#d7d0c4",
    accent: "#fff2d7",
    image: "/media/SS-ithequeen-chardonnay.png",
    kind: "single",
    badge: "750 ML | white rum"
  },
  {
    id: "midnight-trio",
    brand: "OLD MONK",
    title: "Midnight Trio",
    script: "Collector crate",
    price: "$90.97",
    theme: "#100d09",
    accent: "#d4aa63",
    image: "/media/SS-ithequeen-redblend.png",
    kind: "box",
    boxLabel: "TRIO",
    bundleImages: [
      "/media/SS-ithequeen-redblend.png",
      "/media/SS-ithequeen-rose.png",
      "/media/SS-ithequeen-chardonnay.png"
    ],
    badge: "3 bottles | collector crate"
  },
  {
    id: "gold-reserve-case",
    brand: "OLD MONK",
    title: "Gold Reserve Duo",
    script: "Gold reserve case",
    price: "$58.99",
    theme: "#2a180d",
    accent: "#d19a4b",
    image: "/media/SS-ithequeen-redblend.png",
    kind: "box",
    boxLabel: "GOLD",
    bundleImages: ["/media/SS-ithequeen-redblend.png", "/media/SS-ithequeen-redblend.png"],
    badge: "2 bottles | reserve case"
  },
  {
    id: "solan-black-case",
    brand: "SOLAN BLACK",
    title: "Solan Black Duo",
    script: "Black cask case",
    price: "$62.99",
    theme: "#161311",
    accent: "#d7ad64",
    image: "/media/SS-ithequeen-rose.png",
    kind: "box",
    boxLabel: "BLACK",
    bundleImages: ["/media/SS-ithequeen-rose.png", "/media/SS-ithequeen-rose.png"],
    badge: "2 bottles | reserve case"
  },
  {
    id: "white-rum-case",
    brand: "OLD MONK",
    title: "White Rum Duo",
    script: "White rum case",
    price: "$56.99",
    theme: "#b8b0a0",
    accent: "#fff2d7",
    image: "/media/SS-ithequeen-chardonnay.png",
    kind: "box",
    boxLabel: "WHITE",
    bundleImages: [
      "/media/SS-ithequeen-chardonnay.png",
      "/media/SS-ithequeen-chardonnay.png"
    ],
    badge: "2 bottles | reserve case"
  },
  {
    id: "legend-reserve",
    brand: "OLD MONK",
    title: "Legend Reserve",
    script: "Coming soon",
    price: "",
    theme: "#0b0908",
    accent: "#6e6256",
    image: "",
    kind: "coming-soon",
    badge: "Still aging"
  }
];

export const featuredCards = productVariants.slice(0, 3);

export function getVariantById(variantId) {
  return (
    productVariants.find((variant) => variant.id === variantId) ?? productVariants[0]
  );
}
