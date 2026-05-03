# Lecture 5: Data Preparation + Cleaning

### Quick Overview
- Lecture 5 is about cleaning messy data before analysis. It covers datatype correction, string cleaning, detecting and counting missing values, filtering incomplete rows, and filling missing values in principled ways. [PDF: ics604-S26-lec05-DataPrep.pdf p2-p24]
- The lecture treats cleaning as a prerequisite to valid analysis: if types, labels, or missingness are handled poorly, then summaries and models built later can be misleading. [PDF: ics604-S26-lec05-DataPrep.pdf p2-p24]

#### In Layman's Terms
- This lecture says you cannot trust analysis built on messy input. Before computing anything important, make sure columns have the right type, text values are standardized, and blank cells are either removed or filled sensibly. [PDF: ics604-S26-lec05-DataPrep.pdf p2-p24]

### A. Lecture Scope: Cleaning Before Analysis
- The lecture focuses on data preparation tasks: dtype correction, string normalization, and missing-value handling. [PDF: ics604-S26-lec05-DataPrep.pdf p2]
- It frames cleaning as essential to avoid invalid statistics and downstream modeling errors. [PDF: ics604-S26-lec05-DataPrep.pdf p2]

#### In Layman's Terms
- If your raw table is messy, every later result can be misleading. [PDF: ics604-S26-lec05-DataPrep.pdf p2]
- Example: numbers stored as text cannot be averaged correctly until converted. [PDF: ics604-S26-lec05-DataPrep.pdf p2]

#### Language Bridge
- This is equivalent to request-data sanitization in backend applications before business logic runs. [PDF: ics604-S26-lec05-DataPrep.pdf p2]
- PHP analogy: validate and normalize payload fields before writing to DB or computing metrics. [PDF: ics604-S26-lec05-DataPrep.pdf p2]

### B. Inspecting and Correcting Data Types
- Slides revisit `dtypes` inspection and identify misclassified columns (for example IDs and spending values). [PDF: ics604-S26-lec05-DataPrep.pdf p3-p4, p12-p13]
- `astype()` is shown as non-in-place; reassignment is required to persist changes. [PDF: ics604-S26-lec05-DataPrep.pdf p3-p4, p12-p13]
- Type conversion constraints are emphasized (for example cannot cast incompatible values directly). [PDF: ics604-S26-lec05-DataPrep.pdf p3-p4, p12-p13]

#### In Layman's Terms
- You must confirm each column has the right type, not just the right-looking values. [PDF: ics604-S26-lec05-DataPrep.pdf p3-p4, p12-p13]
- Example: `"3454420.29"` must become numeric before arithmetic is safe. [PDF: ics604-S26-lec05-DataPrep.pdf p3-p4, p12-p13]

#### Language Bridge

### C. String Cleaning with `.str` and Method Chaining
- The lecture uses `.str` for vectorized string operations on Series of text-like values. [PDF: ics604-S26-lec05-DataPrep.pdf p5-p7]
- `replace()` is used to remove symbols such as `$` and commas from numeric-text fields. [PDF: ics604-S26-lec05-DataPrep.pdf p5-p7]
- The `.str.upper()` sketch emphasizes that `.str` methods act elementwise on every string in the Series, not on the whole column as one giant string. [PDF: ics604-S26-lec05-DataPrep.pdf p5-p7]
- Chaining is presented as a compact, maintainable pattern for multi-step cleaning. [PDF: ics604-S26-lec05-DataPrep.pdf p5-p7]

#### In Layman's Terms
- Clean text noise first, then convert to the target numeric type. [PDF: ics604-S26-lec05-DataPrep.pdf p5-p7]
- Example: `"$3,454,420.29"` must become `"3454420.29"` before casting. [PDF: ics604-S26-lec05-DataPrep.pdf p5-p7]

#### Language Bridge

### D. Missing Data: Sources, Detection, and Counting
- Slides describe practical causes of missingness and why sentinel values must be standardized. [PDF: ics604-S26-lec05-DataPrep.pdf p8-p11]
- Detection methods include `isnull`/`isna` and counting via boolean sums. [PDF: ics604-S26-lec05-DataPrep.pdf p8-p11]
- The lecture warns that missing values can bias summaries if untreated. [PDF: ics604-S26-lec05-DataPrep.pdf p8-p11]

#### In Layman's Terms
- Missing values are not just empty cells; they can be hidden placeholders that must be recognized. [PDF: ics604-S26-lec05-DataPrep.pdf p8-p11]
- Example: a sentinel like `"NOVAL"` should be converted to `NaN` before averaging. [PDF: ics604-S26-lec05-DataPrep.pdf p8-p11]

