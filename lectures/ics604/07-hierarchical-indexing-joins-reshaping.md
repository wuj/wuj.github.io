# Lecture 7: Hierarchical Indexing + Joins/Reshaping

### Quick Overview
- Lecture 7 extends the grouped-data material into table structure management. It introduces MultiIndex ideas, stacked versus unstacked layouts, changing index levels, and reshaping tables across hierarchical dimensions. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p2-p31]
- It then turns to combining datasets with `merge`, index-based joins, `concat`, and `combine_first`, so the lecture is fundamentally about reorganizing and combining related data without losing meaning. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p32-p48]

#### In Layman's Terms
- This lecture is about making complex tables manageable: using multi-part labels when one label is not enough, reshaping data between wide and tall forms, and joining related tables together correctly. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p2-p48]

### A. Continuation: Thinning Groups
- Lecture 7 starts by continuing group-level thinning ideas from Lecture 6. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p2-p3]
- It reinforces reducing within-group rows for focused analysis and balanced subsets. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p2-p3]

#### In Layman's Terms
- Before combining datasets, you may trim each category to the most relevant entries. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p2-p3]
- Example: keep top items per specialty before making larger joined reports. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p2-p3]

#### Language Bridge
- This resembles pre-join pruning in backend pipelines to reduce memory and noise. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p2-p3]
- In PHP, this is often implemented by sorting grouped arrays and slicing. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p2-p3]

### B. Hierarchical Indexing (MultiIndex) Concepts
- The lecture introduces MultiIndex as multiple index levels on an axis. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p8, p12]
- It clarifies that hierarchy can apply to rows and columns. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p8, p12]
- The notebook sketch makes this visual: row labels can be multi-level, and column headers can be nested in the same way, so hierarchy is not limited to only one side of the table. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p8, p12]
- It connects hierarchical indexing to real data collection structures. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p8, p12]

#### In Layman's Terms
- MultiIndex is like using a two-part label instead of a single label. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p8, p12]
- Example: `("Hawaii", "2024")` is richer than only `"Hawaii"` as an index key. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p8, p12]

#### Language Bridge
- Similar to composite keys in databases or nested associative keys in PHP arrays. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p8, p12]

### C. Stacked vs Unstacked Representations
- Slides discuss stacked/unstacked forms and why stacked representations appear naturally in many collection pipelines. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p11]
- The lecture uses `stack()`/`unstack()` style reshaping to move between compact and wide layouts. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p11]
- The stacking diagram shows the exact move: column labels are pushed into an inner row-index level, turning one wide table into a longer series-like representation. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p11]

#### In Layman's Terms
- Stacked = long format; unstacked = wide format. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p11]
- Example: one row per `(patient, measurement_type)` can be unstacked to one row per patient with many measurement columns. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p11]

#### Language Bridge
- Comparable to pivot/unpivot operations in SQL reporting. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p11]
- Python gives direct table-shape transforms without writing custom loops. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p11]

### D. Creating, Reordering, and Aggregating by Levels
- MultiIndex can be created and assigned to index/columns when dimensions are compatible. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p15, p17, p20]
- `swaplevel` and level-based sorting reorder hierarchy for analysis convenience. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p15, p17, p20]
- Level-wise summaries use `groupby(level=...)`. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p15, p17, p20]

#### In Layman's Terms
- You can reorder hierarchy when your analysis question changes. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p15, p17, p20]
- Example: switch from grouping by specialty-then-drug to drug-then-specialty. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p15, p17, p20]

#### Language Bridge
- This is analogous to changing primary grouping keys in report generation code. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p15, p17, p20]

### E. `set_index()` and `reset_index()`
- The lecture covers promoting one or more columns to index with `set_index`. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p21]
- It also covers flattening back to ordinary columns with `reset_index`. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p21]
- This is presented as routine table-shape management during wrangling. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p21]

