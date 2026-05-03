# Lecture 6: GroupBy + Split-Apply-Combine

### Quick Overview
- Lecture 6 introduces grouped analysis with `groupby()` and the split-apply-combine pattern. It covers aggregation, transformation, MultiIndex-shaped results, and techniques for filtering, thinning, or subsampling groups. [PDF: ics604-S26-lec06-Groupby.pdf p2-p34]
- The big idea is that many analytical questions are really "do the same computation separately for each category," and Pandas has a structured workflow for that. [PDF: ics604-S26-lec06-Groupby.pdf p2-p34]

#### In Layman's Terms
- This lecture shows how to break one big table into smaller labeled buckets, compute something inside each bucket, and then put the results back together in a useful form. [PDF: ics604-S26-lec06-Groupby.pdf p2-p34]

### A. `groupby()` and Grouped Data Objects
- The lecture defines `groupby()` as grouping rows by one or more columns and returning a `DataFrameGroupBy` object. [PDF: ics604-S26-lec06-Groupby.pdf p2-p4]
- It emphasizes that this object is not a regular DataFrame and is designed for group-level operations. [PDF: ics604-S26-lec06-Groupby.pdf p2-p4]
- The introductory diagram depicts that grouped object as a mapping from each group label to its corresponding row subset, which matches notebook use of `groups` and `get_group(...)`. [PDF: ics604-S26-lec06-Groupby.pdf p2-p4]

#### In Layman's Terms
- `groupby` means "break table into labeled buckets before computing anything." [PDF: ics604-S26-lec06-Groupby.pdf p2-p4]
- Example: group prescriptions by specialty, then analyze each specialty separately. [PDF: ics604-S26-lec06-Groupby.pdf p2-p4]

#### Language Bridge
- Comparable to SQL `GROUP BY` workflow from application code. [PDF: ics604-S26-lec06-Groupby.pdf p2-p4]
- PHP often delegates this to SQL, or manual grouping in associative arrays. [PDF: ics604-S26-lec06-Groupby.pdf p2-p4]

### B. Split-Apply-Combine Paradigm
- The lecture explicitly frames grouped analysis as: [PDF: ics604-S26-lec06-Groupby.pdf p5-p6]
- split data into groups, [PDF: ics604-S26-lec06-Groupby.pdf p5-p6]
- apply group-specific logic, [PDF: ics604-S26-lec06-Groupby.pdf p5-p6]
- combine outputs. [PDF: ics604-S26-lec06-Groupby.pdf p5-p6]
- The workflow figure also makes the row-count consequence visible: combine may return one summary row per group or a row-preserving result depending on what the apply step does. [PDF: ics604-S26-lec06-Groupby.pdf p5-p6]
- This pattern is presented as a core data-wrangling strategy. [PDF: ics604-S26-lec06-Groupby.pdf p5-p6]

#### In Layman's Terms
- First separate by category, then process each category, then reassemble results. [PDF: ics604-S26-lec06-Groupby.pdf p5-p6]
- Example: compute one summary row per specialty and return one combined table. [PDF: ics604-S26-lec06-Groupby.pdf p5-p6]

#### Language Bridge
- This is analogous to: [PDF: ics604-S26-lec06-Groupby.pdf p5-p6]
- `groupBy` in JS collection libraries, [PDF: ics604-S26-lec06-Groupby.pdf p5-p6]
- then `map/reduce`, [PDF: ics604-S26-lec06-Groupby.pdf p5-p6]
- then merging results into one structure. [PDF: ics604-S26-lec06-Groupby.pdf p5-p6]

### C. Aggregation and `agg()` Variants
- Aggregation is defined as reducing each group to one or more summary values. [PDF: ics604-S26-lec06-Groupby.pdf p11, p13-p15]
- Slides show built-in group summaries and custom logic through `agg()`. [PDF: ics604-S26-lec06-Groupby.pdf p11, p13-p15]
- `agg()` flexibility includes functions, lists of functions, and per-column dictionaries. [PDF: ics604-S26-lec06-Groupby.pdf p11, p13-p15]

