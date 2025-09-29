import React from "react";
import { Flex, Card, Typography, Divider, Tag, Space, Row, Col } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  TrophyOutlined,
  DatabaseOutlined,
  BookOutlined,
  BarChartOutlined,
  CalendarOutlined,
  SettingOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  BulbOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  StarOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const Documentation = () => {
  const modules = [
    {
      key: "dashboard",
      title: "Dashboard",
      icon: <DashboardOutlined />,
      description: "Panel principal con resumen de tu competencia",
      features: [
        "Resumen de competencia activa",
        "Estadísticas de tu equipo",
        "Actividades pendientes",
        "Ranking y puntos",
        "Estado de la competencia",
      ],
      color: "#1890ff",
    },
    {
      key: "profile",
      title: "Perfil de Usuario",
      icon: <UserOutlined />,
      description: "Gestiona tu información personal y estadísticas",
      features: [
        "Datos personales",
        "Estadísticas de rendimiento",
        "Historial de actividades",
        "Cambio de contraseña",
        "Configuración de cuenta",
      ],
      color: "#52c41a",
    },
    {
      key: "team",
      title: "Mi Equipo",
      icon: <TeamOutlined />,
      description: "Visualiza y gestiona la información de tu equipo",
      features: [
        "Lista de miembros del equipo",
        "Mediciones promedio",
        "Estadísticas grupales",
        "Actividades del equipo",
        "Progreso conjunto",
      ],
      color: "#fa8c16",
    },
    {
      key: "competition",
      title: "Competencia",
      icon: <TrophyOutlined />,
      description: "Seguimiento detallado de la competencia",
      features: [
        "Tabla de intervalos",
        "Ranking general",
        "Duración de competencia",
        "Promedios por grupos",
        "Estadísticas de competencia",
      ],
      color: "#eb2f96",
    },
    {
      key: "challenges",
      title: "Desafíos",
      icon: <BarChartOutlined />,
      description: "Participa en desafíos y actividades",
      features: [
        "Lista de desafíos disponibles",
        "Registro de actividades",
        "Seguimiento de progreso",
        "Completar tareas",
        "Historial de logros",
      ],
      color: "#722ed1",
    },

    {
      key: "global_viewer",
      title: "Visualizador Global",
      icon: <GlobalOutlined />,
      description: "Vista administrativa de toda la competencia",
      features: [
        "Estadísticas globales",
        "Información general",
        "Datos de todos los equipos",
        "Métricas de competencia",
        "Reportes administrativos",
      ],
      color: "#13c2c2",
      adminOnly: true,
    },
    {
      key: "blog",
      title: "Blog y Novedades",
      icon: <BookOutlined />,
      description: "Mantente informado con las últimas noticias",
      features: [
        "Noticias de la competencia",
        "Actualizaciones del sistema",
        "Consejos y tips",
        "Anuncios importantes",
        "Contenido educativo",
      ],
      color: "#2f54eb",
    },
  ];

  return (
    <Flex vertical gap="large" style={{ padding: "24px" }}>
      {/* Header */}
      <Card>
        <Flex vertical gap="medium" align="center">
          <Title level={1} style={{ textAlign: "center", margin: 0 }}>
            <BookOutlined style={{ marginRight: "12px", color: "#1890ff" }} />
            Documentación Move4It
          </Title>
          <Paragraph
            style={{ textAlign: "center", fontSize: "16px", margin: 0 }}
          >
            Guía completa de todos los módulos y funcionalidades de la
            plataforma
          </Paragraph>
        </Flex>
      </Card>

      {/* Módulos Grid */}
      <Row gutter={[24, 24]}>
        {modules.map((module) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={module.key}>
            <Card
              hoverable
              style={{
                height: "100%",
                border: `2px solid ${module.color}20`,
                borderRadius: "12px",
              }}
              bodyStyle={{ padding: "20px" }}
            >
              <Flex vertical gap="medium" style={{ height: "100%" }}>
                {/* Icono y título */}
                <Flex align="center" gap="small">
                  <div
                    style={{
                      fontSize: "24px",
                      color: module.color,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {module.icon}
                  </div>
                  <Title level={4} style={{ margin: 0, color: module.color }}>
                    {module.title}
                  </Title>
                  {module.adminOnly && (
                    <Tag color="red" size="small">
                      Admin
                    </Tag>
                  )}
                </Flex>

                {/* Descripción */}
                <Paragraph style={{ margin: 0, color: "#666" }}>
                  {module.description}
                </Paragraph>

                {/* Características */}
                <Flex vertical gap="small" style={{ flex: 1 }}>
                  <Text strong style={{ color: module.color }}>
                    Características:
                  </Text>
                  <Space
                    direction="vertical"
                    size="small"
                    style={{ width: "100%" }}
                  >
                    {module.features.map((feature, index) => (
                      <Flex key={index} align="center" gap="small">
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: module.color,
                          }}
                        />
                        <Text style={{ fontSize: "13px" }}>{feature}</Text>
                      </Flex>
                    ))}
                  </Space>
                </Flex>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Información adicional */}
      <Card>
        <Flex vertical gap="large">
          <Title level={2} style={{ textAlign: "center", margin: 0 }}>
            <RocketOutlined style={{ marginRight: "12px", color: "#52c41a" }} />
            Cómo usar la plataforma
          </Title>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card size="small" style={{ height: "100%" }}>
                <Flex vertical gap="small">
                  <Title level={4} style={{ margin: 0, color: "#1890ff" }}>
                    <CalendarOutlined /> Flujo de Competencia
                  </Title>
                  <Paragraph style={{ margin: 0 }}>
                    Las competencias se dividen en intervalos de tiempo. Cada
                    intervalo tiene actividades específicas que debes completar
                    para ganar puntos.
                  </Paragraph>
                </Flex>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card size="small" style={{ height: "100%" }}>
                <Flex vertical gap="small">
                  <Title level={4} style={{ margin: 0, color: "#52c41a" }}>
                    <SettingOutlined /> Configuración
                  </Title>
                  <Paragraph style={{ margin: 0 }}>
                    Personaliza tu experiencia desde el perfil de usuario.
                    Actualiza tus datos, cambia tu contraseña y revisa tus
                    estadísticas.
                  </Paragraph>
                </Flex>
              </Card>
            </Col>
          </Row>

          <Divider />

          <Flex vertical gap="medium" align="center">
            <Title level={3} style={{ margin: 0, textAlign: "center" }}>
              <BulbOutlined style={{ marginRight: "12px", color: "#fa8c16" }} />
              Consejos para aprovechar al máximo la plataforma
            </Title>

            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              <Col xs={24} sm={12} md={8}>
                <Card size="small" style={{ textAlign: "center" }}>
                  <Flex vertical gap="small" align="center">
                    <BarChartOutlined
                      style={{ fontSize: "24px", color: "#1890ff" }}
                    />
                    <Text strong>Revisa el Dashboard</Text>
                    <Text type="secondary">
                      Mantente al día con el estado de tu competencia
                    </Text>
                  </Flex>
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Card size="small" style={{ textAlign: "center" }}>
                  <Flex vertical gap="small" align="center">
                    <CheckCircleOutlined
                      style={{ fontSize: "24px", color: "#52c41a" }}
                    />
                    <Text strong>Completa Actividades</Text>
                    <Text type="secondary">
                      Participa activamente para ganar más puntos
                    </Text>
                  </Flex>
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Card size="small" style={{ textAlign: "center" }}>
                  <Flex vertical gap="small" align="center">
                    <TeamOutlined
                      style={{ fontSize: "24px", color: "#fa8c16" }}
                    />
                    <Text strong>Colabora con tu Equipo</Text>
                    <Text type="secondary">
                      Trabaja en equipo para mejores resultados
                    </Text>
                  </Flex>
                </Card>
              </Col>
            </Row>
          </Flex>
        </Flex>
      </Card>

      {/* Footer */}
      <Card style={{ textAlign: "center" }}>
        <Flex vertical gap="small" align="center">
          <Flex align="center" gap="small">
            <InfoCircleOutlined style={{ color: "#1890ff" }} />
            <Text style={{ margin: 0, color: "#666" }}>
              ¿Tienes preguntas? Contacta al administrador de tu competencia
            </Text>
          </Flex>
          <Flex align="center" gap="small">
            <HeartOutlined style={{ color: "#eb2f96" }} />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Desarrollado por fbarraza - dev / LATAM
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Documentation;
