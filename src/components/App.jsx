
import  {useEffect, useState} from 'react';
import { Form } from './Form/Form';
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader} from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import axios from 'axios';
import { Container } from './App.Styled';
import 'react-toastify/dist/ReactToastify.css'
export  const App = () => {

  
 
      
      const [imgSearch, setImgSearch] = useState('')
      const [page, setPage] = useState(1)
      const [images, setImages] = useState([])
      const [isLoading, setIsLoading] = useState(false)
      const [modalImg, setModalImg] = useState('');
      
    
    const FormSubmitHandler = ({ imgSearch }) => {
      setImgSearch(imgSearch);
       setImages([]);
       setPage(1);
       
       
       
      };
  useEffect(() => {
    if (imgSearch === '') 
      return;
    
   const fetch = async (imgSearch, page) => {
     /* if (
        prevState.imgSearch !== this.state.imgSearch ||
        prevState.page !== this.state.page
      ) {
        this.setState({ isLoading: true });*/
        try {
          setIsLoading(true)
          const response = await axios({
             url: 'https://pixabay.com/api/',
            params: {
              key: '31354257-dee15866aed277984dcd7ccaa',
              q: imgSearch,
              image_type: 'photo',
              orientation: 'horizontal',
              safesearch: true,
              per_page: 12,
              page: page,
            },
          })
          
  
          if (response.totalHits === 0) {
            return toast.error('Sorry, didn`t find, try another');
          }
  
          if (response.data.hits.length) {
            return setImages(prevImages => 
             [...prevImages, ...response.data.hits],
            );
          } else {
            return toast.error(
              'Sorry, there are no images matching your search query.'
            );
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setIsLoading(false);
          
        }
      }
    fetch(); 
  }, [imgSearch, page]);
 
    
      
  const toggleModal = (image) => {
    setModalImg(image);
  };

  const loadMore = event => {
    event.preventDefault();
   setPage(pr => ({
      page: pr.page + 1,
    }));
  };
    
  
  

  
   
  
    
      
  
    
    return (
      
      <Container>
        <Form  onSubmit={FormSubmitHandler}/>
        <ImageGallery images={images} onClick={toggleModal} />
        {isLoading === 'true' && <Loader />}
       
        {modalImg && <Modal image={modalImg} onModalClose={toggleModal} />}
        {images.length >= 12 && <Button loadMore ={loadMore}/>
      }
        <ToastContainer />
         
 </Container>
        




    );
    }
  

  
  