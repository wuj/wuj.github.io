# Lecture 11: Normal (Gaussian) Distribution + Kernel Density Estimation (KDE)

### Quick Overview
- Lecture 11 introduces the Normal distribution as the main continuous probability model, covering its parameters, PDF interpretation, spread via `sigma`, and how to compute and reason about normal densities in Python. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p2-p20]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 3-15]
- The lecture then motivates kernel density estimation as a flexible alternative to rigid histograms or fixed parametric assumptions, explaining kernels, Gaussian smoothing, and the KDE construction process. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p31]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 3-18]

#### In Layman's Terms
- First you learn the bell curve as a standard model for continuous data. Then you learn how to draw a smooth curve directly from data when you do not want to commit to one fixed formula. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p2-p31]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 3-15]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 3-18]

### A. Normal Distribution: Definition and Motivation
- The lecture introduces the normal (Gaussian) distribution as a continuous probability distribution. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p2-p3]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 3-4]
- It lists common real-world examples such as heights, measurement error, and durations. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p2-p3]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 3-4]
- It notes that many statistical procedures assume approximate normality. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p2-p3]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 3-4]
- The Gaussian companion notebook reinforces this framing and ties it to downstream inference workflows. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p2-p3]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 3-4]

#### In Layman's Terms
- The normal curve is a common "centered with tapering tails" pattern seen in many natural measurements. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p2-p3]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 3-4]
- Example: many people are near average height; very short/tall values are less common. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p2-p3]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 3-4]

### B. Normal Properties and Parameters (`mu`, `sigma`)
- Slides describe normal distribution as bell-shaped and symmetric. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p3-p4]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 5, 6]
- Parameters are center (`mu`) and spread (`sigma`). [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p3-p4]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 5, 6]
- It emphasizes that different parameter values define different distributions. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p3-p4]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 5, 6]
- The notebook explicitly plots parameter contrasts (`mu=0, sigma=1` vs `mu=2, sigma=5`) to show center shift, peak-height change, and spread widening. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p3-p4]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 5, 6]

#### In Layman's Terms
- `mu` moves the bell left/right; `sigma` makes it narrow or wide. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p3-p4]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 5, 6]
- Example: same center but larger `sigma` means more variability and more extreme values. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p3-p4]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 5, 6]

### C. PDF for Continuous Variables and PDF-vs-PMF
- The lecture presents the normal PDF formula and notation `X ~ N(mu, sigma)`. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p5, p7]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 8, 15, 9-11]
- It explains that for continuous variables, probability at exactly one point is zero. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p5, p7]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 8, 15, 9-11]
- Probability is obtained from area over an interval, not single-point height. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p5, p7]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 8, 15, 9-11]
- It contrasts PDF (density) with PMF (mass at discrete outcomes). [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p5, p7]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 8, 15, 9-11]
- The notebook includes a manual implementation: [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p5, p7]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 8, 15, 9-11]
```python
def computePDF_normal(x, mu, sigma):
    return 1.0/(sigma * np.sqrt(2 * np.pi)) * np.exp(-(x - mu)**2.0 / (2 * sigma**2))
```
Source grounding: [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p5, p7]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 8, 15, 9-11]
- It then cross-checks the same value with `scipy.stats.norm.pdf(...)`, reinforcing theory-to-library equivalence. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p5, p7]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 8, 15, 9-11]

#### In Layman's Terms
- Curve height is not directly "probability of exactly x"; it is density. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p5, p7]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 8, 15, 9-11]
- Example: to get probability of scores between 60 and 80, use area over that range. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p5, p7]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 8, 15, 9-11]

#### Language Bridge
- Similar to rate vs total distinction in engineering metrics: [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p5, p7]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 8, 15, 9-11]
- density is local rate, [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p5, p7]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 8, 15, 9-11]
- interval area is total probability mass. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p5, p7]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 8, 15, 9-11]

