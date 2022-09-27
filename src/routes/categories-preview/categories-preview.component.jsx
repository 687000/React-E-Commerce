import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoriesMap} from "../../store/categories/catrgory.selector";
import { useSelector } from "react-redux";
const CategoriesPreview=()=>{
    const categories=useSelector(selectCategoriesMap);
    return (
        <Fragment>
            {Object.keys(categories).map((title)=>{
            const products=categories[title];
            return(
            <CategoryPreview key={title} title={title} products={products}/>
            );
        })}
        </Fragment>
    );
};
export default CategoriesPreview;