import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CharacterDetails = (props) => {
  const [characterDetails, setCharacterDetails] = useState(null)

  useEffect(() => {
    const getDetails = async () => {
      const response = await axios.get(`${BASE_URL}/characters/${props.selectedCharacter}?ts=${process.env.REACT_APP_TS}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_HASH}`)
      setCharacterDetails(response.data.data.results[0])
    }
    
    getDetails()
  }, [props.selectedCharacter])

  
  return (
    <div>
    {characterDetails ? (
        <Container>
          <Row>
            <Col>
            <div className="details">
              <div className="card">
                <img src={[characterDetails.thumbnail.path] + '.jpg'} alt="poster" />
              </div>
          </div>
            </Col>
            <Col>
            <h2>{characterDetails.name}</h2>
              <p>{characterDetails.description}</p>
              <p>Comics Appeared in: {characterDetails.comics.available}</p>  
              <button onClick={props.goBack}>Go Back</button>
            </Col>
          </Row>
          
        </Container>
      ) : (
        <h3>Jarvis is thinking...</h3>
      )}
      </div>
  )
      }


export default CharacterDetails