### D. Spread Intuition and Sigma-Region Reasoning
- Slides discuss concentration near mean and lower density farther in tails. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p8-p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 16-18, 19]
- They include sigma-based reasoning prompts (for example scores with given mean and standard deviation). [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p8-p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 16-18, 19]
- The lecture connects distance from mean to "how unusual" an observation is. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p8-p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 16-18, 19]
- The notebook adds explicit 1-sigma / 2-sigma / 3-sigma framing (about 68% / 95% / 99.7%) for interpretation. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p8-p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 16-18, 19]

#### In Layman's Terms
- Values close to center are common; far-away values are less common. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p8-p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 16-18, 19]
- Example: with mean 70 and std 10, 95 is notably farther from center than 75. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p8-p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 16-18, 19]

### E. Computing PDF in Python and Interpreting Values
- Slides show normal-density computation using SciPy (`scipy.stats.norm` and `norm.pdf` style calls). [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 20-24, 42]
- They pose conceptual checks around symmetry and relative density values. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 20-24, 42]
- The focus is interpretation, not only API invocation. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 20-24, 42]
- Notebook examples cover both "frozen distribution" and direct static calls: [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 20-24, 42]
```python
norm_0_1 = scipy.stats.norm(0, 1)
norm_0_1.pdf(2)
scipy.stats.norm.pdf(2, 0, 1)
```
Source grounding: [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 20-24, 42]
- The notebook also demonstrates vectorized pdf calls over arrays/lists and random draws via both `norm.rvs(...)` and `np.random.normal(...)`. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 20-24, 42]

#### In Layman's Terms
- Library calls compute model density quickly, but interpretation still matters. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 20-24, 42]
- Example: in symmetric normal distributions, density at `-2` equals density at `2` around mean 0. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 20-24, 42]

#### Language Bridge
- In PHP, equivalent behavior typically requires a stats package or manual formula implementation. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p9]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 20-24, 42]

### F. Why Summed PDF Values Can Exceed 1
- The lecture explicitly addresses confusion about summing sampled PDF heights. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p10, p14]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 26-28, 39, 46, 25, 45]
- It explains that density values are not probabilities by themselves. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p10, p14]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 26-28, 39, 46, 25, 45]
- Probability mass is approximated by density times interval width. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p10, p14]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 26-28, 39, 46, 25, 45]
- The notebook demonstrates this in two ways: [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p10, p14]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 26-28, 39, 46, 25, 45]
- summing pdf heights at selected points produces a value greater than 1; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p10, p14]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 26-28, 39, 46, 25, 45]
- multiplying histogram density height totals by bin width approximates area (mass) near 1. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p10, p14]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 26-28, 39, 46, 25, 45]
- It also shows a numerical Riemann-style accumulation (`density * dx`) and compares with `norm.cdf(...)` for sanity checking. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p10, p14]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 26-28, 39, 46, 25, 45]

#### In Layman's Terms
- Adding raw curve heights can exceed 1 because you are not summing true probability masses. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p10, p14]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 26-28, 39, 46, 25, 45]
- Example: convert each density to a tiny area segment before summing. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p10, p14]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 26-28, 39, 46, 25, 45]

#### Language Bridge
- Same idea as converting per-unit rates into totals by multiplying by span/width. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p10, p14]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 26-28, 39, 46, 25, 45]
- Rate-like values are not totals until scaled by interval size. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p10, p14]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 26-28, 39, 46, 25, 45]

### G. Histogram vs Density Curve
- Slides sample from a normal distribution, build histograms, and compare with theoretical PDF overlays. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p11-p12]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 34-41, 33, 40]
- They ask whether finite-sample histograms should match the smooth curve exactly. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p11-p12]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 34-41, 33, 40]
- The intended takeaway is approximate agreement with sampling variability. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p11-p12]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 34-41, 33, 40]
- The notebook operationalizes this by setting `np.random.seed(225)`, sampling 1,000 points from `N(0, 2)`, plotting count histograms vs density histograms, then overlaying the theoretical `scipy.stats.norm(0, 2).pdf(...)` curve. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p11-p12]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 34-41, 33, 40]

