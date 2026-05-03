# Lecture 14: Bayesian Parameter Estimation + Hypothesis Testing Intro

### Quick Overview
- Lecture 14 bridges from confidence intervals and maximum likelihood to Bayesian estimation. It uses an A/B-testing-style generative model to introduce rejection sampling, posterior distributions, and sequential belief updating as new data arrives. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p13]
- The second half launches hypothesis testing by defining parameters versus statistics, effect size versus p-value, null versus alternative hypotheses, and the logic of building a null distribution for decision-making. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p22]

#### In Layman's Terms
- Instead of settling on one "best" parameter, Bayesian thinking keeps track of many plausible values and updates them as data comes in. Then the lecture pivots to formal testing rules for deciding whether observed patterns are surprising enough to matter. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p22]

### A. Lecture Scope, Homework Continuity, and Topic Transition
- The deck opens with Homework 2 reminders: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p2]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 1-6]
  - due Friday, March 13 at 11:59 PM, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p2]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 1-6]
  - submit only the `.ipynb` file to Lamaku, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p2]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 1-6]
  - do not upload the data file, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p2]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 1-6]
  - rename the notebook as instructed. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p2]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 1-6]
- The lecture agenda is explicitly split into two connected themes: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p2]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 1-6]
  - Bayesian parameter estimation, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p2]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 1-6]
  - hypothesis testing. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p2]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 1-6]
- This creates a bridge from the prior estimation lectures into two inferential questions: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p2]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 1-6]
  - what parameter values are plausible, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p2]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 1-6]
  - when is an observed difference meaningful enough to test formally. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p2]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 1-6]

#### In Layman's Terms
- The lecture first asks, "What signup rate do we believe now?" and then asks, "How do we decide whether a difference is real or just noise?" [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p1-p2]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 1-6]

### B. A/B Testing as a Generative Model and Long-Run Binomial Process
- The Bayesian portion starts from an A/B testing example: compare two webpage versions by whether users sign up. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p3-p4]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 3-5]
- For one user on one page version, the outcome is treated as a Bernoulli event with signup probability `p`. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p3-p4]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 3-5]
- Repeating the experiment with `n = 8` users and `p = 0.5` yields a Binomial long-run distribution for the number of signups. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p3-p4]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 3-5]
- The notebook mirrors this by framing each user outcome as an independent random draw from the same signup process. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p3-p4]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 3-5]

#### In Layman's Terms
- If you repeat the same 8-person signup test many times, you do not always get the same number of signups. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p3-p4]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 3-5]
- The Binomial distribution is the pattern of those repeated counts. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p3-p4]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 3-5]

### C. Why Bayesian Estimation Is Introduced After MLE and Confidence Intervals
- The lecture states that the true signup rates `p_A` and `p_B` are unknown. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p4-p5]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 6, 7-11]
- Maximum likelihood remains available, but the lecture warns that small samples can skew estimates heavily. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p4-p5]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 6, 7-11]
- Confidence intervals provide interval-style uncertainty, but not a direct probability distribution over individual parameter values. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p4-p5]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 6, 7-11]
- The slides explicitly motivate prior knowledge: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p4-p5]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 6, 7-11]
  - if earlier research suggests a parameter is near `0.9`, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p4-p5]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 6, 7-11]
  - classical point-estimation framing does not naturally encode that belief. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p4-p5]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 6, 7-11]
- The notebook's bootstrap examples with `5` signups out of `8` show how wide uncertainty can remain with such a small sample. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p4-p5]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 6, 7-11]

#### In Layman's Terms
- With only eight users, one or two extra signups can move the estimate a lot. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p4-p5]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 6, 7-11]
- The lecture wants a method that says not only "here is one estimate," but also "here is how plausible each possible value is." [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p4-p5]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 6, 7-11]

### D. Running the Simulation Backwards with Rejection Sampling
- The lecture reverses the usual simulation direction: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p6-p7]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 12-15, 17]
  - instead of fixing `p_A` and generating outcomes, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p6-p7]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 12-15, 17]
  - it asks which `p_A` values could have plausibly generated the observed `5/8` signups. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p6-p7]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 12-15, 17]
- Rejection sampling is introduced as the approximate Bayesian algorithm: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p6-p7]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 12-15, 17]
  1. sample a candidate `p_A` from a prior, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p6-p7]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 12-15, 17]
  2. simulate a Binomial outcome with that `p_A`, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p6-p7]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 12-15, 17]
  3. keep the candidate if the simulated outcome matches the observation, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p6-p7]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 12-15, 17]
  4. repeat many times. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p6-p7]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 12-15, 17]
- In the lecture's basic setup, the prior is uniform on `[0, 1]`. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p6-p7]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 12-15, 17]