#### Language Bridge
- Similar to handling `null` plus placeholder strings in PHP datasets. [PDF: ics604-S26-lec05-DataPrep.pdf p8-p11]

### E. Filtering Missing Values (`dropna` and Masks)
- The lecture presents dropping rows/columns with missing values as the simplest strategy. [PDF: ics604-S26-lec05-DataPrep.pdf p14-p16]
- `dropna` options (`axis`, `subset`) are highlighted for targeted removal. [PDF: ics604-S26-lec05-DataPrep.pdf p14-p16]
- The `dropna` axis diagram makes the choice concrete: `axis=0` removes rows containing missing values, while `axis=1` removes entire columns that violate the completeness rule. [PDF: ics604-S26-lec05-DataPrep.pdf p14-p16]
- It emphasizes that dropping data is a judgment call and can introduce bias. [PDF: ics604-S26-lec05-DataPrep.pdf p14-p16]

#### In Layman's Terms
- Removing incomplete rows is easy, but you might throw away too much information. [PDF: ics604-S26-lec05-DataPrep.pdf p14-p16]
- Example: dropping 5 bad rows out of 1 million is usually acceptable; dropping 30 percent is not. [PDF: ics604-S26-lec05-DataPrep.pdf p14-p16]

#### Language Bridge
- This maps to filtering arrays/records by completeness rules before processing. [PDF: ics604-S26-lec05-DataPrep.pdf p14-p16]

### F. Imputation with `fillna`, Dynamic Values, `ffill`, and `bfill`
- Slides show static imputation with constants and column-specific dictionaries. [PDF: ics604-S26-lec05-DataPrep.pdf p17-p18, p21, p24]
- They also describe dynamic imputation based on existing data (for example representative statistics). [PDF: ics604-S26-lec05-DataPrep.pdf p17-p18, p21, p24]
- Time-ordered fill methods (`ffill`, `bfill`) are presented, plus mention of model-based strategies. [PDF: ics604-S26-lec05-DataPrep.pdf p17-p18, p21, p24]

#### In Layman's Terms
- Instead of deleting missing values, you can estimate them using sensible replacements. [PDF: ics604-S26-lec05-DataPrep.pdf p17-p18, p21, p24]
- Example: fill a missing timepoint with the nearest known value before/after it. [PDF: ics604-S26-lec05-DataPrep.pdf p17-p18, p21, p24]

#### Language Bridge
- PHP equivalent would require manual passes over the array for forward/backward propagation. [PDF: ics604-S26-lec05-DataPrep.pdf p17-p18, p21, p24]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Cleaning scope and objectives | `work/lectures/PDFs/ics604-S26-lec05-DataPrep.pdf` p2 | `work/lectures/Notebooks/ics604-05_data_prep_and_cleaning.ipynb` (overview cells) | A | Covered |
| Dtype inspection and `astype` behavior | `work/lectures/PDFs/ics604-S26-lec05-DataPrep.pdf` p3-p4, p12-p13 | `work/lectures/Notebooks/ics604-05_data_prep_and_cleaning.ipynb` (`dtypes`, `astype`) | B | Covered |
| `.str` operations, elementwise string diagrams, and chaining | `work/lectures/PDFs/ics604-S26-lec05-DataPrep.pdf` p5-p7 | `work/lectures/Notebooks/ics604-05_data_prep_and_cleaning.ipynb` (string cleanup cells, `.str` diagram) | C | Covered |
| Missingness causes and detection | `work/lectures/PDFs/ics604-S26-lec05-DataPrep.pdf` p8-p11 | `work/lectures/Notebooks/ics604-05_data_prep_and_cleaning.ipynb` (`isna`, counts) | D | Covered |
| Filtering with `dropna` and row-vs-column axis behavior | `work/lectures/PDFs/ics604-S26-lec05-DataPrep.pdf` p14-p16 | `work/lectures/Notebooks/ics604-05_data_prep_and_cleaning.ipynb` (`dropna` usage, axis diagram) | E | Covered |
| Imputation strategies | `work/lectures/PDFs/ics604-S26-lec05-DataPrep.pdf` p17-p18, p21, p24 | `work/lectures/Notebooks/ics604-05_data_prep_and_cleaning.ipynb`, `work/lectures/Notebooks/exercise_data_clean_prep_sol.ipynb` | F | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec05-DataPrep.pdf`
- Notebook sources: `work/lectures/Notebooks/ics604-05_data_prep_and_cleaning.ipynb`, `work/lectures/Notebooks/exercise_data_clean_prep_sol.ipynb`
- Notebook availability note: exercise_data_clean_prep.ipynb is referenced on the lecture exercise slide (`work/lectures/PDFs/ics604-S26-lec05-DataPrep.pdf` p24) but is not present in `work/lectures/Notebooks`

