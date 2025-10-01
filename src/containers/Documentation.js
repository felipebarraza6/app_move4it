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
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(15,120,142,0.02) 0%, rgba(230,184,0,0.01) 100%)",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <Flex vertical gap="large">
        {/* Header */}
        <Card
          style={{
            background:
              "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
            border: "1px solid rgba(15,120,142,0.2)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(15,120,142,0.08)",
          }}
        >
          <Flex vertical gap="medium" align="center">
            <Paragraph
              style={{
                textAlign: "center",
                fontSize: "16px",
                margin: 0,
                color: "rgba(15,120,142,0.7)",
              }}
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
                  background:
                    "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
                  border: "1px solid rgba(15,120,142,0.2)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(15,120,142,0.1)",
                  transition: "all 0.3s ease",
                }}
                bodyStyle={{ padding: "24px" }}
              >
                <Flex vertical gap="medium" style={{ height: "100%" }}>
                  {/* Icono y título */}
                  <Flex align="center" gap="small">
                    <div
                      style={{
                        fontSize: "28px",
                        color: "rgba(15,120,142,0.8)",
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                        background:
                          "linear-gradient(135deg, rgba(15,120,142,0.1) 0%, rgba(230,184,0,0.05) 100%)",
                        borderRadius: "12px",
                        border: "1px solid rgba(15,120,142,0.2)",
                      }}
                    >
                      {module.icon}
                    </div>
                    <Title
                      level={4}
                      style={{
                        margin: 0,
                        color: "rgba(15,120,142,0.8)",
                        fontWeight: "600",
                      }}
                    >
                      {module.title}
                    </Title>
                    {module.adminOnly && (
                      <Tag color="red" size="small">
                        Admin
                      </Tag>
                    )}
                  </Flex>

                  {/* Descripción */}
                  <Paragraph
                    style={{
                      margin: 0,
                      color: "rgba(15,120,142,0.7)",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    {module.description}
                  </Paragraph>

                  {/* Características */}
                  <Flex vertical gap="small" style={{ flex: 1 }}>
                    <Text
                      strong
                      style={{
                        color: "rgba(15,120,142,0.8)",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
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
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(15,120,142,0.6)",
                              boxShadow: "0 2px 4px rgba(15,120,142,0.2)",
                            }}
                          />
                          <Text
                            style={{
                              fontSize: "13px",
                              color: "rgba(15,120,142,0.7)",
                            }}
                          >
                            {feature}
                          </Text>
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
        <Card
          style={{
            background:
              "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
            border: "1px solid rgba(15,120,142,0.2)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(15,120,142,0.08)",
          }}
        >
          <Flex vertical gap="large">
            <Title
              level={2}
              style={{
                textAlign: "center",
                margin: 0,
                color: "rgba(15,120,142,0.8)",
                fontWeight: "600",
              }}
            >
              <RocketOutlined
                style={{ marginRight: "12px", color: "rgba(15,120,142,0.8)" }}
              />
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
                      intervalo tiene actividades específicas que debes
                      completar para ganar puntos.
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
              <Title
                level={3}
                style={{ margin: "0 0 20px 0", textAlign: "center" }}
              >
                <BulbOutlined
                  style={{ marginRight: "12px", color: "#fa8c16" }}
                />
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
        <Card
          style={{
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
            border: "1px solid rgba(15,120,142,0.2)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(15,120,142,0.08)",
          }}
        >
          <Flex vertical gap="small" align="center">
            <Flex align="center" gap="small">
              <InfoCircleOutlined style={{ color: "rgba(15,120,142,0.8)" }} />
              <Text
                style={{
                  margin: 0,
                  color: "rgba(15,120,142,0.7)",
                  fontSize: "14px",
                }}
              >
                ¿Tienes preguntas? Contacta al administrador de tu competencia
              </Text>
            </Flex>
            <Flex align="center" gap="small">
              <HeartOutlined style={{ color: "rgba(15,120,142,0.6)" }} />
              <Text
                style={{
                  fontSize: "12px",
                  color: "rgba(15,120,142,0.6)",
                }}
              >
                Desarrollado por fbarraza - dev / LATAM
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};

export default Documentation;
