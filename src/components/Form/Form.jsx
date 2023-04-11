import React from 'react';
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'; 
import { useState } from 'react';
import { Button, SearchForm, Searchbar} from './Form.Styled';
 export  const Form  = ({ onSubmit })  => {
   
     const  [searchImgName, setSearchImgName] = useState('');
    
    const handleChange = e => { 
      setSearchImgName (e.currentTarget.value.toLowerCase());
    }
 const handleSubmit = e => {
    e.preventDefault();
    if (searchImgName.trim() === '') {
      return toast.error('Write search name');
    }
    onSubmit(searchImgName)
    setSearchImgName('');
};
 
return (
<Searchbar>
<SearchForm onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchImgName"
          value={searchImgName}
          autoComplete="off"
          placeholder="Search images..."
          onChange={handleChange}
        />
        <Button type="submit">Search</Button>
      </SearchForm>
   </Searchbar>
);

}
 
 Form.propTypes = {searchImgName: PropTypes.string, 
      handleSubmit: PropTypes.func,
      handleChange: PropTypes.func,
 }