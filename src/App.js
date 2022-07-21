import './styles/app.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { BASE_URL } from './globals'
import CharacterList from './components/CharacterList'
import CharacterDetails from './components/CharacterDetails'
import BannerImage from './components/BannerImage'

const App = () => {
  const [characters, setCharacters] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  useEffect(() => {
    const getCharacters = async () => {
      const response = await axios.get(`${BASE_URL}/characters?limit=100&ts=${process.env.REACT_APP_TS}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_HASH}`)
      const characterList = response.data.data.results
      setCharacters(characterList)      
    }
    getCharacters()
  }, [])

  const handlePageClick = async (data) => {
    let currentPage = data.selected
    const newCharacterPage = await getMoreCharacters(currentPage)
    setCharacters(newCharacterPage)
  }

  const getMoreCharacters = async (currentPage) => {
    const response = await axios.get(`${BASE_URL}/characters?limit=100&&offset=${currentPage * 100}&ts=${process.env.REACT_APP_TS}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_HASH}`)
    const data = await response.data.data.results
    console.log(data)
    return data
  }

  const selectCharacter = (id) => {
    setSelectedCharacter(id)
  }

  const goBack = () => {
    setSelectedCharacter(null)
  }

  return (

    <div>
      <BannerImage />

      {selectedCharacter ? (
        <CharacterDetails selectedCharacter={selectedCharacter} goBack={goBack}/> 
      ) : (
        <>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={16}
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
            activeClassName={'active'} />
          <CharacterList characters={characters} selectCharacter={selectCharacter} />
          </>
      )}
    </div>
  )

}

export default App