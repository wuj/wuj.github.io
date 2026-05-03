# Lecture 26: Mixture Models, EM, Gaussian Mixture Models, and Clustering Example

### Quick Overview
- Lecture 26 continues mixture models. A mixture model treats the data as coming from several hidden probability distributions. In a Gaussian Mixture Model, or GMM, each cluster is modeled as a Gaussian distribution with its own mean, covariance, and prior probability. The task is to estimate those parameters from unlabeled data. [PDF: ics604-S26-lec26-MixtureModels.pdf p2-p4]
- The lecture stresses that a mixture distribution is a weighted combination of component distributions, not a plain sum. Each component contributes according to its mixing weight, and the weights must add to `1`. [PDF: ics604-S26-lec26-MixtureModels.pdf p3-p4]
- The male and female sales example shows the same idea in code. The lecture plots normal PDFs for each group, then compares a KDE-based curve to a theoretical mixture that uses the observed group proportions, `439 / 1000` and `561 / 1000`. [PDF: ics604-S26-lec26-MixtureModels.pdf p5-p6]
- The central problem is a catch-22. If we knew the cluster labels, estimating means and standard deviations would be easy. If we knew the means and standard deviations, assigning points to clusters would be easy. Expectation-Maximization, or EM, solves this by alternating between soft cluster membership estimates and parameter updates. [PDF: ics604-S26-lec26-MixtureModels.pdf p7-p16]
- The lecture connects EM to k-means, explains GMM priors and convergence cautions, and ends with a clustering example that compares `KMeans` with `GaussianMixture` using spherical and full covariance models. [PDF: ics604-S26-lec26-MixtureModels.pdf p12-p23]
- No companion notebook was found by the lecture asset resolver. The code examples for this lecture are embedded as screenshots in the PDF, so this summary is grounded in PDF pages only. [PDF: ics604-S26-lec26-MixtureModels.pdf p18-p22]

#### In Layman's Terms
- A mixture model says, "This one pile of data may really be several piles mixed together." A GMM says each hidden pile has a bell-shaped pattern. Since we do not know the hidden labels, EM repeatedly guesses how much each point belongs to each pile, then updates the bell shapes to match those guesses. [PDF: ics604-S26-lec26-MixtureModels.pdf p3-p17]

### A. Mixture Distributions Are Weighted Combinations
- The lecture begins with a recap of mixture models. A mixture model assumes data comes from several underlying probability distributions. Each distribution represents one cluster, and the model assigns data points to clusters using probabilities. [PDF: ics604-S26-lec26-MixtureModels.pdf p3]
- For GMMs, each cluster is a Gaussian distribution with its own mean, covariance, and prior probability. The model's goal is to find the parameters that best explain the observed data. [PDF: ics604-S26-lec26-MixtureModels.pdf p3]
- The lecture writes the mixture as a weighted density. For the male and female example, the total density can be written in ASCII as `pdf(x) = pi * pdf_male(x) + (1 - pi) * pdf_female(x)`. The important point is that `pi` and `1 - pi` are weights, not counts added after the fact. [PDF: ics604-S26-lec26-MixtureModels.pdf p3-p4]
- The weights also keep the total density normalized because `pi + (1 - pi) = 1`. This is why the combined curve is still a valid probability density. [PDF: ics604-S26-lec26-MixtureModels.pdf p4]
- The code screenshots make the idea concrete. The lecture uses `sp.stats.norm.pdf()` to build theoretical normal curves, then compares the combined theoretical curve against a KDE-based curve from the observed sales data. The group counts shown are `439` males and `561` females, so the theoretical mixture uses weights `439 / 1000` and `561 / 1000`. [PDF: ics604-S26-lec26-MixtureModels.pdf p5-p6]

#### In Layman's Terms
- The combined curve is like a recipe. You do not pour in all of one curve and all of the other curve. You pour in the right fraction of each one. If about `44%` of the data comes from one group and `56%` comes from the other, the final curve should use about those same shares. [PDF: ics604-S26-lec26-MixtureModels.pdf p4-p6]

