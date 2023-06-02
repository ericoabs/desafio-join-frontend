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

const CardProduto = (props: Produto) => {
  const [editavel, setEditavel] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data: ProdutoBody) => {
    const payLoad = {
      id_categoria_produto: Number(data.id_categoria_produto),
      nome_produto: data.nome_produto,
      valor_produto: Number(data.valor_produto)
    }

    try {
      const response = await axios.put(`http://localhost/api/produtos/${props.id_produto}`, payLoad)
      console.log('Resposta da requisição:', response.data)
      setEditavel(false)
      handleSuccess(!shouldRerender)
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
    }
  }

  return (
    <>
      <Card sx={{ minWidth: 275, mt: 4 }}>
        <CardContent>
          <Typography>Produto: {props.nome_produto}</Typography>
          <Typography>ID: {props.id_produto}</Typography>
          <Typography>Valor: {props.valor_produto}</Typography>
          <Typography>ID da Categoria: {props.id_categoria_produto}</Typography>
          <Typography>Data de Cadastro: {props.data_cadastro.toString()}</Typography>
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
          <DeletarProduto id={props.id_produto} />
        </CardContent>

        {editavel ? (
          <CardContent>
            <form className='demo-space-x' onSubmit={handleSubmit(onSubmit)}>
              <TextField
                required
                id='nomeProduto'
                label='Nome do Produto'
                defaultValue='Nome do produto'
                {...register('nome_produto', { required: true })}
              />

              <TextField
                required
                id='valorProduto'
                type='number'
                label='Valor Produto'
                defaultValue='00.00'
                inputProps={{
                  step: 0.01
                }}
                {...register('valor_produto', { required: true })}
              />

              <TextField
                required
                id='idCategoriaProduto'
                type='number'
                label='ID da Categoria do Produto'
                defaultValue=''
                {...register('id_categoria_produto', { required: true })}
              />
              {errors.exampleRequired && <span>This field is required</span>}
              <Button
                type='submit'
                variant='contained'
                size={'large'}
                sx={{ alignSelf: 'center' }}
                endIcon={<Icon icon='bx:send' />}
              >
                Enviar
              </Button>
            </form>
          </CardContent>
        ) : null}
      </Card>
    </>
  )
}

export default CardProduto
