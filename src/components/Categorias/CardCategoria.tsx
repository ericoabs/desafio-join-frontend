import { Produto } from 'src/types/produto'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DeletarProduto from './DeletarProduto'
import Icon from 'src/@core/components/icon'
import { useState } from 'react'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ProdutoBody } from 'src/types/produtosServices'
import axios from 'axios'
import { Categoria, CategoriaBody } from 'src/types/categoria'
import DeletarCategoria from './DeletarCategoria'

const CardCategoria = (props: Categoria) => {
  const [editavel, setEditavel] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data: CategoriaBody) => {
    try {
      const response = await axios.put(
        `http://localhost/api/produtos/${props.id_categoria_planejamento}`,
        data.nome_categoria
      )
      console.log('Resposta da requisição:', response.data)
      setEditavel(false)
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
    }
  }

  return (
    <>
      <Card sx={{ minWidth: 275, mt: 4 }}>
        <CardContent>
          <Typography>Categoria: {props.nome_categoria}</Typography>
          <Typography>ID: {props.id_categoria_planejamento}</Typography>
        </CardContent>
        <CardContent className='demo-space-x'>
          <Button
            size='large'
            variant='contained'
            onClick={() => setEditavel(!editavel)}
            endIcon={<Icon icon='material-symbols:edit' />}
          >
            Editar
          </Button>
          <DeletarCategoria id={props.id_categoria_planejamento} />
        </CardContent>
      </Card>
    </>
  )
}

export default CardCategoria
