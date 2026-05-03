# Lecture 19: Correlation, Explained Variance, Spearman's Rank Correlation, and Linear Regression

### Quick Overview
- Lecture 19 is about turning correlation into prediction. The agenda explicitly moves through correlations, `R^2`, Spearman's rank correlation, and linear regression. It first explains `R^2` as the proportion of variability explained by a linear relationship, then uses the Waikiki hotel-room and ABC Store sales example to compare a simple "predict the average" baseline against a regression line, residuals, and explained variance. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p2-p11]
- It then adds two important cautions before introducing modeling. Spearman's rank correlation is presented as a rank-based alternative that works better with skew and outliers, and the lecture emphasizes that correlation does not imply causation and that significance depends heavily on sample size. The last section introduces simple linear regression as a way to model `Y = beta0 + beta1 X`, fit the best line by minimizing residual sum of squares, and use bootstrap confidence intervals to show that the fitted slope and intercept are estimates with uncertainty. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p12-p24]

#### In Layman's Terms
- Lecture 19 says this: if two things move together, that relationship might help you make better predictions than just guessing the average every time. `R^2` tells you how much of the ups and downs you can explain, Spearman gives you a sturdier version of correlation when the data are messy, and linear regression is the method for drawing the best straight line through the data so you can predict future values and measure how far off your guesses are. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p3-p24]

### A. Lecture Logistics, the Updated Correlation Notebook, and the Lecture 19 Split
- The slides open with the Homework Assignment 3 reminder: it is due Monday, April 6 at 11:59 PM, only the Jupyter notebook should be submitted to Lamaku, and the notebook filename must be renamed exactly as instructed. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p1]
- The deck then notes a correction to the previous lecture materials: the second slide on page 13 of the last class's slides was revised, the new correlation notebook is `ics604-18-19_correlation.ipynb`, and the older `ics604-18_correlation.ipynb` file was removed. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p2]
- The Lecture 19 agenda lists four topics: correlations, coefficient of determination `R^2`, Spearman's rank correlation `rho`, and linear regression. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p2]
- In practice, the lecture is split across two notebooks: `ics604-18-19_correlation.ipynb` carries the continued correlation material (`R^2`, explained variance, Spearman, and correlation significance), while `ics604-19_linear_regression.ipynb` handles regression analysis, `linregress`, RSS, and bootstrap confidence intervals for coefficients. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p2]; [NB1: ics604-18-19_correlation.ipynb cells 20-40]; [NB2: ics604-19_linear_regression.ipynb cells 3-27]
- The shared notebook `ics604-19-20_linear_regression.ipynb` overlaps the Lecture 19 regression material almost exactly through its first `27` cells, then continues into Lecture 20's `statsmodels` and multiple-regression topics. That overlap confirms the Lecture 19 regression workflow and also marks the handoff point to the next lecture. [NB3: ics604-19-20_linear_regression.ipynb cells 1-27]

#### In Layman's Terms
- Lecture 19 continues the correlation story, but now the point is prediction: how much does a relationship explain, and how do we turn that relationship into a straight-line model? [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p2]; [NB1: ics604-18-19_correlation.ipynb cells 20-40]; [NB2: ics604-19_linear_regression.ipynb cells 3-27]
- The materials are intentionally split so the updated correlation notebook handles `R^2` and rank-based correlation, while the separate regression notebook focuses on fitting and evaluating lines. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p2]; [NB1: ics604-18-19_correlation.ipynb cells 20-40]; [NB2: ics604-19_linear_regression.ipynb cells 3-27]

### B. `R^2` as the Coefficient of Determination and the Mean-as-Baseline Idea
- The lecture defines `R^2` as the square of Pearson's correlation coefficient `R`, but stresses that its interpretation is different: `R^2` measures the proportion of variance explained by a linear relationship. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p3]; [NB1: ics604-18-19_correlation.ipynb cells 20, 28-33]
- Because it is squared, `R^2` always lies between `0` and `1`, regardless of whether the underlying linear association is positive or negative. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p3]; [NB1: ics604-18-19_correlation.ipynb cell 20]
- The slide's toy example uses `R = 0.8`, which gives `R^2 = 0.64`, so roughly `64%` of the variability is explained and about `36%` remains unexplained. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p3]
- The Waikiki running example pairs the number of hotel rooms sold with ABC Store daily sales, and the notebook first establishes the uninformed baseline: without any additional information, predict sales with the mean of the distribution, about `$120,228`. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p3-p5]; [NB1: ics604-18-19_correlation.ipynb cells 20-24, 21-23]

