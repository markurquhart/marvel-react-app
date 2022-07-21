const CharacterList = (props) => {

  return (
    <div className="grid">
      {
        props.characters.map((character) => (
          <div key={character.id} className="card">
            <img 
            src = {character.thumbnail.extension === 'jpg' ? character.thumbnail.path + '.jpg' : character.thumbnail.path + '.gif'} 
            alt="poster" 
            onError={e => { e.currentTarget.src = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'; }}  />
            <h3>{character.name}</h3>
            <button onClick={() => props.selectCharacter(character.id)}>View Character</button>
          </div>  
        ))
      }
    </div>
  )
}

export default CharacterList