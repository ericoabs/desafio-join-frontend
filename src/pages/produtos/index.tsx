// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Produto } from '../../types/produto'
import { useEffect, useState } from 'react'
import axios from 'axios'
import BuscarProduto from 'src/components/Produtos/BuscarProduto'
import FormProduto from 'src/components/Produtos/FormProduto'
import DeletarProduto from 'src/components/Produtos/DeletarProduto'

const Produtos = () => {
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/api/produtos')
        setProdutos(response.data)
      } catch (error) {
        console.error('Erro ao obter produtos:', error)
      }
    }

    fetchData()
  }, [])

  const atualizarListagem = async () => {
    try {
      const response = await axios.get('http://localhost/api/produtos')
      setProdutos(response.data)
    } catch (error) {
      console.error('Erro ao obter produtos:', error)
    }
  }

  function createData(produto: Produto) {
    const { nome_produto, valor_produto, id_produto, id_categoria_produto, data_cadastro } = produto

    const formattedDate = new Date(data_cadastro).toLocaleDateString('pt-br')

    return { nome_produto, valor_produto, id_produto, id_categoria_produto, data_cadastro: formattedDate }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='demo-space-y'>
        <Card>
          <CardContent>
            <BuscarProduto />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container justifyContent='space-between' alignContent='center'>
              <Grid item>
                <CardHeader title='Lista de Produtos'></CardHeader>
              </Grid>
              <Grid alignSelf='center' item>
                <FormProduto atualizarListagem={atualizarListagem} />
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome do Produto</TableCell>
                    <TableCell align='right'>Valor do Produto</TableCell>
                    <TableCell align='right'>ID do Produto</TableCell>
                    <TableCell align='right'>ID da Categoria do Produto</TableCell>
                    <TableCell align='right'>Data de Cadastro</TableCell>
                    <TableCell align='right'>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {produtos.map((produto: Produto) => {
                    const { nome_produto, valor_produto, id_produto, id_categoria_produto, data_cadastro } = createData(
                      {
                        ...produto
                      }
                    )

                    return (
                      <TableRow key={id_produto} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component='th' scope='row'>
                          {nome_produto}
                        </TableCell>
                        <TableCell align='right'>R$ {valor_produto}</TableCell>
                        <TableCell align='right'>{id_produto}</TableCell>
                        <TableCell align='right'>{id_categoria_produto}</TableCell>
                        <TableCell align='right'>{data_cadastro}</TableCell>
                        <TableCell className='demo-space-x' align='right'>
                          <FormProduto
                            id={id_produto}
                            valor={valor_produto}
                            nome={nome_produto}
                            id_categoria={id_categoria_produto}
                            data_cadastro={data_cadastro}
                            atualizarListagem={atualizarListagem}
                          />

                          <DeletarProduto id={id_produto} atualizarListagem={atualizarListagem} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Produtos
