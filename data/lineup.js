// Confirmed campaign lineup, in campaign hierarchy order (not the asset
// filename order — the filenames do not correspond to billing).
// `image` points at the supplied campaign photography; nothing here is
// generated or substituted artwork.

// The story posters are all 1080x1920 (9:16), confirmed by reading each
// file's own dimensions.
export const ARTIST_ASPECT_RATIO = "9 / 16";

const STORY = "/assets/olympe/artists/story";

export const LINEUP = [
  { index: 1, name: "OGUZ", image: `${STORY}/oguz.jpg` },
  { index: 2, name: "REBEKAH", image: `${STORY}/rebekah.jpg` },
  { index: 3, name: "STAN CHRIST", image: `${STORY}/stan-christ.jpg` },
  { index: 4, name: "TANJA MIJU", image: `${STORY}/tanja-miju.jpg` },
  { index: 5, name: "KETTING", image: `${STORY}/ketting.jpg` },
  { index: 6, name: "KIM AHLF", image: `${STORY}/kim-ahlf.jpg` },
  { index: 7, name: "SIDEJOU", image: `${STORY}/sidejou.jpg` },
  { index: 8, name: "BAKI", image: `${STORY}/baki.jpg` },
  { index: 9, name: "34 EMOTIONS", image: `${STORY}/34-emotions.jpg` },
];
