import { useEffect, useState } from "react"
import { cards } from './cards'

export default function NextScreen({ number }) {
    const [allImages, setAllImages] = useState(false)
    const [rowsArray, setRowsArray] = useState([])
    const [value, setValue] = useState(null)
    const [numberMatched, setNumberMatched] = useState(0)
    const [currentLives, setCurrentLives] = useState(cards[number].lives)

    useEffect(() => {
        let shorterArray = []
        fetch('/api/connection', {
            method: 'post',
            body: JSON.stringify(cards[number].realNumber)
        }).catch().then(result => {
            if (result.ok) {
                result.json().then(oldArray => {
                    oldArray.map(e => shorterArray.push({
                        image: e.urls.raw + "&w=500&h=500&fit=crop&crop=center",
                        user: e.user['first_name'],
                        profile: e.user.links.html,
                        id: e.id
                    }))
                    let longerArray = []
                    let randomizedArray = []
                    let loaded = 0
                    shorterArray.map(e => {
                        longerArray.push(e)
                        longerArray.push(e)
                        let image = new Image()
                        image.src = e.image
                        image.addEventListener('load', () => {
                            loaded++
                            if (loaded === cards[number].realNumber) setAllImages(true)
                        }, false)
                    })
                    longerArray.map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => randomizedArray.push(value))
                    const tempRowsArray = []
                    let rowSoFar = 1
                    let currentRow = []
                    for (let i = 0; i < randomizedArray.length; i++) {
                        if (rowSoFar !== cards[number].cardsPerRow) {
                            currentRow.push(randomizedArray[i])
                            rowSoFar++
                        } else {
                            currentRow.push(randomizedArray[i])
                            tempRowsArray.push(currentRow)
                            currentRow = []
                            rowSoFar = 1
                        }
                    }
                    setRowsArray(tempRowsArray)
                })
            }
        })
    }, [])

    if (rowsArray.length === 0) {
        return (
            <>Connecting to database...</>
        )
    } else {
        if (!allImages) {
            return <>Loading images...</>
        } else {
            return (
                <>
                    <div className="current-info">
                        <div className="cards-matched"><b>Cards Matched:</b> {numberMatched * 2}</div>
                        <div className="lives"><b>Lives:</b> {currentLives}</div>
                        {((currentLives !== 0) && ((numberMatched * 2) === cards[number].number)) ? <div className="won">YOU WON!</div> : null}
                        {(currentLives === 0) ? <div className="lost">Sorry, You Lost</div> : null}
                    </div>
                    {rowsArray.map((row, rowIndex) => {
                        return (
                            <div key={'row-' + (rowIndex + 1)} className="row">
                                {row.map((item, itemIndex) => {
                                    const key = 'item-' + (itemIndex + 1) + '-row-' + (rowIndex + 1)
                                    return (
                                        <div onClick={(e) => {
                                            if (currentLives !== 0) {
                                                if (!e.target.classList.contains('selected')) {
                                                    if (value === null) {
                                                        e.target.classList.add('selected')
                                                        console.log({ item: item.id, key, object: e })
                                                        setValue({ item: item.id, key, object: e })
                                                    } else {
                                                        if (key !== value.key) {
                                                            const htmlRows = Array.from(document.querySelectorAll(".row"))
                                                            htmlRows.map(htmlRow => htmlRow.classList.add('overlay'))
                                                            console.log(htmlRows)
                                                            e.target.classList.add('selected')
                                                            if (value.item === item.id) {
                                                                setNumberMatched(numberMatched + 1)
                                                                setValue(null)
                                                                htmlRows.map(htmlRow => htmlRow.classList.remove('overlay'))
                                                            } else {
                                                                setCurrentLives(currentLives - 1);
                                                                const tempObject = value.object
                                                                setTimeout(() => {
                                                                    e.target.classList.remove('selected')
                                                                    tempObject.target.classList.remove('selected')
                                                                    setValue(null)
                                                                    htmlRows.map(htmlRow => htmlRow.classList.remove('overlay'))
                                                                }, 500)
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }} key={key} className="card-holder">
                                            <div style={{ backgroundImage: `url(${item.image})` }} className="card-inside" tabIndex="0" role="button" aria-pressed="false">
                                                <div className="author"><a href={item.profile + '?utm_source=m3mory.io&utm_medium=referral'} target="_blank" rel="noreferrer">{item.user}</a> on <a href="https://unsplash.com/?utm_source=m3mory.io&utm_medium=referral" target="_blank" rel="noreferrer">Unplash</a></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </>
            )
        }
    }
}