# Lecture 18: Standard Tests and Correlation

### Quick Overview
- Lecture 18 is a two-part lecture bundle. The updated common-tests notebook covers parametric mean-based tests such as one-sample `z`, one-sample `t`, Student's independent-samples `t`, and Welch's independent-samples `t`, while the PDF introduces the transition into correlation. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p1-p11]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44-69]
- The correlation half covers positive, negative, and no correlation, covariance, Pearson's `R`, and notebook extensions on `R^2`, regression intuition, Spearman correlation, and correlation significance. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p12-p20]; [NB2: ics604-18-19_correlation.ipynb cells 1-40]

#### In Layman's Terms
- This lecture first teaches the standard formulas for testing averages, then starts the shift into correlation by asking whether two variables move together and how to summarize that movement with a number. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p1-p20]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44-69]; [NB2: ics604-18-19_correlation.ipynb cells 1-40]

### A. Lecture Logistics, Notebook Update, and the Split Between the Two Companion Notebooks
- The slides open with logistics and reminders: Homework Assignment 3 is due Monday, April 6 at 11:59 PM, Exercise 4 on chi-squared tests is due that day, and project-proposal peer feedback is due that day as well. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p1-p2]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 1-2]
- The lecture also announces that the common-tests notebook was updated from `ics604-17_hypothesis_testing_common_tests.ipynb` to `ics604-17-18_hypothesis_testing_common_tests.ipynb`, and it corrects the Lecture 15 Type I error annotation to `FP` for false positive. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p2]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 1-2]
- The Lecture 18 agenda combines two distinct topics: standard parametric hypothesis tests and correlations. The slide list includes one-sample `z`-tests, one-sample `t`-tests, Student's and Welch's independent-samples `t`-tests, and Pearson's correlation coefficient `R`. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p2]
- In practice, the lecture bundle is split across two notebooks: the updated common-tests notebook contains the `z` and `t` material starting at cell `44`, while the correlation notebook contains the correlation material and its notebook-only extensions. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p2]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44-69]; [NB2: ics604-18-19_correlation.ipynb cells 1-40]

#### In Layman's Terms
- Lecture 18 is really a two-part bundle: first the standard named tests for means, then the start of correlation. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p2]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44-69]; [NB2: ics604-18-19_correlation.ipynb cells 1-40]
- The PDF introduces the topic list, but the actual worked material is spread across two notebooks rather than one. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p2]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44-69]; [NB2: ics604-18-19_correlation.ipynb cells 1-40]

### B. `z`-Tests and `t`-Tests as Parametric Mean-Comparison Tests
- The lecture frames both the `z`-test and the `t`-test as ways to decide whether an observed mean difference is likely due to chance or to a real underlying effect. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p3]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44]
- It explicitly ties them back to the same workflow used in earlier simulation-based hypothesis testing: start with a null hypothesis, compute an observed statistic, and compare it to a reference distribution under the null. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p3]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44]
- The notebook adds the practical distinction: the `z`-test is appropriate when the population standard deviation is known, while the `t`-test is the usual choice when that standard deviation is unknown and must be estimated from the sample. [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44]
- The lecture motivates these tests with familiar examples such as drug effects in medicine and group comparisons in business analytics. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p3]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44]

#### In Layman's Terms
- These are the standard named tests for asking whether an average looks unusually high, low, or different. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p3]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44]
- They use the same logic as the earlier simulation lectures; the only difference is that the null distribution now comes from a known probability distribution instead of from repeated shuffling or resampling. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p3]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44]

#### Language Bridge
- This is the lecture's shift from simulation-built null distributions to closed-form statistical APIs. [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44]
- Instead of approximating the null world by brute force every time, you now query a standard distribution with known formulas and assumptions. [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 44]

### C. One-Sample `z`-Test with Known Population Standard Deviation
- The main one-sample `z`-test example studies gene expression in coral survivors after a heat wave. The null model assumes normal corals have population mean `mu = 67.5` and known population standard deviation `sigma = 9.5`. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p3-p6]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 45-57]
- The sample contains `20` survivor measurements, and the notebook computes `x-bar = 72.3`. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p3-p6]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 46, 50]
- The standardized test statistic is: [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p4-p6]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 48-56]

  `z = (x-bar - mu) / (sigma / sqrt(N))` [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p4-p6]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 48-56]