#### In Layman's Terms
- You keep trying possible signup rates and only save the ones that successfully reproduce what you actually saw. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p6-p7]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 12-15, 17]

### E. Posterior Distribution, Likelihood Agreement, and Parameter Uncertainty
- The accepted `p_A` values form an approximate posterior distribution. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p8-p9]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 16, 20, 17-19]
- The slides and notebook emphasize that this posterior is highest around `0.625`, matching the observed `5/8` signup rate. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p8-p9]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 16, 20, 17-19]
- At the same time, nearby values remain plausible, so Bayesian inference returns a range of supported parameter values rather than a single point. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p8-p9]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 16, 20, 17-19]
- Because the prior is uniform in this example, the posterior closely tracks the likelihood shape. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p8-p9]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 16, 20, 17-19]

#### In Layman's Terms
- The most plausible signup rate is near `62.5%`, but the method still leaves room for nearby values instead of pretending one exact value is certain. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p8-p9]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 16, 20, 17-19]

### F. Updating Beliefs Sequentially as New Data Arrive
- The lecture then shows the core Bayesian update rule: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p10-p13]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 21, 29, 22-28]
  - posterior from one round becomes the prior for the next round. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p10-p13]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 21, 29, 22-28]
- After the first `5/8` experiment, the lecture adds a second dataset (`6/9`) and then a third example in the companion notebook. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p10-p13]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 21, 29, 22-28]
- Histograms and KDE curves show the posterior shifting and concentrating as additional evidence accumulates. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p10-p13]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 21, 29, 22-28]
- The conceptual summary is explicit: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p10-p13]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 21, 29, 22-28]
  - prior beliefs are encoded in a prior distribution, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p10-p13]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 21, 29, 22-28]
  - observed data update those beliefs into a posterior, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p10-p13]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 21, 29, 22-28]
  - later observations can continue the cycle. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p10-p13]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 21, 29, 22-28]

#### In Layman's Terms
- You do not reset to ignorance every time new data arrive. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p10-p13]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 21, 29, 22-28]
- You carry forward what you learned and refine it with the next experiment. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p10-p13]; [NB: ics604-14-1_approximate_Bayesian_for_estimation.ipynb cells 21, 29, 22-28]

### G. Hypothesis Testing Foundations: Statistics, Parameters, and Method Families
- The second half of the lecture switches to hypothesis testing vocabulary. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
- A statistic is defined as a numerical summary computed from sample data. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
- A parameter is defined as a numerical quantity describing the full population. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
- A hypothesis is a claim about a population parameter. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
- The lecture also distinguishes: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
  - parametric methods, which assume structure about parameters/distributions, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
  - non-parametric methods, which avoid those assumptions. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]

#### In Layman's Terms
- A statistic comes from the data you collected. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
- A parameter is the bigger population fact you are trying to learn about. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]

### H. What Hypothesis Tests Care About: Effect Size, p-Value, and Data Setting
- The lecture says hypothesis testing usually focuses on two things: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
  - effect size, meaning how large the difference is, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
  - the probability that such a difference could arise by chance under the null. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
- The p-value is introduced as the quantity that measures this chance-based surprise. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
- Two common data setups are highlighted: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
  - comparing one sample to a population value, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
  - comparing two samples to each other. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
- The notebook uses curriculum and time-of-day examples to illustrate these designs concretely. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]

#### In Layman's Terms
- Statistical significance is not only "is there a difference?" [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]
- It is also "how big is the difference?" and "could random luck alone explain it?" [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p14-p16]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 3-5]

### I. Null vs Alternative Hypotheses and Proper Decision Language
- The lecture defines: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p17-p18]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 6-7]
  - `H0` as the null hypothesis of no change, no effect, or no real difference, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p17-p18]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 6-7]
  - `Ha` as the competing claim that the observed difference would be rare under `H0`. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p17-p18]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 6-7]
- It distinguishes single-tailed tests, which specify a direction, from two-tailed tests, which allow either direction. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p17-p18]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 6-7]
- The slides stress that `H0` and `Ha` are mutually exclusive. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p17-p18]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 6-7]
- A null hypothesis cannot be proven true; the proper conclusion is either: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p17-p18]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 6-7]
  - reject `H0`, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p17-p18]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 6-7]
  - or fail to reject `H0`. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p17-p18]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 6-7]
- "Statistically significant" is framed as data being unlikely to arise by chance alone under the null model. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p17-p18]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 6-7]

#### In Layman's Terms
- The default story is "nothing unusual happened." [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p17-p18]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 6-7]
- You only move away from that story if the data look too extreme to explain as random noise. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p17-p18]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 6-7]

### J. Observed Statistics, Repeated Sampling, and the Null-Distribution Setup
- The lecture's worked example compares YouTube and Vimeo viewing-time samples: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]
  - population means `232` and `219`, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]
  - shared standard deviation `12`, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]
  - `90` days of data for each platform. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]
