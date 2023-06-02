import { Button, Dialog, DialogActions, DialogTitle, Fab } from '@mui/material'
import axios from 'axios'
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'
import { useState } from 'react'

interface IDeletarCategoria {
  id: number
  atualizarListagem: () => Promise<void>
}

const DeletarCategoria = ({ id, atualizarListagem }: IDeletarCategoria) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost/api/categorias/${id}`)
      atualizarListagem()
      console.log(response)
    } catch (error) {
      console.error('Erro ao obter produtos:', error)
    } finally {
      toast.success('Categoria removida com sucesso!')
    }
  }

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <>
      <Fab color='error' aria-label='edit' onClick={handleClickOpen}>
        <Icon icon='bx:trash-alt' />
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Tem certeza que quer deletar o produto?</DialogTitle>
        <DialogActions>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancelar
          </Button>

          <Button
            type='submit'
            variant='outlined'
            color='error'
            size={'large'}
            sx={{ alignSelf: 'center' }}
            onClick={handleDelete}
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeletarCategoria
