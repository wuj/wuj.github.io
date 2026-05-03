# Lecture 15: Hypothesis Testing, Comparing Means, and P-Values

### Quick Overview
- Lecture 15 develops the core hypothesis-testing workflow for comparing means. It revisits observed statistics, studies what sampling looks like when groups differ or come from the same distribution, and builds null distributions by permutation. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p10]; [NB: ics604-15_hypothesis_testing.ipynb cells 1-24]
- It then defines the p-value, significance level, and the general testing algorithm, with the companion notebook showing the end-to-end implementation in code. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p11-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 25-53]

#### In Layman's Terms
- This lecture shows how to ask, "If there were really no difference, how often would chance alone give me a result this extreme?" The answer to that question is the basis for the p-value and the final test decision. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 1-53]

### A. Lecture Setup, Proposal Logistics, and Continuity from Lecture 14
- The deck opens with administrative reminders: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
  - Homework 2 was due Friday, March 13 at 11:59 PM, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
  - spring recess means no class the following week. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
- It then introduces project-proposal requirements: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
  - due Monday, March 23 at 11:59 PM, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
  - submit a PDF to Lamaku, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
  - maximum 2 pages or roughly 700-900 words, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
  - include a title, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
  - figures are allowed and do not count toward the page limit. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
- The technical agenda lists: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
  - hypothesis testing, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
  - comparing means, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
  - the p-value, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
  - comparing proportions. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]
- In practice, the lecture content here develops the mean-comparison and p-value workflow that was set up at the end of Lecture 14. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]

#### In Layman's Terms
- The lecture picks up exactly where the last one stopped: now that we have a null-distribution idea, we use it to judge whether an observed difference is surprising. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p1-p2]

### B. Recap: Hypotheses, the YouTube/Vimeo Example, and the Observed Statistic
- The deck briefly restates the core testing framework: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p3-p4]; [NB: ics604-15_hypothesis_testing.ipynb cells 3-11, 9-12]
  - `H0` assumes no real difference or effect, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p3-p4]; [NB: ics604-15_hypothesis_testing.ipynb cells 3-11, 9-12]
  - `Ha` claims the observed result is not well explained by random chance alone. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p3-p4]; [NB: ics604-15_hypothesis_testing.ipynb cells 3-11, 9-12]
- The running example again uses two normal populations representing YouTube and Vimeo viewing time: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p3-p4]; [NB: ics604-15_hypothesis_testing.ipynb cells 3-11, 9-12]
  - means `232` and `219`, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p3-p4]; [NB: ics604-15_hypothesis_testing.ipynb cells 3-11, 9-12]
  - common standard deviation `12`, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p3-p4]; [NB: ics604-15_hypothesis_testing.ipynb cells 3-11, 9-12]
  - `90` observed days per platform. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p3-p4]; [NB: ics604-15_hypothesis_testing.ipynb cells 3-11, 9-12]
- The chosen observed statistic is the difference between the two sample means. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p3-p4]; [NB: ics604-15_hypothesis_testing.ipynb cells 3-11, 9-12]
- The slide sequence emphasizes that a raw observed difference alone is not enough; it must be compared to a null reference distribution. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p3-p4]; [NB: ics604-15_hypothesis_testing.ipynb cells 3-11, 9-12]

#### In Layman's Terms
- Seeing one sample mean larger than another is not automatically convincing. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p3-p4]; [NB: ics604-15_hypothesis_testing.ipynb cells 3-11, 9-12]
- You need to know whether that size of gap would be common or rare if there were really no meaningful difference. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p3-p4]; [NB: ics604-15_hypothesis_testing.ipynb cells 3-11, 9-12]