#### In Layman's Terms
- `R` tells you how strongly two variables move together in a straight-line sense; `R^2` tells you how much of the ups and downs one variable helps explain in the other. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p3]; [NB1: ics604-18-19_correlation.ipynb cells 20, 28-33]
- Before using any predictor, the lecture starts with the simplest guess possible: always predict the average. That gives a baseline that regression must beat. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p4-p5]; [NB1: ics604-18-19_correlation.ipynb cells 21-25]

### C. From the Mean Line to the Regression Line: Residuals and Better Predictions
- The lecture asks what to predict for next Tuesday's sales if no other information is available, and answers with the mean as the baseline constant predictor. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p4-p5]; [NB1: ics604-18-19_correlation.ipynb cells 22-25]
- It then argues that prediction can improve when additional relevant variables are available, such as hotel-room sales, special events, holidays, or seasonal factors. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p6]; [NB1: ics604-18-19_correlation.ipynb cell 26]
- In that setting, daily sales are represented by a regression line that models how sales change as hotel occupancy changes. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p6]; [NB1: ics604-18-19_correlation.ipynb cells 26-27]
- A residual is the gap between an observed value and the value estimated by the regression line; the regression notebook writes the model error for point `i` as `e_i = y-hat_i - y_i`. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p7]; [NB1: ics604-18-19_correlation.ipynb cell 28]; [NB2: ics604-19_linear_regression.ipynb cell 12]
- The slides motivate the best-fitting line as the one that keeps residuals as small as possible, and the notebook makes that concrete with the Waikiki fit `sales = 69843.88 + 31.69 * rooms`. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p8-p10]; [NB1: ics604-18-19_correlation.ipynb cells 26-32]

#### In Layman's Terms
- If you know nothing, guess the average sales. If you know hotel occupancy too, you can shift that guess up or down and usually do better. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p4-p8]; [NB1: ics604-18-19_correlation.ipynb cells 22-28]
- A residual is just the miss: how far the model's prediction is from what really happened on that day. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p7]; [NB1: ics604-18-19_correlation.ipynb cell 28]; [NB2: ics604-19_linear_regression.ipynb cell 12]

### D. Explained Variance, Correlation Significance, and Practical Importance
- The lecture ties `R^2` to the reduction in residual variation achieved by the regression line relative to the mean line: `R^2 = (SSR_mean - SSR_regression) / SSR_mean`. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p9-p10]; [NB1: ics604-18-19_correlation.ipynb cells 28-32]
- The normalization by `SSR_mean` forces the measure into `[0, 1]`, and the best-fit regression line cannot have larger residual variation than the mean-only line under least squares. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p9]; [NB1: ics604-18-19_correlation.ipynb cells 28-32]
- The rendered mean-versus-regression slide makes that formula visual. The blue vertical gaps around the regression line are clearly shorter overall than the gaps around the mean line, and the slide pairs that picture with a manual `SSR_mean` versus `SSR_regression` calculation that reproduces `R^2 about 0.527`. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p10]; [NB1: ics604-18-19_correlation.ipynb cells 29-32]
- In the Waikiki example, the Pearson correlation is about `0.726`, so `R^2` is about `0.527`, meaning hotel occupancy alone explains about `53%` of the variation in daily sales. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p11]; [NB1: ics604-18-19_correlation.ipynb cells 29-33]
- The lecture is careful about interpretation: a low `R^2` says `X` is not a strong predictor in a linear model, but it does not rule out a nonlinear relationship; adding variables such as weather, local events, or holidays can explain more variation. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p11]; [NB1: ics604-18-19_correlation.ipynb cell 33]
- Statistical significance of a correlation asks how plausible it is that the observed relationship arose by chance, and the slides stress that this depends on both sample size and the true underlying correlation. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p13-p14]; [NB1: ics604-18-19_correlation.ipynb cells 36-40]
- The deck makes the sample-size point sharply: with only two data points, the correlation is always `1` or `-1`, whereas much larger datasets are less likely to look correlated purely by chance. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p14]; [NB1: ics604-18-19_correlation.ipynb cells 36-40]
- The notebook extends that idea by simulating null-world correlations from independent random arrays. With `n = 10`, the 95th-percentile absolute correlation under chance is already about `0.636`, and the sample-size sweep shows that large chance correlations shrink as `n` grows. [NB1: ics604-18-19_correlation.ipynb cells 37-40]
- The lecture also separates practical importance from raw correlation size. The side-by-side `R about 0.78` versus `R about 0.5` slide shows that a larger correlation is not automatically the more meaningful or impactful relationship. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p15]
- The rendered comparison plot sharpens that warning: the lower-correlation dataset spans a much wider salary range than the tighter `R about 0.78` dataset, so the smaller `R` could still correspond to the bigger real-world effect. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p15]

