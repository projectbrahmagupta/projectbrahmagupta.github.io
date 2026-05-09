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
      title: "Project Brahmagupta",
      description:
        "Problems in mathematics and computation, inspired by the classical Indian tradition of ganita.",
    },
    problems: {
      title: "Project Brahmagupta",
      description:
        "One problem per day from a series in mathematics and computation, grounded in Indian mathematical sources.",
    },
  },
};
