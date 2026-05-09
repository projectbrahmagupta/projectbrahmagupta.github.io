/**
 * Site-wide presentation toggle.
 *
 * Set `mode` to:
 *   - "contributions" — homepage emphasizes submissions; Archive is not in the nav.
 *   - "problems" — daily problem flow, archive in nav, classic hero + renderIndex().
 *
 * Optional `homeDocument` adjusts &lt;title&gt; and meta description on index.html only.
 */
window.SITE_CONFIG = {
  mode: "contributions",
  // mode: "problems",

  homeDocument: {
    contributions: {
      title: "Project Brahmagupta — contribute problems from Indian mathematics",
      description:
        "Help build a collection of problems from the Indian mathematical tradition — classical sources, translations, and original pieces.",
    },
    problems: {
      title: "Project Brahmagupta — daily problems from Indian mathematics",
      description:
        "One problem each morning from the Indian mathematical tradition — 108 days, India Standard Time.",
    },
  },
};
