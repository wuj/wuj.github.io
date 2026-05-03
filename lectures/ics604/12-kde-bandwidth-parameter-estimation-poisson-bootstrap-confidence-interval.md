# Lecture 12: KDE Bandwidth + Parameter Estimation + Poisson Distribution + Bootstrap Confidence Interval

### Quick Overview
- Lecture 12 first continues KDE by focusing on bandwidth, under- versus over-smoothing, and the bias-variance tradeoff involved in choosing how smooth a density estimate should be. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p1-p9]
- It then pivots from describing data to inferring hidden parameters, introducing Poisson count modeling, bootstrap estimation of a mean, and the interpretation and limitations of confidence intervals. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p10-p26]

#### In Layman's Terms
- This lecture starts by asking how smooth a density curve should be, then changes gears and asks what hidden parameter likely produced the data and how uncertain that estimate is. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p1-p26]

### A. Lecture Scope, Homework Logistics, and KDE Continuity
- The deck opens with Homework 2 logistics, release timing, submission format, and deadline expectations before technical content starts. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p1-p2]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 2-4]
- The lecture agenda spans KDE bandwidth selection, parameter estimation, Poisson modeling, and bootstrap confidence intervals. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p1-p2]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 2-4]
- It explicitly connects to the prior KDE lecture by restating KDE as finite-sample density estimation using kernels centered at each data point. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p1-p2]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 2-4]
- Notebook `ics604-12-1_KDE_bandwidth.ipynb` establishes this continuity in its title/import cells and immediate transition into bandwidth selection (cells 001-003). [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p1-p2]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 2-4]

#### In Layman's Terms
- The class starts by setting course logistics, then moves from "how smooth should a KDE be?" to "how do we estimate unknown distribution parameters?" [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p1-p2]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 2-4]
- Think of this lecture as the bridge from visual density estimation to formal statistical inference. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p1-p2]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 2-4]

### B. Bandwidth Meaning and Kernel Influence Radius
- The slides define bandwidth as kernel width and emphasize that bandwidth applies regardless of kernel family (top-hat, exponential, Gaussian, etc.). [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p3]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 4, 5]
- The core control is neighbor influence radius: larger bandwidth includes farther points; smaller bandwidth focuses on very local neighborhoods. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p3]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 4, 5]
- Notebook cell 004 visualizes Gaussian kernels with different scales to make influence range concrete before fitting KDE on real samples. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p3]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 4, 5]
- This section frames bandwidth as the primary lever in KDE behavior, not a cosmetic plotting option. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p3]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 4, 5]

#### In Layman's Terms
- Bandwidth is how far each data point's "influence bubble" reaches when building the smooth density curve. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p3]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 4, 5]
- Small bubbles look only nearby; large bubbles blend information from farther away points. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p3]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 4, 5]

### C. Under-Smoothing vs Over-Smoothing in KDE
- The lecture labels too-small bandwidth as under-smoothing: the KDE becomes jagged, sensitive to sample noise, and analogous to overfitting. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p4]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 6, 8]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p5]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 9, 10]
- It labels too-large bandwidth as over-smoothing: peaks flatten, structure is lost, and the result corresponds to underfitting. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p4]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 6, 8]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p5]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 9, 10]
- Notebook cells 007 and 009 demonstrate both cases on the same two-cluster simulated data using small (`bw_method=0.02`) and larger (`0.6`, `1`) bandwidths. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p4]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 6, 8]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p5]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 9, 10]
- Histogram overlays are used to show how smoothness choices can either invent detail or erase meaningful modes. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p4]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 6, 8]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p5]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 9, 10]

#### In Layman's Terms
- Too little smoothing makes the curve chase random wiggles. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p4]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 6, 8]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p5]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 9, 10]
- Too much smoothing hides real patterns in the data. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p4]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 6, 8]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p5]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 9, 10]

### D. Bias-Variance Tradeoff for KDE Bandwidth
- The lecture presents bandwidth choice as a bias-variance tradeoff: small bandwidth lowers bias but raises variance; large bandwidth does the opposite. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p6-p10]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 11-20, 14-19]
- Slides use repeated-sample reasoning from the same mixture population to separate unstable high-variance behavior from stable but biased behavior. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p6-p10]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 11-20, 14-19]
- Notebook cells 013-018 implement this with repeated draws from two Gaussians and multiple bandwidth settings (`0.4`, `0.05`, `1`, `2`). [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p6-p10]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 11-20, 14-19]
- High variance is framed as sample-to-sample KDE instability; high bias is framed as consistent oversimplification of density structure. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p6-p10]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 11-20, 14-19]
- The objective is to find a bandwidth that minimizes both sources of error well enough for inference and interpretation. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p6-p10]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 11-20, 14-19]

#### In Layman's Terms
- Variance asks: "If I collect new data, does my estimated curve change a lot?" [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p6-p10]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 11-20, 14-19]
- Bias asks: "Is my curve systematically too simple or misshapen versus the true pattern?" [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p6-p10]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 11-20, 14-19]