#### Language Bridge
- `sp.stats.norm.pdf(x_axis, mean_females, std_females)` asks SciPy for the height of a normal curve at many `x` values. In programming terms, it maps an array of inputs to an array of density values using the mean and standard deviation as parameters. [PDF: ics604-S26-lec26-MixtureModels.pdf p5]
- The mixture line `weight_male * y_axis_males_theoretical + weight_female * y_axis_females_theoretical` is vectorized arithmetic. It combines two arrays point by point, using the group proportions as weights. [PDF: ics604-S26-lec26-MixtureModels.pdf p6]

### B. The Catch-22: Labels Make Parameters Easy, and Parameters Make Labels Easy
- The lecture asks a basic classification question. If we know two means and two standard deviations for two populations, how can we decide which population a new point most likely came from? [PDF: ics604-S26-lec26-MixtureModels.pdf p7]
- For the sales example, the unknown parameters are the mean and standard deviation for male sales, the mean and standard deviation for female sales, and the proportion of males or females. [PDF: ics604-S26-lec26-MixtureModels.pdf p8]
- The catch-22 is that labels and parameters help each other. If we know the group label for each point, we can compute the mean and standard deviation for each group. If we know the means and standard deviations, we can compute how likely each point is under each distribution. [PDF: ics604-S26-lec26-MixtureModels.pdf p8-p9]
- The lecture's first key idea is that known cluster assignments make parameter estimation easy. For each group, compute the mean and standard deviation from the points assigned to that group. [PDF: ics604-S26-lec26-MixtureModels.pdf p8]
- The second key idea is soft membership. A point is not forced into exactly one cluster. Instead, its membership probabilities across the clusters add to `1`. In the two-cluster example, a point can be partly blue and partly orange. [PDF: ics604-S26-lec26-MixtureModels.pdf p10]
- The lecture computes the two probabilities by normalizing the likelihoods. In ASCII form, `B_i = p(x_i | blue) / (p(x_i | blue) + p(x_i | orange))`, and the orange probability uses the same denominator. [PDF: ics604-S26-lec26-MixtureModels.pdf p10, p14]

#### In Layman's Terms
- The hard version asks, "Which group owns this point?" The soft version asks, "How much evidence does this point give to each group?" That soft answer is more useful when clusters overlap. [PDF: ics604-S26-lec26-MixtureModels.pdf p8-p10]

### C. EM Alternates Between Membership Probabilities and Parameter Updates
- The lecture defines Expectation-Maximization as an iterative method for hidden structure in data. A latent variable is a hidden value we believe exists but do not directly observe, such as the true cluster label. [PDF: ics604-S26-lec26-MixtureModels.pdf p11]
- In the E-step, the algorithm estimates the probabilities of the latent variables using the current parameter estimates. In this lecture's clustering setting, that means estimating the probability that each observation belongs to each cluster. [PDF: ics604-S26-lec26-MixtureModels.pdf p11]
- In the M-step, the algorithm updates the model parameters, such as means and standard deviations, to better fit the weighted memberships from the E-step. The steps repeat until the likelihood stops improving in a meaningful way. [PDF: ics604-S26-lec26-MixtureModels.pdf p11]
- The lecture explains the GMM loop as two useful "pretend" steps. First, pretend the cluster parameters are known and use them to estimate membership probabilities. Then pretend those probabilities are known and use them to estimate the cluster parameters. [PDF: ics604-S26-lec26-MixtureModels.pdf p11]
- K-means can also be viewed as an EM-style algorithm. It chooses starting centers, assigns each point to the closest center in the E-step, then updates each center from the points assigned to that cluster in the M-step. The difference is that k-means uses hard assignments. [PDF: ics604-S26-lec26-MixtureModels.pdf p12]
- The lecture's one-dimensional EM example starts with unlabeled data from two clusters, initializes means and standard deviations, estimates how likely each point is under each Gaussian, and then recomputes parameters from those probabilities. [PDF: ics604-S26-lec26-MixtureModels.pdf p12-p14]
- The mean update uses a weighted average. For the blue component, the slide writes this as `mu_b = sum(B_i * x_i) / sum(B_i)`. Points with larger blue membership count more toward the blue mean. [PDF: ics604-S26-lec26-MixtureModels.pdf p14]
- The spread update follows the same weighted idea. The slide computes a weighted average of squared distances from the component mean, so points that mostly belong to another component contribute less. [PDF: ics604-S26-lec26-MixtureModels.pdf p15]
- After repeated E-steps and M-steps, the lecture shows that the algorithm reaches a stable solution. [PDF: ics604-S26-lec26-MixtureModels.pdf p16]

