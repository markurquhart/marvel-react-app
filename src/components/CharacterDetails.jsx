import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

const CharacterDetails = (props) => {
  const [characterDetails, setCharacterDetails] = useState(null)

  useEffect(() => {
    const getDetails = async () => {
      const response = await axios.get(`${BASE_URL}/characters/${props.selectedCharacter}?ts=${process.env.REACT_APP_TS}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_HASH}`)
      console.log(response)
      setCharacterDetails(response.data.data.results[0])
    }
    getDetails()
  }, [props.selectedCharacter])

  return (
    <div>
      {characterDetails ? (
        <div className="details">
          <div className="card">
            <img src={[characterDetails.thumbnail.path] + '.jpg'} alt="poster" />
            <h2>{characterDetails.name}</h2>
            <p>{characterDetails.description}</p>
            <p>Released: {characterDetails.release_date}</p>
          </div>
          <button onClick={props.goBack}>Go Back</button>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  )
}

export default CharacterDetails