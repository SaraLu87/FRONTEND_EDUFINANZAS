import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
import axios from "axios";


const CrearReto = () => {
  const navigate = useNavigate()

  // Lista de retos creados
  const [retosCreados, setRetosCreados] = useState([]);

  useEffect(() => {
    const obtenerRetos = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/retos/");
        setRetosCreados(res.data);
      } catch (error) {
        console.error("Error al obtener retos:", error);
      }
    };

    obtenerRetos();
  })

  // Datos del nuevo reto
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [contenido, setContenido] = useState("")

  // Datos de la pregunta
  const [textoPregunta, setTextoPregunta] = useState("")
  const [opciones, setOpciones] = useState([
    { id: "1", texto: "", esCorrecta: false },
    { id: "2", texto: "", esCorrecta: false },
    { id: "3", texto: "", esCorrecta: false },
    { id: "4", texto: "", esCorrecta: false },
  ])
  const [tiempoLimite, setTiempoLimite] = useState(60)
  const [puntos, setPuntos] = useState(100)

  const handleVolver = () => {
    navigate("/perfil-administrador")
  }

  const handleOpcionChange = (id, valor) => {
    setOpciones(opciones.map(op => op.id === id ? { ...op, texto: valor } : op))
  }

  const handleOpcionCorrectaChange = (id) => {
    setOpciones(opciones.map(op => ({ ...op, esCorrecta: op.id === id })))
  }

  const handleAgregarReto = async () => {
    if (!titulo || !descripcion || !contenido || !textoPregunta) {
      alert("Por favor complete todos los campos");
      return;
    }

    const opcionesValidas = opciones.filter(op => op.texto.trim() !== "");
    if (opcionesValidas.length < 2) {
      alert("Debe agregar al menos 2 opciones de respuesta");
      return;
    }

    const correcta = opciones.find(op => op.esCorrecta && op.texto.trim() !== "");
    if (!correcta) {
      alert("Debe seleccionar una respuesta correcta");
      return;
    }

    // Crear objeto para enviar
    const nuevoReto = {
      tipo_pregunta: "Opción múltiple",
      nombre_reto: titulo,
      id_tema: 1, // Puedes cambiarlo según el tema seleccionado
      descripcion,
      recompensa_monedas: puntos,
      respuesta_uno: opciones[0]?.texto || "",
      respuesta_dos: opciones[1]?.texto || "",
      respuesta_tres: opciones[2]?.texto || "",
      respuesta_cuatro: opciones[3]?.texto || "",
      respuestaCorrecta: correcta.texto,
      costo_monedas: 0,
    }

    try {
      console.log("Datos enviados:", nuevoReto);
      const res = await axios.post("http://127.0.0.1:8000/api/retos/", nuevoReto);
      console.log("✅ Respuesta del backend:", res.data);
    } catch (err) {
      console.error("❌ Error al enviar reto:");
      if (err.response) {
        console.log("Código de estado:", err.response.status);
        console.log("Respuesta del backend:", err.response.data); // 👈 AQUÍ SE MUESTRA EL DETALLE REAL
      } else {
        console.log("Mensaje de error:", err.message);
      }
    }



    // try {
    //   const res = await axios.post("http://127.0.0.1:8000/api/retos/", nuevoReto);
    //   console.log("Respuesta del backend:", res.data);
    //   alert("✅ Reto guardado en la base de datos");
    // } catch (err) {
    //   console.error("Error al enviar reto:", err);
    //   alert("❌ No se pudo guardar el reto");
    // }

    // Limpiar formulario
    setTitulo("");
    setDescripcion("");
    setContenido("");
    setTextoPregunta("");
    setOpciones([
      { id: "1", texto: "", esCorrecta: false },
      { id: "2", texto: "", esCorrecta: false },
      { id: "3", texto: "", esCorrecta: false },
      { id: "4", texto: "", esCorrecta: false },
    ]);
    setTiempoLimite(60);
    setPuntos(100);
};

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "Poppins, sans-serif",
        paddingBottom: "40px"
      }}
    >
      <Container className="py-5">
        {/* Botón Volver */}
        <Button
          variant="outline-secondary"
          onClick={handleVolver}
          className="mb-4"
          style={{
            borderRadius: "25px",
            fontWeight: "600",
            padding: "8px 20px"
          }}
        >
          ← Volver al Panel
        </Button>

        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#3730a3",
            marginBottom: "30px"
          }}
        >
          Crear Nuevo Reto
        </h1>

        <Row className="g-4 mt-3">
          {/* Columna Izquierda - Información */}
          <Col lg={4}>
            {/* Retos Creados */}
            <Card
              className="shadow-sm border-0"
              style={{ borderRadius: "20px" }}
            >
              <Card.Body>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    color: "#3730a3",
                    marginBottom: "20px"
                  }}
                >
                  📊 Retos Creados
                </h3>
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "700",
                    color: "#4f46e5",
                    textAlign: "center",
                    marginBottom: "20px"
                  }}
                >
                  {retosCreados.length}
                </div>
                <div>
                  {retosCreados.map((reto) => (
                    <div
                      key={reto.id_reto}
                      style={{
                        padding: "12px",
                        backgroundColor: "#f9fafb",
                        borderRadius: "10px",
                        marginBottom: "10px"
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#3730a3",
                          marginBottom: "5px"
                        }}
                      >
                        {reto.nombre_reto}
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Columna Derecha - Formulario */}
          <Col lg={8}>
            {/* Información del Reto */}
            <Card
              className="shadow-sm border-0 mb-4"
              style={{ borderRadius: "20px" }}
            >
              <Card.Body style={{ padding: "30px" }}>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    color: "#3730a3",
                    marginBottom: "25px"
                  }}
                >
                  📝 Información del Reto
                </h3>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600", color: "#374151" }}>
                    Título del Reto
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Ahorro Inteligente"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    style={{
                      borderRadius: "10px",
                      padding: "10px 15px",
                      border: "1.5px solid #cbd5e1"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600", color: "#374151" }}>
                    Descripción
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Breve descripción del reto"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    style={{
                      borderRadius: "10px",
                      padding: "10px 15px",
                      border: "1.5px solid #cbd5e1"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600", color: "#374151" }}>
                    Contenido del Reto
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Contenido completo del reto, explicación, ejemplos, etc."
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    style={{
                      borderRadius: "10px",
                      padding: "10px 15px",
                      border: "1.5px solid #cbd5e1"
                    }}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Pregunta del Reto */}
            <Card
              className="shadow-sm border-0"
              style={{ borderRadius: "20px" }}
            >
              <Card.Body style={{ padding: "30px" }}>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    color: "#3730a3",
                    marginBottom: "25px"
                  }}
                >
                  ❓ Pregunta del Reto
                </h3>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600", color: "#374151" }}>
                    Texto de la Pregunta
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="¿Cuál es la pregunta?"
                    value={textoPregunta}
                    onChange={(e) => setTextoPregunta(e.target.value)}
                    style={{
                      borderRadius: "10px",
                      padding: "10px 15px",
                      border: "1.5px solid #cbd5e1"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600", color: "#374151" }}>
                    Opciones de Respuesta
                  </Form.Label>
                  <div>
                    {opciones.map((opcion, index) => (
                      <div
                        key={opcion.id}
                        className="d-flex align-items-center gap-2 mb-2"
                      >
                        <Form.Check
                          type="radio"
                          name="respuesta_Correcta"
                          checked={opcion.esCorrecta}
                          onChange={() => handleOpcionCorrectaChange(opcion.id)}
                          style={{ transform: "scale(1.2)" }}
                        />
                        <Form.Control
                          type="text"
                          placeholder={`Opción ${index + 1}`}
                          value={opcion.texto}
                          onChange={(e) => handleOpcionChange(opcion.id, e.target.value)}
                          style={{
                            borderRadius: "10px",
                            padding: "10px 15px",
                            border: "1.5px solid #cbd5e1",
                            flex: 1
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "10px" }}>
                    Selecciona el círculo de la respuesta correcta
                  </p>
                </Form.Group>

                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: "600", color: "#374151" }}>
                        ⏱️ Tiempo Límite (segundos)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min="10"
                        max="300"
                        value={tiempoLimite}
                        onChange={(e) => setTiempoLimite(Number(e.target.value))}
                        style={{
                          borderRadius: "10px",
                          padding: "10px 15px",
                          border: "1.5px solid #cbd5e1"
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: "600", color: "#374151" }}>
                        🏆 Puntos
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min="10"
                        max="1000"
                        step="10"
                        value={puntos}
                        onChange={(e) => setPuntos(Number(e.target.value))}
                        style={{
                          borderRadius: "10px",
                          padding: "10px 15px",
                          border: "1.5px solid #cbd5e1"
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  className="w-100"
                  onClick={handleAgregarReto}
                  style={{
                    backgroundColor: "#4f46e5",
                    border: "none",
                    borderRadius: "25px",
                    fontWeight: "600",
                    padding: "12px",
                    fontSize: "1.1rem"
                  }}
                >
                  ✅ Agregar Reto
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    
  );
};

export default CrearReto