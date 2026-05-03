# Lecture 4: Arithmetic Ops + Data Alignment

### Quick Overview
- Lecture 4 explains how NumPy and Pandas perform arithmetic on whole arrays and columns at once. The lecture covers vectorization, broadcasting, and alignment rules for `Series` and `DataFrame` operations. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p2-p14]
- It then extends that same elementwise mindset to comparisons and boolean masks, showing how arithmetic and logical conditions become the basis for filtering and preparation work. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p15-p22]

#### In Layman's Terms
- Instead of processing one value at a time, this lecture shows how to do math and filtering across entire columns or tables in one step, which is both faster and closer to how data science code is usually written. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p2-p22]

### A. Vectorization and Why It Matters
- The lecture defines vectorization as applying operations to collections at once instead of Python-level loops. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p2-p3]
- It emphasizes that Pandas arithmetic is vectorized because Pandas is built on NumPy arrays. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p2-p3]
- Performance motivation is explicit: vectorized operations are more efficient for analytical workloads. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p2-p3]

#### In Layman's Terms
- Instead of processing one cell at a time, vectorization processes whole columns in one operation. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p2-p3]
- Example: adding 1 to a million values in one call is much faster than iterating with a `for` loop. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p2-p3]

#### Language Bridge
- This is similar to preferring database set operations over row-by-row loops in PHP. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p2-p3]
- PHP row loop equivalent works, but does not get NumPy-style vectorized speed. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p2-p3]

### B. NumPy Foundations and Broadcasting Rules
- Slides introduce NumPy as the array engine behind scientific Python. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p4-p6]
- Broadcasting is presented as strict shape-compatibility rules for binary operations. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p4-p6]
- The broadcasting diagrams step from scalar expansion to reshaped row/column vectors, making it explicit that singleton dimensions introduced with `reshape(..., 1)` or `np.newaxis` are what allow repeated values to stretch across an array. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p4-p6]
- `np.newaxis` is shown for adding dimensions to make broadcasting feasible. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p4-p6]

#### In Layman's Terms
- Broadcasting is automatic shape matching so arrays of different sizes can still interact when rules allow. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p4-p6]
- Example: a single value can be stretched across a whole column during arithmetic. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p4-p6]

#### Language Bridge
- In PHP, you usually write explicit loops for this behavior. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p4-p6]

### C. Alignment in Series and DataFrame Arithmetic
- For Series arithmetic, labels are aligned by index first. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p7-p10]
- Resulting index is the union of labels; missing matches produce `NaN`. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p7-p10]
- The row/column alignment diagrams show that DataFrame arithmetic applies the same rule on both axes at once: Pandas forms the union of row labels and column labels, then leaves unmatched intersections as `NaN`. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p7-p10]
- DataFrame arithmetic extends the same alignment idea to both rows and columns. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p7-p10]

#### In Layman's Terms
- Pandas matches by names, not only by position. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p7-p10]
- Example: if one table has column `AA` and the other does not, the combined result for unmatched entries is missing. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p7-p10]

#### Language Bridge
- This is closer to keyed-merge behavior than raw positional array math. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p7-p10]
- PHP analogy: joining associative arrays by key before computing output values. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p7-p10]

### D. Scalar and Series-to-DataFrame Broadcasting
- Slides show scalar broadcasting to every element in Series/DataFrame operations. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p12-p14]
- They also show Series-to-DataFrame broadcasting with axis-alignment choices. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p12-p14]
- The core idea is explicit label-based alignment before applying arithmetic. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p12-p14]

#### In Layman's Terms
- A scalar is copied conceptually to every row; a Series is matched by labels and then applied. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p12-p14]
- Example: adding a row-wise adjustment Series to a DataFrame only works correctly when labels align. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p12-p14]

#### Language Bridge
- PHP equivalent usually requires nested loops plus manual key matching. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p12-p14]

### E. Comparison Operators and Conditional Subsetting
- Comparison operators produce boolean Series/DataFrames. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p15-p17]
- These booleans are used to filter rows and form SQL-like query behavior. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p15-p17]
- The filtering diagram makes the row-mask behavior concrete: a boolean Series aligned on the index keeps only rows whose mask entry is `True`. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p15-p17]
- The lecture highlights shape/label constraints for valid comparison operations. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p15-p17]

#### In Layman's Terms
- Comparisons turn data into True/False masks, then masks keep only rows you want. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p15-p17]
- Example: keep records where specialty is dentist and spending is below threshold. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p15-p17]

#### Language Bridge
- Very similar to filtering arrays with predicates: [PDF: ics604-S26-lec04-ArithmeticOps.pdf p15-p17]

### F. Boolean Logic in Pandas and Data-Prep Bridge
- Slides specify Pandas boolean operators (`&`, `|`, `~`) rather than Python `and/or/not` for vectorized masks. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p18-p22]
- The lecture ends by transitioning to data-preparation issues in a medical spending dataset (dtype and cleaning concerns). [PDF: ics604-S26-lec04-ArithmeticOps.pdf p18-p22]

#### In Layman's Terms
- For table-wide conditions, use symbol operators designed for element-wise boolean logic. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p18-p22]
- Example: combining two filter conditions requires parentheses around each condition. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p18-p22]

#### Language Bridge
- In PHP, this behavior is usually implemented row-by-row inside a callback predicate. [PDF: ics604-S26-lec04-ArithmeticOps.pdf p18-p22]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Vectorization motivation | `work/lectures/PDFs/ics604-S26-lec04-ArithmeticOps.pdf` p2-p3 | `work/lectures/Notebooks/ics604-04_1_arithmetic_ops_data_alignment.ipynb` (timing/vectorization cells) | A | Covered |
| Broadcasting rules, reshape intuition, and `np.newaxis` | `work/lectures/PDFs/ics604-S26-lec04-ArithmeticOps.pdf` p4-p6 | `work/lectures/Notebooks/ics604-04_1_arithmetic_ops_data_alignment.ipynb` (broadcasting diagrams/examples) | B | Covered |
| Series/DataFrame alignment and union-of-labels diagrams | `work/lectures/PDFs/ics604-S26-lec04-ArithmeticOps.pdf` p7-p10 | `work/lectures/Notebooks/ics604-04_1_arithmetic_ops_data_alignment.ipynb` (`df_1 + df_2`, alignment diagrams) | C | Covered |
| Scalar and Series-to-DataFrame broadcasting | `work/lectures/PDFs/ics604-S26-lec04-ArithmeticOps.pdf` p12-p14 | `work/lectures/Notebooks/ics604-04_1_arithmetic_ops_data_alignment.ipynb` (`add(..., axis=...)`) | D | Covered |
| Comparison and mask-based filtering diagrams | `work/lectures/PDFs/ics604-S26-lec04-ArithmeticOps.pdf` p15-p17 | `work/lectures/Notebooks/ics604-04_1_arithmetic_ops_data_alignment.ipynb` (boolean masking, filter diagram) | E | Covered |
| Boolean operators and prep bridge | `work/lectures/PDFs/ics604-S26-lec04-ArithmeticOps.pdf` p18-p22 | `work/lectures/Notebooks/ics604-04_1_arithmetic_ops_data_alignment.ipynb` (filtering + cleanup start) | F | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec04-ArithmeticOps.pdf`
- Notebook source: `work/lectures/Notebooks/ics604-04_1_arithmetic_ops_data_alignment.ipynb`

