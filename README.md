# Marvel Database App

This project was part of the curriculum for a General Assembly class for Javascript Essentials.


## General Idea

This react app will use useState and useEffect hooks to query Marvel's API to initially load the page.  For the first interface where we list out all the characters in the intiall GET request, I added in Pagination so that when you ask to move to the second 'page' you are iterating through the next series of results from the Marvel API.

**Note:**  The Marvel API requires a few parameters in the queryString for your GET requests, to receive a 200 ok back, that took me a little while to figure out. 

Code sample from App.js and comments - variables are being pulled from .env

      useEffect(() => {
        const getCharacters = async () => {
          const response = await axios.get(`${BASE_URL}/characters?limit=100&ts=${process.env.REACT_APP_TS}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_HASH}`)
          const characterList = response.data.data.results
          setCharacters(characterList)      
        }
        getCharacters()
      }, [])

Query string parameters: 
 
 - An initial limit (100 was my choice, which is the max per request)
 - A timestamp in epoch format 
 - Your public API key, generated from the Marvel Developer Portal 
 - An MD5 hash that concatenates your: 

In later calls I added in an offset parameter for pagination, to pull the next batch of Characters. 

The app will have two views - a list of characters, and a chance to look at the details of a character.  


## Credit

The core code behind app.js and components were inspired from a lesson in a General Assembly class I took.  Enhancements, additions and modifications were from me.  Credit to [Michael Lackey](https://github.com/mlackey9601/mlackey9601) and crew. 