#### In Layman's Terms
- EM is a back-and-forth process. Guess how much each point belongs to each cluster. Then adjust each cluster to fit those partial memberships. Keep repeating until the guesses and the cluster shapes stop changing much. [PDF: ics604-S26-lec26-MixtureModels.pdf p11-p16]

#### Language Bridge
- The weighted mean formula is like computing an average where each row has a fractional vote. In k-means, each vote is either `0` or `1`. In GMM, the vote can be any value between `0` and `1`. [PDF: ics604-S26-lec26-MixtureModels.pdf p14-p15]

### D. Priors, Convergence, and Choosing the Number of Gaussians
- The lecture notes that the earlier EM explanation assumed equal priors for the clusters. If the priors are not equal, the algorithm should update them during each iteration. For example, the blue prior can be estimated as `P(B) = sum(B_i) / n`. [PDF: ics604-S26-lec26-MixtureModels.pdf p17]
- Starting with equal priors is common because it helps avoid crushing a cluster at the beginning. If a cluster's prior becomes `0`, the solution can no longer recover that cluster. [PDF: ics604-S26-lec26-MixtureModels.pdf p17]
- Like k-means, EM is not guaranteed to find the global best solution. The lecture says it is common to repeat the algorithm with different initializations. [PDF: ics604-S26-lec26-MixtureModels.pdf p17]
- The GMM summary says that GMMs try to find a mixture of Gaussian distributions that best models the input data. The Gaussians can be multidimensional, and each point gets a probability for every cluster instead of only one hard label. [PDF: ics604-S26-lec26-MixtureModels.pdf p17]
- The probabilistic output gives a confidence measure for cluster membership. This is a major difference from plain k-means, where the output is only a cluster ID. [PDF: ics604-S26-lec26-MixtureModels.pdf p17]
- To decide how many Gaussians to use, the lecture compares the problem to choosing the number of clusters in k-means. K-means often uses heuristic tools such as the Silhouette Score. GMMs provide a likelihood objective, so the number of components should maximize or balance the likelihood of the data under the model. [PDF: ics604-S26-lec26-MixtureModels.pdf p23]

#### In Layman's Terms
- Priors are the model's current belief about how large each cluster is. Bad starting beliefs can make a cluster disappear. Also, EM can settle into a good local answer instead of the best possible answer, so trying several starts is part of the workflow. [PDF: ics604-S26-lec26-MixtureModels.pdf p17]

