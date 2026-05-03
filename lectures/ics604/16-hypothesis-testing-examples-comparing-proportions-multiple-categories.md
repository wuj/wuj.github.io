# Lecture 16: Hypothesis Testing Examples, Comparing Means (Cont'd.), Proportions, and Multiple Categories

### Quick Overview
- Lecture 16 is a worked-examples lecture that broadens the hypothesis-testing framework beyond one mean-comparison case. It revisits two-sample means, compares a sample to a known benchmark, and tests a proportion against a population reference. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p14]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1-41]
- The lecture then extends testing to multiple categories by introducing total variation distance and null-data generation with binomial or multinomial simulation. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p15-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 42-63]

#### In Layman's Terms
- The message of this lecture is that the same testing logic works for many different questions. You can test averages, percentages, or full category patterns as long as you define the right statistic and the right null model. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1-63]

### A. Lecture Logistics, Agenda, and the Reintroduced Testing Workflow
- The deck opens with project-proposal reminders: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - due Monday, March 23 at 11:59 PM, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - submit a PDF to Lamaku, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - maximum 2 pages or about 700-900 words, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - include a title, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - figures do not count toward the page limit, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - grading is based on how well the proposal addresses the project-requirements document. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
- It then gives peer-review logistics: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - two proposals are assigned the next day, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - peer feedback is due Monday, March 30 at 11:59 PM, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - write about half a page to one page per proposal, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - submit one PDF per review, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - use the naming format `[YourLastName]_feedback_[Proposal_ID].pdf`, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - do not include your name in the file because feedback is anonymized. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
- The technical agenda lists: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - hypothesis testing, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - comparing means (continued), [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - comparing proportions, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  - comparing multiple categories. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
- Before starting new examples, the lecture restates the general hypothesis-testing workflow: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  1. compute the observed test statistic, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  2. construct a null distribution with permutations or bootstrap-style simulation, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
  3. compare the observed statistic to that null distribution and interpret the p-value. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]

#### In Layman's Terms
- The lecture starts by reminding students that every hypothesis test follows the same recipe: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
- measure what happened, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
- figure out what "chance alone" would normally look like, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]
- then ask whether the observed result is too unusual to dismiss as noise. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p1-p3]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 1]

### B. Mean-Comparison Continuation: Two Biki Neighborhood Samples from the Same Distribution
- The first worked example continues the earlier mean-comparison discussion using Biki ride durations for two neighborhoods, `a` and `b`. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]
- Instead of real ride data, both samples are generated from the same normal distribution with: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]
  - mean `mu = 20`, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]
  - standard deviation `sigma = 4`, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]
  - sample size `n = 15` rides per neighborhood. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]
- The lecture asks students to: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]
  - compute and compare the two sample means, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]
  - inspect the two KDEs visually, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]
  - decide whether the observed gap looks statistically meaningful. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]
- It then constructs a null distribution for the difference in means via resampling and overlays the observed difference on that histogram. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]
- The conclusion on the slide is explicit: the p-value is relatively large, so we fail to reject `H0`; the observed difference between the sample means is not statistically significant. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]

#### In Layman's Terms
- Even if two small samples do not line up perfectly, that alone does not mean the neighborhoods truly differ. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]
- In this example, the lecture's conclusion is that the gap can be explained by ordinary sampling randomness. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p4-p6]

### C. Comparing One Sample to a Known Distribution Parameter
- The lecture next switches from a two-sample comparison to a sample-versus-benchmark setup. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]
- The example uses SAT math scores: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]
  - national average `525`, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]
  - national standard deviation `20`, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]
  - a sample of `100` students who followed a curriculum. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]
- The question is whether the sample of curriculum students significantly differs from the national benchmark. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]
- The lecture's procedure is framed with simulation and interval reasoning: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]
  1. generate bootstrap samples / bootstrap statistics under the national-score model, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]
  2. infer a `95%` confidence interval for expected scores under that benchmark, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]
  3. check whether the observed sample mean falls inside that interval. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]
- If the curriculum sample mean lies inside the interval, the lecture says there is not enough evidence to discard the null hypothesis that the sample came from the theoretical distribution with `mu = 525` and `sigma = 20`. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]

#### In Layman's Terms
- Here the question is not "Are two groups different?" [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]
- It is "Does one group look unusual compared with a known national standard?" [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p7]

### D. Comparing Proportions: National Generic-Drug Benchmark vs a Local Survey
- The next major example asks whether a local medication survey differs from a known national proportion. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
- The national branded-to-unbranded generic ratio is given as `1:5`, meaning about `5/6` or `83%` of drugs are generic. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
- In the surveyed area: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
  - `4,434` drugs were observed, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
  - `3,766` were generics, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
  - the observed sample proportion is about `84.9%`. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
