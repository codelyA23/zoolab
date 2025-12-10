output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.main.id
}

output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer"
  value       = aws_lb.web_alb.dns_name
}

output "web_asg_name" {
  description = "Name of the Web Tier Auto Scaling Group"
  value       = aws_autoscaling_group.web_asg.name
}
