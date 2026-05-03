# Lecture 1: Intro + Course Logistics

### Quick Overview
- Lecture 1 does two things at once: it explains how the course operates and it frames what data science is. The slides cover logistics, grading, policies, the DIKW pyramid, and the role of Python in the class's technical workflow. [PDF: ics604-S26-lec01-Intro.pdf p2-p13]
- It also positions data science as the overlap of programming, math/statistics, and domain knowledge, then previews the environment and toolchain students will use throughout the semester. [PDF: ics604-S26-lec01-Intro.pdf p5-p13]

#### In Layman's Terms
- This lecture is the class roadmap plus the big-picture definition of data science: how the course works, what kinds of thinking the field requires, and why Python is the main tool for turning raw data into useful conclusions. [PDF: ics604-S26-lec01-Intro.pdf p2-p13]

### A. Course Logistics, Grading, and Policies
- The lecture introduces instructor and TA contact information, office hours, and communication channels. [PDF: ics604-S26-lec01-Intro.pdf p2-p4]
- Grading structure is explicitly split across homework, participation, and final project components. [PDF: ics604-S26-lec01-Intro.pdf p2-p4]
- Submission policy emphasizes electronic submission and late-work restrictions unless approved in advance. [PDF: ics604-S26-lec01-Intro.pdf p2-p4]

#### In Layman's Terms
- This is the "how the class works" section: who helps you, how grades are computed, and what rules govern submissions. [PDF: ics604-S26-lec01-Intro.pdf p2-p4]
- Example: if an assignment is due at 11:59 PM, you should assume that is a hard deadline unless an exception is approved. [PDF: ics604-S26-lec01-Intro.pdf p2-p4]

### B. What Data Science Is (Framing Slide)
- Lecture framing presents data science as modeling and summarizing datasets, designing and using algorithms, and quantifying statistical uncertainty. [PDF: ics604-S26-lec01-Intro.pdf p5]
- It also reinforces the common three-part view of the field: programming skills, math/statistics, and domain expertise. [PDF: ics604-S26-lec01-Intro.pdf p5]
- The Conway-style overlap figure also places software development, machine learning, and traditional research around those intersections, underscoring that data science borrows from neighboring disciplines rather than replacing them. [PDF: ics604-S26-lec01-Intro.pdf p5]

#### In Layman's Terms
- Data science is not only coding and not only math. It is using both, plus real-world context, to make better decisions. [PDF: ics604-S26-lec01-Intro.pdf p5]
- Example: raw app logs are just data; deciding which feature to improve from those logs is data science. [PDF: ics604-S26-lec01-Intro.pdf p5]

### C. DIKW Pyramid: Data and Information
- The lecture introduces DIKW as a layered process: Data -> Information -> Knowledge -> Wisdom. [PDF: ics604-S26-lec01-Intro.pdf p6]
- Data is presented as the foundational layer and can be manually or automatically generated. [PDF: ics604-S26-lec01-Intro.pdf p6]
- Information is produced through organization and basic analysis (for example summaries and distributions). [PDF: ics604-S26-lec01-Intro.pdf p6]

#### In Layman's Terms
- Data is raw ingredients; information is a prepared dish. [PDF: ics604-S26-lec01-Intro.pdf p6]
- Example: a CSV full of numbers is data; average, minimum, and trend summaries from it are information. [PDF: ics604-S26-lec01-Intro.pdf p6]

### D. DIKW Pyramid: Knowledge and Wisdom
- Knowledge is presented as extracting non-obvious, actionable insights from information. [PDF: ics604-S26-lec01-Intro.pdf p7]
- Wisdom is the decision/action layer informed by those insights. [PDF: ics604-S26-lec01-Intro.pdf p7]
- Lecture examples include user behavior differences and feature-performance interpretation. [PDF: ics604-S26-lec01-Intro.pdf p7]

#### In Layman's Terms
- Knowledge answers "what is really happening?" and wisdom answers "what should we do next?" [PDF: ics604-S26-lec01-Intro.pdf p7]
- Example: if usage is lower for one user group (knowledge), redesign onboarding for that group (wisdom). [PDF: ics604-S26-lec01-Intro.pdf p7]

