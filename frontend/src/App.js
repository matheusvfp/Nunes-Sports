import GlobalStyle from "./styles/global.js";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js"
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;


function App() {
 
  const[products, setProducts] = useState([]);
  const[onEdit, setOnEdit] = useState(null);


  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setProducts(res.data);
    } catch (error) {
      toast.error(error);
    }
 };

 useEffect(() => {
  getProducts();
}, [setProducts]);

  return (
    <>
      <Container>
      <Title>NUNES SPORT</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getProducts={getProducts} />
      <Grid products={products} setProducts={setProducts} setOnEdit={setOnEdit}/>
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );

}


export default App;
