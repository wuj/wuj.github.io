# Lecture 8: Visualization with Matplotlib + Random Number Generation

### Quick Overview
- Lecture 8 introduces Matplotlib as the course's core plotting library. The lecture covers the figure/axes model, subplot layout, plot construction, styling, legends, labels, and the main chart types used in exploratory work. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p3-p26]
- The second half shifts to random number generation in Python and NumPy, connecting simulated data generation to plotting, experimentation, and later probability/statistics lectures. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p27-p33]

#### In Layman's Terms
- This lecture teaches two practical skills: how charts are built in Python and how to generate random data that can be used for simulation, experimentation, and demonstration. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p3-p33]

### A. Why Visualization and Why Matplotlib
- The lecture positions plotting as a core data science task. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p3]
- Matplotlib is introduced as a 2D plotting library suitable for publication-ready figures. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p3]
- It is presented as a foundational plotting layer used by many higher-level tools. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p3]

#### In Layman's Terms
- If you cannot visualize data, you often miss trends, outliers, and communication clarity. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p3]
- Example: a simple line chart can reveal seasonality that is hard to notice in raw tables. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p3]

#### Language Bridge
- Think of Matplotlib as the low-level chart engine, similar to using a core rendering library before wrappers. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p3]
- In web development terms, this is closer to direct chart configuration than drag-and-drop dashboards. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p3]

### B. Figure and Axes Architecture
- Slides distinguish `Figure` (container/window) from `Axes` (actual plot area). [PDF: ics604-S26-lec08-DataVis_RNG.pdf p4-p5]
- A figure can hold multiple axes/subplots. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p4-p5]
- The anatomy diagram decomposes a finished figure into figure, axes, x/y axes, labels, major/minor ticks, spines, grid, legend, lines, and markers, making clear which object owns each visible part of the chart. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p4-p5]
- Plot commands operate on current or specified axes. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p4-p5]

#### In Layman's Terms
- Figure is the canvas; axes are the individual charts drawn on that canvas. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p4-p5]
- Example: a dashboard with four charts is one figure with four axes. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p4-p5]

#### Language Bridge
- Comparable to HTML page vs chart div components: [PDF: ics604-S26-lec08-DataVis_RNG.pdf p4-p5]
- page/container object = figure, [PDF: ics604-S26-lec08-DataVis_RNG.pdf p4-p5]
- chart region component = axes. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p4-p5]

### C. Plot Construction and Subplots
- The lecture explains plotting flow when calling high-level plot functions. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p7, p9, p12]
- It covers single-plot creation and multiple subplots via subplot APIs. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p7, p9, p12]
- The notebook outputs show the progression from one default axes to explicit subplot grids, shared axes, and array-shaped axes collections returned by `plt.subplots(...)`. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p7, p9, p12]
- It highlights rows/columns layout and shared-axis options. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p7, p9, p12]

#### In Layman's Terms
- You can either draw one chart quickly or compose a grid of related charts. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p7, p9, p12]
- Example: one row with two plots can compare observed values and residuals side by side. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p7, p9, p12]

#### Language Bridge
- Similar to constructing multi-panel UI layouts in frontend frameworks. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p7, p9, p12]

### D. Plot Styling, Legends, Labels, and Presets
- Slides cover plot-level and figure-level customization (color, line style, markers, titles, labels). [PDF: ics604-S26-lec08-DataVis_RNG.pdf p13-p17]
- Legends are emphasized for readability when multiple data series appear. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p13-p17]
- The rendered examples demonstrate that legends, labels, style presets, and marker/line choices are the mechanisms that make multi-series plots readable, not optional cosmetic extras. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p13-p17]
- Style presets are shown for consistent visual themes. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p13-p17]

#### In Layman's Terms
- Good labels and legends are required for people to interpret a plot correctly. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p13-p17]
- Example: without a legend, two lines are just colors; with labels, they become meaningful metrics. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p13-p17]

#### Language Bridge
- This maps to explicit presentation-layer configuration, similar to setting chart options in JS chart libraries. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p13-p17]

### E. Random Number Generation in Python and NumPy
- The lecture introduces pseudorandom generation and reproducibility via seeding. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p19-p24]
- It compares standard `random` functions with NumPy random APIs. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p19-p24]
- The seed diagram visualizes pseudorandom generation as a deterministic state machine, which is why the same seed reproduces the same sequence. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p19-p24]
- It notes overlapping functionality plus NumPy's broader distribution support. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p19-p24]

