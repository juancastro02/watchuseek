import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import "./category.css";
import {getCategories, getCategory} from '../../Redux/categories/categories.js';
import {connect} from 'react-redux'

const Category =({allCategories,currentCategory,setCategories})=>{
  
  const [input, setInput] = useState({
        id: null,
        name: "",
        description: "",
        price: null,
        stock: null,
        image: "",
        category: null
  });

  useEffect(() => {
    setCategories();
},[])

  const handleSearch = (data) => {
    setInput(data);
  }

    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault();
      }


      const handleUpdate = async() => {

        const urlApi = `http://localhost:3001/category/${input.id}`;
        const dataPost = {
          name: input.name,
          description: input.description
        };
        await axios.put(urlApi , dataPost);
        setCategories();
        setInput(currentCategory);
      }

     const handleCreate= async()=>{
        const urlApi = 'http://localhost:3001/category/create';
        const dataPost = {
          name: input.name,
          description: input.description
        };

        await axios.post(urlApi , dataPost);
        alert('Agregado correctamente');
        setCategories();
        setInput(currentCategory);
     }

     const handleDelete = async  () => {
        await axios.delete (`http://localhost:3001/category/${input.id}`);
        alert('Se ha eliminado correctamente');
        setCategories();
        setInput(currentCategory);
      }
      

     return(
        <div className = "contentCategory">

        <div className = "divcategories">
          <h1>Categorias</h1>
          {allCategories && allCategories.map(function(c){
            return <Link onClick={() => handleSearch(c)} value={c.id} >{c.name}</Link> 
          })}<br/>
        </div>


        <form onSubmit = {(e) => handleSubmit(e)} className='Form' >
            <div >

            <div>
                <label>Categoria:</label><br/>
                <input type = "text" autoComplete = "off" name = "name" onChange={(e) =>handleInputChange(e)} value = {input["name"]} />
            </div>
            <div>
                <label>Descripción:</label><br/>
                <input type = "text" autoComplete = "off" name = "description" onChange={(e) =>handleInputChange(e)} value = {input["description"]} />
            </div>
            <div className = "divcategoriesbuttons">
            <button type = "submit" className='buttonAddCat' onClick={()=>handleCreate()} >Add</button>
            <button type = "submit" className='buttonEditCat' onClick={()=> handleUpdate()} >Edit</button>
            <button type = "submit" className='buttonDeleteCat' onClick={(e)=> handleDelete(e)} >Delete</button>
            </div>
            </div>
    
        </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
  setCategories: () => dispatch(getCategories()),
  setCategory: () => dispatch(getCategory())
})

const mapStateToProps = state => ({
  currentCategory: state.categories.category,
  allCategories: state.categories.categories,
})

export default connect(mapStateToProps,mapDispatchToProps)(Category)