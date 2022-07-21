import './styles/app.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { BASE_URL } from './globals'
import CharacterList from './components/CharacterList'
import CharacterDetails from './components/CharacterDetails'

const App = () => {
  const [characters, setCharacters] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const selectCharacter = (id) => {
    setSelectedCharacter(id)
  }

  const goBack = () => {
    setSelectedCharacter(null)
  }

  useEffect(() => {
    const getCharacters = async () => {
      const response = await axios.get(`${BASE_URL}/characters?limit=100&ts=${process.env.REACT_APP_TS}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_HASH}`)
      setCharacters(response.data.data.results)
    }
    getCharacters()
  }, [])

  const handlePageClick = (data) => {
    console.log(data.selected)
  }

  return (

    <div>
      <h1 className="title">Marvel Characters</h1>
      <ReactPaginate 
      previousLabel={'Previous'}
      nextLabel={'Next'}
      pageCount={17}
      onPageChange={handlePageClick}
      containerClassName={'pagination justify-content-center'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}    
      activeClassName={'active'}          
      />
      {selectedCharacter ? (
        <CharacterDetails selectedCharacter={selectedCharacter} goBack={goBack}/>
      ) : (
        <CharacterList characters={characters} selectCharacter={selectCharacter} />
      )}
    </div>
  )

}

export default App