#### In Layman's Terms
- Random numbers here are algorithmic, so the same seed reproduces the same sequence. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p19-p24]
- Example: set seed once so your teammate can reproduce your simulation result exactly. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p19-p24]

#### Language Bridge
- Same concept as deterministic pseudo-random generators in other languages. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p19-p24]

### F. Common Plot Types and When to Use Them
- The lecture covers line, scatter, bar, and histogram plots. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]
- It ties each type to typical data/analysis scenarios: [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]
- line for progression/continuous axes, [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]
- scatter for relationship patterns, [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]
- bar for categorical comparisons, [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]
- histogram for distribution shape. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]
- The notebook output plots make these use cases concrete: line plots show ordered change, scatter plots show pairwise relationships, bar charts compare category totals, and histograms summarize one-variable distributions. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]

#### In Layman's Terms
- Choose plot type by question, not preference. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]
- Example: use histogram for "how values are distributed," not for time trends. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]

#### Language Bridge
- Equivalent mental model across ecosystems: [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]
- line -> trend over ordered axis, [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]
- scatter -> relationship between two variables, [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]
- bar -> category comparison, [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]
- histogram -> frequency distribution. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p26-p32]

### G. Exercise and Practical Continuation
- The lecture includes an exercise to reproduce a provided figure. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p33]
- Slide text references ex_vis.ipynb and `ex_vis_figure.png` on Lamaku. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p33]
- In this repo, the available companion notebooks for this lecture are the two `ics604-08-*` notebooks. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p33]

#### In Layman's Terms
- Reproducing an existing chart is a practical way to learn plotting mechanics and debugging. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p33]
- Example: if your recreated chart does not match, check scales, labels, and default style differences. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p33]

#### Language Bridge
- This resembles recreating a known UI screenshot from spec to verify understanding of layout and style rules. [PDF: ics604-S26-lec08-DataVis_RNG.pdf p33]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Visualization motivation and Matplotlib intro | `work/lectures/PDFs/ics604-S26-lec08-DataVis_RNG.pdf` p3 | `work/lectures/Notebooks/ics604-08-1_data_vis-1.ipynb` (intro markdown/cells) | A | Covered |
| Figure/Axes model and anatomy-of-a-figure diagram | `work/lectures/PDFs/ics604-S26-lec08-DataVis_RNG.pdf` p4-p5 | `work/lectures/Notebooks/ics604-08-1_data_vis-1.ipynb` (figure/axes creation, anatomy diagram) | B | Covered |
| Plotting flow, subplot grids, and axes-array outputs | `work/lectures/PDFs/ics604-S26-lec08-DataVis_RNG.pdf` p7, p9, p12 | `work/lectures/Notebooks/ics604-08-1_data_vis-1.ipynb` (subplot patterns and output plots) | C | Covered |
| Styling, legends, labels, stylesheets, and readability examples | `work/lectures/PDFs/ics604-S26-lec08-DataVis_RNG.pdf` p13-p17 | `work/lectures/Notebooks/ics604-08-1_data_vis-1.ipynb` (styling cells and rendered examples) | D | Covered |
| RNG and seeding (`random`, NumPy) with seed-state diagram | `work/lectures/PDFs/ics604-S26-lec08-DataVis_RNG.pdf` p19-p24 | `work/lectures/Notebooks/ics604-08-2_rng_data_vis-2.ipynb` (random generation and seed diagram) | E | Covered |
| Line/scatter/bar/histogram types and rendered plot examples | `work/lectures/PDFs/ics604-S26-lec08-DataVis_RNG.pdf` p26-p32 | `work/lectures/Notebooks/ics604-08-1_data_vis-1.ipynb`, `work/lectures/Notebooks/ics604-08-2_rng_data_vis-2.ipynb` | F | Covered |
| Reproduction exercise prompt | `work/lectures/PDFs/ics604-S26-lec08-DataVis_RNG.pdf` p33 | ex_vis.ipynb referenced in slide but not found in repo | G | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec08-DataVis_RNG.pdf`
- Notebook sources: `work/lectures/Notebooks/ics604-08-1_data_vis-1.ipynb`, `work/lectures/Notebooks/ics604-08-2_rng_data_vis-2.ipynb`
- Notebook availability note: ex_vis.ipynb is referenced in slide p33 but is not present in `work/lectures/Notebooks`

