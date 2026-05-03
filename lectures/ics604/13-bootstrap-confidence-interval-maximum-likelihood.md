# Lecture 13: Bootstrap Confidence Interval Review + Maximum Likelihood Parameter Estimation

### Quick Overview
- Lecture 13 starts by reviewing bootstrap confidence intervals, especially what they mean, how they can be misread, and when the bootstrap works well or breaks down. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p1-p10]
- It then introduces maximum likelihood estimation, showing how Poisson and Binomial model parameters can be estimated by choosing the value that makes the observed data most likely under the model. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p11-p22]

#### In Layman's Terms
- This lecture has two linked ideas: bootstrap tells you how stable an estimate is, and maximum likelihood tells you which parameter setting makes your observed data look most believable. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p1-p22]

### A. Lecture Setup, Homework Logistics, and Course Continuity
- The lecture opens with Homework 2 reminders: due Friday, March 13 at 11:59 PM, submit only the `.ipynb` file to Lamaku, do not upload the data file, and rename the notebook as instructed. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p1-p2]
- The deck then restates the course flow: bootstrap confidence intervals are the leftover review topic from Lecture 12, and maximum likelihood parameter estimation is the new main topic. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p1-p2]
- The overall transition is from resampling-based uncertainty quantification to model-based parameter fitting. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p1-p2]

#### In Layman's Terms
- The lecture starts by finishing the bootstrap discussion, then switches to a different question: "Which parameter value makes the observed data look most believable?" [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p1-p2]

### B. Bootstrap Review: Core Procedure and the Stand-in-Sample Assumption
- The lecture restates bootstrap CI construction as three steps: resample with replacement from the observed sample, compute the statistic on each resample, and inspect the resulting distribution of the statistic. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p2-p4]
- The key assumption is explicit: the observed sample stands in for the true population. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p2-p4]
- Repeated resampling approximates how much the estimator would vary across repeated studies. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p2-p4]

#### In Layman's Terms
- You repeatedly rebuild similar datasets from the one you already have so you can see how much your estimate wiggles. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p2-p4]

### C. How Confident Are We in a Bootstrap Confidence Interval?
- For a 95% CI workflow, the lecture walks through repeated-study simulation: draw a fresh sample, bootstrap it many times, build one interval, repeat the full process many times, and count how often the true parameter is covered. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p4-p7]
- The expected long-run coverage is about 95%, with roughly 5% misses. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p4-p7]
- The lecture uses this repeated-experiment view to define what confidence intervals mean. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p4-p7]

#### In Layman's Terms
- The real question is not "What is the chance this one interval is right?" but "If I keep repeating this recipe, how often does it work?" [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p4-p7]

### D. Common Bootstrap Misinterpretations and Correct Meaning
- The lecture emphasizes that a 95% CI does not mean the already-computed interval has a 95% chance of containing the true value. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p4-p7]
- Once the interval is computed, it either contains the parameter or it does not. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p4-p7]
- The 95% statement applies to the procedure's long-run coverage rate. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p4-p7]

#### In Layman's Terms
- The randomness is in the interval-building process before you see the interval, not in the finished interval after the fact. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p4-p7]

### E. Why Bootstrap Can Be Effective and Where It Can Fail
- The lecture highlights bootstrap strengths: it reuses sample information, avoids strong parametric assumptions, and works well for many practical uncertainty-estimation tasks. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p7-p9]
- It recommends many replications, commonly around 10,000, to reduce Monte Carlo noise. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p7-p9]
- It also warns about weak cases: very small samples, extreme-percentile or min/max targets, irregular statistics, and biased or unrepresentative original samples. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p7-p9]

#### In Layman's Terms
- Bootstrap is powerful when you have enough reasonably representative data, but it becomes shaky when data are tiny or the statistic is unusually sensitive. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p7-p9]

### F. Transition to Maximum Likelihood for Parameter Estimation
- The lecture shifts from "How uncertain is our estimate?" to "Which parameter value best explains observed data under a chosen model?" [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p10-p12]
- The running dataset is daily moving-traffic citation counts collected across about 90 days and spread over time to reduce seasonal bias. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p10-p12]
- The new target is explicit: choose the most plausible parameter for an assumed generative distribution. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p10-p12]

