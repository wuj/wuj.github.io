# Lecture 20: Statsmodels, Multiple Linear Regression, and Non-Linear Regression

### Quick Overview
- Lecture 20 starts with course logistics, project guidance, and a continuation of regression modeling. The first half uses the Advertising dataset to introduce `statsmodels`, ordinary least squares (OLS), simple-coefficient interpretation, and multiple linear regression. It shows why separate one-predictor models are not enough, why coefficients in a multiple model must be read as "holding the other variables constant," and why newspaper looks useful alone but becomes insignificant after TV and radio are included. The lecture closes this part with warnings about rising `R^2`, overfitting, and the need for feature-selection or shrinkage methods such as ridge and lasso. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p1-p11]; [NB1: ics604-19-20_linear_regression.ipynb cells 28-41]
- The second half shifts to non-linear regression. Using synthetic quadratic data, the lecture shows that a straight-line fit can leave curved, systematic residual patterns even when the true random errors were generated from a normal distribution. It then surveys three ways to handle nonlinearity: nearest neighbor regression, step functions, and polynomial regression. The notebook adds the feature-engineering view of polynomial regression and ends with an overfitting warning when the polynomial degree becomes too large. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p11-p23]; [NB2: ics604-20_non_linear_regression.ipynb cells 4-43]

#### In Layman's Terms
- Lecture 20 says that once one straight line is not enough, you have two broad options. You can extend the linear-regression toolbox by adding more predictors and better software support, or you can switch to methods that can bend and adapt to curved patterns in the data. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p4-p23]; [NB1: ics604-19-20_linear_regression.ipynb cells 28-41]; [NB2: ics604-20_non_linear_regression.ipynb cells 4-43]

### A. Lecture Logistics, Project Guidance, and the Split Between the Two Companion Notebooks
- The slides open with reminders that Homework Assignment 3 is due that day at 11:59 PM and that only the notebook file should be submitted, renamed exactly as instructed. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p1]
- The next slides shift to the final project. Proposal grades and peer feedback are on Lamaku, project titles and authors will be posted on Slack, and students are told to incorporate useful feedback into their designs. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p2]
- The final report guidance is concrete: the report is limited to `3-4` pages including references, roughly `450` words per page, with up to `2` extra pages for figures, tables, and supplements. The slides also require a GitHub repository with code and documentation, plus either the dataset itself or links to the original data source if the data cannot be redistributed. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p3]
- The Lecture 20 agenda then lists six topics: linear regression, `statsmodels`, multiple linear regression, non-linear regression, nearest neighbor regression, step functions, and polynomial regression. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p4]
- In practice, the lecture is split across two notebooks. `ics604-19-20_linear_regression.ipynb` carries the `statsmodels` and multiple-regression continuation beginning at cell `28`, after reusing the Lecture 19 linear-regression material in cells `1-27`, while `ics604-20_non_linear_regression.ipynb` covers the non-linear methods. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p4]; [NB1: ics604-19-20_linear_regression.ipynb cells 28-41]; [NB2: ics604-20_non_linear_regression.ipynb cells 1-43]

#### In Layman's Terms
- Lecture 20 is really a two-part bundle. First it asks how to improve a straight-line model by using more variables, then it asks what to do when the true pattern is not straight at all. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p4]; [NB1: ics604-19-20_linear_regression.ipynb cells 28-41]; [NB2: ics604-20_non_linear_regression.ipynb cells 4-43]

### B. `Statsmodels`, OLS, and Revisiting Simple Linear Regression
- The lecture introduces `statsmodels` as the library used to fit regression models with ordinary least squares. The slides define OLS as estimating unknown regression parameters by minimizing the sum of squared residuals. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p4]; [NB1: ics604-19-20_linear_regression.ipynb cells 28-32]
- The formula syntax follows the statistical language R, so a model such as `sales ~ TV` can be read as "sales depends on TV" or "sales is a function of TV." [PDF: ics604-S26-lec20-NonLinearRegression.pdf p4]; [NB1: ics604-19-20_linear_regression.ipynb cell 28]
- The Advertising dataset is recalled on the next slide: sales are measured in thousands of units, while TV, radio, and newspaper budgets are measured in thousands of dollars. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p5]; [NB1: ics604-19-20_linear_regression.ipynb cells 28-33]
- The simple TV-only regression is then reinterpreted. The intercept `beta0 = 7.0326` is the expected mean sales when TV spending is `0`, though the lecture warns that intercepts can lack practical meaning if `x = 0` is unrealistic. The slope `beta1 = 0.0475` means each additional `$1,000` of TV advertising is associated with about `47.5` more units sold on average. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p6]; [NB1: ics604-19-20_linear_regression.ipynb cells 29-33]
- The notebook adds why `statsmodels` matters here: unlike a minimal regression helper, it returns rich inference output such as standard errors, confidence intervals, p-values, and predicted values from the fitted model. [NB1: ics604-19-20_linear_regression.ipynb cells 28-32]