- The notebook computes `z about 2.26`, a one-sided p-value about `0.0119`, a two-sided p-value about `0.0238`, and a `95%` normal-based interval about `(68.14, 76.46)`. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p6]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 52-56]
- The lecture concludes that the survivors' mean expression differs significantly from the benchmark for normal corals at the `0.05` level. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p6]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 48]
- The assumptions listed are population normality, independence of observations, and a known population standard deviation. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p6]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 57]

#### In Layman's Terms
- The survivors' average gene-expression value is high enough above the known normal-coral average that the lecture treats the gap as statistically meaningful. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p6]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 48, 52-56]
- Because the population spread is assumed known in advance, the test can compare the sample mean directly against the standard normal curve. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p4-p6]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 48-57]

### D. One-Sample `t`-Test When the Population Standard Deviation Is Unknown
- The lecture then introduces the one-sample `t`-test as the version used when the population standard deviation is unknown and must be estimated from the sample. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p7]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 58-60]
- The statistic mirrors the `z`-test but replaces the true standard deviation with the sample estimate: [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p7]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 58]

  `t = (x-bar - mu) / (s-hat / sqrt(N))` [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p7]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 58]

- The lecture emphasizes that this change moves the reference distribution from standard normal to a `t` distribution with `N - 1` degrees of freedom, and that the `t` distribution has heavier tails because the spread is being estimated rather than treated as known. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p7]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 58]
- On the same coral sample, SciPy reports `t about 2.255`, `p about 0.0361`, and `df = 19`, with a `95%` `t` interval about `(67.84, 76.76)`. [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 59-60]

#### In Layman's Terms
- The `t`-test is the more realistic version of the one-sample mean test because in most real problems you do not know the true population spread. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p7]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 58-60]
- That extra uncertainty makes the `t` curve wider than the normal curve, so the test is a bit more cautious. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p7]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 58-60]

#### Language Bridge
- Moving from `z` to `t` is the move from a fixed variance parameter to a variance estimate computed from the sample. [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 58-60]
- The heavier-tailed `t` distribution is the lecture's way of encoding the uncertainty introduced by that extra estimation step. [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 58-60]

### E. Independent-Samples `t`-Tests: Student's Pooled-Variance Version and Welch's Unequal-Variance Version
- The PDF then generalizes from one sample to two independent groups, with hypotheses `H0: mu1 = mu2` and `Ha: mu1 != mu2`. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p8-p11]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 61-69]
- Student's independent-samples `t`-test assumes both groups share the same population standard deviation, so it uses a pooled estimate of the standard deviation and a `t` distribution with `N1 + N2 - 2` degrees of freedom. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p8-p10]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 62-64]
- The assumptions for Student's test are approximate normality within each group, independence within and between groups, and homogeneity of variance. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p10]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 64]
- The reproducible notebook example sets `np.random.seed(142)`, draws two samples from `Normal(1, 3)` with sizes `20` and `50`, and gets `t about 1.2033`, `p about 0.2330`, and `df = 68`, which is a fail-to-reject example. [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 65-66]
- Welch's independent-samples `t`-test keeps the same hypotheses but drops the equal-variance assumption and uses a standard error with separate variance terms for each group plus adjusted degrees of freedom. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p10-p11]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 67]
- The simulated Welch example uses samples from `Normal(4, 0.8)` with `20` observations and `Normal(1, 1.2)` with `50` observations, giving `t about 9.1952`, `p about 1.18e-10`, and `df about 33.25`, which is overwhelming evidence against equal means. [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 68-69]

#### In Layman's Terms
- Student's test is the stronger-assumption version that says both groups have the same spread. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p8-p10]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 62-66]
- Welch's test is the safer version because it lets each group keep its own spread and adjusts the math accordingly. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p10-p11]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 67-69]

#### Language Bridge
- Student's test is the stricter API with an equal-variance precondition. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p8-p11]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 61-69]
- Welch's test is the more defensive default because it removes that precondition and absorbs the difference into the standard error and degrees-of-freedom calculation. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p10-p11]; [NB1: ics604-17-18_hypothesis_testing_common_tests.ipynb cells 67-69]