### E. Clustering Example With `KMeans` and `GaussianMixture`
- The clustering example creates two two-dimensional normal clusters with `np.random.multivariate_normal()`. The first has mean `[0, 0]` and covariance `[[3, 0], [0, 10]]`. The second has mean `[5, 5]` and covariance `[[4, 0], [0, 10]]`. Each cluster has `100` points, giving `X.shape` as `(200, 2)`. [PDF: ics604-S26-lec26-MixtureModels.pdf p18]
- The example first plots the true labels with `plt.scatter(X[:, 0], X[:, 1], c=y_true, s=20, cmap='viridis', alpha=0.5)`. The point cloud shows overlapping clusters, which makes the example useful for comparing hard and probabilistic clustering. [PDF: ics604-S26-lec26-MixtureModels.pdf p18]
- The k-means version uses `KMeans(2, random_state=0)` and `fit_predict(X)`. Its output is a hard label for each point, and the plotted result shows a crisp split between the two groups. [PDF: ics604-S26-lec26-MixtureModels.pdf p19]
- The GMM version uses `GaussianMixture(n_components=2, covariance_type='spherical', max_iter=1000).fit(X)`. The slide comment explains that the spherical covariance type gives each component one variance value. [PDF: ics604-S26-lec26-MixtureModels.pdf p19]
- The spherical GMM prints two fitted means and two covariance values, then compares predicted labels against `y_true`. The example reports `25` mismatches. [PDF: ics604-S26-lec26-MixtureModels.pdf p20]
- The lecture then uses `gmm.predict_proba(X)` to get cluster membership probabilities. It stores the largest probability for each row as `prob`, rounded to three decimals. The error rows include probabilities such as `0.588` and `0.518`, showing that some wrong assignments are made with lower confidence. [PDF: ics604-S26-lec26-MixtureModels.pdf p21]
- The next plot uses `s=100 * data['prob']`, so more confident points are drawn larger. This makes the confidence information visible in the scatter plot instead of only storing it in a table. [PDF: ics604-S26-lec26-MixtureModels.pdf p22]
- The lecture also fits a full covariance GMM. The printed full covariance matrices allow each component to have a more flexible shape than the spherical model. In the displayed example, the full covariance plot better matches the elongated shape of the two true clusters. [PDF: ics604-S26-lec26-MixtureModels.pdf p22]

#### In Layman's Terms
- K-means gives each point one label and moves on. GMM can still give one predicted label, but it also keeps the probability behind that choice. That extra probability is useful because overlapping clusters are not always cleanly separable. [PDF: ics604-S26-lec26-MixtureModels.pdf p19-p22]

#### Language Bridge
- `KMeans.fit_predict(X)` is like fitting the model and immediately asking for one cluster ID per row. [PDF: ics604-S26-lec26-MixtureModels.pdf p19]
- `GaussianMixture.predict(X)` also returns one label per row, but `GaussianMixture.predict_proba(X)` returns a table of probabilities, one probability per component for each row. [PDF: ics604-S26-lec26-MixtureModels.pdf p19-p21]
- `covariance_type='spherical'` is a simpler model because each component gets one variance value. A full covariance model is more flexible because it can represent directional spread in two dimensions. [PDF: ics604-S26-lec26-MixtureModels.pdf p19-p22]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Lecture 26 agenda, mixture model recap, GMM definition, and weighted mixture density using component proportions | `work/lectures/PDFs/ics604-S26-lec26-MixtureModels.pdf` p2-p4 | No companion notebook found by resolver | A | Covered |
| PDF-embedded code screenshots showing normal PDFs for male and female sales, KDE comparison, and theoretical mixture using group counts `439` and `561` | `work/lectures/PDFs/ics604-S26-lec26-MixtureModels.pdf` p5-p6 | No companion notebook found by resolver | A | Covered |
| Catch-22 of unknown labels and unknown parameters, likelihood under each Gaussian, and soft membership probabilities that sum to `1` | `work/lectures/PDFs/ics604-S26-lec26-MixtureModels.pdf` p7-p10 | No companion notebook found by resolver | B | Covered |
| EM definition, E-step, M-step, k-means as hard-assignment EM, one-dimensional EM example, and weighted parameter updates | `work/lectures/PDFs/ics604-S26-lec26-MixtureModels.pdf` p11-p16 | No companion notebook found by resolver | C | Covered |
| Equal-prior assumption, prior updates, convergence cautions, GMM summary, and choosing the number of Gaussians by likelihood | `work/lectures/PDFs/ics604-S26-lec26-MixtureModels.pdf` p17, p23 | No companion notebook found by resolver | D | Covered |
| PDF-embedded clustering example using `np.random.multivariate_normal`, `KMeans`, `GaussianMixture`, `predict_proba`, spherical covariance, and full covariance | `work/lectures/PDFs/ics604-S26-lec26-MixtureModels.pdf` p18-p22 | No companion notebook found by resolver | E | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec26-MixtureModels.pdf`
- Notebook sources: None found by resolver
