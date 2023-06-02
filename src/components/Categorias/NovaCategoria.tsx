// ** MUI Imports
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Icon from 'src/@core/components/icon'
import { CategoriaBody } from 'src/types/categoria'

interface INovaCategoria {
  atualizarListagem: () => Promise<void>
}

const NovaCategoria = ({ atualizarListagem }: INovaCategoria) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data: CategoriaBody) => {
    console.log(data)

    try {
      const response = await axios.post('http://localhost/api/categorias', data)
      await atualizarListagem()
      console.log('Resposta da requisição:', response.data)
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
    }
  }

  return (
    <form className='demo-space-x' onSubmit={handleSubmit(onSubmit)}>
      <TextField
        required
        id='nomeCategoria'
        label='Nome da Categoria'
        defaultValue='Nome da categoria'
        {...register('nome_categoria', { required: true })}
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

export default NovaCategoria
