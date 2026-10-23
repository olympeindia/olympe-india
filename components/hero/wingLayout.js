// The wing image's own aspect ratio (1057x1223) — used with CSS
// `aspect-ratio` + a width-only percentage so a wing's box always
// reproduces the asset's true proportions regardless of viewport shape
// (an independent height percentage only matches at one exact aspect
// ratio, which is what caused an earlier "curtain" misread).
export const WING_ASPECT = "1057/1223";