#### In Layman's Terms
- A correlation can be statistically real but still not very useful, and a visually impressive small-sample pattern can still be mostly luck. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p13-p15]; [NB1: ics604-18-19_correlation.ipynb cells 36-40]
- The lecture wants you to keep two questions separate: "Is this relationship unlikely under chance?" and "Even if it is real, does it matter enough to care about?" [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p13-p15]

#### Language Bridge
- The significance section is the same workflow used in earlier hypothesis-testing lectures: simulate the null world, compute the statistic each time, and compare the observed value to that reference distribution. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p14]; [NB1: ics604-18-19_correlation.ipynb cells 36-40]
- The only thing that changes here is the statistic itself: now it is absolute Pearson correlation instead of a difference in means, proportions, or category counts. [NB1: ics604-18-19_correlation.ipynb cells 37-40]

### E. Spearman's Rank Correlation and the Warning About Causation
- Spearman's rank correlation is presented as a Pearson-like measure on rank data rather than raw values. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p12]; [NB1: ics604-18-19_correlation.ipynb cell 34]
- The slide formula is `rho = 1 - 6 * sum((rank_x_i - rank_y_i)^2) / (n (n^2 - 1))`, with ranks running from `1` to `n`. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p12]; [NB1: ics604-18-19_correlation.ipynb cell 34]
- The lecture frames Spearman as focusing on ranking disorder rather than line fit, which makes it more robust to skew and outliers and better aligned with monotonic order relationships. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p12]; [NB1: ics604-18-19_correlation.ipynb cell 34]
- The deck also repeats the crucial warning that correlation does not imply causation, using the police-versus-crime and Master's-degrees-versus-box-office examples to show how a third factor can drive both series. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p13]; [NB1: ics604-18-19_correlation.ipynb cell 35]

#### In Layman's Terms
- Spearman ignores the exact numeric gaps and asks whether the ordering of the data agrees. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p12]; [NB1: ics604-18-19_correlation.ipynb cell 34]
- Correlation can reveal a pattern without proving that one variable is the reason the other changes. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p13]; [NB1: ics604-18-19_correlation.ipynb cell 35]

### F. Regression Analysis as Prediction and Explanation
- The regression notebook opens more broadly than the slides: regression can be used both to explain relationships and to predict future outcomes, and in the predictive setting it is framed as supervised learning. [NB2: ics604-19_linear_regression.ipynb cell 3]
- The notebook contrasts interpretable regression models with harder-to-explain black-box methods, emphasizing that fitted values `Y-hat` are the actual predictions. [NB2: ics604-19_linear_regression.ipynb cell 3]
- The slides then introduce simple linear regression (single linear regression) as the model of a quantitative response `Y` using a single predictor `X`, assuming the relationship is approximately linear. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p16-p17]; [NB2: ics604-19_linear_regression.ipynb cells 3-4]
- The core model equation is `Y = beta0 + beta1 X`. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p17]; [NB2: ics604-19_linear_regression.ipynb cell 4]
- The lecture defines the key terms: response or dependent variable, predictor or feature, intercept `beta0`, regression coefficient or slope `beta1`, fitted values `Y-hat_i`, residuals/errors, and ordinary least squares as the method that minimizes squared residuals. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p17]; [NB2: ics604-19_linear_regression.ipynb cell 4]
- The conceptual distinction from correlation is explicit: correlation summarizes strength of association, whereas regression specifies the form of the relationship and provides a prediction rule. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p16-p17]; [NB2: ics604-19_linear_regression.ipynb cells 3-4]

