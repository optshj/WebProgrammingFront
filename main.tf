provider "aws" {
  region = "ap-northeast-2"
}

# 보안 그룹 존재 여부 확인 (data 소스)
data "aws_security_group" "existing_sg" {
  name = "react-sg"
}

# 새로운 보안 그룹 생성 (조건부)
resource "aws_security_group" "new_sg" {
  count       = length(data.aws_security_group.existing_sg) > 0 ? 0 : 1
  name        = "react-sg"
  description = "Allow HTTP traffic"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 보안 그룹 ID 선택
locals {
  security_group_id = length(data.aws_security_group.existing_sg) > 0 ? data.aws_security_group.existing_sg.id : aws_security_group.new_sg[0].id
}

resource "aws_instance" "react_app" {
  ami           = "ami-0c9c942bd7bf113a2"
  instance_type = "t3.micro"
  key_name      = "hunt-ec2-key"

  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y docker.io
              sudo systemctl start docker
              sudo docker pull ${var.docker_image}
              sudo docker run -d -p 80:80 \
                -e VITE_API_URL=${var.api_url} \
                ${var.docker_image}
              EOF

  vpc_security_group_ids = [local.security_group_id]
  tags = {
    Name:"Hunt EC2"
    }
}

variable "docker_image" {
  default = "seongbinlee/hunt:latest"
}

variable "api_url" {
  default = "https://web-programming-server.vercel.app/"
}

output "instance_public_ip" {
  value = aws_instance.react_app.public_ip
}
