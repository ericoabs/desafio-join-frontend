// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import { Fab } from '@mui/material'
import toast from 'react-hot-toast'
import { ProdutoBody } from 'src/types/produtosServices'

interface IFormProduto {
  id?: number
  nome?: string
  valor?: number
  id_categoria?: number
  data_cadastro?: string
  atualizarListagem: () => Promise<void>
}

const FormProduto = ({ id, nome, valor, id_categoria, data_cadastro, atualizarListagem }: IFormProduto) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const onSubmitEdit = async (data: ProdutoBody) => {
    const payLoad = {
      id_categoria_produto: Number(data.id_categoria_produto),
      nome_produto: data.nome_produto,
      valor_produto: Number(data.valor_produto)
    }

    console.log(id)

    try {
      const response = await axios.put(`http://localhost/api/produtos/${id}`, payLoad)
      await atualizarListagem()

      console.log('Resposta da requisição:', response.data)
      toast.success('Produto editado com sucesso!')
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
      toast.error('Erro ao editar o produto.')
    } finally {
      handleClose()
    }
  }

  const onSubmitAdd = async (data: ProdutoBody) => {
    console.log(data)

    try {
      const response = await axios.post('http://localhost/api/produtos', data)
      await atualizarListagem()
      console.log('Resposta da requisição:', response.data)
      toast.success('Produto adicionado com sucesso!')
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
      toast.error('Erro ao adicionar o produto')
    } finally {
      handleClose()
    }
  }

  const isAdd = !id && !nome

  return (
    <>
      {isAdd ? (
        <Button variant='outlined' onClick={handleClickOpen}>
          {isAdd ? 'Adicionar Novo Produto' : `Editar`}
        </Button>
      ) : (
        <Fab color='primary' aria-label='edit' sx={{ p: 0, m: 0 }} onClick={handleClickOpen}>
          <Icon icon='bx:pencil' />
        </Fab>
      )}

      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>
          {isAdd ? 'Adicionar Novo Produto' : `Edição do produto ${nome}`}
        </DialogTitle>

        <form className='demo-space-x' onSubmit={handleSubmit(isAdd ? onSubmitAdd : onSubmitEdit)}>
          <DialogContent className='demo-space-x'>
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
          </DialogContent>

          <DialogActions>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancelar
            </Button>

            <Button
              type='submit'
              variant='contained'
              size={'large'}
              sx={{ alignSelf: 'center' }}
              endIcon={<Icon icon='bx:send' />}
            >
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default FormProduto
