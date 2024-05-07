import { Route, Routes } from "react-router-dom"
import { Products } from "../components/Products"
import { SingleProduct } from "../components/SingleProduct"

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />
    </Routes>
  )
}

export default AllRoutes