- The lecture stresses an important framing point: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
  - the question is whether the surveyed result is statistically different from the national proportion, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
  - not whether the NGO incentive program definitely "worked." [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
- The chosen test statistic is the absolute distance between the observed sample percentage and the `83%` national benchmark. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
- The hypotheses are: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
  - `H0`: there is no real difference; the observed gap is due to sampling variability, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
  - `Ha`: the observed gap is too unlikely to attribute to chance alone. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]

#### In Layman's Terms
- The survey found a slightly higher generic-drug rate than the national average. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]
- The real question is whether that gap is big enough to matter statistically, or small enough to be normal sampling wiggle. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p8-p9]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 3-5]

### E. Notebook Operationalization of the Proportion Test: Simulated Null Samples and Tail Probability
- The companion notebook turns the proportion example into explicit simulation code. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]
- It defines the null-model proportions as `model_proportions = [0.17, 0.83]` for brand and generic drugs. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]
- It first demonstrates one synthetic sample of size `4,434` with `np.random.choice(["B", "G"], p=model_proportions, size=4434)` and also notes the equivalent Binomial view via `np.random.binomial(4434, 0.83)`. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]
- The worked diagram compresses each simulated survey to one number by taking the absolute gap from `83%`, with examples such as `84 -> 1`, `85 -> 2`, `82 -> 1`, and `83 -> 0`. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]
- To build the null distribution, the notebook repeats the experiment `5,000` times: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]
  - generate a new null-consistent sample, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]
  - compute the sample generic percentage, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]
  - compute the absolute difference from `83`, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]
  - store that value in `sample_diffs_null`. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]
- The notebook then plots a histogram of these simulated gaps, marks the observed gap of about `1.9` percentage points, and computes the p-value as the fraction of simulated differences at least that large. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]
- Conceptually, this answers the slide's question about how to explore plausible chance-only differences without physically collecting new samples. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]

#### In Layman's Terms
- Instead of going back out and surveying thousands more drug sales, the notebook creates many fake surveys under the "nothing changed" assumption and asks how often a gap as large as the real one appears. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]

#### Language Bridge
- This is Monte Carlo testing against a fixed Bernoulli/Binomial baseline: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]
- generate many null-world replicas, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]
- then query the tail frequency for the observed absolute deviation. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p9-p12]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 6-7, 8-14]

### F. Extending Hypothesis Testing from One Proportion to Multiple Categories
- The lecture then generalizes the same logic to data with more than two categories. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
- The new example evaluates a machine-learning-based eDNA method for estimating fish diversity in a pond. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
- The figure grounds that example in a paper-style comparison between manual basin counts and eDNA estimates across the five species categories, which is why the lecture treats the manual proportions as the practical reference distribution. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
- Two distributions are compared: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
  - a manual count of `500` fish, treated as the reference method, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
  - a faster eDNA-based estimate over the categories `Tilapia`, `Blenny`, `Angelfish`, `Salmon`, and `Other`. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
- The notebook makes the category proportions explicit: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
  - manual `sampled`: `[0.20, 0.08, 0.12, 0.54, 0.06]`, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
  - eDNA: `[0.26, 0.08, 0.08, 0.54, 0.04]`. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
- The lecture and notebook emphasize that the goal is not to determine whether one species is overestimated or underestimated in isolation. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
- The inferential goal is broader: decide whether the overall species distribution from the new method is statistically consistent with the traditional manual method. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
- The guiding questions are: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
  - what are `H0` and `Ha`, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
  - what statistic should measure the difference, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
  - how do we simulate data under the null hypothesis? [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]

#### In Layman's Terms
- The point is not to argue about one fish category at a time. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]
- The point is to ask whether the new method gives the same overall fish mix as the trusted manual method. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p13-p15]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 15-21, 17-18]

### G. Total Variation Distance as the Multi-Category Test Statistic
- For the fish example, the lecture introduces total variation distance (`TVD`) as the test statistic. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]
- The notebook computes category-wise differences as: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]
  - `sampled - eDNA`, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]
  - producing positive and negative entries that must sum to `0` because both distributions sum to `1`. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]
- The category-difference chart shows which species drive the observed discrepancy: Salmon is essentially matched, while Tilapia and Blenny contribute most of the visible gap before the absolute values are summed and halved. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]
- Because those signed differences cancel, the lecture defines: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]
  - sum the absolute differences, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]
  - divide by `2`, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]
  - yielding `tvd = 1/2 * sum(|P(x) - Q(x)|)`. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]
- The notebook describes TVD as conceptually similar to Euclidean distance for two probability vectors, but simpler to interpret in this setting. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]
- Using the fish proportions above, the notebook computes an observed `TVD = 0.06`. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]

#### In Layman's Terms
- TVD is one number that says how far apart two category mixtures are overall. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]
- A bigger TVD means the two methods disagree more strongly about the fish distribution. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p16-p17]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 22-24, 23-25]

### H. Generating Multi-Category Null Data with Binomial/Multinomial Simulation and Interpreting the Result
- The lecture builds intuition first with a two-category simplification: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
  - `Tilapia` vs `Other`, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
  - simulate repeated counts with a Binomial model. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