### E. Bandwidth Selection: Theoretical, Empirical, Practical
- Theoretical selection uses analytic rules; slides highlight Silverman's rule as a fast plug-in approach. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p11-p12]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 21-23, 24-26]
- Empirical selection is described as cross-validation over candidate bandwidths, keeping out data to maximize fit quality on held-out observations. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p11-p12]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 21-23, 24-26]
- Practical workflow combines defaults plus domain-aware adjustment for interpretability, especially when known structure (for example bimodality) should be preserved. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p11-p12]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 21-23, 24-26]
- Notebook cells 023-025 show this practical comparison using `gaussian_kde` defaults, `'silverman'`, and manual tuning. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p11-p12]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 21-23, 24-26]

```python
kde_default = sp.stats.gaussian_kde(all_data)               # default rule
kde_silver = sp.stats.gaussian_kde(all_data, bw_method='silverman')
kde_manual = sp.stats.gaussian_kde(all_data, bw_method=0.09)
```
Source grounding: [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p11-p12]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 21-23, 24-26]

#### In Layman's Terms
- You can use a formula-based default first, then tweak bandwidth if the plot conflicts with what you know about the data. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p11-p12]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 21-23, 24-26]
- The goal is a useful estimate, not blindly trusting one automatic value. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p11-p12]; [NB: ics604-12-1_KDE_bandwidth.ipynb cells 21-23, 24-26]

### F. Generative Modeling vs Statistical Inference
- The lecture introduces generative modeling as a top-down view: assume a distribution with parameters and answer probability/prediction/simulation questions. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p14-p15]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 4-5]
- It contrasts statistical inference as bottom-up reasoning: start from sample data and infer unknown population parameters. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p14-p15]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 4-5]
- Notebook `ics604-12-2_param_estimation_intro.ipynb` cells 003-004 expand this directional contrast with explicit parameter-estimation framing. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p14-p15]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 4-5]
- This transition marks the course move from known-parameter probability calculations to unknown-parameter estimation. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p14-p15]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 4-5]

#### In Layman's Terms
- Generative modeling asks, "If I know the process, what outcomes should I expect?" [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p14-p15]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 4-5]
- Statistical inference asks, "Given outcomes I saw, what process likely generated them?" [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p14-p15]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 4-5]

### G. Parameter Estimation Setup for Count Data
- Slides present a traffic-citation count dataset and motivate Poisson modeling for event counts over fixed space/time windows. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p16]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 6, 7-8]
- The parameter-estimation question is explicit: estimate Poisson `lambda` from observed sample data. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p16]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 6, 7-8]
- The lecture roadmap names three estimation paradigms: Bootstrap Confidence Intervals, Maximum Likelihood, and Bayesian Framework. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p16]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 6, 7-8]
- Notebook cells 005-007 load `citations_counts.tsv` and visualize count behavior with a density-normalized histogram to motivate model choice. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p16]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 6, 7-8]

#### In Layman's Terms
- We observe count data first, then estimate the one rate parameter that controls the Poisson model. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p16]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 6, 7-8]
- The lecture previews three families of methods to estimate that same unknown quantity. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p16]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 6, 7-8]

### H. Poisson Distribution: Assumptions, PMF, and Diagnostics
- The lecture defines Poisson as a count model for events in fixed intervals/regions, with independent occurrences and nonnegative integer outcomes. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p17-p19]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 9-14, 11, 13]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p20]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 16, 15]
- It emphasizes the single parameter `lambda` and the diagnostic identity mean = variance under the Poisson assumption. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p17-p19]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 9-14, 11, 13]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p20]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 16, 15]
- Slides and notebook examples compute probabilities for exact counts using the PMF. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p17-p19]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 9-14, 11, 13]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p20]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 16, 15]
- For large `lambda` values, Poisson is presented as approximately Gaussian with mean `mu=lambda` and standard deviation `sigma=sqrt(lambda)`. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p17-p19]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 9-14, 11, 13]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p20]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 16, 15]
- The lecture warns that over-dispersed data (variance much larger than mean) violates Poisson assumptions and may require alternatives like Negative Binomial. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p17-p19]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 9-14, 11, 13]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p20]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 16, 15]

```python
x = np.arange(0, 30, 1)
pmf_vals = poisson.pmf(x, 10)
for k in [0, 5, 10, 15, 20, 30, 50]:
    print(k, poisson.pmf(k, 10))
```
Source grounding: [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p17-p19]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 9-14, 11, 13]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p20]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 16, 15]

#### In Layman's Terms
- Poisson answers: "How likely is exactly k events in this interval?" [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p17-p19]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 9-14, 11, 13]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p20]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 16, 15]
- If data vary much more than their mean, Poisson may be the wrong model. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p17-p19]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 9-14, 11, 13]; [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p20]; [NB: ics604-12-2_param_estimation_intro.ipynb cells 16, 15]

### I. Bootstrap Procedure for Estimating the Mean
- Bootstrapping is introduced as resampling with replacement from the observed sample to approximate sampling variability without direct population access. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]
- The lecture procedure is explicit: draw many resamples, compute the statistic each time, inspect the statistic's empirical distribution. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]
- Notebook `ics604-12-3_param_estimation_bootstrap.ipynb` uses `n=100` observations, `10,000` bootstrap iterations, and percentile bounds for a 95% interval. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]
- The bootstrap mean histogram operationalizes uncertainty in the estimated population mean. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]

