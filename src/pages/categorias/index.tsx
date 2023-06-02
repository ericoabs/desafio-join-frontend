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
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Categoria, CategoriaBody } from 'src/types/categoria'
import BuscarCategoria from 'src/components/Categorias/BuscarCategoria'
import DeletarCategoria from 'src/components/Categorias/DeletarCategoria'
import FormCategoria from 'src/components/Categorias/FormCategoria'

const Categorias = () => {
  const [categorias, setCategorias] = useState<CategoriaBody[]>([])

  const atualizarListagem = async () => {
    try {
      const response = await axios.get('http://localhost/api/categorias')
      setCategorias(response.data)
    } catch (error) {
      console.error('Erro ao obter produtos:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/api/categorias')
        setCategorias(response.data)
      } catch (error) {
        console.error('Erro ao obter categorias:', error)
      }
    }

    fetchData()
  }, [])

  function createData(categoria: Categoria) {
    const { id_categoria_planejamento, nome_categoria } = categoria

    return { id_categoria_planejamento, nome_categoria }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='demo-space-y'>
        <Card></Card>

        <Card>
          <CardContent>
            <BuscarCategoria />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Grid container justifyContent='space-between' alignContent='center'>
              <Grid item>
                <CardHeader title='Lista de Categorias'></CardHeader>
              </Grid>
              <Grid alignSelf='center' item>
                <FormCategoria atualizarListagem={atualizarListagem} />
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome da Categoria</TableCell>
                    <TableCell align='left'>ID da Categoria</TableCell>
                    <TableCell align='right'>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categorias.map((categoria: Categoria) => {
                    const { id_categoria_planejamento, nome_categoria } = createData({
                      ...categoria
                    })

                    return (
                      <TableRow
                        key={id_categoria_planejamento}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component='th' scope='row'>
                          {nome_categoria}
                        </TableCell>
                        <TableCell align='left'>{id_categoria_planejamento}</TableCell>
                        <TableCell className='demo-space-x' align='right'>
                          <FormCategoria
                            id={id_categoria_planejamento}
                            nome={nome_categoria}
                            atualizarListagem={atualizarListagem}
                          />
                          <DeletarCategoria id={id_categoria_planejamento} atualizarListagem={atualizarListagem} />
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

export default Categorias
