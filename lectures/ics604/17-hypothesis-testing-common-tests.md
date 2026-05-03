# Lecture 17: Hypothesis Testing: Common Tests

### Quick Overview
- Lecture 17's PDF focuses on classical `chi-squared` tests for categorical data: goodness-of-fit and independence. It covers expected counts, the `chi-squared` statistic, degrees of freedom, rejection regions, p-values, and the coral-site independence example. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p18]
- The companion notebook broadens that "common tests" theme by adding one-sample `z`-tests, one-sample `t`-tests, and Welch's independent-samples `t`-test, so the full lecture bundle spans both categorical-count tests and standard mean-based parametric tests. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44-69]

#### In Layman's Terms
- This lecture is about standard named tests. In the slides, you test whether category counts look wrong under a null model; in the notebook, you test whether one mean or two means look too unusual to explain by chance. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44-69]

### A. Lecture Logistics, Scope, and the PDF-vs-Notebook Split
- The slide deck opens with course logistics: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - Homework Assignment 3 is due Monday, April 6 at 11:59 PM, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - submit only the `.ipynb` file to Lamaku, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - do not upload the data file, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - rename the notebook file as instructed. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
- It then repeats proposal peer-review logistics: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - two proposals were assigned, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - peer feedback is due Monday, March 30 at 11:59 PM, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - write about half a page to one page per proposal, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - submit a separate PDF for each review, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - use the `[YourLastName]_feedback_[Proposal_ID].pdf` naming format, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - omit your name because feedback is anonymized. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
- The PDF agenda for Lecture 17 is narrower than the notebook title: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - the slides focus on `chi-squared` tests, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - specifically the goodness-of-fit test and the test of independence / association. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
- The companion notebook keeps the broader "Common Tests" framing and adds: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - one-sample `z`-tests, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - one-sample `t`-tests, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
  - Welch's independent-samples `t`-test. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]

#### In Layman's Terms
- The slides mainly teach how to test category counts with `chi-squared`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]
- The notebook then broadens the lecture into the standard named tests people commonly see in statistics. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p1-p2]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 1-2]

### B. The `chi-squared` Goodness-of-Fit Test and the Card-Randomness Example
- The lecture introduces the `chi-squared` goodness-of-fit test as one of the oldest hypothesis-testing methods. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
- Its purpose is to compare observed category counts against expected counts from a hypothesized distribution. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
- The deck explicitly frames this as a method for categorical / nominal data: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
  - observations fall into discrete labels, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
  - the lecture compares this idea to an `enum` in computer science. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
- The running example is a card-randomness test: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
  - `200` people mentally choose two cards in sequence, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
  - we inspect the suit of the second card, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
  - observed counts are `35` clubs, `51` diamonds, `64` hearts, and `50` spades. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
- The null and alternative hypotheses are: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
  - `H0`: all four suits are equally likely, each with probability `0.25`, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
  - `Ha`: at least one suit probability differs from `0.25`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
- The notebook operationalizes the null model with a multinomial draw, emphasizing that this is the multi-category generalization of a coin flip. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]

#### In Layman's Terms
- We are asking whether people's suit choices look balanced enough to call them random. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]
- If one or more suits are chosen too often, the pattern may be too uneven to blame on chance alone. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p3-p5]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 4-8, 6]

### C. Expected Counts, the `chi-squared` Statistic, and Why the Formula Is Scaled
- Under `H0`, the expected suit counts are `50` in each category because `200 * 0.25 = 50`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
- The lecture asks how to compare expected frequencies `Ei` with observed frequencies `Oi`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
- It motivates the standard design choices in the test statistic: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
  - raw differences `Oi - Ei` can cancel by sign, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
  - squaring removes sign cancellation, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
  - dividing by `Ei` scales the discrepancy relative to the expected category size. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
- The expected-vs-observed diagram in the notebook / slide deck makes the per-suit differences explicit: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
  - clubs: `35 - 50 = -15`, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
  - diamonds: `51 - 50 = 1`, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
  - hearts: `64 - 50 = 14`, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
  - spades: `50 - 50 = 0`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
- This yields the goodness-of-fit statistic: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]

  `chi^2 = sum((Oi - Ei)^2 / Ei)` [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]

