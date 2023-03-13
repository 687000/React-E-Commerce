import './directory-item.styles.scss'

const DirectoryItem=({category})=>{
   const {id,imageUrl,title}=category;
    return (
        <a href={'/shop/' + title} key={id} className="directory-item-container">
          <div className="background-image" style={{
            backgroundImage:`url(${imageUrl})`
          }}/>
          <div className="body">
            <h2>{title.toUpperCase()}</h2>
            <p>Shop Now</p>
          </div>
        </a>
    )
}
export default DirectoryItem;