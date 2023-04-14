import { useEffect, useState } from 'react'
import { remove } from 'remove-accents'
import './App.css'
import { useLanguage } from './hooks/useLanguage'
import CorrectIcon from './images/CorrectIcon.png'
import IncorrectIcon from './images/InccorectIcon.png'

import { translations } from './translations'


function App() {


  const api = {
    key: "94be210dd3afdbad9446b5609e44270d",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  const [isCorrect, setIsCorrect] = useState<boolean>()
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState({
    temperature: 0,
    description: "",
    icon: "",
    country: ""
  })

  const { lang, image, otherLangs, title, changeLanguage, placeholderText } = useLanguage()

  const imgIcon = `${weather.icon}`
  const imgSrc = "https://openweathermap.org/img/wn/" + `${imgIcon}.png`


  function getCityName(event: any) {
    let cityInput = event.target.value
    let city = cityInput.charAt(0).toUpperCase() + cityInput.slice(1)
    if (event.key === "Enter" && city != "") {

      fetch(`${api.base}weather?q=${city}&appid=${api.key}&lang=${lang}&units=metric`)
        .then(res => res.json())
        .then(result => {
          if (result.message === "city not found") {
            setIsCorrect(false)
          } else if (remove(result.name) === remove(city)) {
            setIsCorrect(true)
            setCity(city)
            setWeather(() => ({
              temperature: Math.round(result.main.temp),
              description: result.weather[0].description,
              icon: result.weather[0].icon,
              country: result.sys.country
            }))
          }

        })

    }

  }

  function displayDate() {
    let dayWeek = ""
    let month = ""
    const d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();

    if (lang === "en") {
      dayWeek = translations.English.daysWeek[(d.getDay()) - 1]
      month = translations.English.monthsYear[d.getMonth()]
    } else if (lang === "fr") {
      dayWeek = translations.French.daysWeek[d.getDay() - 1]
      month = translations.French.monthsYear[d.getMonth()]
    } else if (lang === "it") {
      dayWeek = translations.Italian.daysWeek[d.getDay() - 1]
      month = translations.Italian.monthsYear[d.getMonth()]
    } else if (lang === "es") {
      dayWeek = translations.Spanish.daysWeek[d.getDay() - 1]
      month = translations.Spanish.monthsYear[d.getMonth()]
    } else if (lang === "de") {
      dayWeek = translations.Deutch.daysWeek[d.getDay() - 1]
      month = translations.Deutch.monthsYear[d.getMonth()]
    }
    return `${dayWeek}, ${date} ${month} ${year}`
  }


  function click2(lang: string) {
    changeLanguage(lang)
  }


  return <>



    <div className='content'>

      <div className="dropdown">
        <div className='item' data-value="en" key="en" onClick={() => click2("en")}>
          <img className='language' src={image}></img>
        </div>
        <div className="dropdown-options">
          {otherLangs.map(m => <div className='item' data-value={m.lang} key={m.lang} onClick={() => click2(m.lang)}>
            <img className="language" src={m.image}></img></div>)}
        </div>
      </div>

      <div className='displayCity'>
        <div className="title">{title}</div>

        <div className="validation">
          <input className="input" type="text" onKeyDown={getCityName} placeholder={placeholderText} ></input>

          {isCorrect === true && <div><img className="validationIcon" src={CorrectIcon}></img></div>}
          {isCorrect === false && <div><img className="validationIcon" src={IncorrectIcon}></img></div>}
        </div>

        {isCorrect &&
          <>
            <div className="city">{city}, {weather.country}</div>
            <div>{displayDate()}</div>
            <div className="temperature">{weather.temperature} °C</div>
            <div>{weather.description}</div>
            <img className="iconWeather" src={imgSrc} ></img>


          </>
        }
      </div>
    </div>
  </>
}

export default App