#### In Layman's Terms
- `statsmodels` is the lecture's "full report" regression tool. It does not just give you the line; it also tells you how certain that line looks and how to write the model in a clean formula style. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p4-p6]; [NB1: ics604-19-20_linear_regression.ipynb cells 28-33]

#### Language Bridge
- In programming terms, `sales ~ TV` is a compact model-specification string. It is not doing a calculation by itself; it is describing which field is the output and which field is the input. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p4]; [NB1: ics604-19-20_linear_regression.ipynb cell 28]
- The fitted `statsmodels` object is like a result record that stores coefficients, intervals, hypothesis-test results, and prediction methods in one place instead of returning only a slope and intercept. [NB1: ics604-19-20_linear_regression.ipynb cells 28-32]

### C. Multiple Linear Regression and Why "Holding the Other Variables Constant" Matters
- The lecture first rejects the naive idea of fitting separate regressions for TV, radio, and newspaper and then somehow combining them afterward. The slides say this is unclear mathematically, ignores the effect of the other predictors, and fails to account for interactions or overlap. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p7]; [NB1: ics604-19-20_linear_regression.ipynb cells 34-37]
- Multiple linear regression fixes that by modeling `y = beta0 + beta1 x1 + beta2 x2 + ... + beta_p x_p + epsilon`, where each `beta_i` is the average effect of predictor `x_i` while the other predictors are held fixed. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p8]; [NB1: ics604-19-20_linear_regression.ipynb cells 37-39]
- The notebook's embedded plane illustration adds a geometric picture the slide text does not spell out: once more than one predictor is in the model, the fitted object is no longer a single line on one scatterplot but a surface in a higher-dimensional predictor space. [NB1: ics604-19-20_linear_regression.ipynb cell 37]
- In the Advertising example, the multiple-regression interpretation becomes concrete: each additional `$1,000` spent on TV is associated with about `45.8` more units sold on average, and each additional `$1,000` spent on radio is associated with about `188.5` more units sold on average, after accounting for the other channels. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p8-p9]; [NB1: ics604-19-20_linear_regression.ipynb cells 38-39]
- The slides and notebook both emphasize that newspaper spending is not significant in the full model and adds little explanatory value once TV and radio are already included. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p9]; [NB1: ics604-19-20_linear_regression.ipynb cells 38-39]
- The lecture then explains the apparent contradiction: simple linear regression on newspaper alone suggests an effect of about `0.0547` thousand sales units per `$1,000`, but the multiple model drives that estimate to roughly `0` because radio and newspaper are themselves correlated at about `0.35`. Part of the newspaper signal was really radio's signal being carried along. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p10]; [NB1: ics604-19-20_linear_regression.ipynb cells 35-40]

#### In Layman's Terms
- A multiple-regression coefficient is the model's answer to this question: "If I change only this one variable and leave the others alone, what change should I expect in the outcome?" [PDF: ics604-S26-lec20-NonLinearRegression.pdf p8-p10]; [NB1: ics604-19-20_linear_regression.ipynb cells 37-40]
- Newspaper looks useful by itself only because it tends to move together with radio spending. Once the model can see both variables at the same time, it gives most of the credit to radio. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p9-p10]; [NB1: ics604-19-20_linear_regression.ipynb cells 35-40]

### D. More Predictors, Higher `R^2`, and the Overfitting Problem
- The lecture warns that manual reasoning becomes difficult once a model contains many predictors, because variables can be related to the response and to each other in complicated ways. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p11]; [NB1: ics604-19-20_linear_regression.ipynb cell 41]
- It also makes an important modeling point: `R^2` increases as more predictors are added, but that does not automatically mean the model has improved. A bigger model can simply start fitting noise. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p11]; [NB1: ics604-19-20_linear_regression.ipynb cell 41]
- The slides therefore frame variable selection as a hard problem and mention ridge regression and lasso regression as methods that shrink unnecessary coefficients and help control complexity. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p11]; [NB1: ics604-19-20_linear_regression.ipynb cell 41]

