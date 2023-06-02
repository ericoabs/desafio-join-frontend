export interface ListProdutosResponse {
  id_produto: number
  id_categoria_produto: number
  data_cadastro: Date
  nome_produto: string
  valor_produto: number
  created_at: Date
  updated_at: Date
}

export interface ProdutoBody {
  id_categoria_produto: number
  nome_produto: string
  valor_produto: number
}
