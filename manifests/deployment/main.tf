resource "kubernetes_deployment_v1" "nestjs_template_deployment" {
  timeouts {
    create = "3m"
    update = "3m"
    delete = "3m"
  }
  metadata {
    name      = "hexagonal-architecture-expressjs"
    namespace = "templates"
    labels = {
      app = "hexagonal-architecture-expressjs"
    }
  }
  spec {
    revision_history_limit = 5
    selector {
      match_labels = {
        app = "hexagonal-architecture-expressjs"
      }
    }
    template {
      metadata {
        name = "hexagonal-architecture-expressjs"
        labels = {
          app = "hexagonal-architecture-expressjs"
        }
      }
      spec {
        container {
          name              = "hexagonal-architecture-expressjs"
          image             = "luisllanos/hexagonal:latest"
          image_pull_policy = "Always"

          env {
            name = "NODE_IP"
            value_from {
              field_ref {
                field_path = "status.hostIP"
              }
            }
          }
          env {
            name  = "POSTGRESQL_DB"
            value = <<EOT
            {
              "host": "$(NODE_IP)",
              "port": 30000,
              "db": "${var.env_vars.DATABASE_NAME}",
              "user": "${var.env_vars.DATABASE_USER}",
              "password": "${var.env_vars.DATABASE_PASSWORD}",
              "ssl": false,
              "synchronize": true
            }
            EOT
          }
          env {
            name  = "MONGODB_DB"
            value = <<EOT
            {
              "host": "$(NODE_IP)",
              "port": 30010,
              "db": "${var.env_vars.MONGODB_DB}",
              "ssl": false,
              "synchronize": true
            }
            EOT
          }
          env {
            name  = "MAILER_CONFIG"
            value = <<EOT
            {
              "email": "${var.env_vars.MAILER_EMAIL}",
              "secretKey": "${var.env_vars.MAILER_SECRET_KEY}",
              "service": "${var.env_vars.MAILER_SERVICE}"
            }
            EOT
          }
          env {
            name  = "SECRET_TOKEN"
            value = var.env_vars.SECRET_TOKEN
          }
          env_from {
            config_map_ref {
              name = "hexagonal-architecture-expressjs"
            }
          }
          resources {
            requests = {
              memory = "500Mi"
            }
          }
          port {
            container_port = 4000
          }
        }
      }
    }
  }
}