#### In Layman's Terms
- Correlation asks whether two variables move together. Regression asks how to turn that relationship into an actual prediction formula. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p16-p17]; [NB2: ics604-19_linear_regression.ipynb cells 3-4]
- The point of simple linear regression is not just to say "these variables are related," but to say "given this `X`, here is my best straight-line estimate of `Y`." [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p17]; [NB2: ics604-19_linear_regression.ipynb cell 4]

#### Language Bridge
- Correlation is a summary statistic; simple linear regression is a one-argument prediction function `x -> beta0 + beta1 * x` whose parameters are learned from data rather than hard-coded. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p16-p17]; [NB2: ics604-19_linear_regression.ipynb cells 3-4]
- If you think in Java, C#, JavaScript, or PHP terms, `beta0` and `beta1` are the learned fields of the model object, and `Y-hat` is the return value when that object is applied to an input `X`. [NB2: ics604-19_linear_regression.ipynb cells 3-4]

### G. The Advertising Example and What `linregress` Returns
- The worked example uses the Advertising dataset, where sales (thousands of units) are paired with TV, radio, and newspaper budgets (thousands of dollars). The motivating questions are which medium matters most, how precisely its effect can be estimated, and whether media combinations interact. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p18]; [NB2: ics604-19_linear_regression.ipynb cells 5-6]
- Focusing first on TV as a single predictor, the notebook uses `scipy.stats.linregress` to estimate the line relating TV budget to sales. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p19]; [NB2: ics604-19_linear_regression.ipynb cells 7-8]
- The fitted model is `sales approx 7.0326 + 0.04754 * TV`, so each additional unit of TV budget is associated with roughly `0.0475` additional units of sales in the notebook's scaling. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p19]; [NB2: ics604-19_linear_regression.ipynb cells 7-12]
- The same fitted line can be used directly for prediction; the notebook plugs in `TV = 250` to show how a specific budget value turns into a predicted sales value. [NB2: ics604-19_linear_regression.ipynb cells 8-10]
- The `linregress` result also reports `rvalue about 0.7822`, `pvalue about 1.47e-42`, `stderr about 0.00269`, and `intercept_stderr about 0.45784`, which the notebook uses to interpret fit quality and uncertainty. [NB2: ics604-19_linear_regression.ipynb cell 12]
- Squaring the correlation gives `R^2 about 0.612`, so TV budget alone explains about `61%` of the variation in sales. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p20]; [NB2: ics604-19_linear_regression.ipynb cell 12]
- The notebook then visualizes one prediction, the fitted line, a single residual, and then all residuals, which is also the geometric content of the image-heavy slide that follows the fit-quality discussion in the deck. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p20-p21]; [NB2: ics604-19_linear_regression.ipynb cells 9-15]

#### In Layman's Terms
- `linregress` is the lecture's practical shortcut for fitting the best straight line through the data. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p19-p20]; [NB2: ics604-19_linear_regression.ipynb cells 7-12]
- The output tells you both the line itself and how convincing that line looks statistically. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p20]; [NB2: ics604-19_linear_regression.ipynb cell 12]

#### Language Bridge
- `linregress` returns a named result object, so it behaves like a small record or struct with fields such as `slope`, `intercept`, `rvalue`, and `pvalue`. [NB2: ics604-19_linear_regression.ipynb cells 7-12]
- The lecture's prediction step is then just field access plus the regression formula, not a separate black-box call. [NB2: ics604-19_linear_regression.ipynb cells 8-10]

