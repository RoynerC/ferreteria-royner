import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { db } from "../database/firebaseconfig";
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import TablaCategorias from "../components/categorias/TablaCategoria";
import ModalRegistroCategoria from "../components/categorias/ModalRegistroCategoria";
import CuadroBusquedas from "../components/busqueda/CuadroBusquedas";
import ModalEliminacionCategoria from "../components/categorias/ModalEliminacionCategoria";


const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const categoriasCollection = collection(db, "categorias");

  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");


   const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: "", descripcion: "" });

  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({ ...prev, [name]: value }));
  };

  const cargarCategorias = async () => {
    try {
      const consulta = await getDocs(categoriasCollection);
      const datosCategorias = consulta.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategorias(datosCategorias);
      setCategoriasFiltradas(datosCategorias);

      console.log("Categorías cargadas:", datosCategorias);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };


  const agregarCategoria = async () => {
    if (!nuevaCategoria.nombre || !nuevaCategoria.descripcion) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    setMostrarModal(false);

    try {
      await addDoc(categoriasCollection, nuevaCategoria);
      setNuevaCategoria({ nombre: "", descripcion: "" });
      cargarCategorias();
      console.log("Categoría agregada exitosamente.");
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
      alert("Error al agregar la categoría: " + error.message);
    }
  };


  const eliminarCategoria = async () => {
    if (!categoriaAEliminar) return;

    try {
      const categoriaRef = doc(db, "categorias", categoriaAEliminar.id);
      await deleteDoc(categoriaRef);
      cargarCategorias();
      console.log("Categoría eliminada exitosamente.");
      setMostrarModalEliminar(false);
      setCategoriaAEliminar(null);
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      alert("Error al eliminar la categoría: " + error.message);
    }
  };


  const manejarEliminar = (categoria) => {
    setCategoriaAEliminar(categoria);
    setMostrarModalEliminar(true);
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = Categorias.filter(
      (categoria) =>
        categoria.nombre.toLowerCase().includes(texto) ||
        categoria.descripcion.toLowerCase().includes(texto)
    );
    setCategoriasFiltradas(filtradas);
  };

useEffect(() => {
    cargarCategorias();
  }, []);

  return (

    <Container className="mt-4">
      <h4>Gestión de Categorías</h4>
      <Row>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button
            className="mb-3"
            onClick={() => setMostrarModal(true)}
            style={{ width: "100%" }}
          >
            Agregar categoría
          </Button>
        </Col>
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
 />
        </Col>
      </Row>

<TablaCategorias
        categorias={categorias}
        manejarEliminar={manejarEliminar}
        
      />


      <ModalRegistroCategoria
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaCategoria={nuevaCategoria}
        manejoCambioInput={manejoCambioInput}
        agregarCategoria={agregarCategoria}
      />
<ModalEliminacionCategoria
        mostrarModalEliminar={mostrarModalEliminar}
        setMostrarModalEliminar={setMostrarModalEliminar}
        categoriaAEliminar={categoriaAEliminar}
        eliminarCategoria={eliminarCategoria}
      />

    </Container>
  );
};

export default Categorias;
