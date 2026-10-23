// Central mapping for the supplied OLYMPE event photography and video.
// Every path lives here so components never hardcode an asset URL.
//
// Provenance: these photos come from past OLYMPE RAVE nights (the
// supplied "Olympe Rave" archive). They are NOT from Delhi or Bengaluru —
// captions must never imply a city. Performers in these photos are
// unidentified, so none of them are mapped to lineup artists.
//
// `position` is the CSS object-position focal point used when a
// portrait original is cropped into a wider frame.

const PHOTO = "/assets/olympe";

export const MEDIA_CAPTION = "OLYMPE — PAST NIGHTS";

export const heroImage = {
  src: `${PHOTO}/hero/IMG_3207.JPG`,
  width: 1365,
  height: 1820,
  alt: "A DJ mixing under orange haze and a single beam of light at an OLYMPE night",
  position: "60% 55%",
};

export const introImages = {
  primary: {
    src: `${PHOTO}/events/IMG_3191.JPG`,
    width: 1440,
    height: 1799,
    alt: "A warm orange crowd gathered beneath stage truss and smoke",
    position: "50% 60%",
  },
  secondary: {
    src: `${PHOTO}/events/IMG_3194.JPG`,
    width: 1440,
    height: 1799,
    alt: "Two people holding each other tightly on the dancefloor",
    position: "50% 45%",
  },
};

export const delhiEventImage = {
  src: `${PHOTO}/events/IMG_3202.JPG`,
  width: 1365,
  height: 1820,
  alt: "Dancers with arms raised beneath a red illuminated ceiling grid",
  position: "50% 40%",
};

export const bengaluruEventImage = {
  src: `${PHOTO}/events/IMG_3197.JPG`,
  width: 1440,
  height: 1799,
  alt: "A laughing raver in sunglasses lit by golden stage light",
  position: "50% 45%",
};

// Ordered for the editorial grid: `size` drives the span on desktop
// ("tall" = 2 rows, "wide" = 2 columns, "large" = 2×2, "base" = 1×1).
export const galleryImages = [
  {
    src: `${PHOTO}/gallery/IMG_3209.JPG`,
    width: 984,
    height: 1312,
    size: "large",
    alt: "A masked guitarist performing under deep red light",
    position: "45% 40%",
  },
  {
    src: `${PHOTO}/gallery/IMG_3190.JPG`,
    width: 1440,
    height: 1799,
    size: "tall",
    alt: "A raver in dark sunglasses and lace, backlit by orange haze",
    position: "60% 40%",
  },
  {
    src: `${PHOTO}/gallery/IMG_3203.JPG`,
    width: 1365,
    height: 1820,
    size: "base",
    alt: "A worn mask resting on a performer's gear table in red light",
    position: "50% 55%",
  },
  {
    src: `${PHOTO}/gallery/IMG_3201.JPG`,
    width: 986,
    height: 1314,
    size: "base",
    alt: "A dancer with eyes closed in a sea of red light",
    position: "40% 30%",
  },
  {
    src: `${PHOTO}/gallery/IMG_3192.JPG`,
    width: 1440,
    height: 1799,
    size: "wide",
    alt: "A raver in a sequinned skirt dancing through the crowd",
    position: "40% 30%",
  },
  {
    src: `${PHOTO}/gallery/IMG_3205.JPG`,
    width: 1365,
    height: 1820,
    size: "tall",
    alt: "A dancer reaching toward the camera beside the DJ booth in blue light",
    position: "50% 45%",
  },
  {
    src: `${PHOTO}/gallery/IMG_3193.JPG`,
    width: 1440,
    height: 1799,
    size: "base",
    alt: "A raver with locs smiling mid-dance in warm light",
    position: "50% 35%",
  },
  {
    src: `${PHOTO}/gallery/IMG_3204.JPG`,
    width: 978,
    height: 1304,
    size: "base",
    alt: "A tattooed raver posing with friends under red light",
    position: "50% 40%",
  },
  {
    src: `${PHOTO}/gallery/IMG_3196.JPG`,
    width: 1440,
    height: 1799,
    size: "tall",
    alt: "A raver with one arm raised against a concrete pillar",
    position: "50% 40%",
  },
  {
    src: `${PHOTO}/gallery/IMG_3198.JPG`,
    width: 1365,
    height: 1820,
    size: "base",
    alt: "A DJ at the controls in near darkness",
    position: "55% 50%",
  },
  {
    src: `${PHOTO}/gallery/IMG_3208.JPG`,
    width: 1365,
    height: 1820,
    size: "wide",
    alt: "A raver in plaid and sunglasses under a blue illuminated ceiling grid",
    position: "45% 45%",
  },
  {
    src: `${PHOTO}/gallery/IMG_3195.JPG`,
    width: 1440,
    height: 1799,
    size: "base",
    alt: "A dancer with braids twirling in amber light",
    position: "50% 30%",
  },
  {
    src: `${PHOTO}/gallery/IMG_3206.JPG`,
    width: 982,
    height: 1309,
    size: "base",
    alt: "Two friends posing in red light, one in a patterned face covering",
    position: "50% 40%",
  },
];

// Click-to-play only. Contents of these clips have not been visually
// reviewed (no video tooling was available) — confirm before launch.
export const eventVideos = [
  { src: `${PHOTO}/video/olympe-clip-01.mp4`, label: "CLIP 01" },
  { src: `${PHOTO}/video/olympe-clip-02.mp4`, label: "CLIP 02" },
  { src: `${PHOTO}/video/olympe-clip-03.mp4`, label: "CLIP 03" },
  { src: `${PHOTO}/video/olympe-clip-04.mp4`, label: "CLIP 04" },
  // Uppercase extension matches the supplied file — paths are case-sensitive.
  { src: `${PHOTO}/video/olympe-clip-05.MP4`, label: "CLIP 05" },
];

export const brandImages = {
  detail: {
    src: `${PHOTO}/brand/IMG_3217.JPG`,
    width: 1366,
    height: 1707,
    alt: "Close-up of an OLYMPE RAVE T-shirt worn with mesh sleeves and fingerless gloves",
    position: "50% 45%",
  },
};