#### In Layman's Terms
- Adding more columns to a model usually makes it look better on the training data, but it can make the model worse at predicting new data. That is the overfitting warning in one sentence. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p11]; [NB1: ics604-19-20_linear_regression.ipynb cell 41]

### E. Why a Straight Line Can Fail on Non-Linear Data
- The lecture transitions from richer linear models to genuinely non-linear relationships by saying that complex models are rarely linear, even though linear models are often still useful for quick prototypes and fully interpretable analyses. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p11]; [NB2: ics604-20_non_linear_regression.ipynb cell 4]
- To make the problem visible, the slides generate synthetic data from the quadratic model `y = 30 - 0.3x + 0.005x^2 + epsilon`. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p12]; [NB2: ics604-20_non_linear_regression.ipynb cells 5-7]
- The key statistical point comes next: the true random errors were generated from a normal distribution, but once the quadratic term is omitted and a straight-line model is forced onto the data, the residuals are no longer just random noise. They contain systematic curvature and can look non-normal because the model is misspecified. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p13]; [NB2: ics604-20_non_linear_regression.ipynb cells 7-8]
- The rendered residual figure makes that failure mode obvious. The fitted red line cuts through a U-shaped cloud, and the residual plot is positive on both ends but negative in the middle, which is exactly the kind of structure a good residual plot should not have. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p12-p13]; [NB2: ics604-20_non_linear_regression.ipynb cells 6-8]

#### In Layman's Terms
- Sometimes the data are not noisy around a line. They are noisy around a curve. If you insist on fitting a line anyway, the leftover errors will start to show a pattern, which is the model telling you it is the wrong shape. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p12-p13]; [NB2: ics604-20_non_linear_regression.ipynb cells 5-8]

### F. Local Linearity and Nearest Neighbor Regression
- The lecture suggests a local view of nonlinearity: within a small enough region, a curved relationship often looks approximately linear. The slides use the window `x in [35, 45]` as the example. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p14]; [NB2: ics604-20_non_linear_regression.ipynb cells 9-12]
- Nearest neighbor regression turns that idea into a prediction rule. To predict at a target `x`, take a fixed number of nearby observed points and use their mean response as the prediction. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p15]; [NB2: ics604-20_non_linear_regression.ipynb cells 13-19]
- The rendered local-window slides show why this makes sense. In the narrow `x in [35, 45]` zoom, a short red line is a reasonable local approximation even though one global line fails across the full quadratic curve. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p14-p15]; [NB2: ics604-20_non_linear_regression.ipynb cells 9-13]
- The notebook makes the procedure concrete with `np.searchsorted`, using a sorted `x` array to find where a query value would be inserted and then selecting neighbors above and below that position. [NB2: ics604-20_non_linear_regression.ipynb cells 13-19]
- The nearest-neighbor visualization on slide 16 then highlights a red cluster of nearby points around a query near `x = 70`, reinforcing that the prediction comes from local averaging rather than from one formula learned over the whole range. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p15-p16]; [NB2: ics604-20_non_linear_regression.ipynb cells 14-19]
- The lecture then lists the drawbacks: nearest neighbor regression can be computationally slow, sensitive to outliers, and unreliable near the boundaries where there are fewer nearby points to average. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p17]; [NB2: ics604-20_non_linear_regression.ipynb cell 20]

#### In Layman's Terms
- Nearest neighbor regression says, "Do not force one global formula. Just look around the target point and average what happened nearby." [PDF: ics604-S26-lec20-NonLinearRegression.pdf p14-p17]; [NB2: ics604-20_non_linear_regression.ipynb cells 9-20]
- That idea is simple, but it gets expensive on large datasets and unstable near the edges or in the presence of unusual points. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p17]; [NB2: ics604-20_non_linear_regression.ipynb cell 20]

#### Language Bridge
- `np.searchsorted(sorted_array, q)` is just an index-finding helper. It tells you where `q` would be inserted to keep the array sorted, which makes it easy to grab nearby values by index. [NB2: ics604-20_non_linear_regression.ipynb cells 13-19]
- The regression step itself is very simple: once the neighbors are chosen, the notebook uses their mean `y` value as the prediction. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p15]; [NB2: ics604-20_non_linear_regression.ipynb cells 18-19]