### C. Sampling Distribution When the Groups Are Clearly Different
- To make the variability issue visually obvious, the lecture temporarily generates two datasets with a much smaller `sigma = 2`. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p4-p5]; [NB: ics604-15_hypothesis_testing.ipynb cells 11-15, 14-17]
- Repeating the experiment many times produces a sampling distribution of differences in means. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p4-p5]; [NB: ics604-15_hypothesis_testing.ipynb cells 11-15, 14-17]
- Because the populations really differ in this setup, the center of that repeated-sampling distribution is near the true population mean difference rather than near zero. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p4-p5]; [NB: ics604-15_hypothesis_testing.ipynb cells 11-15, 14-17]
- The message is that even a real effect still produces a spread of observed statistics across repeated samples. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p4-p5]; [NB: ics604-15_hypothesis_testing.ipynb cells 11-15, 14-17]

#### In Layman's Terms
- Even when one group truly has a larger mean, repeated samples do not all produce the exact same gap. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p4-p5]; [NB: ics604-15_hypothesis_testing.ipynb cells 11-15, 14-17]
- Real effects still come with sampling noise. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p4-p5]; [NB: ics604-15_hypothesis_testing.ipynb cells 11-15, 14-17]

### D. What If the Samples Come from the Same Distribution?
- The lecture next asks what the difference in means looks like when both samples come from the same population. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p6-p8]; [NB: ics604-15_hypothesis_testing.ipynb cells 18-21, 19-24]
- Repeated simulation shows that the distribution of mean differences is centered close to `0`. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p6-p8]; [NB: ics604-15_hypothesis_testing.ipynb cells 18-21, 19-24]
- It then shows an equivalent implementation trick: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p6-p8]; [NB: ics604-15_hypothesis_testing.ipynb cells 18-21, 19-24]
  - generate one larger batch from the common distribution, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p6-p8]; [NB: ics604-15_hypothesis_testing.ipynb cells 18-21, 19-24]
  - shuffle it, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p6-p8]; [NB: ics604-15_hypothesis_testing.ipynb cells 18-21, 19-24]
  - split it into two groups. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p6-p8]; [NB: ics604-15_hypothesis_testing.ipynb cells 18-21, 19-24]
- This demonstrates that random partitioning of common-population data produces the same no-effect reference behavior. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p6-p8]; [NB: ics604-15_hypothesis_testing.ipynb cells 18-21, 19-24]

#### In Layman's Terms
- If there is no true group difference, random samples should usually differ only a little and should balance around zero over many reruns. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p6-p8]; [NB: ics604-15_hypothesis_testing.ipynb cells 18-21, 19-24]

### E. Permutation Null Distributions from Concatenated Samples
- The lecture then applies the same idea directly to the YouTube and Vimeo data: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p9-p13]; [NB: ics604-15_hypothesis_testing.ipynb cells 25-35, 27-34]
- concatenate both samples, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p9-p13]; [NB: ics604-15_hypothesis_testing.ipynb cells 25-35, 27-34]
- shuffle the combined values, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p9-p13]; [NB: ics604-15_hypothesis_testing.ipynb cells 25-35, 27-34]
- split them into surrogate groups, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p9-p13]; [NB: ics604-15_hypothesis_testing.ipynb cells 25-35, 27-34]
- recompute the difference in means many times. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p9-p13]; [NB: ics604-15_hypothesis_testing.ipynb cells 25-35, 27-34]
- The permutation diagram makes the mechanics explicit: group sizes stay fixed while only the labels are reassigned, which is what enforces the null hypothesis of no true group effect. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p9-p13]; [NB: ics604-15_hypothesis_testing.ipynb cells 25-35, 27-34]
- This produces the sampling distribution of the test statistic under the null hypothesis. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p9-p13]; [NB: ics604-15_hypothesis_testing.ipynb cells 25-35, 27-34]
- The deck explicitly states that the mean of this distribution is `0` because the procedure is equivalent to drawing both groups from one pooled population. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p9-p13]; [NB: ics604-15_hypothesis_testing.ipynb cells 25-35, 27-34]
- It also raises the unbalanced-sample-size case, showing that the null distribution is still centered near `0` even when the spread changes. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p9-p13]; [NB: ics604-15_hypothesis_testing.ipynb cells 25-35, 27-34]
- The observed statistic can then be plotted against this null distribution to see whether it sits in an ordinary region or far out in a tail. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p9-p13]; [NB: ics604-15_hypothesis_testing.ipynb cells 25-35, 27-34]