### F. Correlation Basics, Real-World Examples, and the Range from `-1` to `1`
- The second half of the lecture defines correlation as a numerical summary of the strength and direction of the relationship between two variables `X` and `Y`. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p12-p13]; [NB2: ics604-18-19_correlation.ipynb cells 3-4]
- The lecture illustrates the concept with examples such as height versus weight, tourist counts versus ABC Store sales, IQ versus time required to solve simple logic problems, and cigarette consumption versus years lived. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p13]; [NB2: ics604-18-19_correlation.ipynb cells 3]
- It then narrows to linear correlation and states the familiar range: `1` for perfect positive linear correlation, `-1` for perfect negative linear correlation, and `0` for no linear correlation. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p13]; [NB2: ics604-18-19_correlation.ipynb cells 4]
- The same slide previews Pearson's correlation coefficient `R` and Spearman's rank correlation `rho`. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p13]; [NB2: ics604-18-19_correlation.ipynb cells 4]

#### In Layman's Terms
- Correlation asks whether two variables tend to move together. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p12-p13]; [NB2: ics604-18-19_correlation.ipynb cells 3-4]
- Positive values mean they usually rise or fall together, negative values mean one tends to rise while the other falls, and values near zero mean there is no stable linear pattern. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p13]; [NB2: ics604-18-19_correlation.ipynb cells 3-4]

### G. Positive, Negative, and No Correlation via Deviations from the Means
- The slides and notebook visualize correlation by comparing whether `Xi - x-bar` and `Yi - y-bar` tend to have the same sign. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p14-p17]; [NB2: ics604-18-19_correlation.ipynb cells 5-16]
- The positive example uses the deterministic relationship `Y = X + 10`, so when `X` is above its mean, `Y` is also above its mean; the result is perfect positive correlation. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p14-p15]; [NB2: ics604-18-19_correlation.ipynb cells 5-8]
- The negative example reverses that direction so that as `X` increases, `Y` decreases, producing perfect negative correlation because the deviations tend to have opposite signs. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p15-p16]; [NB2: ics604-18-19_correlation.ipynb cells 9-12]
- The no-correlation example keeps `X` increasing while `Y` fluctuates irregularly, so the positive and negative contribution patterns cancel and the overall correlation stays near zero. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p17]; [NB2: ics604-18-19_correlation.ipynb cells 13-16]

#### In Layman's Terms
- The lecture's geometric intuition is simple: are both variables above their averages together, below their averages together, or on opposite sides? [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p14-p17]; [NB2: ics604-18-19_correlation.ipynb cells 5-16]
- Matching signs push the correlation upward, opposite signs push it downward, and a mixed pattern tends to cancel toward zero. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p14-p17]; [NB2: ics604-18-19_correlation.ipynb cells 5-16]

### H. Covariance and Pearson's Correlation Coefficient
- The lecture formalizes the deviation intuition with covariance, defined as the average product of centered values: `Cov(X, Y) = (1 / (n - 1)) * sum((Xi - x-bar)(Yi - y-bar))`. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p18]; [NB2: ics604-18-19_correlation.ipynb cells 17]
- Covariance is positive when the deviations tend to have the same sign, negative when they tend to have opposite signs, and near zero when those contributions cancel. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p18]; [NB2: ics604-18-19_correlation.ipynb cells 17]
- The lecture also interprets covariance geometrically as a centered dot product: maximized when the deviation vectors align, zero when they are orthogonal, and negative when they point in opposite directions. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p18]; [NB2: ics604-18-19_correlation.ipynb cells 17]
- It then explains why covariance is not the usual reported statistic: its units depend on the original measurement units of `X` and `Y`. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p19]; [NB2: ics604-18-19_correlation.ipynb cells 18]
- Pearson's coefficient `R` fixes that by standardizing with the sample standard deviations, yielding a unitless value between `-1` and `1`: `R = Cov(X, Y) / (s-hat-X * s-hat-Y)`. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p19]; [NB2: ics604-18-19_correlation.ipynb cells 18]
- The PDF closes its correlation slides with the standard gallery of scatterplots showing different Pearson-correlation patterns. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p20]; [NB2: ics604-18-19_correlation.ipynb cells 19]

