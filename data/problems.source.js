/* Project Brahmagupta — problem catalog (titles, tags, sources).
 * Statements ship from problems/p*.tex via npm run build:data.
 * Legacy HTML bodies below are only for the loader; published text comes from .tex files.
 */
"use strict";

const PROBLEMS = [
  /* ============================================================
   * § Śulba Sūtras  (1–8)
   * ============================================================ */
  {
    n: 1, source: "Baudhāyana Śulba Sūtra, 1.48",
    title: "The diagonal of the rectangle",
    tag: "geometry",
    body: `<p>Baudhāyana, in the oldest of the Śulba Sūtras, states what we now call the Pythagorean theorem in the language of altar-ropes:</p>
      <blockquote><em>dīrgha-caturasrasyākṣṇayārajjuḥ pārśvamānī tiryaṅmānī ca yat pṛthag-bhūte kurutas tad-ubhayaṃ karoti.</em><br/>"The rope stretched along the diagonal of an oblong produces an area that the vertical and horizontal sides separately produce."<cite>Baudhāyana ŚS 1.48</cite></blockquote>
      <p>A <em>primitive Pythagorean triple</em> is a triple <em>(a, b, c)</em> with <em>a² + b² = c²</em>, <em>gcd(a, b, c) = 1</em>, and <em>a &lt; b &lt; c</em>. How many primitive Pythagorean triples have hypotenuse <em>c</em> at most 1000?</p>`,
  },
  {
    n: 2, source: "Baudhāyana Śulba Sūtra, 2.12",
    title: "Doubling the square",
    tag: "geometry · approximation",
    body: `<p>The Śulba authors gave a remarkable approximation for √2 — the side of a square whose area doubles a unit square:</p>
      <p class="math">\\\\[ \\sqrt{2} \\approx 1 + \\frac{1}{3} + \\frac{1}{3 \\cdot 4} - \\frac{1}{3 \\cdot 4 \\cdot 34} = \\frac{577}{408}. \\\\]</p>
      <p>This rational, 577/408, is the seventh convergent of the continued fraction of √2. Let <em>p<sub>k</sub>/q<sub>k</sub></em> be the <em>k</em>-th convergent. What is the smallest <em>k</em> for which the convergent agrees with √2 to <strong>twenty</strong> decimal places (i.e. |√2 − p<sub>k</sub>/q<sub>k</sub>| &lt; 10⁻²⁰)?</p>`,
  },
  {
    n: 3, source: "Baudhāyana ŚS, 1.58 (citi-construction)",
    title: "The bricks of the falcon-altar",
    tag: "combinatorics · geometry",
    body: `<p>The śyenacit altar (falcon-shaped) is built up in five layers. Each layer must contain exactly 200 bricks, and no two consecutive layers may be laid in the same brick pattern.</p>
      <p>Suppose four distinct brick-patterns, A, B, C, D, are available, and each of the five layers must be assigned one of these patterns subject only to the rule that adjacent layers differ. In how many ways can the altar be built?</p>`,
  },
  {
    n: 4, source: "Mānava Śulba Sūtra",
    title: "Squaring the circle, the Śulba way",
    tag: "approximation · geometry",
    body: `<p>Mānava and others give the following construction for a square of area equal to a circle of diameter <em>d</em>:</p>
      <p class="math">\\\\[ side \\approx d - \\frac{d}{8} + \\frac{d}{8 \\cdot 29} - \\frac{d}{8 \\cdot 29 \\cdot 6} + \\frac{d}{8 \\cdot 29 \\cdot 6 \\cdot 8} . \\\\]</p>
      <p>This construction implies a value of π. Set <em>d = 1</em>; the construction gives a side length <em>s</em>, and equating areas (s² = π/4) gives π_Śulba = 4 s².</p>
      <p>Compute the integer ⌊10⁸ · π_Śulba⌋.</p>`,
  },
  {
    n: 5, source: "Āpastamba Śulba Sūtra",
    title: "Combining two squares",
    tag: "geometry",
    body: `<p>Āpastamba describes the construction of a single square equal in area to the <em>sum</em> of two given squares — a constructive proof of the Pythagorean theorem.</p>
      <p>You are given squares of sides <em>a₁, a₂, …, a₈</em> with</p>
      <p class="math">\\\\[ a_{1}=3, a_{2}=4, a_{3}=5, a_{4}=12, a_{5}=7, a_{6}=24, a_{7}=20, a_{8}=21. \\\\]</p>
      <p>Their total area is <em>A</em>. Find the side <em>s</em> of the single square of equal total area, where <em>s = √A</em>. The answer is an integer.</p>`,
  },
  {
    n: 6, source: "Baudhāyana ŚS, 1.61",
    title: "Subtracting one square from another",
    tag: "geometry · number theory",
    body: `<p>Given two squares of side <em>a</em> and <em>b</em> with <em>a &gt; b</em>, the Śulba sūtras give a construction for a square equal to the <em>difference</em> of the two — that is, a square of side <em>√(a² − b²)</em>.</p>
      <p>How many <strong>ordered</strong> pairs of positive integers <em>(a, b)</em> with <em>1 ≤ b &lt; a ≤ 100</em> are such that <em>a² − b²</em> is itself a perfect square?</p>`,
  },
  {
    n: 7, source: "in the spirit of Kātyāyana ŚS",
    title: "Stacking the layers",
    tag: "combinatorics",
    body: `<p>An altar is built from layers of bricks of three sizes: of "1 puruṣa", of "1/2 puruṣa", and of "1/3 puruṣa" (in some unit). The altar must total exactly <em>7½ puruṣa</em>.</p>
      <p>How many ordered sequences of bricks (using any number of each of the three sizes, with repetition permitted) total <em>7½ puruṣa</em> when laid in order?</p>
      <p>(Two sequences are different if the ordering differs, even with the same multiset of bricks.)</p>`,
  },
  {
    n: 8, source: "after Baudhāyana ŚS",
    title: "Pythagorean primitives in a band",
    tag: "number theory",
    body: `<p>Śulba authors knew the triples (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25), (12, 35, 37). All are <em>primitive</em>: their three sides share no common factor.</p>
      <p>Find the sum of the perimeters of all primitive Pythagorean triples whose <em>longest leg</em> is at most 100. (The legs of (3, 4, 5) are 3 and 4; the longest is 4.)</p>`,
  },

  /* ============================================================
   * § Jaina mathematics  (9–12)
   * ============================================================ */
  {
    n: 9, source: "Anuyogadvāra-sūtra",
    title: "The half-cuts (ardhaccheda)",
    tag: "logarithms · series",
    body: `<p>The Jaina canonical works defined the <em>ardhaccheda</em> of a positive integer <em>n</em> — the number of times <em>n</em> can be halved before reaching 1. Where the result is fractional, only complete halvings are counted; thus <em>ardhaccheda</em>(<em>n</em>) = ⌊log₂ <em>n</em>⌋.</p>
      <p>Compute</p>
      <p class="math">\\\\[ \\sum_{n=1}^{10000} ardhaccheda(n) . \\\\]</p>`,
  },
  {
    n: 10, source: "Sūryaprajñapti and Tattvārtha-sūtra",
    title: "Innumerable, but countable",
    tag: "large numbers",
    body: `<p>The Jaina cosmologists distinguished <em>countable</em> (saṃkhyeya), <em>innumerable</em> (asaṃkhyeya), and <em>infinite</em> (ananta) numbers, with elaborate sub-classifications of the innumerable. The smallest "innumerable" number, in some accounts, is <em>2<sup>2¹⁹⁶</sup></em>.</p>
      <p>Let <em>N = 2<sup>2¹⁹⁶</sup></em>. Find the number of <strong>decimal digits</strong> of <em>N</em>.</p>`,
  },
  {
    n: 11, source: "Bhagavatī-sūtra: enumeration of meters",
    title: "Meters of fixed length",
    tag: "combinatorics",
    body: `<p>In Sanskrit and Prakrit prosody, a syllable is either <em>laghu</em> (light, weight 1) or <em>guru</em> (heavy, weight 2). A <em>meter</em> of total weight <em>n</em> is a sequence of laghu/guru summing to <em>n</em>. (Piṅgala observed long before Fibonacci that the count satisfies <em>M(n) = M(n−1) + M(n−2)</em>.)</p>
      <p>Of all meters of total weight 30, how many contain <em>exactly</em> twelve heavy syllables?</p>`,
  },
  {
    n: 12, source: "Tattvārthādhigama-sūtra",
    title: "Time, measured in palya",
    tag: "arithmetic · large numbers",
    body: `<p>A <em>palyopama</em> is a Jaina time-unit defined by an emptying-the-pit thought-experiment: a cubical pit one yojana on a side is filled with hairs of newborn lambs, each one cut into <em>2¹⁹⁶</em> pieces, and one such piece is removed every hundred years.</p>
      <p>Suppose, for the sake of arithmetic, that one yojana = 16 km, that the pit holds <em>10⁴⁵</em> hair-pieces, and that <em>2¹⁹⁶</em> pieces emerge from one hair. After one piece is removed every hundred years, how many <strong>full years</strong> are required to empty the pit? Report the answer as an integer.</p>
      <p>(You may assume <em>2¹⁹⁶ ≈ 10⁵⁹</em>, exactly: take <em>2¹⁹⁶ = 10⁵⁹</em> for this problem.)</p>`,
  },

  /* ============================================================
   * § Āryabhaṭīya and contemporaries  (13–26)
   * ============================================================ */
  {
    n: 13, source: "Āryabhaṭīya, Gaṇitapāda 10",
    title: "Āryabhaṭa's π",
    tag: "approximation",
    body: `<blockquote><em>caturadhikaṃ śatam aṣṭaguṇaṃ dvāṣaṣṭis tathā sahasrāṇām ayutadvayaviṣkambhasyāsannaḥ vṛttapariṇāhaḥ.</em><br/>"100 + 4, multiplied by 8, plus 62 000: this is the approximate circumference of a circle whose diameter is 20 000."<cite>Āryabhaṭīya, Gaṇitapāda, verse 10</cite></blockquote>
      <p>Āryabhaṭa's recipe gives the rational <em>π ≈ 62832 / 20000 = 3.1416</em>. Set <em>π_Ā = 3.1416</em>.</p>
      <p>Now consider a circle whose <strong>circumference</strong> equals 1 (in some unit). Compute the integer ⌊10⁹ · d⌋, where <em>d = 1/π_Ā</em> is the diameter.</p>`,
  },
  {
    n: 14, source: "Āryabhaṭīya, Gaṇitapāda 12",
    title: "The first sine table",
    tag: "trigonometry",
    body: `<p>Āryabhaṭa is the first known mathematician to give a table of <em>jyā</em> (Indian sine, a chord-half) values, computed at intervals of 3°45′ (so that 24 values cover 0° to 90°).</p>
      <p>Take the standard radius <em>R = 3438</em> arc-minutes (so that <em>R · sin θ ≈ θ</em> for very small θ, where θ is in arc-minutes). Compute, exactly,</p>
      <p class="math">\\\\[ \\sum_{k=1}^{24} \\lfloor R \\cdot \\sin( k \\cdot 3^\\circ45' ) \\rfloor . \\\\]</p>`,
  },
  {
    n: 15, source: "Āryabhaṭīya, Gaṇitapāda 32–33",
    title: "The pulverizer",
    tag: "kuṭṭaka · number theory",
    body: `<p>Āryabhaṭa I introduces the <em>kuṭṭaka</em> ("pulverizer") method for solving <em>ax + c = by</em> in integers — what we now call the linear Diophantine equation. The method spread throughout the tradition (Brahmagupta, Bhāskara I, Bhāskara II, Nārāyaṇa).</p>
      <p>Find the smallest positive integer <em>x</em> satisfying</p>
      <p class="math">\\\\[ 137 x \\equiv 1 \\pmod{1729} . \\\\]</p>`,
  },
  {
    n: 16, source: "Āryabhaṭīya, Gaṇitapāda 6",
    title: "Sum of an arithmetic progression",
    tag: "series",
    body: `<p>Āryabhaṭa gives the rule (Gaṇitapāda 6) for the sum of an arithmetic progression in the form: "the sum is the half-sum of the first and last terms, multiplied by the count of terms."</p>
      <p>An arithmetic progression begins with 7 and has common difference 13. What is the sum of the first <strong>2026</strong> terms?</p>`,
  },
  {
    n: 17, source: "Āryabhaṭīya, Gaṇitapāda 22",
    title: "Sums of squares and cubes",
    tag: "series",
    body: `<p>Āryabhaṭa's verse 22 gives a single formula for the "sum of the series of squares and the series of cubes" by viewing them as differences and accumulations.</p>
      <p>Compute</p>
      <p class="math">\\\\[ ( 1^{3} + 2^{3} + \\cdots + 50^{3} ) - ( 1^{2} + 2^{2} + \\cdots + 50^{2} ) . \\\\]</p>`,
  },
  {
    n: 18, source: "Bhāskara I, Mahābhāskarīya VII.17",
    title: "Bhāskara I's sine approximation",
    tag: "trigonometry · approximation",
    body: `<p>Bhāskara I (c. 600 CE), commenting on Āryabhaṭa, gives a remarkable rational approximation for the sine — accurate to better than 0.002 over the entire range 0 ≤ θ ≤ π:</p>
      <p class="math">\\\\[ \\sin \\theta \\approx \\frac{16 \\theta (\\pi - \\theta )}{5 \\pi^{2} - 4 \\theta (\\pi - \\theta )} . \\\\]</p>
      <p>Let <em>f(θ)</em> denote Bhāskara's approximation and <em>e(θ) = sin θ − f(θ)</em> the error. The maximum of |e(θ)| over θ ∈ [0, π] is attained at some θ*. Compute <em>θ*</em> in degrees, rounded to the nearest <strong>tenth</strong> of a degree, and report the integer ⌊10 · θ*⌋.</p>`,
  },
  {
    n: 19, source: "Āryabhaṭīya, Gaṇitapāda 19",
    title: "Mean diameters",
    tag: "geometry",
    body: `<p>A diameter divides a circle into two equal semicircles. A second chord, perpendicular to and bisected by the diameter, divides the disk into four pieces. A third chord, parallel to the diameter and at the right distance, divides one of these pieces into two of equal area.</p>
      <p>If the radius is 1 and the third chord is at distance <em>h</em> from the diameter, find ⌊10⁸ · h⌋.</p>`,
  },
  {
    n: 20, source: "Āryabhaṭīya, Kālakriyā 4",
    title: "The yuga revolutions",
    tag: "number theory · astronomy",
    body: `<p>In Āryabhaṭa's astronomical model, in one mahāyuga of 4 320 000 years, the Moon completes 57 753 336 sidereal revolutions and the Sun 4 320 000.</p>
      <p>How many days, on average, separate consecutive new moons (i.e. the <em>synodic month</em>), to the nearest integer? You may use the fact that one mahāyuga contains 1 577 917 500 civil days.</p>`,
  },
  {
    n: 21, source: "Āryabhaṭīya, Gaṇitapāda 17",
    title: "Chords in a circle",
    tag: "geometry",
    body: `<p>Āryabhaṭa, verse 17, gives an essentially correct formula for chord-lengths in a circle in terms of two intersecting chords: if two chords intersect inside a circle and are divided into segments <em>(a, b)</em> and <em>(c, d)</em>, then <em>a · b = c · d</em>.</p>
      <p>Two chords intersect inside a circle. The first chord is divided by the intersection into segments of lengths 4 and 9. The second chord has total length 13 and is divided into two integer segments. What is the longer segment of the second chord?</p>`,
  },
  {
    n: 22, source: "Bhāskara I's commentary on the Āryabhaṭīya",
    title: "Place value, in words",
    tag: "arithmetic",
    body: `<p>The Indian decimal place-value names go: <em>eka</em> (1), <em>daśa</em> (10), <em>śata</em> (10²), <em>sahasra</em> (10³), <em>ayuta</em> (10⁴), <em>niyuta</em> (10⁵), <em>prayuta</em> (10⁶), <em>koṭi</em> (10⁷), <em>arbuda</em> (10⁸), <em>vṛnda</em> (10⁹), and continuing.</p>
      <p>Reading right to left, the digits of <em>2026!</em> end in some number of zeros. Find that number.</p>`,
  },
  {
    n: 23, source: "Lalla, Śiṣya-dhī-vṛddhi-tantra",
    title: "Calendar of intercalation",
    tag: "number theory · astronomy",
    body: `<p>In one mahāyuga of 4 320 000 years there are 51 840 000 solar months and 53 433 336 sidereal lunar months — and, by subtraction, <em>1 593 336</em> synodic months. The mismatch between solar and lunar months is corrected by inserting an intercalary month (<em>adhimāsa</em>) every so often.</p>
      <p>What is the smallest positive integer <em>k</em> such that exactly <em>k</em> mahāyugas contain a whole number of intercalary months and a whole number of solar months at the same time?</p>`,
  },
  {
    n: 24, source: "after Āryabhaṭīya, Kālakriyā",
    title: "When do all five planets meet?",
    tag: "number theory",
    body: `<p>In an astronomical model, five planets have sidereal periods (in days) of 88, 225, 687, 4332, and 10759. They are all in conjunction now.</p>
      <p>To the nearest <strong>integer</strong>, after how many years (one year = 365.25 days) will they next all be in conjunction simultaneously? You may treat each period as exact.</p>`,
  },
  {
    n: 25, source: "Āryabhaṭīya, Gaṇitapāda 4",
    title: "Square root, cube root",
    tag: "arithmetic",
    body: `<p>Āryabhaṭa, in verses 4 and 5, gives compact procedures for digit-by-digit extraction of square roots and cube roots — among the earliest such written procedures.</p>
      <p>Find the smallest positive integer <em>n</em> such that both <em>n</em> and <em>n + 11</em> are perfect cubes.</p>`,
  },
  {
    n: 26, source: "Āryabhaṭīya, Gaṇitapāda 12",
    title: "Versines and chords",
    tag: "trigonometry",
    body: `<p>Āryabhaṭa's verse 12 gives a recursion for sine differences that is essentially equivalent to the second-order trigonometric identity</p>
      <p class="math">\\\\[ jyā(\\alpha + h) - 2 jyā(\\alpha ) + jyā(\\alpha - h) = - jyā(\\alpha ) \\cdot ( jyā(h)/R )^{2} \\cdot 2 / (something) , \\\\]</p>
      <p>which yields the entire jyā table from the very first jyā. (Specifically: with R = 3438, jyā(3°45′) = 225 to the nearest integer.)</p>
      <p>Take <em>R = 3438</em> and the first jyā <em>jyā(3°45′) = 225</em>. Apply Āryabhaṭa's recursion exactly to compute jyā(15°), and report the integer answer.</p>
      <p>(For this problem, "Āryabhaṭa's recursion" can be implemented as: build the table iteratively by <em>D<sub>k+1</sub> = D<sub>k</sub> − jyā(k · h)·(2 sin(h/2))² / R</em>, with <em>D<sub>1</sub> = jyā(h)</em> and <em>jyā((k+1)·h) = jyā(k·h) + D<sub>k+1</sub></em>, where <em>h = 3°45′</em>.)</p>`,
  },

  /* ============================================================
   * § Brahmagupta — Brāhmasphuṭasiddhānta  (27–40)
   * ============================================================ */
  {
    n: 27, source: "Brāhmasphuṭasiddhānta XII.21",
    title: "The cyclic quadrilateral",
    tag: "geometry",
    body: `<blockquote>"The square root of the product of the four sums of the sides each diminished by half-perimeter — that is the area of a triangle exactly, and approximately of a quadrilateral inscribed in a circle."<cite>Brahmagupta, BSS XII.21</cite></blockquote>
      <p>This is <strong>Brahmagupta's formula</strong>:</p>
      <p class="math">\\\\[ K = \\sqrt{(s-a)(s-b)(s-c)(s-d)},\\quad s = (a+b+c+d)/2. \\\\]</p>
      <p>How many cyclic quadrilaterals exist with integer sides <em>a ≤ b ≤ c ≤ d</em>, all distinct, perimeter at most 60, and integer area?</p>`,
  },
  {
    n: 28, source: "Brāhmasphuṭasiddhānta XII",
    title: "Heron, as the degenerate case",
    tag: "geometry",
    body: `<p>Setting <em>d = 0</em> in Brahmagupta's formula gives Heron's formula for the triangle. How many integer-sided triangles, with all sides distinct, perimeter exactly 60, are <em>Heronian</em> (have integer area)?</p>`,
  },
  {
    n: 29, source: "BSS XII (diagonals of cyclic quad)",
    title: "Brahmagupta's diagonal rule",
    tag: "geometry",
    body: `<p>Brahmagupta gave, beyond the area formula, a rule for the diagonals of a cyclic quadrilateral. If the sides in cyclic order are <em>a, b, c, d</em>, the squared length of the diagonal joining the vertices between sides (a, b) and (c, d) is</p>
      <p class="math">\\\\[ p^{2} = \\frac{(ab + cd)(ac + bd)}{ad + bc} . \\\\]</p>
      <p>How many ordered tuples of <strong>positive</strong> integers <em>(a, b, c, d)</em> with <em>a + b + c + d = 50</em>, <em>a ≤ b ≤ c ≤ d</em>, and all sides distinct, are such that both diagonals <em>p</em> and <em>q</em> (the other diagonal, by the analogous formula) are <strong>simultaneously rational</strong>?</p>`,
  },
  {
    n: 30, source: "BSS XVIII (Bījagaṇita)",
    title: "Brahmagupta–Fibonacci identity",
    tag: "number theory",
    body: `<p>Brahmagupta proves what is now called the <em>Brahmagupta–Fibonacci identity</em>:</p>
      <p class="math">\\\\[ (a^{2} + N b^{2})(c^{2} + N d^{2}) = (ac - N bd)^{2} + N (ad + bc)^{2} = (ac + N bd)^{2} + N (ad - bc)^{2} . \\\\]</p>
      <p>Set <em>N = 5</em>. Find the smallest positive integer that can be written in the form <em>x² + 5 y²</em> with positive integers <em>x, y</em> in <strong>two distinct ways</strong>.</p>`,
  },
  {
    n: 31, source: "BSS XVIII (cakravāla, of a sort)",
    title: "Brahmagupta's bhāvanā composition",
    tag: "number theory · Pell",
    body: `<p>The same identity gives Brahmagupta his most beautiful application: from a single non-trivial solution of the Pell-like equation <em>x² − N y² = k</em>, he can <em>compose</em> further solutions. In particular, starting from <em>x² − 92 y² = 1</em>, he derives a small fundamental solution.</p>
      <p>What is the smallest positive integer <em>x</em> with <em>x² − 92 y² = 1</em> for some positive integer <em>y</em>?</p>`,
  },
  {
    n: 32, source: "BSS XVIII",
    title: "The rules of zero",
    tag: "number theory",
    body: `<p>Brahmagupta in his BSS XVIII gives the first known systematic rules for arithmetic with zero and with negative numbers — calling them <em>kha</em> and <em>ṛṇa</em>.</p>
      <p>Consider the polynomial <em>p(x) = x³ − 6x² + 11x − 6</em>. How many integers <em>n</em> with |n| ≤ 100 are such that <em>p(n)</em> is positive?</p>`,
  },
  {
    n: 33, source: "BSS XVIII",
    title: "The unknown amount",
    tag: "algebra",
    body: `<p>Brahmagupta solves, in elegant general form, the linear equation <em>ax + b = cx + d</em>, treating both positive and negative coefficients.</p>
      <p>In the system</p>
      <p class="math">\\\\[ 7 x + 13 y + 19 z = 2026, 11 x + 17 y + 23 z = 2992, 13 x + 19 y + 29 z = 3596, \\\\]</p>
      <p>find the unique integer solution and report the value of <em>x + y + z</em>.</p>`,
  },
  {
    n: 34, source: "BSS XII",
    title: "Brahmagupta triples",
    tag: "geometry",
    body: `<p>Brahmagupta also gives a parametric construction for what we would now call <em>integer-sided cyclic quadrilaterals with rational diagonals and area</em>. The simplest non-trivial example has sides 39, 60, 52, 25 (in some order).</p>
      <p>For this quadrilateral (sides 39, 60, 52, 25 in this cyclic order), what is the integer area?</p>`,
  },
  {
    n: 35, source: "BSS XII",
    title: "An inscribed triangle",
    tag: "geometry",
    body: `<p>A triangle has integer sides, integer area, and is inscribed in a circle of integer radius. Such triangles are sometimes called <em>super-Heronian</em>.</p>
      <p>How many such triangles exist with perimeter at most 50, up to congruence?</p>`,
  },
  {
    n: 36, source: "BSS XVIII",
    title: "Solving by guess",
    tag: "algebra",
    body: `<p>Brahmagupta gives a "rule of trial" — the <em>rule of false position</em> — for linear equations. In the spirit of that rule:</p>
      <p>The smallest positive integer solution <em>(x, y)</em> in non-negative integers to <em>23 x + 29 y = 2024</em> (ordered by smallest <em>x</em>) gives some pair. What is <em>10 x + y</em> for that pair?</p>`,
  },
  {
    n: 37, source: "BSS XVIII",
    title: "Two unknowns from sums",
    tag: "algebra",
    body: `<p>Two positive integers have product 2024 and sum 105. What is the absolute difference of the two integers?</p>`,
  },
  {
    n: 38, source: "BSS XII",
    title: "Cyclic quadrilateral with integer diagonals",
    tag: "geometry",
    body: `<p>How many cyclic quadrilaterals with all sides integers, both diagonals integers, and perimeter at most 100 exist, up to similarity? (Two are similar if one is a positive integer multiple of the other.)</p>
      <p>Hint: the smallest example is the (25, 39, 52, 60)-quadrilateral with diagonals 56 and 63.</p>`,
  },
  {
    n: 39, source: "after BSS",
    title: "The lattice of square sums",
    tag: "number theory",
    body: `<p>Brahmagupta knew (and used) the identity that says: a positive integer <em>n</em> is a sum of two squares iff every prime factor of the form <em>4k + 3</em> appears to an even power.</p>
      <p>How many positive integers <em>n ≤ 1000</em> can be written as a sum of two integer squares (allowing 0², so 0 is permitted as one of the squares)?</p>`,
  },
  {
    n: 40, source: "after BSS",
    title: "The interpolation",
    tag: "approximation",
    body: `<p>Brahmagupta gives, perhaps for the first time anywhere, a <em>second-order</em> interpolation rule, used in his sine tables. Modern eyes recognise it as Newton's forward-difference formula truncated at the second difference.</p>
      <p>Apply Brahmagupta's interpolation to the values</p>
      <p class="math">\\\\[ f(0) = 0, f(1) = 1, f(2) = 8, f(3) = 27, f(4) = 64 \\\\]</p>
      <p>and predict <em>f(2.5)</em> using <strong>only the second-order Brahmagupta interpolation</strong> centred at <em>x = 2</em>. Express the prediction as <em>p/q</em> in lowest terms, and report <em>p + q</em>.</p>`,
  },

  /* ============================================================
   * § Mahāvīra — Gaṇita-sāra-saṅgraha  (41–50)
   * ============================================================ */
  {
    n: 41, source: "Gaṇita-sāra-saṅgraha VI",
    title: "Choosing tastes",
    tag: "combinatorics",
    body: `<blockquote>"As many tastes as there are, taken one, two, three, … at a time — those, with the things of the world variously combined, are the combinations."<cite>Mahāvīra, GSS VI.218</cite></blockquote>
      <p>Mahāvīra is the first known author to write down explicit closed-form rules for what we call binomial coefficients <em>C(n, r)</em>. Let <em>n = 12</em> (the twelve <em>tastes</em>, in his account). Compute</p>
      <p class="math">\\\\[ \\sum_{r=0}^{12} r \\cdot \\binom{12}{r} . \\\\]</p>`,
  },
  {
    n: 42, source: "GSS VII (geometry)",
    title: "Mahāvīra's quadrilateral",
    tag: "geometry",
    body: `<p>Mahāvīra (c. 850 CE) gives, perhaps unfortunately, a formula for the area of <strong>any</strong> quadrilateral by Brahmagupta's recipe — overlooking that the formula is only correct for <em>cyclic</em> quadrilaterals. The error is illuminating.</p>
      <p>For an isosceles trapezium with parallel sides 4 and 14 and the two equal slant sides each 13, what is the (true) integer area?</p>`,
  },
  {
    n: 43, source: "GSS V (fractions)",
    title: "An Egyptian-style identity",
    tag: "fractions",
    body: `<p>Mahāvīra devotes much of book V of the GSS to manipulating fractions, including a remarkably general method for decomposing 1 as a sum of distinct unit fractions.</p>
      <p>How many distinct ways are there to write</p>
      <p class="math">\\\\[ 1 = \\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} \\\\]</p>
      <p>with positive integers <em>a ≤ b ≤ c</em>?</p>`,
  },
  {
    n: 44, source: "GSS VI",
    title: "Stringing the necklace",
    tag: "combinatorics",
    body: `<p>Mahāvīra discusses arrangements of beads on a string, and on a closed necklace. A necklace of length 11 is to be made from beads of 3 distinguishable colours (any colour may be used any number of times).</p>
      <p>Two necklaces are considered the same if one is a rotation of the other (reflections are considered distinct). How many distinct necklaces are there?</p>`,
  },
  {
    n: 45, source: "GSS V",
    title: "The horse-trader",
    tag: "word problem",
    body: `<blockquote>"A horse, sold for the price of 240 niṣkas, brings the seller a profit of one-fifth on the cost. What is the cost of the horse?"<cite>after GSS V</cite></blockquote>`,
  },
  {
    n: 46, source: "GSS",
    title: "Sum of a finite geometric progression",
    tag: "series",
    body: `<p>Mahāvīra gives the rule for the sum of a finite geometric progression in essentially the modern form.</p>
      <p>Compute <em>1 + 7 + 49 + 343 + ⋯ + 7¹²</em>.</p>`,
  },
  {
    n: 47, source: "GSS V",
    title: "A wartime split",
    tag: "word problem · arithmetic",
    body: `<p>A war booty is divided among soldiers of a king as follows: the first soldier receives 1 part, the second 2 parts, the third 4 parts, and so on (each receives twice as much as the previous). After all <em>n</em> soldiers have received their shares, the king finds that the total distributed is 8 191 parts.</p>
      <p>How many soldiers were there?</p>`,
  },
  {
    n: 48, source: "GSS VII",
    title: "An ellipse, in disguise",
    tag: "geometry",
    body: `<p>Mahāvīra gives, for the first time in any extant text, a correct formula for the perimeter and area of an ellipse — the perimeter formula being approximate. He correctly states the area as <em>π · a · b</em>.</p>
      <p>Mahāvīra's perimeter approximation is</p>
      <p class="math">\\\\[ P \\approx \\sqrt{16 a^{2} + 24 b^{2}}. \\\\]</p>
      <p>For an ellipse with semi-axes <em>a = 5, b = 3</em>, the true perimeter is approximately 25.527. Mahāvīra's recipe gives <em>P*</em>. Compute the integer ⌊1000 · P*⌋.</p>`,
  },
  {
    n: 49, source: "GSS V",
    title: "Honey-bees, again",
    tag: "word problem",
    body: `<p>"A swarm of bees: square root of half settled on a bakula tree; eight-ninths of the rest on a champaka. A single straggler hovered over the fragrant kunda flower. How many bees in all?"</p>
      <p>Find the smallest positive integer <em>n</em> consistent with this puzzle.</p>`,
  },
  {
    n: 50, source: "GSS VI",
    title: "Garlands of pearls",
    tag: "combinatorics",
    body: `<p>From a heap of beads of <em>n</em> distinct colours, the worshipper chooses some non-empty subset to thread into a garland. Two garlands are the same if they consist of the same multiset of colours.</p>
      <p>If <em>n = 8</em>, how many distinct non-empty subsets are there? (Equivalent to: how many non-empty subsets of an 8-element set.)</p>`,
  },

  /* ============================================================
   * § Śrīdhara — Pāṭīgaṇita / Triśatikā  (51–54)
   * ============================================================ */
  {
    n: 51, source: "Triśatikā",
    title: "Śrīdhara's quadratic",
    tag: "algebra",
    body: `<p>Śrīdhara is, in many accounts, the first to write down the modern quadratic formula explicitly, in the form: "Multiply both sides by four times the coefficient of the square; add the square of the coefficient of the unknown to both sides; take the square root; subtract the coefficient of the unknown; divide by twice the coefficient of the square."</p>
      <p>Find the unique <strong>positive integer</strong> root of <em>3 x² − 32 x + 84 = 0</em>.</p>`,
  },
  {
    n: 52, source: "Pāṭīgaṇita 79",
    title: "A travelling pilgrim",
    tag: "word problem",
    body: `<p>A pilgrim covers half the distance to the holy city on the first day, one-third of the remaining distance on the second day, one-fourth of what is then left on the third day, and 18 yojanas on the fourth, completing the journey. How many yojanas was the total distance?</p>`,
  },
  {
    n: 53, source: "Pāṭīgaṇita",
    title: "Mixture and proportion",
    tag: "arithmetic",
    body: `<p>Two kinds of grain are mixed: the first costs 7 māṣa per maund, the second 11 māṣa per maund. The mixture is sold for 9 māṣa per maund (the average) and yields the merchant exactly the same profit had he sold each kind separately at its cost plus 25%.</p>
      <p>Of 60 maunds of mixture, how many maunds were of the cheaper grain?</p>`,
  },
  {
    n: 54, source: "after Triśatikā",
    title: "Sum of a geometric series, slowly",
    tag: "series",
    body: `<p>Compute the integer ⌊S⌋, where</p>
      <p class="math">\\\\[ S = \\sum_{k=0}^{30} \\frac{(2 k + 1)^{2}}{2^{k}} . \\\\]</p>`,
  },

  /* ============================================================
   * § Bhāskara II — Līlāvatī, Bījagaṇita  (55–78)
   * ============================================================ */
  {
    n: 55, source: "Līlāvatī, ex. 54",
    title: "The lotus and the breeze",
    tag: "word problem · geometry",
    body: `<blockquote>"In a still pond, half a cubit high above the surface, there grew a lotus. The wind drove it; it sank, two cubits away from its base, the bud just touching the water. How deep is the pond?"<cite>Līlāvatī</cite></blockquote>
      <p>Let the depth, in cubits, be <em>d</em>. Solve for <em>d</em> and report the integer <em>4d</em>.</p>`,
  },
  {
    n: 56, source: "Līlāvatī, ex. 137",
    title: "The flock of bees",
    tag: "word problem",
    body: `<blockquote>"Of a flock of bees, one-fifth settled on the kadamba; one-third on the śilīndhri; thrice the difference of these flew to a kuṭaja; one bee was left flying in the air. Tell me, lovely lady, how many bees in all?"<cite>Līlāvatī, ex. 137</cite></blockquote>`,
  },
  {
    n: 57, source: "Līlāvatī, ex. 67",
    title: "Monkeys in the troop",
    tag: "word problem",
    body: `<blockquote>"Of a troop of monkeys, the square of one-eighth was leaping playfully on the bough; the remaining twelve sat in the shade. How many monkeys in all?"<cite>Līlāvatī</cite></blockquote>
      <p>Two answers; report the larger.</p>`,
  },
  {
    n: 58, source: "Līlāvatī, ex. 70",
    title: "Pearls of the necklace",
    tag: "word problem",
    body: `<blockquote>"One-third of a string of pearls fell upon the floor, one-fifth upon the bed, one-sixth was caught by the maiden, one-tenth by her lover. Six pearls remained on the string. How many pearls in the necklace?"<cite>after Līlāvatī</cite></blockquote>`,
  },
  {
    n: 59, source: "Bījagaṇita, on the cakravāla",
    title: "Bhāskara's chakravāla — N = 61",
    tag: "Pell",
    body: `<p>Bhāskara II's <em>cakravāla</em> ("cyclic") method is the crowning achievement of pre-modern Indian algebra. With it, Bhāskara solves the famously hard Pell equation</p>
      <p class="math">\\\\[ x^{2} - 61 y^{2} = 1 \\\\]</p>
      <p>in his Bījagaṇita — the same equation that Fermat would, six centuries later, propose as a challenge to European mathematicians.</p>
      <p>Find the smallest positive integer <em>x</em> with <em>x² − 61 y² = 1</em> for some positive integer <em>y</em>.</p>`,
  },
  {
    n: 60, source: "Bījagaṇita, ex. on cakravāla",
    title: "Cakravāla, second example — N = 67",
    tag: "Pell",
    body: `<p>Bhāskara works the example <em>x² − 67 y² = 1</em> in detail. Find the smallest positive integer <em>x</em>.</p>`,
  },
  {
    n: 61, source: "Līlāvatī",
    title: "The peacock and the snake",
    tag: "word problem · geometry",
    body: `<blockquote>"A peacock perches on a pillar nine cubits high. Beneath the pillar is a snake's hole. Spotting a snake returning to its hole from a distance of three times the pillar's height, the peacock pounces. They move with equal speed and meet at the same point on the ground. How far from the foot of the pillar is the meeting?"<cite>after Līlāvatī</cite></blockquote>`,
  },
  {
    n: 62, source: "Bījagaṇita, ex. of analysis",
    title: "An indeterminate quadratic",
    tag: "number theory",
    body: `<p>Bhāskara, in the Bījagaṇita, treats indeterminate equations of degree 2 systematically. As a small example: find all positive integer pairs <em>(x, y)</em> with</p>
      <p class="math">\\\\[ x^{2} - 2 x y + 5 y^{2} = 121. \\\\]</p>
      <p>Among these, what is the maximum value of <em>x + y</em>?</p>`,
  },
  {
    n: 63, source: "Līlāvatī, on permutations",
    title: "Anagrams of LĪLĀVATĪ",
    tag: "combinatorics",
    body: `<p>How many distinct arrangements are there of the eight letters of the title LĪLĀVATĪ (treating each occurrence as a distinct letter — so two L's, three Ī's including a long ī twice, one Ā, one V, one T)?</p>
      <p>Concretely: count the arrangements of the multiset {L, L, Ī, Ī, Ī, Ā, V, T}.</p>`,
  },
  {
    n: 64, source: "Līlāvatī, ex. on series",
    title: "Series of arithmetic progressions",
    tag: "series",
    body: `<p>What is the sum of all positive integers between 1 and 1000 (inclusive) that are <strong>not</strong> divisible by any of 2, 3, or 5?</p>`,
  },
  {
    n: 65, source: "Bījagaṇita, II",
    title: "Difference of squares",
    tag: "number theory",
    body: `<p>How many ordered pairs <em>(x, y)</em> of positive integers satisfy <em>x² − y² = 2024</em>?</p>`,
  },
  {
    n: 66, source: "Līlāvatī",
    title: "The rule of three",
    tag: "arithmetic",
    body: `<p>Bhāskara devotes a section of the Līlāvatī to the <em>trairāśika</em>, or "rule of three". A merchant lends 100 niṣkas at simple interest; in 30 months, the loan returns 16 niṣkas of interest.</p>
      <p>How many <strong>full</strong> months will it take, at the same monthly rate, for 1 000 niṣkas to earn 200 niṣkas of simple interest?</p>`,
  },
  {
    n: 67, source: "Līlāvatī",
    title: "Mixing currencies",
    tag: "arithmetic · word problem",
    body: `<p>A merchant has gold of two purities: nine māṣakas pure per ten, and seven māṣakas pure per ten. He melts a quantity of each into a single mass weighing 80 māṣakas, of which exactly 64 māṣakas are pure gold.</p>
      <p>How many māṣakas of the higher-purity gold did he start with?</p>`,
  },
  {
    n: 68, source: "Līlāvatī",
    title: "The trader and the cloth",
    tag: "word problem",
    body: `<p>A trader buys cloth at a certain price per cubit and sells it at a price per cubit that is 2 māṣakas more, gaining a profit equal to the cost of 7 cubits. If he had bought 5 cubits less and sold them at the same per-cubit profit, he would have gained the price of 4 cubits.</p>
      <p>How many cubits did he originally buy?</p>`,
  },
  {
    n: 69, source: "Bījagaṇita, on the kuṭṭaka",
    title: "Pulverizer, modernised",
    tag: "kuṭṭaka",
    body: `<p>Find the smallest positive integer <em>n</em> such that:</p>
      <p class="math">\\\\[ n \\equiv 7 \\pmod{11}, n \\equiv 5 \\pmod{13}, n \\equiv 9 \\pmod{17}. \\\\]</p>`,
  },
  {
    n: 70, source: "Līlāvatī, on combinations",
    title: "Bhāskara's mixed garlands",
    tag: "combinatorics",
    body: `<p>From four kinds of flowers, the worshipper takes some — at least one of each — to make a garland of exactly 12 flowers. (The order in the garland matters.)</p>
      <p>How many distinct garlands are possible?</p>`,
  },
  {
    n: 71, source: "Bījagaṇita",
    title: "A two-equation system",
    tag: "algebra",
    body: `<p>Find all positive integer pairs <em>(x, y)</em> with <em>x²+y²=2024</em>. Report the number of <em>ordered</em> such pairs (counting both <em>(x, y)</em> and <em>(y, x)</em> when distinct).</p>`,
  },
  {
    n: 72, source: "Bījagaṇita, on cubes",
    title: "Cubes and squares",
    tag: "number theory",
    body: `<p>How many positive integers <em>n ≤ 10⁶</em> are <strong>simultaneously</strong> a perfect square and a perfect cube (i.e. perfect sixth powers)?</p>`,
  },
  {
    n: 73, source: "Līlāvatī",
    title: "An ancient AM–GM puzzle",
    tag: "algebra",
    body: `<p>Two positive numbers have arithmetic mean 25 and geometric mean 24. What is the absolute difference of their squares?</p>`,
  },
  {
    n: 74, source: "Līlāvatī",
    title: "Twelve travellers",
    tag: "combinatorics",
    body: `<p>Twelve travellers, all of distinct heights, sit in a row at a way-station. In how many of the 12! seatings is no traveller seated immediately next to a traveller of adjacent height? (Heights 1 and 2 are adjacent; 2 and 3 are adjacent; etc.)</p>`,
  },
  {
    n: 75, source: "Bījagaṇita",
    title: "Composition of squares",
    tag: "number theory",
    body: `<p>Find the largest integer <em>k ≤ 1000</em> such that the equation</p>
      <p class="math">\\\\[ x^{2} + y^{2} = k \\\\]</p>
      <p>has at least <strong>three</strong> ordered pairs of solutions in non-negative integers.</p>`,
  },
  {
    n: 76, source: "Līlāvatī",
    title: "The cistern and the pipes",
    tag: "word problem",
    body: `<p>A cistern can be filled in 3 hours by one pipe alone, in 4 by a second, and in 6 by a third. The cistern is empty and all three pipes are opened together. After how many <strong>minutes</strong> is the cistern full?</p>`,
  },
  {
    n: 77, source: "Līlāvatī",
    title: "Coconuts at the temple",
    tag: "word problem · CRT",
    body: `<p>The priest counts the temple's coconuts. Counted by twos, threes, fours, fives, and sixes, one coconut is left over each time. Counted by sevens, none are left over. What is the smallest possible number of coconuts?</p>`,
  },
  {
    n: 78, source: "Bījagaṇita",
    title: "Bhāskara's interpolation",
    tag: "approximation",
    body: `<p>Bhāskara II refines the interpolation rules of his predecessors and uses second-order interpolation to compute fine sine values from coarse tables.</p>
      <p>The function <em>f(x) = √x</em> is tabulated at <em>x = 100, 144, 196, 256, 324</em>. Use a second-order Newton interpolation centred at <em>x = 196</em> to estimate <em>f(225)</em>. Report ⌊1000 · estimate⌋.</p>`,
  },

  /* ============================================================
   * § Nārāyaṇa Paṇḍita — Gaṇita Kaumudī  (79–94)
   * ============================================================ */
  {
    n: 79, source: "Gaṇita Kaumudī, Book I",
    title: "Nārāyaṇa's cows",
    tag: "recurrence",
    body: `<blockquote>"A cow gives birth to a calf each year. The calves themselves begin bearing in their fourth year. Beginning with one cow, how many cows and calves are there in twenty years?"<cite>GK, Book I</cite></blockquote>
      <p>Let <em>a(n)</em> denote the herd in year <em>n</em>, with <em>a(1) = a(2) = a(3) = 1</em> and <em>a(n) = a(n−1) + a(n−3)</em> thereafter. Compute <em>a(40)</em>.</p>`,
  },
  {
    n: 80, source: "Gaṇita Kaumudī, Book II",
    title: "Compositions",
    tag: "combinatorics",
    body: `<p>A <em>composition</em> of <em>n</em> is an <strong>ordered</strong> expression of <em>n</em> as a sum of positive integers; thus 1+2 and 2+1 are different compositions of 3. Nārāyaṇa proves that the number of compositions of <em>n</em> is <em>2<sup>n−1</sup></em>.</p>
      <p>How many compositions of 25 use only parts that are <em>odd</em> integers?</p>`,
  },
  {
    n: 81, source: "Gaṇita Kaumudī, Book IV: bhadragaṇita",
    title: "Pandiagonal magic squares of order 4",
    tag: "magic square · combinatorics",
    body: `<p>Nārāyaṇa devotes Book IV of the Gaṇita Kaumudī, called <em>bhadragaṇita</em>, to the construction of magic squares of all orders. He gives a complete enumeration for order 4.</p>
      <p>A <em>pandiagonal</em> magic square of order 4 has every row, every column, every main diagonal, <em>and</em> every "broken" diagonal (wrapping around the edges) summing to the magic constant 34.</p>
      <p>How many pandiagonal 4×4 magic squares with entries 1, 2, …, 16 are there in total — counting <em>all</em> 8 dihedral images of each square as distinct, but counting the cyclic translations of the torus as distinct as well?</p>
      <p>(Equivalently: count distinct fillings of the 16 cells.)</p>`,
  },
  {
    n: 82, source: "GK Book IV",
    title: "Magic constant of order 12",
    tag: "magic square",
    body: `<p>What is the magic constant of an order-12 magic square (entries 1 through 144)?</p>`,
  },
  {
    n: 83, source: "GK Book IV",
    title: "Most-perfect 2×2 sums",
    tag: "magic square",
    body: `<p>Nārāyaṇa describes <em>most-perfect</em> magic squares of order 4n: in such a square, every 2×2 block (including blocks that wrap around the edges) sums to the same value.</p>
      <p>For an order-8 most-perfect magic square with entries 1–64, what is the common 2×2 sum?</p>`,
  },
  {
    n: 84, source: "GK Book III",
    title: "Partitions of 30",
    tag: "combinatorics",
    body: `<p>Book III of the Gaṇita Kaumudī treats partitions of an integer (<em>aṅka-pāśa</em>). Compute <em>p(30)</em>, the number of partitions of 30 into positive integer parts (order disregarded).</p>`,
  },
  {
    n: 85, source: "GK Book III",
    title: "Partitions into distinct parts",
    tag: "combinatorics",
    body: `<p>Compute the number of partitions of 50 into <em>distinct</em> positive integer parts. (By a theorem of Euler — anticipated in spirit by Indian and Chinese combinatorialists — this equals the number of partitions of 50 into <strong>odd</strong> parts.)</p>`,
  },
  {
    n: 86, source: "GK Book IV",
    title: "Centre of an odd magic square",
    tag: "magic square",
    body: `<p>For any magic square of <em>odd</em> order <em>n</em> with entries 1 to <em>n²</em>, the centre cell is forced to a particular value. What is the centre value of an order-13 magic square?</p>`,
  },
  {
    n: 87, source: "GK Book I",
    title: "Cow-flock at year 50",
    tag: "recurrence",
    body: `<p>For Nārāyaṇa's cow recurrence (problem 79), what is <em>a(50)</em>?</p>`,
  },
  {
    n: 88, source: "GK",
    title: "Square-and-cube partitions",
    tag: "combinatorics",
    body: `<p>How many positive integers <em>n ≤ 1 000 000</em> can be written in the form <em>n = a² + b³</em> with <em>a, b</em> non-negative integers?</p>`,
  },
  {
    n: 89, source: "GK",
    title: "Bracelets of 9 beads",
    tag: "combinatorics",
    body: `<p>A bracelet of 9 beads, each painted one of 2 colours, is considered the same as another if one can be obtained from the other by rotation <strong>or</strong> reflection (i.e. the 18-element dihedral group acts).</p>
      <p>How many distinct bracelets are there?</p>`,
  },
  {
    n: 90, source: "GK",
    title: "Catalan, by another name",
    tag: "combinatorics",
    body: `<p>In how many ways can a convex polygon with 12 sides be triangulated into 10 triangles by non-crossing diagonals?</p>
      <p>(This is the 10-th Catalan number — and the bracketing/triangulation problem appears, implicitly, in the period.)</p>`,
  },
  {
    n: 91, source: "GK",
    title: "Compositions with parts 1 and 2",
    tag: "combinatorics · recurrence",
    body: `<p>How many compositions of 20 use only parts equal to 1 or 2?</p>
      <p>(This is the same Fibonacci-like count as the meters of weight 20 in Indian prosody.)</p>`,
  },
  {
    n: 92, source: "GK",
    title: "Sum of cow-numbers",
    tag: "recurrence",
    body: `<p>For Nārāyaṇa's cow sequence (problem 79), compute</p>
      <p class="math">\\\\[ \\sum_{n=1}^{30} a(n) . \\\\]</p>`,
  },
  {
    n: 93, source: "GK Book IV",
    title: "Squares within squares",
    tag: "magic square",
    body: `<p>A magic square of order 6 contains 1 through 36, with each row, column, and main diagonal summing to the magic constant. Among the 880 essentially distinct order-4 magic squares (Frenicle's classical count), how many of those contain the integer 1 in a corner cell?</p>`,
  },
  {
    n: 94, source: "GK",
    title: "Three Nārāyaṇa identities",
    tag: "combinatorics",
    body: `<p>Define <em>L(n) = a(1) + a(2) + ⋯ + a(n)</em>, where <em>a</em> is Nārāyaṇa's cow sequence (problem 79).</p>
      <p>Find <em>L(40) − a(42)</em>.</p>`,
  },

  /* ============================================================
   * § Mādhava and the Kerala School  (95–108)
   * ============================================================ */
  {
    n: 95, source: "Sadratnamālā, Tantrasaṅgraha — attributing Mādhava",
    title: "Mādhava's series for π",
    tag: "series",
    body: `<p>Mādhava of Sangamagrāma (c. 1340 – 1425) gave</p>
      <p class="math">\\\\[ \\pi/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - \\cdots , \\\\]</p>
      <p>three centuries before this series appeared in Europe under Leibniz's name. The simple alternating-series error bound is <em>1/(2n+1)</em> after <em>n</em> terms.</p>
      <p>What is the smallest <em>n</em> for which this <strong>bound</strong> guarantees the partial sum approximates π/4 to within <em>10⁻⁹</em>?</p>`,
  },
  {
    n: 96, source: "Yuktidīpikā / Yuktibhāṣā",
    title: "Mādhava's better π",
    tag: "series",
    body: `<p>Mādhava also gave the much-faster series</p>
      <p class="math">\\\\[ \\pi = \\sqrt{12} \\cdot ( 1 - \\frac{1}{3 \\cdot 3} + \\frac{1}{5 \\cdot 9} - \\frac{1}{7 \\cdot 27} + \\cdots ) , \\\\]</p>
      <p>obtained by setting <em>x = 1/√3</em> in the arctangent series.</p>
      <p>How many terms of this series suffice — by the simple alternating-series bound — for the partial sum to approximate π to within <em>10⁻¹⁰</em>?</p>`,
  },
  {
    n: 97, source: "Yuktibhāṣā (Jyeṣṭhadeva, 16th c.)",
    title: "Mādhava's sine series",
    tag: "series",
    body: `<p>Mādhava gave</p>
      <p class="math">\\\\[ \\sin x = x - \\frac{x^{3}}{3!} + \\frac{x^{5}}{5!} - \\cdots \\\\]</p>
      <p>three centuries before Newton. Set <em>x = 1</em> radian. How many terms (counting from <em>k = 0</em>) of the series above are required for the partial sum to agree with <em>sin 1</em> to <strong>twenty</strong> decimal places (error &lt; 10⁻²⁰)?</p>`,
  },
  {
    n: 98, source: "Tantrasaṅgraha",
    title: "Mādhava's end-correction",
    tag: "series · approximation",
    body: `<p>Mādhava gives an "end-correction" that vastly accelerates the slow Mādhava–Leibniz series:</p>
      <p class="math">\\\\[ \\pi/4 \\approx 1 - 1/3 + 1/5 - \\cdots ± \\frac{1}{2n - 1} ∓ \\frac{n / 2}{(2n - 1)^{2} + 1} . \\\\]</p>
      <p>Apply this with <em>n = 8</em>: take the alternating-series partial sum through ±1/(15), then apply the correction with the proper sign, and multiply by 4. Report the integer ⌊10⁹ · result⌋.</p>`,
  },
  {
    n: 99, source: "Tantrasaṅgraha, II",
    title: "Mādhava's jyā table",
    tag: "trigonometry",
    body: `<p>Mādhava's table of jyās is computed at intervals of 3°45′, with <em>R</em> chosen so that <em>R · sin θ ≈ θ</em> for very small θ measured in arc-minutes (so <em>R = 3437.7468...</em>, giving the famous compound-unit "<em>3437'44"48‴</em>").</p>
      <p>Set <em>R = 3438</em> (the rounded value). Compute</p>
      <p class="math">\\\\[ \\lfloor R \\cdot \\sin( 22^\\circ30' ) \\rfloor . \\\\]</p>`,
  },
  {
    n: 100, source: "Tantrasaṅgraha",
    title: "The cosine series",
    tag: "series",
    body: `<p>Mādhava also gave</p>
      <p class="math">\\\\[ \\cos x = 1 - x^{2}/2! + x^{4}/4! - \\cdots . \\\\]</p>
      <p>Compute ⌊10¹⁰ · cos(0.5)⌋ using the first 8 terms of the series (k = 0, 1, …, 7).</p>`,
  },
  {
    n: 101, source: "after Mādhava",
    title: "Convergence vs. correction",
    tag: "series",
    body: `<p>Compare two approximations to π:</p>
      <ul>
        <li><strong>(A)</strong> The Mādhava–Leibniz partial sum, multiplied by 4, after 1000 terms.</li>
        <li><strong>(B)</strong> The same partial sum after 50 terms, with Mādhava's end-correction (problem 98) applied at <em>n = 50</em>.</li>
      </ul>
      <p>Both (A) and (B) approximate π. Which is closer to π — and by what factor?</p>
      <p>Compute <em>r = |A − π| / |B − π|</em>, and report ⌊r⌋.</p>`,
  },
  {
    n: 102, source: "after Yuktibhāṣā",
    title: "Sum of squares revisited",
    tag: "series",
    body: `<p>The Yuktibhāṣā contains a beautiful proof of the formula for the <em>continuous</em> integral ∫₀ᵃ x² dx = a³/3 by direct geometric reasoning. As a discrete echo: compute the smallest positive integer <em>n</em> such that</p>
      <p class="math">\\\\[ 1^{2} + 2^{2} + \\cdots + n^{2} > 10^{6} . \\\\]</p>`,
  },
  {
    n: 103, source: "Sadratnamālā (Śaṅkara Vāriyar)",
    title: "Mādhava's π, twelve digits",
    tag: "approximation",
    body: `<p>The Sadratnamālā records a value of π attributed to Mādhava that is correct to <strong>eleven</strong> decimal places: <em>π ≈ 3.14159265359</em>.</p>
      <p>Using <em>π_M = 3.14159265359</em>, compute the integer ⌊10¹⁵ · |π_M − π|⌋.</p>`,
  },
  {
    n: 104, source: "after Tantrasaṅgraha",
    title: "An iterated map",
    tag: "approximation",
    body: `<p>Define the iteration <em>x → (x + 2/x)/2</em> — a square-root iteration anticipating Newton, used implicitly throughout Indian mathematics from Bakhshali onward. Starting from <em>x₀ = 1</em>, compute <em>x₅</em> as a rational <em>p/q</em> in lowest terms.</p>
      <p>Report the number of digits of <em>p</em>.</p>`,
  },
  {
    n: 105, source: "Tantrasaṅgraha — Nīlakaṇṭha",
    title: "Nīlakaṇṭha's series",
    tag: "series",
    body: `<p>Nīlakaṇṭha (1450–1550), commenting on Mādhava, gives the rapidly-converging series</p>
      <p class="math">\\\\[ \\pi = 3 + \\frac{4}{2 \\cdot 3 \\cdot 4} - \\frac{4}{4 \\cdot 5 \\cdot 6} + \\frac{4}{6 \\cdot 7 \\cdot 8} - \\cdots \\\\]</p>
      <p>How many terms (after the leading 3) are required for the alternating-series bound to guarantee the partial sum approximates π to within 10⁻⁸?</p>`,
  },
  {
    n: 106, source: "after Yuktibhāṣā",
    title: "An infinite product",
    tag: "series",
    body: `<p>Although the formal infinite-product representation of <em>sin x</em> belongs properly to Euler, the manipulations of Mādhava and his successors anticipate it. Consider the partial product</p>
      <p class="math">\\\\[ P_{N} = \\prod_{n=1}^{N} ( 1 - \\frac{1}{(2n)^{2}} ) . \\\\]</p>
      <p>The infinite product equals 2/π. What is the smallest <em>N</em> for which <em>|P<sub>N</sub> − 2/π| &lt; 10⁻⁵</em>?</p>`,
  },
  {
    n: 107, source: "Sadratnamālā",
    title: "Versines, summed",
    tag: "trigonometry",
    body: `<p>The <em>śara</em> (versine) is defined by <em>śar(α) = R · (1 − cos α)</em>. With <em>R = 3438</em>, compute</p>
      <p class="math">\\\\[ \\sum_{k=1}^{24} \\lfloor śar( k \\cdot 3^\\circ45' ) \\rfloor . \\\\]</p>`,
  },
  {
    n: 108, source: "in synthesis",
    title: "Iti samāptam",
    tag: "synthesis",
    body: `<p>You have come to the end. One last problem, weaving together the traditions.</p>
      <p>Define</p>
      <p class="math">\\\\[ f(n) = \\sigma(n) \\cdot d(n) - n \\cdot \\varphi(n) , \\\\]</p>
      <p>where σ(n) is the sum of divisors of <em>n</em>, <em>d(n)</em> the number of divisors, and <em>φ(n)</em> Euler's totient. Compute</p>
      <p class="math">\\\\[ \\sum_{n=1}^{108} f(n) . \\\\]</p>
      <p><em>iti samāptam.</em></p>`,
  },
];

/* expose to browser scripts (optional; site uses generated data/problems.js) */
if (typeof window !== "undefined") {
  window.PROBLEMS = PROBLEMS;
}
if (typeof module !== "undefined") {
  module.exports = { PROBLEMS };
}
