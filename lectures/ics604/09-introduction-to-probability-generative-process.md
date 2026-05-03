# Lecture 9: Introduction to Probability + Generative Process

### Quick Overview
- Lecture 9 introduces probability as the language for reasoning under uncertainty. It covers experiments, sample spaces, events, probability rules, distributions, and long-run frequency ideas, using A/B testing as a motivating application. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p2-p13]
- It also introduces the generative-process viewpoint and closes with simulation-based inference through the Monty Hall problem, showing how repeated random trials can clarify surprising results. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p14-p17]

#### In Layman's Terms
- This lecture is about learning to think in "possible outcomes plus chances." Instead of guessing from one result, you define what can happen, how often it should happen, and what repeated trials reveal. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p2-p17]

### A. Probability in Data Science (A/B Testing Framing)
- The lecture opens with A/B testing as a practical probability use case. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p2]
- It frames probability as decision support under uncertainty (for example conversion outcomes). [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p2]
- The A/B-testing diagram makes that concrete with two candidate webpage versions and visibly different conversion rates (`17%` versus `25%`), emphasizing why randomized comparison alone is not enough without probability-based reasoning. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p2]
- Random assignment and outcome comparison are emphasized as foundational to valid inference. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p2]

#### In Layman's Terms
- You split users into groups, compare outcomes, and ask whether differences are likely real or just luck. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p2]
- Example: if page B converts better than page A, probability helps judge confidence in that difference. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p2]

### B. Experiments, Sample Spaces, and Events
- Slides define experiment as a random process producing one outcome per trial. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p3-p4]
- A sample space is all possible outcomes, and an event is a subset of that space. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p3-p4]
- Examples include coin tosses, die rolls, and operational scenarios. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p3-p4]

#### In Layman's Terms
- First list what can happen; then define which outcomes you care about. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p3-p4]
- Example: with a die, sample space is `{1..6}`, event could be "roll is even." [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p3-p4]

### C. Probability Rules and Distributions
- The lecture states core constraints: probabilities are between 0 and 1, and full sample-space probability is 1. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p5]
- It clarifies that valid probability statements are organized through probability distributions. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p5]
- The distinction between impossible (`0`) and certain (`1`) events is emphasized. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p5]

#### In Layman's Terms
- Probability values must obey strict boundaries and consistency rules. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p5]
- Example: claiming two disjoint events each have probability 0.8 is invalid if together they exceed total mass. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p5]

### D. Random Samples and Long-Run Frequency
- Slides define random samples both from populations and repeated experiments. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p6-p8, p11]
- The lecture links empirical frequency to theoretical probability via repeated trials. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p6-p8, p11]
- It stresses that finite runs can deviate from expectation even when the model is correct. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p6-p8, p11]

#### In Layman's Terms
- In short runs, randomness is noisy; in long runs, patterns stabilize. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p6-p8, p11]
- Example: 10 fair coin flips can look very unbalanced; 500,000 flips trend toward 50/50. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p6-p8, p11]

### E. Probability vs Statistics and Generative Process View
- The lecture contrasts probability (model -> outcomes) with statistics (outcomes -> model inference). [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p13-p14]
- It introduces generative process thinking as a way to model how data is produced. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p13-p14]
- The paired diagrams make the arrow directions explicit: probability starts from a population model and predicts event chances, while statistics starts from observed samples and works backward toward the generating process. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p13-p14]
- This framing supports simulation when exact analytic derivations are difficult. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p13-p14]

#### In Layman's Terms
- Probability asks "if assumptions are true, what should happen?" Statistics asks "given what happened, what assumptions are plausible?" [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p13-p14]
- Example: use observed click data to infer likely conversion-rate parameters. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p13-p14]

### F. Simulation Inference and the Monty Hall Problem
- Slides and lecture narrative use Monty Hall to show conditional probability effects. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p15-p17]
- Strategy comparison (switch vs stay) is evaluated through repeated simulation. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p15-p17]
- The Monty Hall illustration reinforces that the host's reveal is constrained information rather than a random extra event, which is why switching and staying are not symmetric choices. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p15-p17]
- The key point is that constrained host behavior changes probabilities. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p15-p17]

#### In Layman's Terms
- New information can change odds, even if the setup looks symmetric at first glance. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p15-p17]
- Example: switching doors improves win rate because the host's reveal is not random noise. [PDF: ics604-S26-lec09-ProbabilityIntro.pdf p15-p17]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| A/B testing motivation and conversion-rate diagram | `work/lectures/PDFs/ics604-S26-lec09-ProbabilityIntro.pdf` p2 | `work/lectures/Notebooks/ICS604-09_intro_probability.ipynb` (A/B section and diagram) | A | Covered |
| Experiments/sample space/events | `work/lectures/PDFs/ics604-S26-lec09-ProbabilityIntro.pdf` p3-p4 | `work/lectures/Notebooks/ICS604-09_intro_probability.ipynb` (definitions + examples) | B | Covered |
| Probability constraints/distributions | `work/lectures/PDFs/ics604-S26-lec09-ProbabilityIntro.pdf` p5 | `work/lectures/Notebooks/ICS604-09_intro_probability.ipynb` (probability framing) | C | Covered |
| Random samples and long-run frequency | `work/lectures/PDFs/ics604-S26-lec09-ProbabilityIntro.pdf` p6-p8, p11 | `work/lectures/Notebooks/ICS604-09_intro_probability.ipynb` (`random.choice`, `cumsum`) | D | Covered |
| Probability vs statistics/generative process diagrams | `work/lectures/PDFs/ics604-S26-lec09-ProbabilityIntro.pdf` p13-p14 | `work/lectures/Notebooks/ICS604-09_intro_probability.ipynb` (concept cells and diagrams) | E | Covered |
| Monty Hall simulation, host-information diagram, and strategy comparison | `work/lectures/PDFs/ics604-S26-lec09-ProbabilityIntro.pdf` p15-p17 | `work/lectures/Notebooks/ICS604-09_intro_probability.ipynb` (Monty Hall code and illustration) | F | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec09-ProbabilityIntro.pdf`
- Notebook source: `work/lectures/Notebooks/ICS604-09_intro_probability.ipynb`