#### In Layman's Terms
- Covariance is the raw summary of shared movement, but Pearson's `R` is the cleaned-up, unitless version that fits on the familiar `-1` to `1` scale. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p18-p20]; [NB2: ics604-18-19_correlation.ipynb cells 17-19]
- That standardization is why you can compare the strength of relationships across very different kinds of variables. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p19]; [NB2: ics604-18-19_correlation.ipynb cells 18]

#### Language Bridge
- Pearson's `R` is normalized covariance, or equivalently a normalized dot product of centered vectors. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p18-p19]; [NB2: ics604-18-19_correlation.ipynb cells 17-18]
- The numerator measures shared directional movement, while the denominator rescales by the magnitude of each centered vector so the result stays bounded. [PDF: ics604-S26-lec18-StandardTests_Correlation.pdf p19]; [NB2: ics604-18-19_correlation.ipynb cells 18]

### I. Notebook Extension: `R^2`, Regression, Residuals, and Explained Variance
- The correlation notebook extends beyond the PDF by introducing `R^2` as the coefficient of determination, i.e. the square of Pearson's correlation and the proportion of variance explained by a linear model. [NB2: ics604-18-19_correlation.ipynb cells 20, 28-33]
- Its worked example uses `room_abc_sales.tsv`, pairing hotel rooms sold in Waikiki with ABC Store daily sales. [NB2: ics604-18-19_correlation.ipynb cells 21-33]
- The notebook first establishes the mean-only baseline and reports average daily sales around `120,228`; without any other information, that mean is treated as the baseline prediction. [NB2: ics604-18-19_correlation.ipynb cells 22-24]
- It then overlays the regression line `predicted sales = 69843.88 + 31.69 * (hotel rooms sold)` and explains residuals as the differences between observed and predicted values. [NB2: ics604-18-19_correlation.ipynb cells 25-28]
- For this example, the notebook computes `R about 0.726`, `R^2 about 0.527`, and an explained-variance fraction from residual sums of squares that is also about `0.527`, so roughly `53%` of the variation in daily sales is explained by hotel occupancy alone. [NB2: ics604-18-19_correlation.ipynb cells 29-33]

#### In Layman's Terms
- `R^2` tells you how much of the wobble in one variable can be explained by a straight-line relationship with another. [NB2: ics604-18-19_correlation.ipynb cells 20, 28-33]
- In the Waikiki example, hotel occupancy is useful but not the whole story, because about half of the sales variation still comes from other factors. [NB2: ics604-18-19_correlation.ipynb cells 29-33]

### J. Notebook Extensions: Spearman Correlation, Correlation-versus-Causation, and Correlation Significance
- The notebook next introduces Spearman's rank correlation `rho` as a rank-based alternative to Pearson's `R`. Instead of using raw values directly, it compares the rank order of the observations and is therefore more robust to skew, outliers, and monotonic-but-not-strictly-linear relationships. [NB2: ics604-18-19_correlation.ipynb cells 34]
- It then gives the standard warning that correlation does not imply causation, illustrating the point with examples such as police presence versus crime rate and Master's degrees awarded versus box-office revenue, where a third factor can drive both variables. [NB2: ics604-18-19_correlation.ipynb cells 35]
- The final notebook section turns to statistical significance of correlation: it stresses that whether an observed correlation is convincing depends on both the true strength of association and the sample size. [NB2: ics604-18-19_correlation.ipynb cells 36]
- To show that, the notebook repeatedly simulates independent random `x` and `y` arrays, records absolute Pearson correlations, and then studies how large a noise-only correlation is common at sample sizes from `10` to `1000`. The resulting plot shows that large random correlations become less common as sample size grows. [NB2: ics604-18-19_correlation.ipynb cells 37-40]

#### In Layman's Terms
- Spearman asks a ranking question rather than a raw-value question, which makes it more robust than Pearson in messier data. [NB2: ics604-18-19_correlation.ipynb cells 34]
- And even a real-looking correlation still has to survive the "could chance alone do this?" check, which becomes easier to pass as the sample gets larger. [NB2: ics604-18-19_correlation.ipynb cells 36-40]

