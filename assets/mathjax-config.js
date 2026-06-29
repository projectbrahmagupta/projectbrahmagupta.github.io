/* Shared MathJax 3 setup for TeX from problems/p###.tex: \(…\), \[…\], $…$, $$…$$. */
window.MathJax = {
  tex: {
    inlineMath: [
      ["\\(", "\\)"],
      ["$", "$"],
    ],
    displayMath: [
      ["\\[", "\\]"],
      ["$$", "$$"],
    ],
    processEscapes: true,
    processEnvironments: true,
    tags: "none",
  },
  options: {
    skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"],
  },
  startup: { typeset: false },
};