- The notebook computes the per-category contributions and then sums them for the card example, producing: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
  - observed statistic `chi^2 = 8.44`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
- The interpretation is directional: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
  - small `chi^2` means observed and expected counts are close, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
  - large `chi^2` favors the alternative, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
  - goodness-of-fit is therefore always a one-sided, right-tail test. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]

#### In Layman's Terms
- The test turns "How different are these counts from what we expected?" into one number. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]
- Bigger numbers mean the observed category pattern looks less like the null model. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p5-p8]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 8, 11, 15, 9-14]

### D. Sampling Distribution of `chi-squared` and Degrees of Freedom
- The lecture next asks what `chi^2` values should look like when the null hypothesis is true. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
- It ties this to the count-generation model: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
  - each category count `Oi` behaves like a Binomial count `Binomial(N, Pi)`, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
  - when `N` is large and `Pi` is not too close to `0` or `1`, the Central Limit Theorem gives a Gaussian approximation. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
- The notebook makes that bridge concrete with an illustrative Binomial example using `N = 200` and `p = 0.4` before moving to `chi-squared` reference curves. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
- The plotted Binomial PMF centers around the expected count `N * p = 80`, visually reinforcing that repeated category counts fluctuate around their expectation rather than landing on one fixed value. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
- The deck and notebook then connect the pieces: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
  - standardized count deviations are approximately normal, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
  - squaring and summing those standardized terms yields a `chi-squared` random variable. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
- The lecture emphasizes that the shape of the `chi-squared` distribution depends on the degrees of freedom. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
- For a goodness-of-fit test with `k` categories: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
  - only `k - 1` counts are independent because the total sample size is fixed, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
  - therefore `df = k - 1`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
- In the card example, `k = 4`, so the reference distribution uses `df = 3`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
- The notebook plots `chi-squared` densities for different degrees of freedom to show how the distribution shifts as `df` changes. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
- Those curves stay right-skewed but move rightward and spread out as `df` increases, which helps explain why the correct `df` matters when interpreting the same numeric statistic. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]

#### In Layman's Terms
- The `chi-squared` number is only meaningful after you compare it to the kinds of values chance normally produces. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]
- Degrees of freedom describe how many counts can vary independently before the fixed total forces the last one. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p8-p10]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 16-20, 17-23]

### E. Rejection Region, Critical Value, p-Value, and Built-In SciPy Testing
- The rejection region for the goodness-of-fit test is always in the right tail because only unusually large `chi^2` values argue against `H0`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
- The notebook makes this concrete with `df = 3`: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
  - it uses the `cdf` to inspect cumulative probability, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
  - it uses the inverse `cdf` / `ppf` to find the `alpha = 0.05` critical value. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
- The resulting `5%` right-tail cutoff is approximately `7.81`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
- Since the observed statistic is `8.44`, it lies beyond that cutoff. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
- The rejection-region plots on the slide / notebook emphasize the geometry of this decision: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
  - most of the mass lies left of the cutoff, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
  - only the small right-tail area beyond the critical value counts as the reject region. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
- The notebook also computes the upper-tail probability directly: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
  - `p-value about 0.0377`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
- At significance level `0.05`, that leads to rejecting the uniform-suit null hypothesis. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
- The lecture notebook then shows the standard library implementation: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
  - `scipy.stats.chisquare(observed)` reproduces the same statistic and p-value. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
- It also demonstrates that the result depends on the specified null model: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
  - with expected counts `[40, 50, 60, 50]`, the notebook gets `chi^2 about 0.912` and `p about 0.8226`, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
  - so the same observed counts can look ordinary or surprising depending on the null distribution being tested. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]

#### In Layman's Terms
- The p-value answers: "If the null model were true, how often would I see a mismatch this large or larger?" [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
- Here that probability is about `3.8%`, which is small enough for the lecture to reject the uniform-randomness story at the `5%` level. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]

#### Language Bridge
- This is thresholded tail-risk over the null reference distribution. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]
- The built-in SciPy call is just an automated version of the manual three-step testing workflow from earlier lectures. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p11-p13]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 24, 25-39]