### G. Step Functions as Piecewise-Constant Regression
- To reduce some of nearest neighbor regression's instability, the lecture next discretizes the `x` axis into bins and fits a different constant inside each bin. This is presented as converting a continuous variable into an ordered categorical variable. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p18]; [NB2: ics604-20_non_linear_regression.ipynb cells 21-27]
- In both the slides and notebook, the constant used within a bin is the mean response value for the observations that fall in that interval, producing the characteristic horizontal "steps." [PDF: ics604-S26-lec20-NonLinearRegression.pdf p18]; [NB2: ics604-20_non_linear_regression.ipynb cells 21-27]
- The rendered step-function slides make the drawback visual. One slide shows a single bin replaced by one flat mean segment, and the next shows the full staircase, where tiny changes near a knot can cause a sudden jump to a different horizontal level even though the underlying curve is smooth. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p18-p20]; [NB2: ics604-20_non_linear_regression.ipynb cells 22-28]
- The shortcomings are then spelled out clearly: two points that are very close in `x` can get sharply different predictions if they land on opposite sides of a cutpoint, and the fit can change noticeably if you choose `9`, `11`, or `13` bins instead of `10`. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p20]; [NB2: ics604-20_non_linear_regression.ipynb cell 28]

#### In Layman's Terms
- A step function chops the curve into flat pieces. That is easy to understand, but it creates artificial jumps where the real relationship may be smooth. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p18-p20]; [NB2: ics604-20_non_linear_regression.ipynb cells 21-28]

### H. Polynomial Regression as Linear Regression on Transformed Features
- The lecture's last modeling strategy is polynomial regression. Instead of using only a first-degree model `y = beta0 + beta1 x`, it adds higher powers such as `x^2` and `x^3` so the fitted curve can bend. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p21]; [NB2: ics604-20_non_linear_regression.ipynb cell 29]
- The slides and notebook emphasize a key point: polynomial regression is still ordinary least squares after a feature transformation. The workflow is: first transform `x` into higher-degree features, then fit the linear model on those transformed columns. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p21-p22]; [NB2: ics604-20_non_linear_regression.ipynb cells 30-33]
- This is why the model remains "linear" in the statistical sense. After defining `A = x`, `B = x^2`, and `C = x^3`, the model can be rewritten as `y = beta0 * 1 + beta1 * A + beta2 * B + beta3 * C`, which is linear in the coefficients even though it is curved in `x`. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p22]; [NB2: ics604-20_non_linear_regression.ipynb cell 30]
- The notebook also gives the explicit feature-matrix example for `x = [1, 2, 3, 4, 5]`, where each row becomes `[1, x, x^2, x^3]`, and notes that `PolynomialFeatures` in scikit-learn automates this expansion. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p22-p23]; [NB2: ics604-20_non_linear_regression.ipynb cells 30-32]

#### In Layman's Terms
- Polynomial regression does not replace linear regression with a totally different fitting algorithm. It changes the inputs first, then runs the usual linear fit on those new columns. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p21-p23]; [NB2: ics604-20_non_linear_regression.ipynb cells 29-32]

#### Language Bridge
- Feature engineering is the main implementation idea here. You start with one input column `x`, build extra columns such as `x^2` and `x^3`, and then hand the enlarged table to the same regression routine. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p22]; [NB2: ics604-20_non_linear_regression.ipynb cells 30-32]
- That is why the notebook says polynomial regression is still a linear model: the unknowns are still the coefficients multiplying each column, and those coefficients still enter the equation in a straight-line way. [PDF: ics604-S26-lec20-NonLinearRegression.pdf p22]; [NB2: ics604-20_non_linear_regression.ipynb cell 30]

### I. Notebook Extension: Increasing Polynomial Degree, Overfitting, and Validation
- The notebook extends the PDF by fitting polynomial curves of several degrees to a small subsample of the synthetic quadratic dataset, including degree `2`, `5`, `9`, and `25`. [NB2: ics604-20_non_linear_regression.ipynb cells 34-42]
- The lesson is that higher-degree polynomials give the model more flexibility, which can improve how closely the fitted curve follows the observed training data. The notebook ties this back to the residual-sum-of-squares idea from linear regression. [NB2: ics604-20_non_linear_regression.ipynb cells 40-42]
- But the notebook immediately adds the caution: high-degree polynomials can introduce unnecessary oscillations, fit random noise instead of the real pattern, and generalize poorly. It recommends a train-validation split to choose the polynomial degree that balances fit against overfitting. [NB2: ics604-20_non_linear_regression.ipynb cell 43]

