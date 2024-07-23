# BoilerPlate

The `boilerplate` repository is dedicated to the getting new projects off the ground!

Specifically we plan to include boiler plate code for:
- node based React frontend deployed via GCP
- python based fastapi backend deployed via GCP
- home server deployment
- environment management and setup

## Development Setup

We recommend using Miniconda to manage python versions and requirements files to manage python packages.

To get started, follow these steps:

0. Clone the repo into your desired project location:
   ```bash
   git clone https://github.com/NicholasGrundl/fermforge.git
   cd yourprojectname
   ```

1. Download and install Miniconda from the official website: 
   [Miniconda](https://docs.conda.io/en/latest/miniconda.html)

2. Create a new conda environment by running the following command:
   ```bash
   conda create -n boilerplate nodejs python=3.12 pip
   ```

3. Activate the newly created environment:
   ```bash
   conda activate boilerplate
   ```
