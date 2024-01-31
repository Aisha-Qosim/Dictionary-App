import {React,useState} from 'react'
import image from '../src/image/dict.jpg'
import './Dictionary.css';
import axios from 'axios';

const Dictionary = () => {
  const [userInput, setUserInput] = useState('');
  const [word, setWord] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWord([]);
    try {
      if (userInput.length > 0) {
        const response = await axios.get(`${url}/${userInput}`);
        if (response) {
          setWord(response.data);
          setLoading(false);
        }
      }

      return;
    } catch (error) {
      setLoading(false);
      if (error) setError('Please input a valid English word');
    }
  };

  return (
    <div>
      <section >
        <div className='box'>
        <img src={image} alt='' />
        <h3>DICTIONARY APP</h3>

        <main>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={userInput}
              placeholder='Search word'
              onInput={handleChange}
            />
            <button type='submit'>Check word</button>
          </form>
        </main>
        </div>
      </section>
      <div className='contain'>
        {loading && <p className='p'>Loading...</p>}
        {word.length === 0 && !loading && (
          <p style={{color:"#fff"}} >Please search for an English word</p>
        )}
        {word.length > 0 ? (
          word.map((item) => (
            < div className='mains'>
              <h4 className='word-heading'>
                <a
                  href={item.sourceUrls[0]}
                  target='_blank'
                  style={{ textDecoration: 'none' }}>
                  {item.word}
                </a>
              </h4>
            
              <p className='p'>Phonetic: {item.phonetic}</p>
              {item.meanings.map((item) => (
                <>
                  <div className='meaning'>
                    <p className='p'>Part Of Speech: {item.partOfSpeech}</p>
                  </div>
                  <div className='def'>
                    {item.definitions.map((meaning) => (
                      <ul>
                        <li>
                          <p className=''>Definition: {meaning.definition}</p>
                        </li>
                      </ul>
                    ))}
                  </div>
                  < hr></hr>

                  {item.synonyms.length > 0 && <h5 className='p'>Synonyms</h5>}
                  <div className='sys'>
                    {item.synonyms.length > 0 &&
                      item.synonyms.map((synonyms) => (
                        <ul>
                          <li>
                            <p>{synonyms}</p>
                          </li>
                        </ul>
                      ))}
                  </div>

                  {item.antonyms.length > 0 && <h5 className='p'>Antonyms</h5>}
                  {item.antonyms.length > 0 &&
                    item.antonyms.map((antonyms) => (
                      <>
                        <ul>
                          <li>
                            <p>{antonyms}</p>
                          </li>
                        </ul>
                      </>
                    ))}
                </>
              ))}
            </div>
            
          ))
        ) : (
          <p>{error}</p>
        )}
      </div>
       </div>
    // </div>
  );
};

export default Dictionary;