#### In Layman's Terms
- Promote columns to index when labels should drive selection/joins; reset when you need flat export-ready tables. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p21]
- Example: use index for reliable keyed merge, then reset for CSV output. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p21]

#### Language Bridge
- Similar to choosing key fields in an associative structure, then flattening before API response serialization. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p21]

### F. Joins with `merge`: Keys, Types, and Collisions
- Lecture introduces SQL-style joins with `merge`. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p24-p35]
- It covers `on`, `left_on`, `right_on`, default inner join behavior, and other join types. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p24-p35]
- It also explains how suffixes avoid column-name collisions. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p24-p35]

#### In Layman's Terms
- Join merges related tables using shared identifiers. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p24-p35]
- Example: if keys do not match between tables, unmatched rows may disappear in inner join output. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p24-p35]

#### Language Bridge
- This directly maps to SQL join semantics developers already know. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p24-p35]

### G. Index-Based Merge, `concat`, and `combine_first`
- Slides show merges on indexes, including hierarchical index merges. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p35-p42, p48]
- They cover concatenation along axes and creating hierarchical labels with `keys=`. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p35-p42, p48]
- `combine_first` is presented for overlap-aware value selection. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p35-p42, p48]

#### In Layman's Terms
- `concat` stacks pieces together; `combine_first` fills holes in one table using another. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p35-p42, p48]
- Example: keep trusted values from table A, and use table B only where A is missing. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p35-p42, p48]

#### Language Bridge
- `combine_first` behavior is similar to coalescing fallback values. [PDF: ics604-S26-lec07-HierarchicalIndexing_Join.pdf p35-p42, p48]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Thinning continuation | `work/lectures/PDFs/ics604-S26-lec07-HierarchicalIndexing_Join.pdf` p2-p3 | `work/lectures/Notebooks/ics604-07-1_hierarchical_indexes.ipynb` (carryover workflows) | A | Covered |
| MultiIndex fundamentals and nested-axis diagram | `work/lectures/PDFs/ics604-S26-lec07-HierarchicalIndexing_Join.pdf` p8, p12 | `work/lectures/Notebooks/ics604-07-1_hierarchical_indexes.ipynb` (MultiIndex setup and axis sketch) | B | Covered |
| Stacked vs unstacked data and `stack` reshape diagram | `work/lectures/PDFs/ics604-S26-lec07-HierarchicalIndexing_Join.pdf` p11 | `work/lectures/Notebooks/ics604-07-1_hierarchical_indexes.ipynb` (`stack`/`unstack`, stacking diagram) | C | Covered |
| Create/reorder/group by level | `work/lectures/PDFs/ics604-S26-lec07-HierarchicalIndexing_Join.pdf` p15, p17, p20 | `work/lectures/Notebooks/ics604-07-1_hierarchical_indexes.ipynb` | D | Covered |
| `set_index` / `reset_index` | `work/lectures/PDFs/ics604-S26-lec07-HierarchicalIndexing_Join.pdf` p21 | `work/lectures/Notebooks/ics604-07-1_hierarchical_indexes.ipynb` | E | Covered |
| Merge keys/types/suffixes | `work/lectures/PDFs/ics604-S26-lec07-HierarchicalIndexing_Join.pdf` p24-p35 | `work/lectures/Notebooks/ics604-07-2_joining_data.ipynb` (`merge` variants) | F | Covered |
| Index merge, concat, combine_first | `work/lectures/PDFs/ics604-S26-lec07-HierarchicalIndexing_Join.pdf` p35-p42, p48 | `work/lectures/Notebooks/ics604-07-2_joining_data.ipynb` (`concat`, `combine_first`) | G | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec07-HierarchicalIndexing_Join.pdf`
- Notebook sources: `work/lectures/Notebooks/ics604-07-1_hierarchical_indexes.ipynb`, `work/lectures/Notebooks/ics604-07-2_joining_data.ipynb`