### E. Python as the Principal Tool
- The lecture positions Python as a general-purpose language suitable for scripting and full applications. [PDF: ics604-S26-lec01-Intro.pdf p8-p10]
- It highlights ecosystem breadth and cross-domain adoption. [PDF: ics604-S26-lec01-Intro.pdf p8-p10]
- A popularity-trend chart is used as visual evidence that Python has sustained adoption across many technical communities, which supports standardizing the course on Python instead of a niche analysis-only tool. [PDF: ics604-S26-lec01-Intro.pdf p8-p10]
- It also sets version expectations for class work (`Python > 3.10`). [PDF: ics604-S26-lec01-Intro.pdf p8-p10]

#### In Layman's Terms
- Python is chosen because it is practical and widely used for data work, not because it is the only possible option. [PDF: ics604-S26-lec01-Intro.pdf p8-p10]
- Example: one language can handle notebook exploration and production services with the right libraries. [PDF: ics604-S26-lec01-Intro.pdf p8-p10]

#### Language Bridge
- PHP and Python are both high-level and productive, but Python has stronger default momentum in scientific/data tooling. [PDF: ics604-S26-lec01-Intro.pdf p8-p10]
- PHP rough counterpart (dependency + namespace usage): [PDF: ics604-S26-lec01-Intro.pdf p8-p10]

### F. Course Technical Scope and Environment Setup
- Topics are explicitly mapped to DIKW stages: wrangling, visualization, modeling, and validation/inference. [PDF: ics604-S26-lec01-Intro.pdf p11-p13]
- Tooling includes Jupyter-based workflow and package setup (Python plus data-science libraries). [PDF: ics604-S26-lec01-Intro.pdf p11-p13]
- The lecture gives setup options such as standard Python installs or bundled distributions. [PDF: ics604-S26-lec01-Intro.pdf p11-p13]

#### In Layman's Terms
- The course is a pipeline: clean data, understand data, model data, then validate decisions. [PDF: ics604-S26-lec01-Intro.pdf p11-p13]
- Example: first make the table usable, then graph it, then model outcomes, then test reliability. [PDF: ics604-S26-lec01-Intro.pdf p11-p13]

#### Language Bridge
- This resembles a full-stack workflow plan: [PDF: ics604-S26-lec01-Intro.pdf p11-p13]
- ingest data (like reading request payloads), [PDF: ics604-S26-lec01-Intro.pdf p11-p13]
- transform and validate, [PDF: ics604-S26-lec01-Intro.pdf p11-p13]
- run business/statistical logic, [PDF: ics604-S26-lec01-Intro.pdf p11-p13]
- deliver interpretable outputs. [PDF: ics604-S26-lec01-Intro.pdf p11-p13]

### Coverage Checklist (PDF + Notebook Verification)
| PDF Topic | PDF Evidence (page/slide) | Notebook Support (if any) | Summary Section | Status |
| --- | --- | --- | --- | --- |
| Instructor/TA, grading, policy | `work/lectures/PDFs/ics604-S26-lec01-Intro.pdf` p2-p4 | No companion notebook found | A | Covered |
| Data science framing and overlap diagram | `work/lectures/PDFs/ics604-S26-lec01-Intro.pdf` p5 | No companion notebook found | B | Covered |
| DIKW: Data and Information | `work/lectures/PDFs/ics604-S26-lec01-Intro.pdf` p6 | No companion notebook found | C | Covered |
| DIKW: Knowledge and Wisdom | `work/lectures/PDFs/ics604-S26-lec01-Intro.pdf` p7 | No companion notebook found | D | Covered |
| Python role, popularity chart, and advantages | `work/lectures/PDFs/ics604-S26-lec01-Intro.pdf` p8-p10 | No companion notebook found | E | Covered |
| Scope and environment setup | `work/lectures/PDFs/ics604-S26-lec01-Intro.pdf` p11-p13 | No companion notebook found | F | Covered |

- PDF source: `work/lectures/PDFs/ics604-S26-lec01-Intro.pdf`
- Notebook source: no matching lecture notebook in `work/lectures/Notebooks`

