# Lecture 10: Probability Distributions + Binomial Distribution

### Quick Overview
- Lecture 10 moves from simulation intuition toward formal probability models. It defines probability distributions and random variables, distinguishes discrete from continuous settings, and shows how non-uniform probabilities are represented mathematically. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p2-p14]
- The lecture then develops the Binomial distribution as the model for repeated independent yes/no trials, including its conditions, formula, parameter effects, and PMF computation in Python. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p15-p23]

#### In Layman's Terms
- This lecture shows how to replace lots of repeated simulations with a probability model. Once you know the trial setup and success chance, the distribution tells you how likely each count of successes is. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p2-p23]

### A. Lecture Transition and Agenda
- The lecture continues simulation-based reasoning and introduces formal probability distributions and random variables. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p2]
- Agenda topics include non-uniform probabilities, probability models, random-variable types, and binomial modeling. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p2]

#### In Layman's Terms
- This lecture moves from "simulate and observe" to "define a probability function and compute directly." [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p2]
- Example: instead of many trial loops to estimate chance, use a distribution formula/API once parameters are known. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p2]

### B. Non-Uniform Probabilities and Simulation
- Slides use a startup-volunteer scenario with small success probability and a threshold question. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p3]
- The lecture emphasizes weighted sampling logic instead of uniform sampling. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p3]
- The ad-campaign distribution graphic shows that once the success probability is fixed, repeated simulations cluster around an expected number of new clients while tail events remain comparatively rare. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p3]
- It uses simulation as a bridge before introducing canonical distributions. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p3]

#### In Layman's Terms
- Not all outcomes are equally likely; your simulation must encode the real probability imbalance. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p3]
- Example: volunteer response chance is low, so "at least 30" is a tail-event question. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p3]

#### Language Bridge
- Equivalent to weighted random selection in app logic (not equal random pick). [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p3]
- Python commonly uses `np.random.choice(..., p=[...])` for this pattern. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p3]

### C. Probability Models and Their Components
- The lecture frames probability models around expected value, variability, and event probabilities. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p6-p7]
- It identifies three core components: [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p6-p7]
- random variables, [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p6-p7]
- probability distributions, [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p6-p7]
- parameters. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p6-p7]
- The same model can answer center/spread/tail questions once parameters are set. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p6-p7]

#### In Layman's Terms
- A probability model is a compact way to ask many "what is likely?" questions consistently. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p6-p7]
- Example: expected signups, how noisy signups are, and chance signups exceed a target. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p6-p7]

### D. Probability Distributions and Biased-Die Example
- Slides show a loaded die as a distribution assigning different probabilities across outcomes. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p8-p9]
- Sampling from this distribution is shown as a practical realization of the model. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p8-p9]
- This ties abstract PMF definitions to concrete random generation. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p8-p9]

#### In Layman's Terms
- A distribution is a rulebook saying how likely each outcome is. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p8-p9]
- Example: if face 3 is weighted higher than face 4, repeated draws should show more 3s than 4s. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p8-p9]

### E. Random Variables: Discrete vs Continuous
- The lecture contrasts CS "variable" intuition with probabilistic random-variable meaning. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p10-p13]
- It distinguishes discrete random variables from continuous random variables. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p10-p13]
- It notes that each type has common distribution families. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p10-p13]

#### In Layman's Terms
- A random variable is a quantity whose realized value comes from a random process. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p10-p13]
- Example: number of clicks is discrete; user session duration is continuous. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p10-p13]

### F. Binomial Distribution Conditions and Formula
- Slides define binomial setup: fixed number of trials, independent trials, binary outcomes, constant success probability. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p14-p16]
- The PMF formula is presented for probability of exactly `m` successes in `n` trials. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p14-p16]
- Multiple applied examples are given (coin flips, clickthrough, disease prevalence). [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p14-p16]

#### In Layman's Terms
- Binomial answers "how likely is exactly this many successes out of N tries?" [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p14-p16]
- Example: chance of 100 clicks out of 1,000 ad impressions when per-impression success is 0.1. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p14-p16]

### G. Parameter Sensitivity and Probability-to-Statistics Bridge
- The lecture emphasizes that distribution parameters determine the resulting PMF shape. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p16-p17]
- It asks where assumed parameters come from, motivating statistical estimation. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p16-p17]
- This explicitly bridges probability (known parameters) to statistics (parameter inference from data). [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p16-p17]

