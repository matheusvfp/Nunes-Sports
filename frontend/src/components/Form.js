import styled from "styled-components";
import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 10px;
  height: 40px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Label = styled.label``;

const Form = ({ getProducts, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const product = ref.current;

      product.codigo.value = onEdit.codigo;
      product.nome.value = onEdit.nome;
      product.descricao.value = onEdit.descricao;
      product.preco.value = onEdit.preco;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = ref.current;

    if (
      !product.codigo.value ||
      !product.nome.value ||
      !product.descricao.value ||
      !product.preco.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const formData = {
      codigo: product.codigo.value,
      nome: product.nome.value,
      descricao: product.descricao.value,
      preco: product.preco.value,
    };

    try {
      if (onEdit) {
        await axios.put("http://localhost:8800/" + onEdit.id, formData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8800", formData);
        toast.success("Produto adicionado com sucesso!");
      }

      
      product.codigo.value = "";
      product.nome.value = "";
      product.descricao.value = "";
      product.preco.value = "";

      
      setOnEdit(null);
      getProducts();
    } catch (error) {
      toast.error("Ocorreu um erro ao processar a solicitação.");
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Código</Label>
        <Input name="codigo" />
      </InputArea>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <Input name="descricao" />
      </InputArea>
      <InputArea>
        <Label>Preço</Label>
        <Input name="preco" type="number" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
