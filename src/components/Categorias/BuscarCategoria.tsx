// ** MUI Imports
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import CardCategoria from './CardCategoria'
import Icon from 'src/@core/components/icon'
import toast, { Toaster } from 'react-hot-toast'
import { Categoria } from 'src/types/categoria'

const BuscarCategoria = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const [categoria, setCategoria] = useState<Categoria>()

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const onSubmit = async id => {
    const id_categoria = Number(id.id_categoria)

    try {
      const response = await axios.get(`http://localhost/api/categorias/${id_categoria}`)
      setCategoria(response.data)
      handleOpen()
    } catch (error) {
      if (error.response.status) {
        toast.error('Categoria não encontrado.')

        return
      }
      console.error('Erro ao obter categorias.', error)
    }
  }

  return (
    <>
      <form className='demo-space-x' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          id='idCategoria'
          type='number'
          label='ID da Categoria'
          defaultValue=''
          {...register('id_categoria', { required: true })}
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

      {categoria && (
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Detalhes da Categoria {categoria.id_categoria_planejamento}</DialogTitle>

          <DialogContent>
            <DialogContentText fontWeight={600} sx={{ mb: 3 }}>
              Nome
            </DialogContentText>
            <DialogContentText sx={{ mb: 3 }}>{categoria.nome_categoria}</DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default BuscarCategoria
