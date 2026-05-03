# Lecture 3: EDA with Pandas

### Quick Overview
- Lecture 3 is the course's exploratory data analysis workflow. It moves from table shape, datatypes, and descriptive statistics to missingness checks, sorting, quick inspection helpers, and simple plots. [PDF: ics604-S26-lec03-EDA.pdf p2-p26]
- The lecture's main idea is that analysis should be progressive: first understand what the dataset is, then understand what values it contains, then check data quality before any serious modeling. [PDF: ics604-S26-lec03-EDA.pdf p2-p26]

#### In Layman's Terms
- This is the "get to know the dataset" lecture. Before asking complicated questions, you first learn what columns you have, what kinds of values they store, where data is missing, and what the basic patterns look like. [PDF: ics604-S26-lec03-EDA.pdf p2-p26]

### A. EDA Goals and Lecture Scope
- The lecture agenda covers exploratory data analysis tasks: inspect structure, compute summaries, analyze missingness, sort, and produce basic plots. [PDF: ics604-S26-lec03-EDA.pdf p2]
- It frames EDA as progressive understanding from high-level table shape to detailed distributions and relationships. [PDF: ics604-S26-lec03-EDA.pdf p2]
- The companion notebook starts by reading a file into Pandas, reinforcing that EDA begins with loading data before profiling it. [PDF: ics604-S26-lec03-EDA.pdf p2]

#### In Layman's Terms
- EDA is the "get to know your data" phase before serious modeling. [PDF: ics604-S26-lec03-EDA.pdf p2]
- Example: you first ask "how many rows and columns do I have?" before asking "which variable predicts outcomes?" [PDF: ics604-S26-lec03-EDA.pdf p2]

#### Language Bridge
- This is similar to initial data profiling in PHP apps before writing business logic. [PDF: ics604-S26-lec03-EDA.pdf p2]
- You inspect schema and value quality before building reports or APIs on top of it. [PDF: ics604-S26-lec03-EDA.pdf p2]

### B. Pandas Attributes, Methods, and Data Types
- Slides distinguish attributes (like `shape`, `dtypes`) from methods (like `mean`, `sum`). [PDF: ics604-S26-lec03-EDA.pdf p3-p6]
- Correct datatype awareness is emphasized because some operations only apply to numeric columns. [PDF: ics604-S26-lec03-EDA.pdf p3-p6]
- The dtype screenshot makes the motivating bug concrete: identifier fields can look numeric while spending fields remain text-like, so EDA must inspect inferred dtypes instead of trusting appearances. [PDF: ics604-S26-lec03-EDA.pdf p3-p6]
- Mixed-type tables require explicit handling when aggregating. [PDF: ics604-S26-lec03-EDA.pdf p3-p6]

#### In Layman's Terms
- Think "what the table is" (attributes) versus "what the table can do" (methods). [PDF: ics604-S26-lec03-EDA.pdf p3-p6]
- Example: you can read `dtypes` to confirm whether a money column is numeric or mistakenly stored as text. [PDF: ics604-S26-lec03-EDA.pdf p3-p6]

#### Language Bridge
- Python objects expose both properties and methods, similar to class instances in PHP. [PDF: ics604-S26-lec03-EDA.pdf p3-p6]

### C. Axes and Descriptive Statistics
- The lecture explains axis semantics for row-wise vs column-wise operations. [PDF: ics604-S26-lec03-EDA.pdf p7-p11]
- It demonstrates summary methods (`sum`, `mean`, etc.) and the need for `numeric_only=True` when needed. [PDF: ics604-S26-lec03-EDA.pdf p7-p11]
- The axis diagrams pin down the direction convention: `axis=0` reduces down the rows to return one value per column, while `axis=1` reduces across the columns to return one value per row. [PDF: ics604-S26-lec03-EDA.pdf p7-p11]
- It uses small test datasets to validate function behavior before applying to real data. [PDF: ics604-S26-lec03-EDA.pdf p7-p11]

#### In Layman's Terms
- Axis choice answers: "summarize down each column?" or "summarize across each row?" [PDF: ics604-S26-lec03-EDA.pdf p7-p11]
- Example: average per feature is different from average per person/record. [PDF: ics604-S26-lec03-EDA.pdf p7-p11]

#### Language Bridge
- This maps to aggregation direction in SQL or array loops in PHP: [PDF: ics604-S26-lec03-EDA.pdf p7-p11]
- per column resembles grouping values by field, [PDF: ics604-S26-lec03-EDA.pdf p7-p11]
- per row resembles computing metrics within each record. [PDF: ics604-S26-lec03-EDA.pdf p7-p11]

### D. Missing Values and Counting Valid Data
- Slides cover how `NaN` affects summaries and why `shape`/`size` differ from non-missing counts. [PDF: ics604-S26-lec03-EDA.pdf p12-p15]
- `count()` is highlighted as counting non-null values. [PDF: ics604-S26-lec03-EDA.pdf p12-p15]
- The lecture motivates row-wise or column-wise validity checks depending on analysis goals. [PDF: ics604-S26-lec03-EDA.pdf p12-p15]

#### In Layman's Terms
- Missing data can silently distort statistics if you do not inspect it first. [PDF: ics604-S26-lec03-EDA.pdf p12-p15]
- Example: if half a column is missing, its average may be less trustworthy than it appears. [PDF: ics604-S26-lec03-EDA.pdf p12-p15]