#### In Layman's Terms
- Histogram bars from finite data wobble around the ideal smooth curve. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p11-p12]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 34-41, 33, 40]
- Example: with 1,000 samples, shape should resemble normal, but bins will not perfectly trace the PDF. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p11-p12]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 34-41, 33, 40]

#### Language Bridge
- Similar to sampled telemetry approximating an expected baseline, not matching it point-for-point. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p11-p12]; [NB: ics604-11-1_probability_distributions_gaussian.ipynb cells 34-41, 33, 40]

### H. KDE Motivation: Histogram Boundary Sensitivity
- The lecture shows how histogram interpretation can change when bin boundaries shift. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p17-p18, p22]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 6, 9-13, 15-19, 8, 11, 14]
- It presents this as a major limitation when estimating an underlying density from finite data. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p17-p18, p22]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 6, 9-13, 15-19, 8, 11, 14]
- `np.histogram(..., density=True)` is discussed in this context. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p17-p18, p22]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 6, 9-13, 15-19, 8, 11, 14]
- The KDE notebook expands this with: [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p17-p18, p22]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 6, 9-13, 15-19, 8, 11, 14]
- raw histogram counts from `np.histogram`; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p17-p18, p22]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 6, 9-13, 15-19, 8, 11, 14]
- normalized bin probabilities via `counts / sum(counts)`; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p17-p18, p22]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 6, 9-13, 15-19, 8, 11, 14]
- density-style histogram outputs via `np.histogram(..., density=True)`; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p17-p18, p22]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 6, 9-13, 15-19, 8, 11, 14]
- side-by-side shifted-bin demonstrations on identical data (`bins_2` vs `bins_3`). [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p17-p18, p22]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 6, 9-13, 15-19, 8, 11, 14]

#### In Layman's Terms
- Two histograms of the same data can look different just because bins start at different points. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p17-p18, p22]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 6, 9-13, 15-19, 8, 11, 14]
- Example: shifting bins can move counts across boundaries and alter perceived peaks. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p17-p18, p22]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 6, 9-13, 15-19, 8, 11, 14]

#### Language Bridge
- This is like changing bucket boundaries in analytics dashboards and getting different visual conclusions. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p17-p18, p22]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 6, 9-13, 15-19, 8, 11, 14]
- Stable inference should not depend heavily on arbitrary bucket offsets. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p17-p18, p22]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 6, 9-13, 15-19, 8, 11, 14]

### I. KDE with Kernels, Gaussian Kernel, and Algorithm
- KDE is introduced as summing local kernel contributions from each data point. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]
- Square/top-hat and Gaussian kernels are discussed, with smoother estimates from Gaussian kernels. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]
- Slides provide the per-position KDE algorithm and note kernel-dependent computational tradeoffs. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]
- The notebook shows executable KDE APIs: [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]
```python
kde = sp.stats.gaussian_kde(x, bw_method=0.8)
x_densities = kde.evaluate(x_values)
```
Source grounding: [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]
- It then overlays KDE with histograms for: [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]
- unimodal simulated Gaussian data (`N(0, 0.5)`), [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]
- bimodal data created by concatenating two Gaussian samples (`N(0, 0.5)` and `N(9, 1)`). [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]
- This directly supports lecture points on smoothing behavior, bandwidth effects, and practical density-shape interpretation. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]

#### In Layman's Terms
- KDE places a small bump at each data point, then adds all bumps to form a smooth estimate. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]
- Example: dense regions accumulate taller combined bumps, revealing likely high-density zones. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]