#### In Layman's Terms
- A very flexible polynomial can hug the training data so tightly that it starts memorizing accidents instead of learning the real trend. The validation split is the reality check that keeps that from looking better than it really is. [NB2: ics604-20_non_linear_regression.ipynb cells 41-43]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Homework 3 reminder, project-proposal feedback, final-report and GitHub-repository requirements, and Lecture 20 agenda | `work/lectures/PDFs/ics604-S26-lec20-NonLinearRegression.pdf` p1-p4 | `work/lectures/Notebooks/ics604-19-20_linear_regression.ipynb` and `work/lectures/Notebooks/ics604-20_non_linear_regression.ipynb` are the two companion notebooks that carry the lecture split | A | Covered |
| `statsmodels`, OLS, R-style formula notation, Advertising-data recall, and simple-regression coefficient interpretation | `work/lectures/PDFs/ics604-S26-lec20-NonLinearRegression.pdf` p4-p6 | `work/lectures/Notebooks/ics604-19-20_linear_regression.ipynb` (md 028, 033; code 029-032) | B | Covered |
| Why separate one-predictor models are naive, the multiple-regression equation, and the "holding others constant" interpretation | `work/lectures/PDFs/ics604-S26-lec20-NonLinearRegression.pdf` p7-p8 | `work/lectures/Notebooks/ics604-19-20_linear_regression.ipynb` (md 034, 037; code 035-038) | C | Covered |
| TV and radio coefficient interpretations in the full Advertising model, plus newspaper becoming insignificant | `work/lectures/PDFs/ics604-S26-lec20-NonLinearRegression.pdf` p8-p9 | `work/lectures/Notebooks/ics604-19-20_linear_regression.ipynb` (md 039; code 038) | C | Covered |
| The radio-newspaper correlation explanation for why newspaper looks useful alone but not in the full model | `work/lectures/PDFs/ics604-S26-lec20-NonLinearRegression.pdf` p10 | `work/lectures/Notebooks/ics604-19-20_linear_regression.ipynb` (md 039; code 035-036, 040) | C | Covered |
| Many-predictor complexity, rising `R^2`, overfitting, model selection, and ridge/lasso shrinkage | `work/lectures/PDFs/ics604-S26-lec20-NonLinearRegression.pdf` p11 | `work/lectures/Notebooks/ics604-19-20_linear_regression.ipynb` (md 041) | D | Covered |
| Non-linearity motivation, quadratic synthetic data, and residual-pattern consequences of misspecification | `work/lectures/PDFs/ics604-S26-lec20-NonLinearRegression.pdf` p11-p13 | `work/lectures/Notebooks/ics604-20_non_linear_regression.ipynb` (md 004-009; code 006-007) | E | Covered |
| Local linearity in a small window, nearest neighbor regression, and nearest-neighbor drawbacks | `work/lectures/PDFs/ics604-S26-lec20-NonLinearRegression.pdf` p14-p17 | `work/lectures/Notebooks/ics604-20_non_linear_regression.ipynb` (md 009, 013, 020; code 010-019) | F | Covered |
| Step functions as piecewise-constant fits and their cutpoint / jump shortcomings | `work/lectures/PDFs/ics604-S26-lec20-NonLinearRegression.pdf` p18-p20 | `work/lectures/Notebooks/ics604-20_non_linear_regression.ipynb` (md 021, 028; code 022-027) | G | Covered |
| Polynomial regression, transformed polynomial features, and the explicit `[1, x, x^2, x^3]` feature-matrix idea | `work/lectures/PDFs/ics604-S26-lec20-NonLinearRegression.pdf` p21-p23 | `work/lectures/Notebooks/ics604-20_non_linear_regression.ipynb` (md 029-033; code 031-032) | H | Covered |
| Higher polynomial degrees, overfitting, and using validation to choose degree | *Notebook-only extension; not explicitly covered in the PDF deck* | `work/lectures/Notebooks/ics604-20_non_linear_regression.ipynb` (md 041, 043; code 034-042) | I | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec20-NonLinearRegression.pdf`
- Notebook sources: `work/lectures/Notebooks/ics604-19-20_linear_regression.ipynb`, `work/lectures/Notebooks/ics604-20_non_linear_regression.ipynb`
