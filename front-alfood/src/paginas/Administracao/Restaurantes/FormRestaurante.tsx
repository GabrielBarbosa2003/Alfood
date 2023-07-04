import { AppBar, Box, Button, TextField, Typography, Container, Toolbar, Link, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

import { Link as RouterLink } from 'react-router-dom'; // apelidando o link para nao ter conflitos de nomes



const FormRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
            .then(resposta => setNomeRestaurante(resposta.data.nome))
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault() // nao carrega a página

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso")
                })
                .catch(erro => {
                    console.log(erro)
                })

        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrato com sucesso")
                })
                .catch(erro => {
                    console.log(erro)
                })

        }



    }


    return (
        <>
       

            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>

                        {/* conteudo da página */}

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow:1 }}>
                            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                            <Box component='form' sx={{width:'100%'}} onSubmit={aoSubmeterForm}>
                                <TextField
                                    value={nomeRestaurante}
                                    onChange={event => setNomeRestaurante(event.target.value)}
                                    label="Nome do Restaurante" variant="standard"
                                    fullWidth
                                    required
                                />
                                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
                            </Box>
                        </Box>

                    </Paper>

                </Container>
            </Box>



        </>

    )

}
export default FormRestaurante