#### In Layman's Terms
- You scramble group membership and ask, "If group labels did not matter, what kinds of mean differences would I see just by chance?" [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p9-p13]; [NB: ics604-15_hypothesis_testing.ipynb cells 25-35, 27-34]

### F. Comparing Similar but Not Identical Populations
- The lecture introduces a more realistic scenario using e-commerce spending: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p14-p15]; [NB: ics604-15_hypothesis_testing.ipynb cells 36, 37-38]
  - male mean `466`, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p14-p15]; [NB: ics604-15_hypothesis_testing.ipynb cells 36, 37-38]
  - female mean `450`, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p14-p15]; [NB: ics604-15_hypothesis_testing.ipynb cells 36, 37-38]
  - common standard deviation `89`. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p14-p15]; [NB: ics604-15_hypothesis_testing.ipynb cells 36, 37-38]
- The population means differ, but the within-group variability is large. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p14-p15]; [NB: ics604-15_hypothesis_testing.ipynb cells 36, 37-38]
- The notebook computes an observed difference of means around `8.36` and then builds a permutation-based reference distribution. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p14-p15]; [NB: ics604-15_hypothesis_testing.ipynb cells 36, 37-38]
- This example teaches that a nonzero observed difference is not automatically compelling evidence when the background variability is substantial. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p14-p15]; [NB: ics604-15_hypothesis_testing.ipynb cells 36, 37-38]

#### In Layman's Terms
- Two groups can have different sample means and still look statistically unremarkable if normal random variation is large enough. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p14-p15]; [NB: ics604-15_hypothesis_testing.ipynb cells 36, 37-38]

### G. Measuring Surprise with Tail Counts
- Once the null distribution is available, the lecture asks how many simulated statistics are at least as extreme as the observed one. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16]; [NB: ics604-15_hypothesis_testing.ipynb cells 39, 40-41]
- For a one-sided test, it counts simulated differences greater than or equal to the observed statistic. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16]; [NB: ics604-15_hypothesis_testing.ipynb cells 39, 40-41]
- For a two-sided test, it counts simulated absolute differences at least as large as the observed absolute difference. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16]; [NB: ics604-15_hypothesis_testing.ipynb cells 39, 40-41]
- This converts visual intuition into a numeric surprise measure. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16]; [NB: ics604-15_hypothesis_testing.ipynb cells 39, 40-41]

#### In Layman's Terms
- You count how often random chance produces something as large as what you observed. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16]; [NB: ics604-15_hypothesis_testing.ipynb cells 39, 40-41]
- If that happens often, the result is not very surprising. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16]; [NB: ics604-15_hypothesis_testing.ipynb cells 39, 40-41]

### H. The p-Value, Significance Level, and the General Testing Algorithm
- The lecture defines the p-value as the probability, assuming `H0` is true, of obtaining the observed statistic or something more extreme in the alternative's direction. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 42-43]
- Small p-values mean the observation is far into the null tail and therefore harder to explain as chance alone. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 42-43]
- The usual threshold `0.05` is presented as a conventional significance level `alpha`. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 42-43]
- The slides tie `alpha` to Type I error: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 42-43]
  - rejecting the null even though it is actually true. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 42-43]
- The lecture closes with a three-step algorithm: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 42-43]
  1. compute the observed test statistic, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 42-43]
  2. construct the null distribution, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 42-43]
  3. compare the observed statistic to that null distribution and compute the p-value. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 42-43]

#### In Layman's Terms
- A p-value is not "the probability the null is true." [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 42-43]
- It is "how surprising this result would be if the null were true." [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p16-p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 42-43]

### I. Companion Notebook Implementations: End-to-End Hypothesis Tests
- The lecture notebook turns the slide algorithm into full worked examples. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
- In the Biki ride-duration example, two neighborhoods are sampled from the same normal distribution, a permutation null distribution is built, and the resulting p-values are: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
  - `0.118` for the one-sided comparison, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
  - `0.228` for the two-sided comparison. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
