import { useState } from "react"
import NextScreen from '../components/nextScreen';
import { cards } from '../components/cards'

export default function Home() {
  const [nmbrSelected, setnmbrSelected] = useState(0);
  const [nextScreen, setNextScreen] = useState(false);
  return (
    <>
      <div className="top-section">
        <header>
          <div className="container">
            <h1>m<span>3</span>mory<span>.io</span></h1>
          </div>
        </header>
        <nav><div className="container"><div>{nextScreen === false ? <>Select Game Mode</> : <>Currently Playing: <b>{cards[nmbrSelected].number} Cards</b></>}</div></div></nav>
        <main className={nextScreen === false ? 'home' : null}>
          <div className="container">
            {
              nextScreen === false ?
                <>
                  {
                    cards.map((e, index) => {
                      if (index === nmbrSelected) {
                        return <button key={index} className="game-mode-btn selected" disabled>{e.number} Cards</button>
                      } else {
                        return <button key={index} className="game-mode-btn" onClick={() => setnmbrSelected(index)}>{e.number} Cards</button>
                      }
                    })
                  }
                  <p>
                    <button className="start-game" onClick={() => setNextScreen(true)}>Start Game</button>
                  </p>
                </>
                :
                <>
                  <p className="btn-container">
                    <button className="start-over" onClick={() => {
                      setNextScreen(false)
                      setnmbrSelected(0)
                    }}>Start Over</button>

                  </p>
                  <div className="cards-container">
                    <NextScreen number={nmbrSelected} />
                  </div>
                </>
            }
          </div>
        </main>
      </div>
      <div className="bottom-section">
        <footer>
          <div className="container">
            <p>
              <span>Made with</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path></svg>
              <span>and <a href="https://github.com/JesusMejias/m3mory.io" target="_blank" rel="noreferrer">open sourced</a> by <a href="https://jesusmejias.com" target="_blank" rel="noreferrer">Jesús Mejías</a>.</span>
            </p>
            <p><span>Images from <a href="https://unsplash.com/?utm_source=m3mory.io&utm_medium=referral" target="_blank" rel="noreferrer">Unplash</a>.</span></p>
          </div>
        </footer>
      </div>
    </>
  )
}