#### Language Bridge
- This resembles applying many local influence functions and averaging the result. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]
- Same math can be implemented in Java/C#/JS/PHP with loops and numeric libraries. [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p21-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 20-24, 27, 28-31, 35-36]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p26-p27]; [NB: ics604-11-2_kernel_density_estimation.ipynb cells 25-26, 32-36, 24]; [PDF: ics604-S26-lec11-Gaussian_KDE.pdf p31]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Normal distribution intro and examples | `work/lectures/PDFs/ics604-S26-lec11-Gaussian_KDE.pdf` p2-p3 | `work/lectures/Notebooks/ics604-11-1_probability_distributions_gaussian.ipynb` (md 02-03) | A | Covered |
| Normal properties and parameter effects (`mu`, `sigma`) | `work/lectures/PDFs/ics604-S26-lec11-Gaussian_KDE.pdf` p3-p4 | `work/lectures/Notebooks/ics604-11-1_probability_distributions_gaussian.ipynb` (code 04, md 05) | B | Covered |
| PDF formula, continuous-variable semantics, and PDF-vs-PMF | `work/lectures/PDFs/ics604-S26-lec11-Gaussian_KDE.pdf` p5, p7 | `work/lectures/Notebooks/ics604-11-1_probability_distributions_gaussian.ipynb` (md 07, md 14, code 08-10) | C | Covered |
| Sigma-region intuition and unusual-value reasoning | `work/lectures/PDFs/ics604-S26-lec11-Gaussian_KDE.pdf` p8-p9 | `work/lectures/Notebooks/ics604-11-1_probability_distributions_gaussian.ipynb` (md 15-17, md 18) | D | Covered |
| Computing and interpreting pdfs in SciPy | `work/lectures/PDFs/ics604-S26-lec11-Gaussian_KDE.pdf` p9 | `work/lectures/Notebooks/ics604-11-1_probability_distributions_gaussian.ipynb` (code 19-23, code 41) | E | Covered |
| Why summed pdf values can exceed 1; density-to-mass conversion | `work/lectures/PDFs/ics604-S26-lec11-Gaussian_KDE.pdf` p10, p14 | `work/lectures/Notebooks/ics604-11-1_probability_distributions_gaussian.ipynb` (code 25-27, code 38, code 45, md 24, md 44) | F | Covered |
| Histogram vs density-curve overlay from normal samples | `work/lectures/PDFs/ics604-S26-lec11-Gaussian_KDE.pdf` p11-p12 | `work/lectures/Notebooks/ics604-11-1_probability_distributions_gaussian.ipynb` (code 33-40, md 32, md 39) | G | Covered |
| Histogram normalization and bin-boundary sensitivity motivation for KDE | `work/lectures/PDFs/ics604-S26-lec11-Gaussian_KDE.pdf` p17-p18, p22 | `work/lectures/Notebooks/ics604-11-2_kernel_density_estimation.ipynb` (code 05, code 08-12, code 14-18, md 07, md 10, md 13) | H | Covered |
| KDE kernels, Gaussian-kernel formula, algorithm, and complexity tradeoffs | `work/lectures/PDFs/ics604-S26-lec11-Gaussian_KDE.pdf` p21-p27 | `work/lectures/Notebooks/ics604-11-2_kernel_density_estimation.ipynb` (md 19-23, md 26, code 27-30, code 34-35) | I | Covered |
| KDE on simulated data (unimodal and bimodal) and interpretation | `work/lectures/PDFs/ics604-S26-lec11-Gaussian_KDE.pdf` p26-p27 | `work/lectures/Notebooks/ics604-11-2_kernel_density_estimation.ipynb` (code 24-25, code 31-35, md 23) | I | Covered |
| Participation closing questions and conceptual synthesis | `work/lectures/PDFs/ics604-S26-lec11-Gaussian_KDE.pdf` p31 | `work/lectures/Notebooks/ics604-11-2_kernel_density_estimation.ipynb` (concept continuity) | I | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec11-Gaussian_KDE.pdf`
- Notebook sources: `work/lectures/Notebooks/ics604-11-1_probability_distributions_gaussian.ipynb`, `work/lectures/Notebooks/ics604-11-2_kernel_density_estimation.ipynb`

