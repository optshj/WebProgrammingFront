provider "aws" {
  region = "ap-northeast-2"
}

# 기존 보안 그룹 조회
data "aws_security_group" "react_sg" {
  name = "react-sg"
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

  # 기존 보안 그룹 연결
  vpc_security_group_ids = [data.aws_security_group.react_sg.id]
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
