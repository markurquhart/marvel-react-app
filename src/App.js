import './styles/app.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import md5 from 'md5-hash'
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
    const TIMESTAMP = Date.now()
    const HASH = md5(`${TIMESTAMP} + ${process.env.REACT_APP_PRIVATE_KEY} + ${process.env.REACT_APP_PUBLIC_KEY}`)
    const getCharacters = async () => {
      const response = await axios.get(`${BASE_URL}/characters?ts=${TIMESTAMP}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${HASH}`)
      setCharacters(response.data.results)
    }
    getCharacters()
  }, [])

  return (
    <div>
      <h1 className="title">Marvel Characters</h1>
      {selectedCharacter ? (
        <CharacterDetails selectedCharacter={selectedCharacter} goBack={goBack}/>
      ) : (
        <CharacterList characters={characters} selectMovie={selectCharacter} />
      )}
    </div>
  )
}

export default App