### H. Residual Sum of Squares, Least Squares, and the Closed-Form Solution
- The lecture formalizes overall fit with the residual sum of squares, `RSS = e_1^2 + e_2^2 + ... + e_n^2`. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p22]; [NB2: ics604-19_linear_regression.ipynb cell 16]
- Squaring matters because raw errors can cancel by sign, whereas squared errors accumulate total miss magnitude. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p22]; [NB2: ics604-19_linear_regression.ipynb cell 16]
- The best linear model is the one with the smallest RSS under the linearity assumption. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p22-p23]; [NB2: ics604-19_linear_regression.ipynb cells 17-18]
- The notebook illustrates this by plotting the best-fit line against deliberately poorer candidate lines and displaying the corresponding RSS values, turning least squares into a visual optimization problem. [NB2: ics604-19_linear_regression.ipynb cell 18]
- For simple linear regression, the slides give closed-form least-squares solutions: `beta1 = sum((x_i - x-bar)(y_i - y-bar)) / sum((x_i - x-bar)^2)` and `beta0 = y-bar - beta1 * x-bar`. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p23]; [NB2: ics604-19_linear_regression.ipynb cell 20]
- The lecture also notes that more complex models may not have closed-form solutions and may require iterative optimization methods such as gradient descent or even genetic algorithms. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p23]; [NB2: ics604-19_linear_regression.ipynb cell 20]

#### In Layman's Terms
- Least squares picks the straight line with the smallest total squared misses. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p22-p23]; [NB2: ics604-19_linear_regression.ipynb cells 16-18]
- That is why the lecture keeps drawing red residual segments: they are the errors the model is trying to shrink overall. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p22]; [NB2: ics604-19_linear_regression.ipynb cells 14-18]

#### Language Bridge
- This is objective-function minimization: define a loss function `RSS(beta0, beta1)` and choose the parameter values that make that loss as small as possible. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p22-p23]; [NB2: ics604-19_linear_regression.ipynb cells 16-20]
- In simple linear regression the optimizer has an exact algebraic answer, but the lecture foreshadows that more complex models often need iterative search procedures instead. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p23]; [NB2: ics604-19_linear_regression.ipynb cell 20]

### I. Parameter Uncertainty and Bootstrap Confidence Intervals for Regression Coefficients
- The closing slides ask a statistical stability question: because the observed dataset is only a sample from a larger population, different samples would produce different estimates of `beta0` and `beta1`. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p24]; [NB2: ics604-19_linear_regression.ipynb cell 20]
- The lecture proposes bootstrap confidence intervals as the answer: resample the data with replacement at the same sample size, fit a new regression on each bootstrap sample, and use the empirical distribution of the fitted parameters to form a `95%` interval. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p24]; [NB2: ics604-19_linear_regression.ipynb cells 20, 22-27]
- The notebook implements this directly with `50,000` bootstrap resamples of the Advertising data, storing intercepts and slopes from each `linregress` fit. [NB2: ics604-19_linear_regression.ipynb cells 21-24]
- The rendered slides make the bootstrap output concrete. One slide overlays a dense bundle of red bootstrap lines around the original fitted trend, while the final histograms mark approximate `95%` intervals of `[6.398, 7.707]` for the intercept and `[0.042, 0.053]` for the slope. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p25-p27]; [NB2: ics604-19_linear_regression.ipynb cells 24-27]
- That visual summary reinforces the statistical point: regression coefficients are not fixed truths. They vary from sample to sample, but in this example the bootstrap distributions stay tight enough to suggest a fairly stable fitted line. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p25-p27]; [NB2: ics604-19_linear_regression.ipynb cells 24-27]

