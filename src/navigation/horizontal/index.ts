// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Home',
    path: '/home',
    icon: 'bx:home-circle'
  },
  {
    title: 'Produtos',
    path: '/produtos',
    icon: 'carbon:product'
  },
  {
    title: 'Categorias',
    path: '/categorias',
    icon: 'fluent-mdl2:product-variant'
  },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'Access Control',
    icon: 'bx:shield'
  }
]

export default navigation
