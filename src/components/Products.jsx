import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../css/product.css'

function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://fakestoreapi.com/products';
            try {
                const res = await fetch(url);
                const data = await res.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error in fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const result = products.filter(ele =>
            ele.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(result);
    };

    const handleFilter = (event) => {
        const value = event.target.value;
        setSelectedCategory(value);
        if (value === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(ele => ele.category === value);
            setFilteredProducts(filtered);
        }
    };

    return (
        <div>
            <div className='top'>
                <h2 className='title'>Products</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Search By Product Name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <select
                        value={selectedCategory}
                        onChange={handleFilter}
                    >
                        <option value="all">All Categories</option>
                        {products.reduce((uniqueCategories, product) => {
                            if (!uniqueCategories.includes(product.category)) {
                                uniqueCategories.push(product.category);
                            }
                            return uniqueCategories;
                        }, []).map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
            {filteredProducts.length > 0 ? (
                <div className='container'>
                    {filteredProducts.map((ele) => (
                        <div className='product' key={ele.id}>
                            <div className='product-image'>
                                <img src={ele.image} alt={ele.title} />
                            </div>
                            <div className='product-details'>
                                <h1>
                                    <Link to={`/product/${ele.id}`} className="product-title">{ele.title}</Link>
                                </h1>
                                <p><b>Category:</b> {ele.category}</p>
                                <p><b>Price:</b> ${ele.price}</p>
                                <p><b>Description:</b> {ele.description}</p>
                                <p><b>Rating:</b> {ele.rating.rate} ({ele.rating.count} reviews)</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export { Products };
