resource "kubernetes_config_map_v1" "nestjs_template_config_map" {
  metadata {
    name      = "hexagonal-architecture-expressjs"
    namespace = "templates"
  }

  data = {
    ENVIRONMENT      = "development"
    SERVER_REST_PORT = 4000
  }
}