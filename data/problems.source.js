/* Project Brahmagupta — bibliography only for each problem.
 * Titles and statements are built from problems/p###.tex (see \begin{problem}{Title} … \end{problem}).
 * Generate data/problems.js: npm run build:data
 */
"use strict";

var PROBLEMS = [
  {
    "n": 1,
    "source": "Baudhāyana Śulba Sūtra, 1.48"
  },
  {
    "n": 2,
    "source": "Baudhāyana Śulba Sūtra, 2.12"
  },
  {
    "n": 3,
    "source": "Baudhāyana ŚS, 1.58 (citi-construction)"
  },
  {
    "n": 4,
    "source": "Mānava Śulba Sūtra"
  },
  {
    "n": 5,
    "source": "Āpastamba Śulba Sūtra"
  },
  {
    "n": 6,
    "source": "Baudhāyana ŚS, 1.61"
  },
  {
    "n": 7,
    "source": "in the spirit of Kātyāyana ŚS"
  },
  {
    "n": 8,
    "source": "after Baudhāyana ŚS"
  },
  {
    "n": 9,
    "source": "Anuyogadvāra-sūtra"
  },
  {
    "n": 10,
    "source": "Sūryaprajñapti and Tattvārtha-sūtra"
  },
  {
    "n": 11,
    "source": "Bhagavatī-sūtra: enumeration of meters"
  },
  {
    "n": 12,
    "source": "Tattvārthādhigama-sūtra"
  },
  {
    "n": 13,
    "source": "Āryabhaṭīya, Gaṇitapāda 10"
  },
  {
    "n": 14,
    "source": "Āryabhaṭīya, Gaṇitapāda 12"
  },
  {
    "n": 15,
    "source": "Āryabhaṭīya, Gaṇitapāda 32–33"
  },
  {
    "n": 16,
    "source": "Āryabhaṭīya, Gaṇitapāda 6"
  },
  {
    "n": 17,
    "source": "Āryabhaṭīya, Gaṇitapāda 22"
  },
  {
    "n": 18,
    "source": "Bhāskara I, Mahābhāskarīya VII.17"
  },
  {
    "n": 19,
    "source": "Āryabhaṭīya, Gaṇitapāda 19"
  },
  {
    "n": 20,
    "source": "Āryabhaṭīya, Kālakriyā 4"
  },
  {
    "n": 21,
    "source": "Āryabhaṭīya, Gaṇitapāda 17"
  },
  {
    "n": 22,
    "source": "Bhāskara I's commentary on the Āryabhaṭīya"
  },
  {
    "n": 23,
    "source": "Lalla, Śiṣya-dhī-vṛddhi-tantra"
  },
  {
    "n": 24,
    "source": "after Āryabhaṭīya, Kālakriyā"
  },
  {
    "n": 25,
    "source": "Āryabhaṭīya, Gaṇitapāda 4"
  },
  {
    "n": 26,
    "source": "Āryabhaṭīya, Gaṇitapāda 12"
  },
  {
    "n": 27,
    "source": "Brāhmasphuṭasiddhānta XII.21"
  },
  {
    "n": 28,
    "source": "Brāhmasphuṭasiddhānta XII"
  },
  {
    "n": 29,
    "source": "BSS XII (diagonals of cyclic quad)"
  },
  {
    "n": 30,
    "source": "BSS XVIII (Bījagaṇita)"
  },
  {
    "n": 31,
    "source": "BSS XVIII (cakravāla, of a sort)"
  },
  {
    "n": 32,
    "source": "BSS XVIII"
  },
  {
    "n": 33,
    "source": "BSS XVIII"
  },
  {
    "n": 34,
    "source": "BSS XII"
  },
  {
    "n": 35,
    "source": "BSS XII"
  },
  {
    "n": 36,
    "source": "BSS XVIII"
  },
  {
    "n": 37,
    "source": "BSS XVIII"
  },
  {
    "n": 38,
    "source": "BSS XII"
  },
  {
    "n": 39,
    "source": "after BSS"
  },
  {
    "n": 40,
    "source": "after BSS"
  },
  {
    "n": 41,
    "source": "Gaṇita-sāra-saṅgraha VI"
  },
  {
    "n": 42,
    "source": "GSS VII (geometry)"
  },
  {
    "n": 43,
    "source": "GSS V (fractions)"
  },
  {
    "n": 44,
    "source": "GSS VI"
  },
  {
    "n": 45,
    "source": "GSS V"
  },
  {
    "n": 46,
    "source": "GSS"
  },
  {
    "n": 47,
    "source": "GSS V"
  },
  {
    "n": 48,
    "source": "GSS VII"
  },
  {
    "n": 49,
    "source": "GSS V"
  },
  {
    "n": 50,
    "source": "GSS VI"
  },
  {
    "n": 51,
    "source": "Triśatikā"
  },
  {
    "n": 52,
    "source": "Pāṭīgaṇita 79"
  },
  {
    "n": 53,
    "source": "Pāṭīgaṇita"
  },
  {
    "n": 54,
    "source": "after Triśatikā"
  },
  {
    "n": 55,
    "source": "Līlāvatī, ex. 54"
  },
  {
    "n": 56,
    "source": "Līlāvatī, ex. 137"
  },
  {
    "n": 57,
    "source": "Līlāvatī, ex. 67"
  },
  {
    "n": 58,
    "source": "Līlāvatī, ex. 70"
  },
  {
    "n": 59,
    "source": "Bījagaṇita, on the cakravāla"
  },
  {
    "n": 60,
    "source": "Bījagaṇita, ex. on cakravāla"
  },
  {
    "n": 61,
    "source": "Līlāvatī"
  },
  {
    "n": 62,
    "source": "Bījagaṇita, ex. of analysis"
  },
  {
    "n": 63,
    "source": "Līlāvatī, on permutations"
  },
  {
    "n": 64,
    "source": "Līlāvatī, ex. on series"
  },
  {
    "n": 65,
    "source": "Bījagaṇita, II"
  },
  {
    "n": 66,
    "source": "Līlāvatī"
  },
  {
    "n": 67,
    "source": "Līlāvatī"
  },
  {
    "n": 68,
    "source": "Līlāvatī"
  },
  {
    "n": 69,
    "source": "Bījagaṇita, on the kuṭṭaka"
  },
  {
    "n": 70,
    "source": "Līlāvatī, on combinations"
  },
  {
    "n": 71,
    "source": "Bījagaṇita"
  },
  {
    "n": 72,
    "source": "Bījagaṇita, on cubes"
  },
  {
    "n": 73,
    "source": "Līlāvatī"
  },
  {
    "n": 74,
    "source": "Līlāvatī"
  },
  {
    "n": 75,
    "source": "Bījagaṇita"
  },
  {
    "n": 76,
    "source": "Līlāvatī"
  },
  {
    "n": 77,
    "source": "Līlāvatī"
  },
  {
    "n": 78,
    "source": "Bījagaṇita"
  },
  {
    "n": 79,
    "source": "Gaṇita Kaumudī, Book I"
  },
  {
    "n": 80,
    "source": "Gaṇita Kaumudī, Book II"
  },
  {
    "n": 81,
    "source": "Gaṇita Kaumudī, Book IV: bhadragaṇita"
  },
  {
    "n": 82,
    "source": "GK Book IV"
  },
  {
    "n": 83,
    "source": "GK Book IV"
  },
  {
    "n": 84,
    "source": "GK Book III"
  },
  {
    "n": 85,
    "source": "GK Book III"
  },
  {
    "n": 86,
    "source": "GK Book IV"
  },
  {
    "n": 87,
    "source": "GK Book I"
  },
  {
    "n": 88,
    "source": "GK"
  },
  {
    "n": 89,
    "source": "GK"
  },
  {
    "n": 90,
    "source": "GK"
  },
  {
    "n": 91,
    "source": "GK"
  },
  {
    "n": 92,
    "source": "GK"
  },
  {
    "n": 93,
    "source": "GK Book IV"
  },
  {
    "n": 94,
    "source": "GK"
  },
  {
    "n": 95,
    "source": "Sadratnamālā, Tantrasaṅgraha — attributing Mādhava"
  },
  {
    "n": 96,
    "source": "Yuktidīpikā / Yuktibhāṣā"
  },
  {
    "n": 97,
    "source": "Yuktibhāṣā (Jyeṣṭhadeva, 16th c.)"
  },
  {
    "n": 98,
    "source": "Tantrasaṅgraha"
  },
  {
    "n": 99,
    "source": "Tantrasaṅgraha, II"
  },
  {
    "n": 100,
    "source": "Tantrasaṅgraha"
  },
  {
    "n": 101,
    "source": "after Mādhava"
  },
  {
    "n": 102,
    "source": "after Yuktibhāṣā"
  },
  {
    "n": 103,
    "source": "Sadratnamālā (Śaṅkara Vāriyar)"
  },
  {
    "n": 104,
    "source": "after Tantrasaṅgraha"
  },
  {
    "n": 105,
    "source": "Tantrasaṅgraha — Nīlakaṇṭha"
  },
  {
    "n": 106,
    "source": "after Yuktibhāṣā"
  },
  {
    "n": 107,
    "source": "Sadratnamālā"
  },
  {
    "n": 108,
    "source": "in synthesis"
  }
];

if (typeof module !== "undefined") {
  module.exports = { PROBLEMS };
}
