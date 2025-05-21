output "instance_id" {
    description = "Instance EC2 ID"
    value = aws_instance.tf-ec2.id
}
output "instance_public_ip" {
    description = "EC2 Public IP Address"
    value = aws_instance.tf-ec2.public_ip
}