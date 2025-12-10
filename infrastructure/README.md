# Zoolab Cloud Infrastructure

This directory contains Terraform configuration files to provision the Zoolab multi-tier architecture on AWS.

## Prerequisites
- [Terraform](https://www.terraform.io/downloads.html) installed.
- AWS Credentials configured (`aws configure`).

## Resources Created
- **VPC**: 10.0.0.0/16 with Public and Private subnets.
- **Security Groups**:
  - `zoolab-web-sg`: Allows HTTP (80) from anywhere.
  - `zoolab-app-sg`: Allows traffic on port 3000 from Web SG.
- **Compute**:
  - Auto Scaling Groups for Web and App tiers.
  - Application Load Balancer (ALB) for the Web tier.
- **Database**:
  - *Note*: The RDS instance is assumed to be existing (as per project description). These scripts connect to the existing RDS via Security Group rules (to be added manually if peering is needed, or assuming same VPC).

## Usage
1. Initialize Terraform:
   ```bash
   terraform init
   ```
2. Preview changes:
   ```bash
   terraform plan
   ```
3. Apply changes:
   ```bash
   terraform apply
   ```