### F. The `chi-squared` Test of Independence with the Coral-Site Example
- The second major test extends the same idea from one categorical variable to two categorical variables. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
- The lecture's example studies whether coral health outcomes depend on site: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - Site A vs Site B, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - outcomes are `dies`, `unhealthy`, and `lives`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
- The observed contingency table shown in the notebook is: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - `dies`: `30` at Site A, `13` at Site B, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - `unhealthy`: `44` at Site A, `65` at Site B, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - `lives`: `13` at Site A, `15` at Site B, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - totals: `87` at Site A, `93` at Site B, `180` overall. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
- The inferential question is whether the outcome distribution is the same across both sites or whether site is associated with coral condition. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
- The hypotheses are framed as: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - `H0`: the outcome probabilities are the same across sites, so site and outcome are independent, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - `Ha`: at least one outcome probability differs across sites, so there is an association. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
- The lecture introduces contingency-table notation: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - `Oij` for the observed count in row `i`, column `j`, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - `Ri` for row totals, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - `Cj` for column totals, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - `N` for the grand total. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
- Because the null hypothesis does not specify exact outcome probabilities in advance, the lecture estimates them from the pooled data: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
  - `P-hat_i = Ri / N`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
- Expected cell counts under independence are then: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]

  `E-hat_ij = (Ri * Cj) / N` [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]

#### In Layman's Terms
- The question is not whether one individual coral survived or died. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]
- It is whether the overall mix of outcomes looks systematically different between the two sites. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p14-p16]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 40-41]

### G. Independence-Test Statistic, Degrees of Freedom, Assumptions, and the Exercise Close
- The independence test uses the same discrepancy structure as goodness-of-fit, but now summed across the whole `r x c` table: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]

  `chi^2 = sum(sum((Oij - E-hat_ij)^2 / E-hat_ij))` [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]

- The lecture says this statistic also follows a `chi-squared` distribution under the null hypothesis. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]
- Its degrees of freedom are: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]

  `df = (r - 1)(c - 1)` [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]

- For the coral example, the table has `3` outcome rows and `2` site columns, so `df = 2`. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]
- The lecture states the main assumptions for the test: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]
  - expected frequencies should be sufficiently large, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]
  - a common rule is expected counts above `5`, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]
  - for larger tables, at least `80%` of expected counts should exceed `5` and none should be `0`, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]
  - observations must be independent of one another. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]
- The PDF closes by assigning `exercise4_chi_squared_tests.ipynb`: [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]
  - due Monday, March 30, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]
  - not graded, [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]
  - counts toward class participation. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]

#### In Layman's Terms
- The independence test checks whether the whole table is more uneven than chance would usually create. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]
- If the mismatch between observed and expected cells is too large, the two variables probably are not independent. [PDF: ics604-S26-lec17-HypothesisTesting-StandardTests.pdf p17-p18]; [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 2, 42-43]

### H. Notebook Extension: `z`-Tests and `t`-Tests as Classical Mean-Based Hypothesis Tests
- The notebook then broadens the lecture from categorical-count tests to classical mean-based tests. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]
- It frames `z`-tests and `t`-tests as tools for deciding whether observed differences in means are likely due to chance or reflect a real effect. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]
- The conceptual logic is the same as in the simulation-based testing lectures: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]
  - start with a null hypothesis, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]
  - compute an observed statistic, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]
  - compare that statistic to a reference distribution under the null. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]
- The notebook gives practical use cases such as: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]
  - medicine, where a treatment mean might be compared to a placebo mean, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]
  - business, where average transaction values or performance metrics might be compared across groups. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]

#### In Layman's Terms
- `z`-tests and `t`-tests are the standard named tests for asking whether an average looks unusually high, low, or different. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]
- They are just another way to measure whether a mean-based result looks too extreme to dismiss as random variation. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]

#### Language Bridge
- This is the parametric version of the earlier simulation workflow. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]
- Instead of building the null distribution by repeated resampling, you use a known theoretical distribution for the standardized statistic. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 44]

### I. One-Sample `z`-Test with Known Population Standard Deviation
- The notebook's one-sample `z`-test example uses coral gene-expression data. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
- The null model is: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
  - known population mean `mu = 67.5`, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
  - known population standard deviation `sigma = 9.5`. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
- A sample of `20` heat-wave-surviving corals is collected, with sample mean: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
  - `x-bar = 72.3`. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
