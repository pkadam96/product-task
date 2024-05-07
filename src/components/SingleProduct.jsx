import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../css/singleProduct.css';

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            const url = `https://fakestoreapi.com/products/${id}`;
            try {
                const res = await fetch(url);
                const data = await res.json();
                setProduct(data);
                console.log(data);
            } catch (error) {
                console.error("Error in fetching product:", error);
            }
        };
        fetchProductDetails();
    }, [id]);

    return (
        <div className='productDetails'>
            <div className='image'>
                <img src={product.image} alt={product.title} />
            </div>
            <div className='details'>
                <h2 className="product-title">{product.title}</h2>
                <p><b>Category:</b> {product.category}</p>
                <p><b>Price:</b> ${product.price}</p>
                <p><b>Description:</b> {product.description}</p>
                {/* <p><b>Rating:</b> {product.rating.rate}</p>
                <p>({product.rating.count} reviews)</p> */}
            </div>
        </div>
    );
}

export { SingleProduct }