// ** MUI Imports
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { Produto } from 'src/types/produto'
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'

const BuscarProduto = () => {
  const [produto, setProduto] = useState<Produto>()
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const formatDate = (date: Date) => new Date(date).toLocaleDateString('pt-br')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async id => {
    const id_produto = Number(id.id_produto)

    try {
      const response = await axios.get(`http://localhost/api/produtos/${id_produto}`)
      setProduto(response.data)
      handleOpen()
    } catch (error) {
      if (error.response.status) {
        toast.error('Produto não encontrado.')

        return
      }
      console.error('Erro ao obter produtos.', error)
    }
  }

  return (
    <>
      <form className='demo-space-x' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          id='idProduto'
          type='number'
          label='ID do Produto'
          defaultValue=''
          {...register('id_produto', { required: true })}
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
      {produto && (
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Detalhes do Produto</DialogTitle>

          <DialogContent>
            <DialogContentText fontWeight={600} sx={{ mb: 3 }}>
              Nome do Produto: {produto.nome_produto}
            </DialogContentText>
            <DialogContentText sx={{ mb: 3 }}>Valor: R$ {produto.valor_produto}</DialogContentText>
            <DialogContentText sx={{ mb: 3 }}>Data de Cadastro: {formatDate(produto.data_cadastro)}</DialogContentText>
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

export default BuscarProduto