- The chosen test statistic is the difference between sample means. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]
- The slides then emphasize that this observed statistic changes from sample to sample. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]
- To study that variability more clearly, the lecture temporarily uses `sigma = 2` so visually different groups are easier to inspect. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]
- It then asks what happens when samples come from the same distribution: [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]
  - repeated same-distribution samples produce mean differences centered near `0`, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]
  - shuffling and splitting data creates a reference distribution for chance-only differences, [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]
  - concatenation plus permutation is the null-distribution idea that Lecture 15 continues. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]

#### In Layman's Terms
- If there is no real difference, random re-grouping should usually produce differences near zero. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]
- That "noise-only" picture becomes the benchmark for judging your real observed difference. [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p18-p20]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 8-15, 9-17]; [PDF: ics604-S26-lec14-Bayesian_HypothesisTesting.pdf p21-p22]; [NB: ics604-14-2_hypothesis_testing_intro.ipynb cells 18-35, 19-33]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Homework reminder, lecture agenda, and Bayesian-to-testing transition | `work/lectures/PDFs/ics604-S26-lec14-Bayesian_HypothesisTesting.pdf` p1-p2 | `work/lectures/Notebooks/ics604-14-1_approximate_Bayesian_for_estimation.ipynb` (md 000-005) | A | Covered |
| A/B testing generative model and Binomial long-run framing | `work/lectures/PDFs/ics604-S26-lec14-Bayesian_HypothesisTesting.pdf` p3-p4 | `work/lectures/Notebooks/ics604-14-1_approximate_Bayesian_for_estimation.ipynb` (md 002-004) | B | Covered |
| ML/CI limitations with small samples and motivation for prior beliefs | `work/lectures/PDFs/ics604-S26-lec14-Bayesian_HypothesisTesting.pdf` p4-p5 | `work/lectures/Notebooks/ics604-14-1_approximate_Bayesian_for_estimation.ipynb` (md 005, code 006-010) | C | Covered |
| Reverse simulation idea and rejection-sampling algorithm | `work/lectures/PDFs/ics604-S26-lec14-Bayesian_HypothesisTesting.pdf` p6-p7 | `work/lectures/Notebooks/ics604-14-1_approximate_Bayesian_for_estimation.ipynb` (md 011-014, code 016) | D | Covered |
| Posterior distribution of `p_A`, likelihood agreement, and plausible-value range | `work/lectures/PDFs/ics604-S26-lec14-Bayesian_HypothesisTesting.pdf` p8-p9 | `work/lectures/Notebooks/ics604-14-1_approximate_Bayesian_for_estimation.ipynb` (md 015, md 019, code 016-018) | E | Covered |
| Posterior-as-prior sequential updating and Bayesian inference summary | `work/lectures/PDFs/ics604-S26-lec14-Bayesian_HypothesisTesting.pdf` p10-p13 | `work/lectures/Notebooks/ics604-14-1_approximate_Bayesian_for_estimation.ipynb` (md 020, md 028, code 021-027) | F | Covered |
| Statistics vs parameters, effect size, p-value framing, and parametric/non-parametric distinction | `work/lectures/PDFs/ics604-S26-lec14-Bayesian_HypothesisTesting.pdf` p14-p16 | `work/lectures/Notebooks/ics604-14-2_hypothesis_testing_intro.ipynb` (md 002-004) | G/H | Covered |
| `H0`/`Ha`, one-tailed vs two-tailed alternatives, fail-to-reject logic, and significance wording | `work/lectures/PDFs/ics604-S26-lec14-Bayesian_HypothesisTesting.pdf` p17-p18 | `work/lectures/Notebooks/ics604-14-2_hypothesis_testing_intro.ipynb` (md 005-006) | I | Covered |
| YouTube/Vimeo example, observed statistic, and repeated-sample variability for clearly separated groups | `work/lectures/PDFs/ics604-S26-lec14-Bayesian_HypothesisTesting.pdf` p18-p20 | `work/lectures/Notebooks/ics604-14-2_hypothesis_testing_intro.ipynb` (md 007-014, code 008-016) | J | Covered |
| Same-distribution differences, shuffle/split intuition, and permutation-based null setup | `work/lectures/PDFs/ics604-S26-lec14-Bayesian_HypothesisTesting.pdf` p21-p22 | `work/lectures/Notebooks/ics604-14-2_hypothesis_testing_intro.ipynb` (md 017-034, code 018-032) | J | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec14-Bayesian_HypothesisTesting.pdf`
- Notebook sources: `work/lectures/Notebooks/ics604-14-1_approximate_Bayesian_for_estimation.ipynb`, `work/lectures/Notebooks/ics604-14-2_hypothesis_testing_intro.ipynb`
