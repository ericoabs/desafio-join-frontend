// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import { CategoriaBody } from 'src/types/categoria'
import { Fab } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'

interface IFormCategoria {
  id?: number
  nome?: string
  atualizarListagem: () => Promise<void>
}

const FormCategoria = ({ id, nome, atualizarListagem }: IFormCategoria) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const onSubmitEdit = async (data: CategoriaBody) => {
    console.log(data)
    try {
      const response = await axios.put(`http://localhost/api/categorias/${id}`, data)
      atualizarListagem()

      console.log('Resposta da requisição:', response.data)
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
    } finally {
      toast.success('Categoria editada com sucesso!')
      handleClose()
    }
  }

  const onSubmitAdd = async (data: CategoriaBody) => {
    console.log(data)

    try {
      const response = await axios.post('http://localhost/api/categorias', data)
      await atualizarListagem()
      console.log('Resposta da requisição:', response.data)
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
    } finally {
      toast.success('Categoria adicionada com sucesso!')
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
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>Nome</DialogContentText>

            <TextField
              required
              autoFocus
              fullWidth
              id='nomeCategoria'
              label='Nome da Categoria'
              defaultValue={nome || 'Nome da Categoria'}
              {...register('nome_categoria', { required: true })}
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

export default FormCategoria
