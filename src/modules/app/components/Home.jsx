import { useProductStore } from '../../../store/useProductStore.js'
import { useCategoryStore } from '../../../store/useCategoryStore.js'
import { ProductsNotFound, ProductsOverview } from '../../products/index.js'
import { Loader } from '../../common/index.js'
import { useEffect } from 'react'

const Home = () => {
  const {
    products,
    findProducts,
    searchKeywords,
    currentPage,
    rating,
    getLoading,
    getNoResults
  } = useProductStore((state) => ({
    products: state.getProducts(),
    findProducts: state.findProducts,
    searchKeywords: state.getSearchKeywords(),
    currentPage: state.getCurrentPage(),
    rating: state.getRating(),
    getLoading: state.getLoading(),
    getNoResults: state.getNoResults()
  }))

  const selectedCategory = useCategoryStore((state) =>
    state.getSelectedCategory()
  )

  useEffect(() => {
    findProducts(
      selectedCategory ? selectedCategory.id : null,
      searchKeywords,
      rating,
      currentPage
    )

    console.log(products)
  }, [selectedCategory, searchKeywords, currentPage, findProducts, rating])

  if (getLoading) return <Loader />
  if (getNoResults) return <ProductsNotFound />

  return <ProductsOverview products={products} />
}

export default Home
