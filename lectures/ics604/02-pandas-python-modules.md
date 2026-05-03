# Lecture 2: Pandas + Python Modules

### Quick Overview
- Lecture 2 starts with Python organization fundamentals: modules, packages, import syntax, aliasing conventions, and the difference between standard-library and third-party code. [PDF: ics604-S26-lec02-Pandas.pdf p2-p12]
- It then pivots to Pandas as the course's main table-wrangling library, introducing `Series`, `DataFrame`, label- and position-based indexing, and the workflow for reading tabular data and inspecting it for the first time. [PDF: ics604-S26-lec02-Pandas.pdf p13-p31]

#### In Layman's Terms
- This lecture teaches two practical foundations: how Python code is organized into reusable files and how Pandas lets you load and work with spreadsheet-like data tables in code. [PDF: ics604-S26-lec02-Pandas.pdf p2-p31]

### A. Python Modules and Packages
- The lecture defines a module as a single Python file and a package as a structured collection of modules. [PDF: ics604-S26-lec02-Pandas.pdf p2-p3]
- It motivates modular design for separation of concerns and code reuse. [PDF: ics604-S26-lec02-Pandas.pdf p2-p3]
- It distinguishes standard-library modules from third-party packages. [PDF: ics604-S26-lec02-Pandas.pdf p2-p3]

#### In Layman's Terms
- A module is one toolbox; a package is a toolbox shelf with related toolboxes. [PDF: ics604-S26-lec02-Pandas.pdf p2-p3]
- Example: you keep customer analytics and freight analytics in separate modules instead of one giant script. [PDF: ics604-S26-lec02-Pandas.pdf p2-p3]

#### Language Bridge
- Python module/package organization is similar to PHP namespace folders under Composer autoloading. [PDF: ics604-S26-lec02-Pandas.pdf p2-p3]

### B. Import Syntax and Aliasing Conventions
- The lecture shows `import module` and selective import patterns. [PDF: ics604-S26-lec02-Pandas.pdf p4-p6]
- It warns against wildcard imports because they reduce clarity and can cause name collisions. [PDF: ics604-S26-lec02-Pandas.pdf p4-p6]
- It emphasizes aliases for common libraries (`pd`, `np`, `plt`, `sns`). [PDF: ics604-S26-lec02-Pandas.pdf p4-p6]

#### In Layman's Terms
- Aliases are short nicknames that make code easier to read and type. [PDF: ics604-S26-lec02-Pandas.pdf p4-p6]
- Example: `pd.read_csv(...)` is cleaner than repeatedly typing the full library name. [PDF: ics604-S26-lec02-Pandas.pdf p4-p6]

#### Language Bridge
- Python aliasing has the same maintainability goal as explicit class imports in PHP/JS. [PDF: ics604-S26-lec02-Pandas.pdf p4-p6]

### C. Types of Packages in Practice
- Slides separate package sources into: [PDF: ics604-S26-lec02-Pandas.pdf p7-p8]
- standard library (ships with Python), [PDF: ics604-S26-lec02-Pandas.pdf p7-p8]
- commonly bundled third-party libraries, [PDF: ics604-S26-lec02-Pandas.pdf p7-p8]
- manually installed specialized libraries. [PDF: ics604-S26-lec02-Pandas.pdf p7-p8]
- This distinction is presented to help students diagnose import/setup issues. [PDF: ics604-S26-lec02-Pandas.pdf p7-p8]

#### In Layman's Terms
- Some tools are in the box by default, some come in common bundles, and some you install separately. [PDF: ics604-S26-lec02-Pandas.pdf p7-p8]
- Example: if a package is not installed, import fails even if the code syntax is correct. [PDF: ics604-S26-lec02-Pandas.pdf p7-p8]

#### Language Bridge
- Comparable to PHP built-ins vs Composer dependencies: [PDF: ics604-S26-lec02-Pandas.pdf p7-p8]
- built-ins: no install needed, [PDF: ics604-S26-lec02-Pandas.pdf p7-p8]
- Composer packages: must be listed and installed. [PDF: ics604-S26-lec02-Pandas.pdf p7-p8]

### D. Why Pandas and the Wrangling Workflow
- The lecture frames Pandas as the primary table-processing tool for data wrangling. [PDF: ics604-S26-lec02-Pandas.pdf p9-p10]
- It describes a typical workflow: read data, clean data, merge sources, and prepare for analysis. [PDF: ics604-S26-lec02-Pandas.pdf p9-p10]
- The architecture diagram places Pandas above numerical computing, data visualization, and data-manipulation tasks, reinforcing that it acts as the table-centric hub of the course workflow rather than a single-purpose CSV reader. [PDF: ics604-S26-lec02-Pandas.pdf p9-p10]
- A flight-delay example is used to motivate end-to-end transformations before inference. [PDF: ics604-S26-lec02-Pandas.pdf p9-p10]

#### In Layman's Terms
- Pandas is the "workbench" where messy files become analysis-ready tables. [PDF: ics604-S26-lec02-Pandas.pdf p9-p10]
- Example: combine two airline tables, fix inconsistent formats, then compute delay summaries. [PDF: ics604-S26-lec02-Pandas.pdf p9-p10]

#### Language Bridge
- Pandas wrangling is similar to chained query/transformation steps in backend code. [PDF: ics604-S26-lec02-Pandas.pdf p9-p10]