- The notebook standardizes the difference between the sample mean and the null mean by the standard error: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]

  `z = (x-bar - mu) / (sigma / sqrt(N))` [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]

- For the observed sample, it computes: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
  - `z about 2.26`. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
- It then evaluates the corresponding tail probabilities under the standard normal distribution: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
  - one-sided upper-tail p-value about `0.0119`, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
  - two-sided p-value about `0.0238`. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
- The notebook's `one_two_test.png` figure visually contrasts: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
  - a two-sided rejection rule with both tails shaded and reference cutoffs at about `-1.96` and `1.96`, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
  - a one-sided rejection rule with only the upper tail shaded and a cutoff at about `1.64`. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
- Under a conventional `alpha = 0.05`, the notebook rejects `H0` and concludes that the survivors' mean expression level differs significantly from the normal-coral benchmark. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
- The notebook also shows a `95%` normal-based interval around the sample mean using the known standard deviation: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
  - approximately `(68.14, 76.46)`. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
- The assumptions listed for the `z`-test are: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
  - population normality, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
  - independence of observations, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
  - known population standard deviation. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]

#### In Layman's Terms
- The survivors' average gene-expression value is high enough above the known normal-coral average that the notebook treats it as statistically meaningful. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
- Because the population spread is assumed known, the test can use the standard normal curve directly. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]

#### Language Bridge
- This is a one-sample benchmark test with a known variance contract. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]
- Once `sigma` is treated as known, the mean deviation can be normalized against a fixed reference distribution instead of an estimated one. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 45, 47-49, 57, 46, 50-56]

### J. One-Sample `t`-Test and Welch's Independent-Samples `t`-Test
- The notebook next explains the one-sample `t`-test as the version used when the population standard deviation is unknown. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
- The formula mirrors the `z`-test but replaces the true standard deviation with the sample estimate: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]

  `t = (x-bar - mu) / (s-hat / sqrt(N))` [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]

- Because the standard deviation is estimated rather than known, the reference distribution becomes a `t` distribution with `N - 1` degrees of freedom. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
- The notebook emphasizes that the `t` distribution has heavier tails than the normal distribution, reflecting extra uncertainty. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
- On the same coral-expression sample, SciPy reports: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
  - `t about 2.255`, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
  - `p about 0.0361`, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
  - `df = 19`. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
- The notebook also computes a `95%` `t`-interval of approximately: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
  - `(67.84, 76.76)`. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
- The final notebook section introduces Welch's independent-samples `t`-test for comparing two group means when equal variance should not be assumed. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
- The notebook states the hypotheses explicitly: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
  - `H0: mu1 = mu2`, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
  - `Ha: mu1 != mu2`. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
- It defines the Welch statistic as the difference between the sample means divided by the standard error of that difference: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]

  `t = (x-bar_1 - x-bar_2) / SE(x-bar_1 - x-bar_2)` [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]

- The notebook writes that standard error as: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]

  `SE(x-bar_1 - x-bar_2) = sqrt((s-hat_1^2 / N1) + (s-hat_2^2 / N2))` [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]

- Unlike the equal-variance Student version, Welch's test uses adjusted degrees of freedom tied to the sample variances and sizes. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
- It states the key assumptions as: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
  - approximate normality within each group, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
  - independence of observations, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
  - no equal-variance requirement because Welch's version adjusts for unequal variances. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
