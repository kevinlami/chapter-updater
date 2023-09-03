import React, { useState } from 'react';

function VerifyChapter() {
  const [url, setUrl] = useState('');
  const [page, setPage] = useState('');
  const [quantityChapter, setQuantityChapter] = useState('');
  const [lastChapter, setLastChapter] = useState('');
  const [resultado, setResultado] = useState('');
  const [urls, setUrls] = useState([]);

  const verifyPage = async (urlPage) => {
    return fetch(`http://localhost:3000/verificarPagina?url=${encodeURIComponent(urlPage)}`)
      .then(response => {
        if (response.status === 200) {
          return true
        } else if (response.status === 404) {
          return false
        } else {
          console.error("Erro ao verificar a página.", response);
          return false
        }
      })
      .catch(error => {
        console.error("Erro ao verificar a página:", error);
        return false
      });
  }

  const scanningWebSite = async () => {
    let lastPage = parseFloat(page) + 1
    let pageVefiry = false

    do {
      const urlPage = url.replace('%page%', lastPage)
      pageVefiry = await verifyPage(urlPage)
      lastPage = pageVefiry ? parseFloat(lastPage) + 1 : parseFloat(lastPage) - 1
      if (pageVefiry) {
        setUrls((prevUrls) => [...prevUrls, urlPage]);
      }
    } while (pageVefiry)

    if (parseFloat(lastPage) > parseFloat(page)) {
      const quantityCaps = parseFloat(lastPage) - parseFloat(page)
      const quantityCapsText = quantityCaps > 1 ? `capítulos` : `capítulo`
      setQuantityChapter(`Você possui: ${quantityCaps} ${quantityCapsText} para ler!`)
    }

    setLastChapter(`Você parou no capítulo:  ${page}`)
    setResultado(`Ultimo capítulo disponível: ${lastPage}`)
  }

  return (
    <div>
      <h1>Verificador de capitulo</h1>
      <div>
        <label>URL da Página:</label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div>
        <label>Página:</label>
        <input type="text" value={page} onChange={(e) => setPage(e.target.value)} />
      </div>
      <button onClick={scanningWebSite}>Verificar</button>
      <div>
        <h2>Resultado:</h2>
        <p>{quantityChapter}</p>
        <p>{lastChapter}</p>
        <p>{resultado}</p>
      </div>
      <div>
      <h2>Lista de Links:</h2>
      <ul>
        {urls.map((urlPage, index) => (
          <li key={index}>
            <a href={urlPage} target="_blank" rel="noopener noreferrer">
              Link {urlPage}
            </a>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default VerifyChapter;