- Because these values are well above `0.05`, the notebook concludes that we fail to reject `H0`. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
- The notebook also shows a one-sample comparison against a known population parameter using SAT math scores: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
  - generate a reference distribution under the known national mean and standard deviation, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
  - see whether the sample mean falls inside the expected interval. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
- The SAT benchmark figure visualizes that decision rule as a null histogram of sample means with the benchmark-centered interval overlaid, reinforcing the idea that ordinary-region placement implies "fail to reject." [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
- It explicitly notes that if the population parameters are truly known, a one-sample `z`-test would be the more standard classical procedure. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]

#### In Layman's Terms
- The notebook shows the lecture recipe on actual examples: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
- one where we correctly decide "the groups do not look meaningfully different," [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
- and one where we compare a sample mean to a known benchmark. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]

#### Language Bridge
- This is the full test harness: [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
- build the observed metric, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
- build the null simulator, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
- compute the tail frequency, [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]
- then apply the decision rule. [PDF: ics604-S26-lec15-HypothesisTesting-2.pdf p17]; [NB: ics604-15_hypothesis_testing.ipynb cells 45-58, 46-54]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Homework reminder, spring recess note, project proposal, and lecture agenda | `work/lectures/PDFs/ics604-S26-lec15-HypothesisTesting-2.pdf` p1-p2 | *No direct notebook support; administrative slide material* | A | Covered |
| Hypothesis-testing recap, `H0`/`Ha`, and YouTube/Vimeo setup | `work/lectures/PDFs/ics604-S26-lec15-HypothesisTesting-2.pdf` p3-p4 | `work/lectures/Notebooks/ics604-15_hypothesis_testing.ipynb` (md 002-010, code 008-011) | B | Covered |
| Sampling distribution of differences for clearly separated groups | `work/lectures/PDFs/ics604-S26-lec15-HypothesisTesting-2.pdf` p4-p5 | `work/lectures/Notebooks/ics604-15_hypothesis_testing.ipynb` (md 010-014, code 013-016) | C | Covered |
| Same-distribution samples, shuffle/split construction, and center near zero | `work/lectures/PDFs/ics604-S26-lec15-HypothesisTesting-2.pdf` p6-p8 | `work/lectures/Notebooks/ics604-15_hypothesis_testing.ipynb` (md 017-020, code 018-023) | D | Covered |
| Concatenate-permute null distributions, balanced vs unbalanced groups, and permutation diagram | `work/lectures/PDFs/ics604-S26-lec15-HypothesisTesting-2.pdf` p9-p13 | `work/lectures/Notebooks/ics604-15_hypothesis_testing.ipynb` (md 024-034, code 026-033, permutation diagram) | E | Covered |
| Similar-distribution e-commerce spending example and practical interpretation of observed differences | `work/lectures/PDFs/ics604-S26-lec15-HypothesisTesting-2.pdf` p14-p15 | `work/lectures/Notebooks/ics604-15_hypothesis_testing.ipynb` (md 035, code 036-037) | F | Covered |
| Tail counting for one-sided and two-sided surprise assessment | `work/lectures/PDFs/ics604-S26-lec15-HypothesisTesting-2.pdf` p16 | `work/lectures/Notebooks/ics604-15_hypothesis_testing.ipynb` (md 038, code 039-040) | G | Covered |
| p-value definition, significance level `alpha`, and three-step testing algorithm | `work/lectures/PDFs/ics604-S26-lec15-HypothesisTesting-2.pdf` p16-p17 | `work/lectures/Notebooks/ics604-15_hypothesis_testing.ipynb` (md 041-042) | H | Covered |
| Notebook operationalizations of the lecture algorithm: Biki permutation test and sample-vs-parameter comparison with benchmark histogram | `work/lectures/PDFs/ics604-S26-lec15-HypothesisTesting-2.pdf` p17 | `work/lectures/Notebooks/ics604-15_hypothesis_testing.ipynb` (md 044-057, code 045-053, benchmark figure) | I | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec15-HypothesisTesting-2.pdf`
- Notebook source: `work/lectures/Notebooks/ics604-15_hypothesis_testing.ipynb`