#### In Layman's Terms
- Bootstrap asks for an uncertainty band; MLE asks for the single best-fitting parameter value. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p10-p12]

### G. Data Framing and Candidate Fits for Poisson Counts
- The lecture motivates a Poisson model because the data are non-negative integer counts. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p10-p12]
- The observed counts peak around 17, so candidate Poisson curves near `lambda = 17` visually fit better than curves centered far away. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p10-p12]
- Slides compare several candidate `lambda` values to build intuition that parameter choice changes where probability mass is concentrated. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p10-p12]

#### In Layman's Terms
- If the data cluster around 17 events, a Poisson centered near 17 looks more plausible than one centered near 9. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p10-p12]

### H. Computing Likelihood Through Independent-Event Multiplication
- With a fixed `lambda`, each observation contributes a probability via `poisson.pmf(observation, lambda)`. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p12-p17]
- Assuming independent observations, the likelihood of the full dataset is the product of all those probabilities. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p12-p17]
- The lecture ties this to the same independence rule used for compound probability in simpler examples such as coin flips. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p12-p17]
- The notebook mirrors this with scalar PMF checks, vectorized PMF evaluation over all counts, and `np.prod(...)` to combine them. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p12-p17]

#### In Layman's Terms
- If each day is independent, then the chance of seeing the whole 90-day sequence is built by multiplying one-day probabilities together. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p12-p17]

### I. Likelihood Scale and Why the Numbers Get Tiny
- The lecture explains that likelihood values become extremely small because a specific observed sequence is only one path among an enormous number of possible sequences. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p12-p17]
- For just three days with counts capped at 50, there are `51^3 = 132,651` possible sequences; for 90 days, the count of possible sequences is astronomically larger. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p12-p17]
- Tiny absolute likelihood values are therefore expected and do not automatically imply a bad model. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p12-p17]

#### In Layman's Terms
- A long exact sequence is one needle in a huge haystack, so its exact probability can be tiny even when it is the best-fitting explanation. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p12-p17]

### J. Log-Likelihood and Numeric Stability
- The lecture introduces log-likelihood because multiplying many small probabilities can underflow in floating-point arithmetic. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p17-p18]
- Taking logs converts products into sums through `log(x * y) = log(x) + log(y)`. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p17-p18]
- The notebook computes Poisson log-likelihoods across candidate `lambda` values and shows that the maximizing `lambda` is unchanged because the log is monotonic. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p17-p18]
- It also stresses that log-likelihood values are not probabilities and do not sum to one. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p17-p18]

#### In Layman's Terms
- Log-likelihood is the safe numerical version of likelihood when the raw product becomes too small for the computer. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p17-p18]

### K. Maximum Likelihood for the Poisson Model
- The lecture states the analytic result for Poisson data: the MLE of `lambda` is the sample mean. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p18]
- The notebook reports a citation-count sample mean of `16.41`, so the Poisson MLE is `lambda = 16.41`. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p18]
- The lecture also notes that likelihood-based reasoning can compare different models, not only different parameter values within one model family. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p18]

#### In Layman's Terms
- In this case, the best-fitting Poisson rate is simply the average number of daily citations you observed. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p18]

### L. MLE Beyond Poisson: Binomial A/B Testing Example
- The lecture then applies the same logic to an A/B-testing example with 8 users on version A and 5 sign-ups. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p19-p21]
- Under a Binomial model with fixed `n = 8` and unknown `p`, the best-fitting success probability is `p_hat = successes / n = 5/8 = 0.625`. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p19-p21]
- The notebook evaluates candidate `p` values over a grid, computes Binomial likelihoods or log-likelihoods, and recovers the same result. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p19-p21]

#### In Layman's Terms
- If 5 out of 8 users sign up, the most plausible underlying conversion rate is 62.5%. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p19-p21]

