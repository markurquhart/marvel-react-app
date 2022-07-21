import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const CharacterList = (props) => {

  return (
    <div className="grid">
      {
        props.characters.map((character) => (
          <Card key={character.id} style={{ width: '32vw' }}>
            <Card.Img 
            variant="top" 
            src = {character.thumbnail.extension === 'jpg' ? character.thumbnail.path + '.jpg' : character.thumbnail.path + '.gif'} 
            alt="poster" 
            onError={e => { e.currentTarget.src = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'; }}  />
            <Card.Body>
              <Card.Title>{character.name}</Card.Title>
              <Card.Text>Appeared in: {character.comics.available} Comics</Card.Text>
              <Card.Text>
              {character.description === '' ?                 
                <Badge bg="danger">Missing description</Badge> : 
                <Badge bg="success">Description available</Badge>}
              </Card.Text>
              <button onClick={() => props.selectCharacter(character.id)}>View Character</button>
            </Card.Body>
            </Card>
        ))
      }
    </div>
  );
}

export default CharacterList;