#### In Layman's Terms
- Bootstrapping asks, "If I kept getting similar datasets, how much would my fitted line wiggle?" [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p24-p27]; [NB2: ics604-19_linear_regression.ipynb cells 20-27]
- Narrow bootstrap distributions mean the fitted parameter is stable; wide ones mean the estimate is much more uncertain. [PDF: ics604-S26-lec19-Correlation_LinearRegression.pdf p24-p27]; [NB2: ics604-19_linear_regression.ipynb cells 24-27]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Homework reminder, notebook-file update, and Lecture 19 agenda, plus the overlap between the dedicated regression notebook and the shared `19-20` regression notebook | `work/lectures/PDFs/ics604-S26-lec19-Correlation_LinearRegression.pdf` p1-p2 | `work/lectures/Notebooks/ics604-18-19_correlation.ipynb`, `work/lectures/Notebooks/ics604-19_linear_regression.ipynb`, and `work/lectures/Notebooks/ics604-19-20_linear_regression.ipynb` together document the lecture split | A | Covered |
| `R^2` as coefficient of determination, its `[0, 1]` range, and the Waikiki mean-baseline setup | `work/lectures/PDFs/ics604-S26-lec19-Correlation_LinearRegression.pdf` p3-p6 | `work/lectures/Notebooks/ics604-18-19_correlation.ipynb` (md 020, 024, 026; code 021-023, 025) | B | Covered |
| Regression line, residuals, and mean-versus-regression intuition in the Waikiki sales example | `work/lectures/PDFs/ics604-S26-lec19-Correlation_LinearRegression.pdf` p6-p10 | `work/lectures/Notebooks/ics604-18-19_correlation.ipynb` (md 026, 028, 033; code 027, 029-032) | C | Covered |
| Explained variance, the `R = 0.726` and `R^2 = 0.527` Waikiki result, and the low-`R^2` interpretation | `work/lectures/PDFs/ics604-S26-lec19-Correlation_LinearRegression.pdf` p9-p11 | `work/lectures/Notebooks/ics604-18-19_correlation.ipynb` (md 028, 033; code 029-032) | D | Covered |
| Correlation significance, sample-size dependence, and practical-importance warning | `work/lectures/PDFs/ics604-S26-lec19-Correlation_LinearRegression.pdf` p13-p15 | `work/lectures/Notebooks/ics604-18-19_correlation.ipynb` (md 036; code 037-040) | D | Covered |
| Spearman's rank correlation and the correlation-versus-causation warning | `work/lectures/PDFs/ics604-S26-lec19-Correlation_LinearRegression.pdf` p12-p13 | `work/lectures/Notebooks/ics604-18-19_correlation.ipynb` (md 034-035) | E | Covered |
| Regression analysis as explanation versus prediction, supervised learning framing, and model interpretability | *Notebook-only extension; not explicitly covered in the PDF deck* | `work/lectures/Notebooks/ics604-19_linear_regression.ipynb` (md 003) | F | Covered |
| Simple linear regression model, terminology, and distinction from correlation | `work/lectures/PDFs/ics604-S26-lec19-Correlation_LinearRegression.pdf` p16-p17 | `work/lectures/Notebooks/ics604-19_linear_regression.ipynb` (md 004) | F | Covered |
| Advertising example, `linregress`, fitted line, residual visuals, and fit-quality outputs | `work/lectures/PDFs/ics604-S26-lec19-Correlation_LinearRegression.pdf` p18-p21 | `work/lectures/Notebooks/ics604-19_linear_regression.ipynb` (md 005, 008, 012; code 006-015) | G | Covered |
| RSS, least squares, the closed-form slope/intercept formulas, and the note about iterative optimization for more complex models | `work/lectures/PDFs/ics604-S26-lec19-Correlation_LinearRegression.pdf` p22-p23 | `work/lectures/Notebooks/ics604-19_linear_regression.ipynb` (md 016-017, 020; code 018) | H | Covered |
| Bootstrap confidence intervals for `beta0` and `beta1`, including the line bundle and the approximate interval endpoints shown on the histogram slides | `work/lectures/PDFs/ics604-S26-lec19-Correlation_LinearRegression.pdf` p24-p27 | `work/lectures/Notebooks/ics604-19_linear_regression.ipynb` (md 020; code 021-027) | I | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec19-Correlation_LinearRegression.pdf`
- Notebook sources: `work/lectures/Notebooks/ics604-18-19_correlation.ipynb`, `work/lectures/Notebooks/ics604-19_linear_regression.ipynb`, `work/lectures/Notebooks/ics604-19-20_linear_regression.ipynb`