- It then generalizes to the full multi-category case with the multinomial distribution, whose assumptions are stated explicitly: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
  - independent trials, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
  - fixed category probabilities, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
  - `n` repeated draws, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
  - each draw lands in one of several categories. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
- The notebook demonstrates both views: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
  - `np.random.binomial(500, 0.20)` for the simplified two-category case, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
  - `np.random.multinomial(...)` and `np.random.choice(...)` for the five-category fish setting. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
- In the full simulation, the notebook uses the manual `sampled` proportions as the null reference distribution, generates `5,000` multinomial samples of size `500`, computes a TVD for each, and stores them in `samples_tvd`. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
- The observed `TVD = 0.06` is then placed on the histogram of null TVDs, and the p-value is computed as the proportion of simulated TVDs at least as large as the observed one. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
- The slide conclusion is clear: [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
  - with significance level `0.05`, the two fish distributions are judged different, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
  - the observed `0.06` lies far in the tail of the null histogram, [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
  - but the test does not explain why the methods differ or what the discrepancy implies scientifically. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]

#### In Layman's Terms
- The lecture says the fish-method gap is too large to look like ordinary random noise. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
- That means the new method and the manual method do not appear to be producing the same distribution, even though the test alone does not diagnose the cause. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]

#### Language Bridge
- This is the same null-simulation workflow as before, just with a vector-valued outcome collapsed into TVD. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]
- The decision signal is still tail probability; only the statistic and data generator changed. [PDF: ics604-S26-lec16-HypothesisTesting-Examples.pdf p18-p21]; [NB: ics604-16_hypothesis_testing_examples.ipynb cells 26, 29, 31, 33, 39, 27-28]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Project-proposal reminders, peer-review logistics, lecture agenda, and restated three-step hypothesis-testing workflow | `work/lectures/PDFs/ics604-S26-lec16-HypothesisTesting-Examples.pdf` p1-p3 | `work/lectures/Notebooks/ics604-16_hypothesis_testing_examples.ipynb` (md 000 gives topic framing only; no admin material) | A | Covered |
| Biki ride-duration mean-comparison continuation, KDE inspection, resampling null, and fail-to-reject conclusion from a large p-value | `work/lectures/PDFs/ics604-S26-lec16-HypothesisTesting-Examples.pdf` p4-p6 | *No direct notebook support; slide-only worked example* | B | Covered |
| Sample-vs-known-parameter SAT example using bootstrap/interval reasoning under `mu = 525`, `sigma = 20`, `n = 100` | `work/lectures/PDFs/ics604-S26-lec16-HypothesisTesting-Examples.pdf` p7 | *No direct notebook support; slide-only worked example* | C | Covered |
| Generic-drug proportion setup, `83%` benchmark, observed `3766 / 4434 = 84.9%`, absolute-distance statistic, and null/alternative framing | `work/lectures/PDFs/ics604-S26-lec16-HypothesisTesting-Examples.pdf` p8-p9 | `work/lectures/Notebooks/ics604-16_hypothesis_testing_examples.ipynb` (md 002-004) | D | Covered |
| Proportion-test null simulation with categorical/Binomial draws, absolute-gap diagram, `5,000` null replicates, observed `1.9`-point gap, histogram, and p-value computation | `work/lectures/PDFs/ics604-S26-lec16-HypothesisTesting-Examples.pdf` p9-p12 | `work/lectures/Notebooks/ics604-16_hypothesis_testing_examples.ipynb` (md 005-006, code 007-013, gap diagram) | E | Covered |
| Extension from one proportion to multiple categories, fish-diversity scenario, paper figure, category table/plot, and high-level question framing | `work/lectures/PDFs/ics604-S26-lec16-HypothesisTesting-Examples.pdf` p13-p15 | `work/lectures/Notebooks/ics604-16_hypothesis_testing_examples.ipynb` (md 014-020, code 016-017, fish figure) | F | Covered |
| TVD definition, category-difference chart, zero-sum intuition, and observed `TVD = 0.06` for the fish example | `work/lectures/PDFs/ics604-S26-lec16-HypothesisTesting-Examples.pdf` p16-p17 | `work/lectures/Notebooks/ics604-16_hypothesis_testing_examples.ipynb` (md 021-023, code 022-024, difference chart) | G | Covered |
| Binomial-to-multinomial null generation, repeated `TVD` simulation, p-value threshold `0.05`, rejection of `H0`, and caution about causal interpretation | `work/lectures/PDFs/ics604-S26-lec16-HypothesisTesting-Examples.pdf` p18-p21 | `work/lectures/Notebooks/ics604-16_hypothesis_testing_examples.ipynb` (md 025, md 028, md 030, md 032, md 038; code 026-027, 029, 031, 033-037) | H | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec16-HypothesisTesting-Examples.pdf`
- Notebook source: `work/lectures/Notebooks/ics604-16_hypothesis_testing_examples.ipynb`
