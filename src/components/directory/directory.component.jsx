import './directory.styles.scss';
import Data from './data.component';
import CategoryItem from "../category-item/category-item.component";
const Directory = () => {
  return (
    <div className="directory-container">
      {Data.map((category) => (
        <CategoryItem key={category.id} category={category}/>
      ))}
    </div>
  );
}
export default Directory;