#### In Layman's Terms
- If your assumed `p` is wrong, your probability predictions can be wrong even if math is correct. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p16-p17]
- Example: observing 150 adopters when model expected near 50 suggests model/parameter mismatch. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p16-p17]

### H. PMF in Python and Comparing Distributions
- Slides show PMF support in common analysis software and visual PMF interpretation. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p18-p22]; [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p23]
- They compare binomial PMFs under different `n` and `p` to show parameter-driven differences. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p18-p22]; [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p23]
- The paired PMF plots make the parameter effect tangible for `n = 100`: `p = 0.4` centers probability mass around about `40` successes, while `p = 0.7` shifts the mass toward about `70`. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p18-p22]; [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p23]
- Formal notation `X ~ Binomial(n, p)` is used as model shorthand. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p18-p22]; [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p23]

#### In Layman's Terms
- Different parameter settings mean different stories about expected outcomes and uncertainty. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p18-p22]; [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p23]
- Example: `p=0.7` shifts likely counts much higher than `p=0.4` for the same `n`. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p18-p22]; [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p23]

#### Language Bridge
- This maps to instantiating the same model type with different constructor values. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p18-p22]; [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p23]
- PHP equivalent usually relies on external stats libraries or custom implementation. [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p18-p22]; [PDF: ics604-S26-lec10-ProbabilityDist_Binomial.pdf p23]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Lecture agenda and continuity | `work/lectures/PDFs/ics604-S26-lec10-ProbabilityDist_Binomial.pdf` p2 | `work/lectures/Notebooks/ics604-10_probability_distributions_binomial.ipynb` (intro sections) | A | Covered |
| Non-uniform probability simulation and ad-campaign distribution graphic | `work/lectures/PDFs/ics604-S26-lec10-ProbabilityDist_Binomial.pdf` p3 | `work/lectures/Notebooks/ics604-10_probability_distributions_binomial.ipynb` (weighted sampling and distribution graphic) | B | Covered |
| Probability-model components | `work/lectures/PDFs/ics604-S26-lec10-ProbabilityDist_Binomial.pdf` p6-p7 | `work/lectures/Notebooks/ics604-10_probability_distributions_binomial.ipynb` (model framing) | C | Covered |
| Distribution function and biased die | `work/lectures/PDFs/ics604-S26-lec10-ProbabilityDist_Binomial.pdf` p8-p9 | `work/lectures/Notebooks/ics604-10_probability_distributions_binomial.ipynb` (loaded die examples) | D | Covered |
| Random variable definitions and types | `work/lectures/PDFs/ics604-S26-lec10-ProbabilityDist_Binomial.pdf` p10-p13 | `work/lectures/Notebooks/ics604-10_probability_distributions_binomial.ipynb` | E | Covered |
| Binomial assumptions and formula | `work/lectures/PDFs/ics604-S26-lec10-ProbabilityDist_Binomial.pdf` p14-p16 | `work/lectures/Notebooks/ics604-10_probability_distributions_binomial.ipynb` (binomial derivation/APIs) | F | Covered |
| Parameter uncertainty and inference bridge | `work/lectures/PDFs/ics604-S26-lec10-ProbabilityDist_Binomial.pdf` p16-p17 | `work/lectures/Notebooks/ics604-10_probability_distributions_binomial.ipynb` | G | Covered |
| PMF software support and parameter-comparison plots | `work/lectures/PDFs/ics604-S26-lec10-ProbabilityDist_Binomial.pdf` p18-p22 | `work/lectures/Notebooks/ics604-10_probability_distributions_binomial.ipynb` (`binom.pmf`, comparisons, PMF plots) | H | Covered |
| Participation prompt | `work/lectures/PDFs/ics604-S26-lec10-ProbabilityDist_Binomial.pdf` p23 | `work/lectures/Notebooks/ics604-10_probability_distributions_binomial.ipynb` (context continuity) | H | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec10-ProbabilityDist_Binomial.pdf`
- Notebook source: `work/lectures/Notebooks/ics604-10_probability_distributions_binomial.ipynb`