#### In Layman's Terms
- Aggregation compresses each bucket into key numbers like sum, mean, and count. [PDF: ics604-S26-lec06-Groupby.pdf p11, p13-p15]
- Example: total spending per specialty is one value per specialty group. [PDF: ics604-S26-lec06-Groupby.pdf p11, p13-p15]

#### Language Bridge
- SQL analogy is direct: [PDF: ics604-S26-lec06-Groupby.pdf p11, p13-p15]
- Python `agg()` mirrors this without writing raw SQL. [PDF: ics604-S26-lec06-Groupby.pdf p11, p13-p15]

### D. Transformations (`transform`) and Group-Normalized Metrics
- Transformations are contrasted with aggregations by preserving group size. [PDF: ics604-S26-lec06-Groupby.pdf p7-p8, p16-p19]
- The lecture example computes within-group percentage contribution. [PDF: ics604-S26-lec06-Groupby.pdf p7-p8, p16-p19]
- The transformation diagrams highlight that `transform` must return one value per original row, which is why it is the right tool for group-normalized metrics instead of collapse-to-summary output. [PDF: ics604-S26-lec06-Groupby.pdf p7-p8, p16-p19]
- It also discusses multi-column grouping when one grouping variable is insufficient. [PDF: ics604-S26-lec06-Groupby.pdf p7-p8, p16-p19]

#### In Layman's Terms
- Transformation keeps every original row but adds group-aware recalculated values. [PDF: ics604-S26-lec06-Groupby.pdf p7-p8, p16-p19]
- Example: each doctor's spending becomes a percent of that specialty's total. [PDF: ics604-S26-lec06-Groupby.pdf p7-p8, p16-p19]

#### Language Bridge
- This is like adding derived fields in each grouped record after calculating group totals. [PDF: ics604-S26-lec06-Groupby.pdf p7-p8, p16-p19]

### E. MultiIndex Outcomes and Index Management
- Grouping by multiple columns creates MultiIndex outputs. [PDF: ics604-S26-lec06-Groupby.pdf p21, p23]
- Tuple-based indexing and `reset_index()` are highlighted for working with these results. [PDF: ics604-S26-lec06-Groupby.pdf p21, p23]
- The MultiIndex diagram shows the grouped result as a compound-key structure, where outer and inner labels often need to be flattened back into columns before export or plotting. [PDF: ics604-S26-lec06-Groupby.pdf p21, p23]
- The lecture notes when flattening index levels improves usability. [PDF: ics604-S26-lec06-Groupby.pdf p21, p23]

#### In Layman's Terms
- MultiIndex is like a compound key (for example specialty + drug) on grouped output. [PDF: ics604-S26-lec06-Groupby.pdf p21, p23]
- Example: reset index when you need a flat table for export or plotting. [PDF: ics604-S26-lec06-Groupby.pdf p21, p23]

#### Language Bridge
- Comparable to composite keys in relational systems. [PDF: ics604-S26-lec06-Groupby.pdf p21, p23]

### F. Filtering, Thinning, and Subsampling Groups
- `filter()` keeps/drops whole groups based on boolean criteria. [PDF: ics604-S26-lec06-Groupby.pdf p9-p10, p25, p27, p29]; [PDF: ics604-S26-lec06-Groupby.pdf p34]
- Thinning reduces entries inside each group without necessarily collapsing to one row. [PDF: ics604-S26-lec06-Groupby.pdf p9-p10, p25, p27, p29]; [PDF: ics604-S26-lec06-Groupby.pdf p34]
- The four-operation diagram distinguishes `aggregate`, `transform`, `filter`, and `thin` by what survives the apply step: one row per group, one row per input row, whole-group keep/drop, or reduced within-group subsets. [PDF: ics604-S26-lec06-Groupby.pdf p9-p10, p25, p27, p29]; [PDF: ics604-S26-lec06-Groupby.pdf p34]
- Subsampling via `sample()` is presented for balanced-data workflows. [PDF: ics604-S26-lec06-Groupby.pdf p9-p10, p25, p27, p29]; [PDF: ics604-S26-lec06-Groupby.pdf p34]