#### Language Bridge
- Comparable to `null` handling in PHP arrays and DB records. [PDF: ics604-S26-lec03-EDA.pdf p12-p15]
- Python-style validity check: [PDF: ics604-S26-lec03-EDA.pdf p12-p15]
- PHP style equivalent is explicit null filtering before aggregation. [PDF: ics604-S26-lec03-EDA.pdf p12-p15]

### E. `info()`, Sorting, and Method Chaining
- The lecture uses `info()` as a compact schema + memory diagnostic. [PDF: ics604-S26-lec03-EDA.pdf p17-p21]
- Sorting is split between index-order sorting and value-based sorting. [PDF: ics604-S26-lec03-EDA.pdf p17-p21]
- Method chaining is presented as readable multi-step transformation syntax. [PDF: ics604-S26-lec03-EDA.pdf p17-p21]

#### In Layman's Terms
- `info()` is a quick health report for your table. [PDF: ics604-S26-lec03-EDA.pdf p17-p21]
- Chaining lets you describe a full cleaning/ordering pipeline in one flow. [PDF: ics604-S26-lec03-EDA.pdf p17-p21]

#### Language Bridge
- Method chaining is similar to fluent interfaces in many ecosystems. [PDF: ics604-S26-lec03-EDA.pdf p17-p21]

### F. Basic Visualization in Pandas
- The lecture positions Pandas plotting as lightweight EDA visualization. [PDF: ics604-S26-lec03-EDA.pdf p22-p25]; [PDF: ics604-S26-lec03-EDA.pdf p26]
- It notes that more advanced customization is typically done in Matplotlib (covered later). [PDF: ics604-S26-lec03-EDA.pdf p22-p25]; [PDF: ics604-S26-lec03-EDA.pdf p26]
- Plot-type selection is tied to data type and analysis question. [PDF: ics604-S26-lec03-EDA.pdf p22-p25]; [PDF: ics604-S26-lec03-EDA.pdf p26]
- The slide/notebook plot outputs show the same data rendered as quick ranking and distribution views, reinforcing that these visuals are for spotting skew, ordering, and outliers before deeper analysis. [PDF: ics604-S26-lec03-EDA.pdf p22-p25]; [PDF: ics604-S26-lec03-EDA.pdf p26]

#### In Layman's Terms
- Quick plots are for spotting patterns fast, not for final polished reporting. [PDF: ics604-S26-lec03-EDA.pdf p22-p25]; [PDF: ics604-S26-lec03-EDA.pdf p26]
- Example: a histogram can immediately reveal skewness and potential outliers. [PDF: ics604-S26-lec03-EDA.pdf p22-p25]; [PDF: ics604-S26-lec03-EDA.pdf p26]

#### Language Bridge
- Think of Pandas `.plot()` as a fast default chart helper. [PDF: ics604-S26-lec03-EDA.pdf p22-p25]; [PDF: ics604-S26-lec03-EDA.pdf p26]
- In PHP web stacks, this is like generating a quick chart config before tuning details in a full plotting library. [PDF: ics604-S26-lec03-EDA.pdf p22-p25]; [PDF: ics604-S26-lec03-EDA.pdf p26]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| EDA agenda and goals | `work/lectures/PDFs/ics604-S26-lec03-EDA.pdf` p2 | `work/lectures/Notebooks/ics604-03_eda.ipynb` (intro markdown) | A | Covered |
| Attributes/methods, `dtypes`, and schema screenshots | `work/lectures/PDFs/ics604-S26-lec03-EDA.pdf` p3-p6 | `work/lectures/Notebooks/ics604-03_eda.ipynb` (`dtypes`, methods, dtype diagram) | B | Covered |
| Axes, reduction direction, and summary statistics | `work/lectures/PDFs/ics604-S26-lec03-EDA.pdf` p7-p11 | `work/lectures/Notebooks/ics604-03_eda.ipynb` (`axis`, `mean`, `sum`, axis diagrams) | C | Covered |
| Missing values and counting | `work/lectures/PDFs/ics604-S26-lec03-EDA.pdf` p12-p15 | `work/lectures/Notebooks/ics604-03_eda.ipynb` (`isna`, `count`) | D | Covered |
| `info`, sorting, chaining | `work/lectures/PDFs/ics604-S26-lec03-EDA.pdf` p17-p21 | `work/lectures/Notebooks/ics604-03_eda.ipynb` (`info`, sorting, chaining) | E | Covered |
| Basic plotting with Pandas and quick-EDA plot outputs | `work/lectures/PDFs/ics604-S26-lec03-EDA.pdf` p22-p25 | `work/lectures/Notebooks/ics604-03_eda.ipynb`, `work/lectures/Notebooks/exercise_eda-sol.ipynb` | F | Covered |
| Exercise reference | `work/lectures/PDFs/ics604-S26-lec03-EDA.pdf` p26 | `work/lectures/Notebooks/exercise_eda-sol.ipynb` (available); exercise_eda.ipynb not found in repo | F | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec03-EDA.pdf`
- Notebook sources: `work/lectures/Notebooks/ics604-03_eda.ipynb`, `work/lectures/Notebooks/exercise_eda-sol.ipynb`
- Notebook availability note: exercise_eda.ipynb is referenced in slides but is not present in `work/lectures/Notebooks`