### E. Core Data Structures: Series and DataFrame
- The lecture introduces `Series` as labeled 1D data and `DataFrame` as a table of aligned Series. [PDF: ics604-S26-lec02-Pandas.pdf p11-p15]
- It notes type consistency behavior and index-label importance for downstream operations. [PDF: ics604-S26-lec02-Pandas.pdf p11-p15]
- The notebook diagrams make the bidirectional structure explicit: a DataFrame can be understood as aligned column Series, but an individual row can also be read back as a Series once labels are fixed. [PDF: ics604-S26-lec02-Pandas.pdf p11-p15]
- Examples use Series as spreadsheet-like rows/columns and DataFrame as tabular container. [PDF: ics604-S26-lec02-Pandas.pdf p11-p15]

#### In Layman's Terms
- A Series is one labeled list; a DataFrame is many labeled lists aligned into a table. [PDF: ics604-S26-lec02-Pandas.pdf p11-p15]
- Example: one Series can represent `spending`, another `beneficiaries`, and DataFrame combines both. [PDF: ics604-S26-lec02-Pandas.pdf p11-p15]

#### Language Bridge
- `Series` maps loosely to associative arrays keyed by index label. [PDF: ics604-S26-lec02-Pandas.pdf p11-p15]
- `DataFrame` maps to an array of associative rows, but with explicit index and vectorized operations. [PDF: ics604-S26-lec02-Pandas.pdf p11-p15]

### F. Indexing and Subsetting (`iloc`, `loc`, Column Labels)
- Position-based access is done with `iloc`. [PDF: ics604-S26-lec02-Pandas.pdf p16-p18, p22-p28]
- Label-based access is done with `loc`. [PDF: ics604-S26-lec02-Pandas.pdf p16-p18, p22-p28]
- Column selection by label returns either Series or DataFrame depending on single vs multiple labels. [PDF: ics604-S26-lec02-Pandas.pdf p16-p18, p22-p28]
- Label-range slicing behavior is explicitly discussed in slides. [PDF: ics604-S26-lec02-Pandas.pdf p16-p18, p22-p28]

#### In Layman's Terms
- `iloc` means "by row/column number"; `loc` means "by row/column name." [PDF: ics604-S26-lec02-Pandas.pdf p16-p18, p22-p28]
- Example: use `loc["AV967778"]` when you know row ID, not row position. [PDF: ics604-S26-lec02-Pandas.pdf p16-p18, p22-p28]

#### Language Bridge
- This resembles keyed vs positional access in PHP arrays. [PDF: ics604-S26-lec02-Pandas.pdf p16-p18, p22-p28]

### G. Reading Tables and Initial Inspection
- Slides show DataFrame creation from files (for example CSV). [PDF: ics604-S26-lec02-Pandas.pdf p19, p30-p31]
- They highlight `shape` for dimensions and `head`/`tail` for quick inspection. [PDF: ics604-S26-lec02-Pandas.pdf p19, p30-p31]
- The dataset screenshots make the working schema concrete: `unique_id`, `doctor_id`, `specialty`, `medication`, `nb_beneficiaries`, and `spending`, with optional custom row labels replacing the default integer index. [PDF: ics604-S26-lec02-Pandas.pdf p19, p30-p31]
- They also show reading with explicit index columns when needed. [PDF: ics604-S26-lec02-Pandas.pdf p19, p30-p31]

#### In Layman's Terms
- First step with new data is always: load it, confirm dimensions, and peek at top/bottom rows. [PDF: ics604-S26-lec02-Pandas.pdf p19, p30-p31]
- Example: if `shape` is unexpectedly small, your input file or delimiter may be wrong. [PDF: ics604-S26-lec02-Pandas.pdf p19, p30-p31]

#### Language Bridge
- PHP equivalent workflow is usually custom CSV parsing plus manual preview logging. [PDF: ics604-S26-lec02-Pandas.pdf p19, p30-p31]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Modules and packages intro | `work/lectures/PDFs/ics604-S26-lec02-Pandas.pdf` p2-p3 | `work/lectures/Notebooks/ics604-02_intro_to_pandas.ipynb` (module import cells) | A | Covered |
| Import syntax and aliasing | `work/lectures/PDFs/ics604-S26-lec02-Pandas.pdf` p4-p6 | `work/lectures/Notebooks/ics604-02_intro_to_pandas.ipynb` (`import ... as ...`) | B | Covered |
| Package types | `work/lectures/PDFs/ics604-S26-lec02-Pandas.pdf` p7-p8 | `work/lectures/Notebooks/ics604-02_intro_to_pandas.ipynb` (environment usage) | C | Covered |
| Why Pandas/workflow and architecture diagram | `work/lectures/PDFs/ics604-S26-lec02-Pandas.pdf` p9-p10 | `work/lectures/Notebooks/ics604-02_intro_to_pandas.ipynb` (wrangling setup, architecture diagram) | D | Covered |
| Series/DataFrame core types and row/column-as-Series diagrams | `work/lectures/PDFs/ics604-S26-lec02-Pandas.pdf` p11-p15 | `work/lectures/Notebooks/ics604-02_intro_to_pandas.ipynb` (Series/DataFrame creation, structure diagrams) | E | Covered |
| `iloc`, `loc`, and subsetting | `work/lectures/PDFs/ics604-S26-lec02-Pandas.pdf` p16-p18, p22-p28 | `work/lectures/Notebooks/ics604-02_intro_to_pandas.ipynb` (`iloc`/`loc` examples) | F | Covered |
| File reading, schema screenshots, and custom-index inspection | `work/lectures/PDFs/ics604-S26-lec02-Pandas.pdf` p19, p30-p31 | `work/lectures/Notebooks/ics604-02_intro_to_pandas.ipynb` (`read_csv`, `head`, dataset/index diagrams) | G | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec02-Pandas.pdf`
- Notebook source: `work/lectures/Notebooks/ics604-02_intro_to_pandas.ipynb`