```python
bootstrap_means = []
for _ in range(10_000):
    b = np.random.choice(data, 100, replace=True)
    bootstrap_means.append(b.mean())
ci95 = np.percentile(bootstrap_means, (2.5, 97.5))
```
Source grounding: [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]

#### In Layman's Terms
- We repeatedly "rebuild" similar datasets from what we observed and watch how the mean changes. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]
- That spread gives a practical uncertainty range for the true mean. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]

### J. Confidence-Interval Interpretation, Coverage, and Bootstrap Limits
- The lecture interprets a 95% confidence interval via long-run coverage, not as a probability statement about one already-computed interval. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]
- It validates this by repeating the full experiment many times and counting interval failures to cover the true parameter. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]
- Notebook cells 015-019 implement repeated-interval simulation and visualize covering vs non-covering intervals. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]
- Later markdown cells (021-023, 025-026) address common CI misinterpretations, when bootstrap works well, and failure modes (very small samples, extreme-tail statistics, severe irregularity). [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]
- The practical message is that bootstrap is powerful but assumption-sensitive; reliability depends on representative sampling and sufficient resampling depth. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]

#### In Layman's Terms
- A "95% CI" means the method succeeds about 95% of the time across repeated studies, not that one specific interval has 95% chance after it is computed. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]
- Bootstrap is strong for many central-parameter tasks, but weaker for tiny samples or extreme-value targets. [PDF: ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf p21-p22, p24, p26]; [NB: ics604-12-3_param_estimation_bootstrap.ipynb cells 4-6, 7-13, 14-15, 16-20, 21-24, 26-27]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Homework logistics, lecture agenda, and KDE recap continuity | `work/lectures/PDFs/ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf` p1-p2 | `work/lectures/Notebooks/ics604-12-1_KDE_bandwidth.ipynb` (md 001-003) | A | Covered |
| Kernel-width definition and neighboring-point influence radius | `work/lectures/PDFs/ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf` p3 | `work/lectures/Notebooks/ics604-12-1_KDE_bandwidth.ipynb` (md 003, code 004) | B | Covered |
| Under-smoothing and overfitting behavior under too-small bandwidth | `work/lectures/PDFs/ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf` p4 | `work/lectures/Notebooks/ics604-12-1_KDE_bandwidth.ipynb` (md 005, code 007) | C | Covered |
| Over-smoothing and underfitting behavior under too-large bandwidth | `work/lectures/PDFs/ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf` p5 | `work/lectures/Notebooks/ics604-12-1_KDE_bandwidth.ipynb` (md 008, code 009) | C | Covered |
| Bias-variance objective and repeated-sample intuition for KDE | `work/lectures/PDFs/ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf` p6-p10 | `work/lectures/Notebooks/ics604-12-1_KDE_bandwidth.ipynb` (md 010-019, code 013-018) | D | Covered |
| Bandwidth-selection strategies: theoretical, empirical, practical | `work/lectures/PDFs/ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf` p11-p12 | `work/lectures/Notebooks/ics604-12-1_KDE_bandwidth.ipynb` (md 020-022, code 023-025) | E | Covered |
| Generative modeling and upward inference framing | `work/lectures/PDFs/ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf` p14-p15 | `work/lectures/Notebooks/ics604-12-2_param_estimation_intro.ipynb` (md 003-004) | F | Covered |
| Parameter-estimation setup and three-method roadmap (Bootstrap, MLE, Bayesian) | `work/lectures/PDFs/ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf` p16 | `work/lectures/Notebooks/ics604-12-2_param_estimation_intro.ipynb` (md 005, code 006-007) | G | Covered |
| Poisson assumptions, single-parameter PMF, and worked probability examples | `work/lectures/PDFs/ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf` p17-p19 | `work/lectures/Notebooks/ics604-12-2_param_estimation_intro.ipynb` (md 008-013, code 010, code 012) | H | Covered |
| Poisson Gaussian approximation and over-dispersion caution | `work/lectures/PDFs/ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf` p20 | `work/lectures/Notebooks/ics604-12-2_param_estimation_intro.ipynb` (md 015, code 014) | H | Covered |
| Bootstrap resampling workflow, CI interpretation, long-run coverage, and caveats | `work/lectures/PDFs/ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf` p21-p22, p24, p26 | `work/lectures/Notebooks/ics604-12-3_param_estimation_bootstrap.ipynb` (md 003-005, code 006-012, md 013-014, code 015-019, md 020-023, md 025-026) | I/J | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec12-KDEBandwidth_Bootstrap.pdf`
- Notebook sources: `work/lectures/Notebooks/ics604-12-1_KDE_bandwidth.ipynb`, `work/lectures/Notebooks/ics604-12-2_param_estimation_intro.ipynb`, `work/lectures/Notebooks/ics604-12-3_param_estimation_bootstrap.ipynb`