### M. MLE Formulas for Gaussian Parameters and Conceptual Limits
- The lecture closes by noting that common distributions often have analytic MLE formulas. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p21-p22]
- For a Gaussian model, the MLE of the mean is the sample mean, and the MLE of the standard deviation follows the sample-based expression shown in the notes. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p21-p22]
- It also reiterates an important limitation: MLE provides a point estimate only and does not, by itself, give a confidence interval or the probability that the estimate is correct. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p21-p22]

#### In Layman's Terms
- MLE gives one best single-number answer, not the uncertainty band around that answer. [PDF: ics604-S26-lec13-Bootstrap_MLE.pdf p21-p22]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Homework reminders, lecture agenda, and transition from bootstrap review to MLE | `work/lectures/PDFs/ics604-S26-lec13-Bootstrap_MLE.pdf` p1-p2 | `work/lectures/Notebooks/ics604-13-1_param_esitmation_maximum_likelihood.ipynb` (intro markdown) | A | Covered |
| Bootstrap CI procedure and sample-as-proxy assumption | `work/lectures/PDFs/ics604-S26-lec13-Bootstrap_MLE.pdf` p2-p4 | Conceptual continuity from Lecture 12; no new bootstrap implementation cells in `work/lectures/Notebooks/ics604-13-1_param_esitmation_maximum_likelihood.ipynb` | B | Covered |
| Confidence-interval coverage via repeated experiments | `work/lectures/PDFs/ics604-S26-lec13-Bootstrap_MLE.pdf` p4-p7 | Conceptual review in `work/lectures/Notebooks/ics604-13-1_param_esitmation_maximum_likelihood.ipynb` | C/D | Covered |
| Bootstrap strengths, recommended replication depth, and failure cases | `work/lectures/PDFs/ics604-S26-lec13-Bootstrap_MLE.pdf` p7-p9 | Conceptual review in `work/lectures/Notebooks/ics604-13-1_param_esitmation_maximum_likelihood.ipynb` | E | Covered |
| Citation-count setup and Poisson framing | `work/lectures/PDFs/ics604-S26-lec13-Bootstrap_MLE.pdf` p10-p12 | `work/lectures/Notebooks/ics604-13-1_param_esitmation_maximum_likelihood.ipynb` (citation-data setup and candidate-fit cells) | F/G | Covered |
| Likelihood construction from independent Poisson PMFs | `work/lectures/PDFs/ics604-S26-lec13-Bootstrap_MLE.pdf` p12-p17 | `work/lectures/Notebooks/ics604-13-1_param_esitmation_maximum_likelihood.ipynb` (`poisson.pmf`, vectorized likelihood, `np.prod`) | H/I | Covered |
| Log-likelihood and underflow avoidance | `work/lectures/PDFs/ics604-S26-lec13-Bootstrap_MLE.pdf` p17-p18 | `work/lectures/Notebooks/ics604-13-1_param_esitmation_maximum_likelihood.ipynb` (log-likelihood cells) | J | Covered |
| Poisson MLE as sample mean and model-comparison framing | `work/lectures/PDFs/ics604-S26-lec13-Bootstrap_MLE.pdf` p18 | `work/lectures/Notebooks/ics604-13-1_param_esitmation_maximum_likelihood.ipynb` (MLE explanation and sample mean output) | K | Covered |
| Binomial MLE in the A/B-testing example | `work/lectures/PDFs/ics604-S26-lec13-Bootstrap_MLE.pdf` p19-p21 | `work/lectures/Notebooks/ics604-13-1_param_esitmation_maximum_likelihood.ipynb` (Binomial MLE cells and `p_hat = 5/8`) | L | Covered |
| Gaussian MLE formulas and point-estimate limitations | `work/lectures/PDFs/ics604-S26-lec13-Bootstrap_MLE.pdf` p21-p22 | `work/lectures/Notebooks/ics604-13-1_param_esitmation_maximum_likelihood.ipynb` (closing notes on analytic MLEs and no CI guarantee) | M | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec13-Bootstrap_MLE.pdf`
- Notebook source: `work/lectures/Notebooks/ics604-13-1_param_esitmation_maximum_likelihood.ipynb`
