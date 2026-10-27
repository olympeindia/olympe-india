// Single source of truth for confirmed event facts.
// No dates, cities, or claims beyond what has been confirmed should be added here.

export const EVENT = {
  title: "OLYMPE INDIA",
  presenter: "SIDEJOU INVITES",
  // Per-city ticket destinations — the exact URLs supplied for this
  // build. Nothing else in the project should hardcode a ticket link;
  // every CTA reads from here.
  dates: [
    {
      date: "27 NOV",
      city: "DELHI",
      ticketUrl:
        "https://www.skillboxes.com/events/olympe-india-x-sidejou-invites-sbnnehpv",
      directionsUrl: "https://share.google/9bhhqrNCDn8M5kUl4",
    },
    {
      date: "28 NOV",
      city: "BENGALURU",
      ticketUrl:
        "https://sortmyscene.com/event/olympe-india-x-sidejou-invites-to-be-announced-bengaluru-nov-28-2026",
      directionsUrl: "https://share.google/OWbB5tvi5bgvX8U3A",
    },
  ],
  tagline: "MUSIC / ART / CULTURE / BEYOND",
  // Corner labels, reproduced verbatim from the supplied hero reference
  // composition (the reference is the source of truth for this copy).
  cornerLabelLeft: ["A", "HIGHER", "FREQUENCY"],
  cornerLabelRight: ["DELHI", "BENGALURU", "INDIA", "2026"],
  // Also read directly off the reference composition — the right-side
  // vertical label lower on the frame, distinct from the corner label.
  experienceLabel: ["PEOPLE", "SOUND", "PLACES", "BEYOND"],
  // No real Instagram URLs have been supplied for this build. Left null
  // on purpose rather than guessed — the footer renders these as plain
  // (non-linked) labels until real handles are provided.
  social: {
    olympeIndia: null,
    sidejou: null,
  },
};

const CITY_ROUTES = {
  bangalore: "BENGALURU",
  delhi: "DELHI",
};

export function getEventForCity(route) {
  const city = CITY_ROUTES[route];
  const cityEvent = EVENT.dates.find((entry) => entry.city === city);

  if (!cityEvent) return null;

  return {
    ...EVENT,
    dates: [cityEvent],
    cornerLabelRight: [cityEvent.city, "INDIA", "2026"],
  };
}