- The notebook sets `np.random.seed(142)` before the simulated examples for reproducibility. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
- Two simulated examples are shown: [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
  - when both groups come from `Normal(1, 3)` with `20` observations each, the notebook gets `t about 0.2526` and `p about 0.8022`, so there is no evidence of a mean difference, [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
  - when the groups come from `Normal(4, 0.8)` and `Normal(1, 1.2)` with `20` observations each, it gets `t about 7.8843` and `p about 3.08e-09`, giving overwhelming evidence against equal means. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]

#### In Layman's Terms
- The `t`-test is what you use when you do not know the true population spread and must estimate it from the sample. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
- Welch's version extends that idea to comparing two groups without pretending their variances are the same. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]

#### Language Bridge
- The move from `z` to `t` is the move from fixed-known variance to variance estimated at runtime from the sample. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]
- Welch's test is the safer two-group API because it does not require the stronger equal-variance assumption. [NB: ics604-17_hypothesis_testing_common_tests.ipynb cells 58, 61, 59-65]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Homework 3 logistics, proposal-review reminder, lecture title, and the slide-vs-notebook scope split | `work/lectures/PDFs/ics604-S26-lec17-HypothesisTesting-StandardTests.pdf` p1-p2 | `work/lectures/Notebooks/ics604-17_hypothesis_testing_common_tests.ipynb` (md 000-001 shows the broader "Common Tests" notebook framing and repeats the chi-squared exercise reminder) | A | Covered |
| Goodness-of-fit framing, categorical-data definition, card-randomness example, multinomial simulation idea, and `H0` / `Ha` for uniform suits | `work/lectures/PDFs/ics604-S26-lec17-HypothesisTesting-StandardTests.pdf` p3-p5 | `work/lectures/Notebooks/ics604-17_hypothesis_testing_common_tests.ipynb` (md 003-007, code 005) | B | Covered |
| Expected counts, observed-vs-expected comparison, scaled squared-difference statistic, observed suit counts, and `chi^2 = 8.44` | `work/lectures/PDFs/ics604-S26-lec17-HypothesisTesting-StandardTests.pdf` p5-p8 | `work/lectures/Notebooks/ics604-17_hypothesis_testing_common_tests.ipynb` (md 007, md 010, md 014, code 008-013) | C | Covered |
| Null sampling distribution, Binomial / CLT intuition, `chi-squared` distribution, and degrees-of-freedom reasoning | `work/lectures/PDFs/ics604-S26-lec17-HypothesisTesting-StandardTests.pdf` p8-p10 | `work/lectures/Notebooks/ics604-17_hypothesis_testing_common_tests.ipynb` (md 015-019, code 016-022) | D | Covered |
| Right-tail rejection region, critical value at `alpha = 0.05`, p-value for `8.44`, and `scipy.stats.chisquare` under default and custom null models | `work/lectures/PDFs/ics604-S26-lec17-HypothesisTesting-StandardTests.pdf` p11-p13 | `work/lectures/Notebooks/ics604-17_hypothesis_testing_common_tests.ipynb` (md 023, code 024-038) | E | Covered |
| `chi-squared` test of independence, coral contingency table, independence hypotheses, row/column totals, and expected-cell formula | `work/lectures/PDFs/ics604-S26-lec17-HypothesisTesting-StandardTests.pdf` p14-p16 | `work/lectures/Notebooks/ics604-17_hypothesis_testing_common_tests.ipynb` (md 039-040) | F | Covered |
| Contingency-table `chi^2` statistic, `df = (r - 1)(c - 1)`, large-expected-count and independence assumptions, and the exercise close | `work/lectures/PDFs/ics604-S26-lec17-HypothesisTesting-StandardTests.pdf` p17-p18 | `work/lectures/Notebooks/ics604-17_hypothesis_testing_common_tests.ipynb` (md 001, md 041-042) | G | Covered |
| General `z` / `t` framing as common hypothesis tests for mean comparisons | *Notebook-only extension; not explicitly covered in the PDF deck* | `work/lectures/Notebooks/ics604-17_hypothesis_testing_common_tests.ipynb` (md 043) | H | Covered |
| One-sample `z`-test for coral gene expression, `z about 2.26`, one-sided and two-sided p-values, interval, and assumptions | *Notebook-only extension; not explicitly covered in the PDF deck* | `work/lectures/Notebooks/ics604-17_hypothesis_testing_common_tests.ipynb` (md 044, md 046-048, md 056, code 045, code 049-055) | I | Covered |
| One-sample `t`-test, `t`-distribution / heavier-tail rationale, `95%` `t` interval, and Welch independent-samples `t`-test hypotheses, statistic, standard error, adjusted degrees of freedom, and simulated examples | *Notebook-only extension; not explicitly covered in the PDF deck* | `work/lectures/Notebooks/ics604-17_hypothesis_testing_common_tests.ipynb` (md 057, md 060, code 058-064) | J | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec17-HypothesisTesting-StandardTests.pdf`
- Notebook source: `work/lectures/Notebooks/ics604-17_hypothesis_testing_common_tests.ipynb`
