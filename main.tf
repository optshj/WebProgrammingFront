provider "aws" {
  region = "ap-northeast-2"
}

resource "aws_instance" "react_app" {
  ami           = "ami-0c9c942bd7bf113a2" # Ubuntu 22.04 LTS
  instance_type = "t3.micro"
  key_name      = "your-key-pair"

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

  security_groups = [aws_security_group.react_sg.name]
}

resource "aws_security_group" "react_sg" {
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

variable "docker_image" {
  default = "your-dockerhub-username/react-app:latest"
}

variable "api_url" {
  default = "https://web-programming-server.vercel.app/"
}

output "instance_public_ip" {
  value = aws_instance.react_app.public_ip
}