#### In Layman's Terms
- Filter decides which groups survive; thinning decides how many rows to keep inside each surviving group. [PDF: ics604-S26-lec06-Groupby.pdf p9-p10, p25, p27, p29]; [PDF: ics604-S26-lec06-Groupby.pdf p34]
- Example: keep only groups with enough samples, then keep top-N rows per group. [PDF: ics604-S26-lec06-Groupby.pdf p9-p10, p25, p27, p29]; [PDF: ics604-S26-lec06-Groupby.pdf p34]

#### Language Bridge
- Similar to: [PDF: ics604-S26-lec06-Groupby.pdf p9-p10, p25, p27, p29]; [PDF: ics604-S26-lec06-Groupby.pdf p34]
- filter group objects by aggregate condition, [PDF: ics604-S26-lec06-Groupby.pdf p9-p10, p25, p27, p29]; [PDF: ics604-S26-lec06-Groupby.pdf p34]
- then slice per-group arrays. [PDF: ics604-S26-lec06-Groupby.pdf p9-p10, p25, p27, p29]; [PDF: ics604-S26-lec06-Groupby.pdf p34]
- In PHP, this usually needs grouped arrays plus custom callback logic. [PDF: ics604-S26-lec06-Groupby.pdf p9-p10, p25, p27, p29]; [PDF: ics604-S26-lec06-Groupby.pdf p34]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| `groupby()` basics, object type, and group-mapping diagram | `work/lectures/PDFs/ics604-S26-lec06-Groupby.pdf` p2-p4 | `work/lectures/Notebooks/ics604-06_groupby.ipynb` (`groupby`, `get_group`, group diagram) | A | Covered |
| Split-Apply-Combine pattern and output-shape workflow | `work/lectures/PDFs/ics604-S26-lec06-Groupby.pdf` p5-p6 | `work/lectures/Notebooks/ics604-06_groupby.ipynb` (workflow structure diagrams) | B | Covered |
| Aggregation and `agg()` | `work/lectures/PDFs/ics604-S26-lec06-Groupby.pdf` p11, p13-p15 | `work/lectures/Notebooks/ics604-06_groupby.ipynb` (`agg` examples) | C | Covered |
| Transformations, normalized metrics, and row-preserving diagrams | `work/lectures/PDFs/ics604-S26-lec06-Groupby.pdf` p7-p8, p16-p19 | `work/lectures/Notebooks/ics604-06_groupby.ipynb` (`transform` examples/diagrams) | D | Covered |
| MultiIndex from multi-column grouping and flattening workflow | `work/lectures/PDFs/ics604-S26-lec06-Groupby.pdf` p21, p23 | `work/lectures/Notebooks/ics604-06_groupby.ipynb` (tuple access, `reset_index`, MultiIndex diagram) | E | Covered |
| Filtering/thinning/subsampling and operation-class diagrams | `work/lectures/PDFs/ics604-S26-lec06-Groupby.pdf` p9-p10, p25, p27, p29 | `work/lectures/Notebooks/ics604-06_groupby.ipynb`, `work/lectures/Notebooks/ex_babynames.ipynb` | F | Covered |
| Exercise prompt | `work/lectures/PDFs/ics604-S26-lec06-Groupby.pdf` p34 | `work/lectures/Notebooks/ex_babynames.ipynb` | F | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec06-Groupby.pdf`
- Notebook sources: `work/lectures/Notebooks/ics604-06_groupby.ipynb`, `work/lectures/Notebooks/ex_babynames.ipynb`

