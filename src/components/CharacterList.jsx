const CharacterList = (props) => {

  return (
    <div className="grid">
      {
        props.characters.map((character) => (
          <div key={character.id} className="card">
            <img src={character.thumbnail.path + '.jpg'} alt="poster" />
            <h3>{character.name}</h3>
            <button onClick={() => props.selectCharacter(character.id)}>View Character</button>
          </div>  
        ))
      }
    </div>
  )
}

export default CharacterList