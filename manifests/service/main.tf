resource "kubernetes_service_v1" "nestjs_template_service" {
  metadata {
    name      = "hexagonal-architecture-expressjs"
    namespace = "templates"
  }
  spec {
    selector = {
      app = "hexagonal-architecture-expressjs"
    }
    type             = "NodePort"
    session_affinity = "None"
    session_affinity_config {
      client_ip {
        timeout_seconds = 10800
      }
    }
    port {
      port      = 4000
      node_port = 30020
      protocol  = "TCP"
    }
  }
}