#### Language Bridge
- The significance section returns to the same lecture pattern as before: simulate the null world, then see whether the observed statistic lands in its tail. [NB2: ics604-18-19_correlation.ipynb cells 36-40]
- The only change is the statistic: now it is absolute Pearson correlation instead of a difference in means, proportions, or category counts. [NB2: ics604-18-19_correlation.ipynb cells 37-40]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Homework 3 reminders, Exercise 4 / peer-feedback deadlines, updated common-tests notebook filename, Lecture 15 correction, and Lecture 18 agenda | `work/lectures/PDFs/ics604-S26-lec18-StandardTests_Correlation.pdf` p1-p2 | `work/lectures/Notebooks/ics604-17-18_hypothesis_testing_common_tests.ipynb` (md 001-002); `work/lectures/Notebooks/ics604-18-19_correlation.ipynb` is the second companion notebook for the correlation half | A | Covered |
| General framing of `z`-tests and `t`-tests as significance tests for mean differences | `work/lectures/PDFs/ics604-S26-lec18-StandardTests_Correlation.pdf` p3 | `work/lectures/Notebooks/ics604-17-18_hypothesis_testing_common_tests.ipynb` (md 044) | B | Covered |
| One-sample `z`-test for coral gene expression, `z` formula, significance conclusion, and assumptions | `work/lectures/PDFs/ics604-S26-lec18-StandardTests_Correlation.pdf` p3-p6 | `work/lectures/Notebooks/ics604-17-18_hypothesis_testing_common_tests.ipynb` (md 045-049, md 057, code 046, 050-056) | C | Covered |
| One-sample `t`-test, estimated spread, `t` distribution with `N - 1` degrees of freedom, and the coral-sample outputs | `work/lectures/PDFs/ics604-S26-lec18-StandardTests_Correlation.pdf` p7 | `work/lectures/Notebooks/ics604-17-18_hypothesis_testing_common_tests.ipynb` (md 058, code 059-060) | D | Covered |
| Student's and Welch's independent-samples `t`-tests, pooled-vs-separate variance handling, and assumptions | `work/lectures/PDFs/ics604-S26-lec18-StandardTests_Correlation.pdf` p8-p11 | `work/lectures/Notebooks/ics604-17-18_hypothesis_testing_common_tests.ipynb` (md 061-067, code 065-069) | E | Covered |
| Correlation definition, example list, linear-correlation range, and Pearson / Spearman preview | `work/lectures/PDFs/ics604-S26-lec18-StandardTests_Correlation.pdf` p12-p13 | `work/lectures/Notebooks/ics604-18-19_correlation.ipynb` (md 003-004) | F | Covered |
| Positive, negative, and no-correlation visuals via deviations from the means | `work/lectures/PDFs/ics604-S26-lec18-StandardTests_Correlation.pdf` p14-p17 | `work/lectures/Notebooks/ics604-18-19_correlation.ipynb` (md 005, 009, 013; code 006-008, 010-012, 014-016) | G | Covered |
| Covariance, centered-dot-product intuition, Pearson's `R`, and the final PDF examples slide | `work/lectures/PDFs/ics604-S26-lec18-StandardTests_Correlation.pdf` p18-p20 | `work/lectures/Notebooks/ics604-18-19_correlation.ipynb` (md 017-019) | H | Covered |
| `R^2`, regression line, residuals, and explained variance in the Waikiki sales example | *Notebook-only extension; not explicitly covered in the PDF deck* | `work/lectures/Notebooks/ics604-18-19_correlation.ipynb` (md 020, 024, 026, 028, 033; code 021-023, 025, 027, 029-032) | I | Covered |
| Spearman correlation, correlation-versus-causation warning, and significance of correlation via simulation | *Notebook-only extension; not explicitly covered in the PDF deck* | `work/lectures/Notebooks/ics604-18-19_correlation.ipynb` (md 034-036; code 037-040) | J | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec18-StandardTests_Correlation.pdf`
- Notebook sources: `work/lectures/Notebooks/ics604-17-18_hypothesis_testing_common_tests.ipynb`, `work/lectures/Notebooks/ics604-18-19_correlation.ipynb`
