// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import { Button, Grid, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ProdutoBody } from 'src/types/produtosServices'
import Icon from 'src/@core/components/icon'

const NovoProduto = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data: ProdutoBody) => {
    const payLoad = {
      id_categoria_produto: Number(data.id_categoria_produto),
      nome_produto: data.nome_produto,
      valor_produto: Number(data.valor_produto)
    }

    try {
      const response = await axios.post('http://localhost/api/produtos', payLoad)
      console.log('Resposta da requisição:', response.data)
      onSuccess()
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
    }
  }

  return (
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
  )
}

export default NovoProduto
