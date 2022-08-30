import './directory.styles.scss';
import Data from './data.component';
import DirectoryItem from '../directory-item/directory-item.component';
const Directory = () => {
  return (
    <div className="directory-container">
      {Data.map((category) => (
        <DirectoryItem key={category.id} category={category}/>
      ))}
    </div>
  );
}
export default Directory;