# Training Volume Checker for Hypertrophy

![App Preview](.github/banner.png)

## Introduction

This web application helps users determine whether their current training volume per muscle group per session is optimized for muscle hypertrophy. 

The logic is based on scientific recommendations and was inspired by a post on Instagram by physical educators: 

@lucaspiero.personal && @matiasmayco

📎 [Source Post (in Pt-br)](https://www.instagram.com/p/CjarKbcrU7q/)

The original reasoning was first implemented in **Prolog**, a logical programming language, and later translated into JavaScript and React to make the tool accessible through a modern user interface.

## How the Logic Works

The analysis considers four main training variables:

1. **Number of sets** per muscle group per session
2. Whether you're **progressively overloading**
3. Whether you're **gaining bodyweight**
4. Your **rest time between sets**

Based on these, it classifies your training volume as:

- **Too Low:** Likely suboptimal for hypertrophy gains.
- **Ideal:** When all conditions align (e.g., progressive overload, appropriate rest, weight gain).
- **Needs Adjustments:** May need to tweak rest time, volume, or diet.
- **Too High:** May result in stagnation or overtraining if progress isn't observed.

These rules were originally expressed using **Prolog clauses** and translated into JavaScript functions (`checkVolume`) and conditions that dynamically assess input and return detailed feedback.

## Technologies

| Technology        | Description                                                      |
|-------------------|------------------------------------------------------------------|
| **React**         | UI library for building interactive interfaces.                  |
| **Vite**          | Fast development/build environment.                              |
| **MUI (Material UI)** | Prebuilt React components with consistent design language.   |

## Setup

1. Clone this repository and navigate into it:
```bash
git clone https://github.com/Franzoni23/training-volume-checker.git
cd training-volume-checker
```

2. Install dependencies:
```bash
npm install
```
3. Once the dependencies are installed, you can start the development server:
```bash
npm run dev
```
## Running the Prolog Version

You can still run the original version for learning or testing purposes.

### Requirements
SWI-Prolog installed on your machine (available for Windows, macOS, and Linux).

1. Launch SWI-Prolog Open your terminal or command prompt and type:
```bash
swipl
```
2. Run the Program To start the training volume recommendation system:
```bash
?- start.
```

### References

- **Schoenfeld, B. J., et al. (2017).**  
  *Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training: A Systematic Review and Meta-analysis.*  
  *Journal of Strength and Conditioning Research.*  
  [PMID: 27433992](https://pubmed.ncbi.nlm.nih.gov/27433992/)

- **Schoenfeld, B. J., et al. (2021).**  
  *Resistance Training Recommendations to Maximize Muscle Hypertrophy in an Athletic Population: Position Stand of the IUSCA.*  
  *International Journal of Strength and Conditioning, 1(1).*  
  [DOI: 10.47206/ijsc.v1i1.81](https://doi.org/10.47206/ijsc.v1i1.81)

- **Instagram Educators (Source of Practical Guidelines):**
  - [@lucaspiero.personal](https://www.instagram.com/lucaspiero.personal)
  - [@matiasmaycon](https://www.instagram.com/matiasmaycon)