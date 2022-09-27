import { useState,useEffect } from 'react';
import {useParams} from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer,CategoryTitle } from './category.styles';

import { useSelector } from 'react-redux';
import { selectCategoriesMap} from '../../store/categories/catrgory.selector';
const Category=()=>{
    const {category}=useParams();
    const categories=useSelector(selectCategoriesMap);
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        setProducts(categories[category]);
    },[category,categories]);
        return(
        <>
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        <CategoryContainer>
            {
                products&&products.map((product)=><ProductCard key={product.id} product={product}/>)
            }
        </CategoryContainer>
        </>
    )
}
export default Category;