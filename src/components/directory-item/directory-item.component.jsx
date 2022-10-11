import './directory-item.styles.scss'

const DirectoryItem=({category})=>{
   const {id,imageUrl,title}=category;
    return (
        <div key={id} className="directory-item-container">
          <div className="background-image" style={{
            backgroundImage:`url(${imageUrl})`
          }}/>
          <div className="body">
            <h2>{title}</h2>
            <a href={'/shop/' + title}>Shop Now</a>
          </div>
        </div>
    )
}
export default DirectoryItem;