variable "aws_region" {
  description = "AWS Region"
  default     = "eu-north-1"
}

variable "instance_type" {
  description = "EC2 Instance Type"
  default     = "t3.micro"
}

variable "ami_id" {
  description = "AMI ID for EC2 instances (Amazon Linux 2023)"
  default     = "ami-0989fb1567110b275" # Example for eu-north-1, user should verify
}
