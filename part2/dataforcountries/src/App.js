
import {useState, useEffect} from 'react'
import axios from 'axios'
import './styles.css'
const api_key = process.env.REACT_APP_API_KEY


const SearchQuery = ({value,changeFunction}) => {
  return(
    <div className="search-cont">
      <h2>Search a country</h2>
      <input className="input-cont" value={value} onChange = {changeFunction} placeholder="Search a country"/>
    </div>
  )
}

const CountryData = (props) => {

  const {country,isActive, onShow} = props
  console.log(country);
  const currencies = Object.values(country.currencies)

    return (
      <div className="country-cont">
        
        { isActive ? (
          <>
          <h1>{country.name.common}</h1>
          <li> Official Name: {country.name.official}</li>
          <li> Capital: {country.capital}</li>
          <li> Currency: {currencies[0].name} {'(' + currencies[0].symbol + ')'}</li>
          <li> Population: {country.population}</li>
          
          <h3>Languages Spoken</h3>
        
          {
            Object.entries(country.languages).map(([key,value]) => <li key={key}>{value}</li>)
          }

          <h3>Geography</h3>
          <li> Region: {country.region}</li>
          <li> Sub-Region: {country.subregion}</li>
          <img className="flag" src={country.flags.png} alt="" />
          {/* <Weather country={country} />  */}
          </>) : 
          (<button onClick={onShow}> Show </button>)
      } 
      </div>
    )
}

const CountryDataSolo = (props) => {

  const {country,isActive, onShow} = props
  console.log(country);
  const currencies = Object.values(country.currencies)

    return (
      <div className="country-cont">
        
        <h1>{country.name.common}</h1>
        <li> Official Name: {country.name.official}</li>
        <li> Capital: {country.capital}</li>
        <li> Currency: {currencies[0].name} {'(' + currencies[0].symbol + ')'}</li>
        <li> Population: {country.population}</li>
        

        <h3>Languages Spoken</h3>
      
        {
          Object.entries(country.languages).map(([key,value]) => <li key={key}>{value}</li>)
        }

        <h3>Geography</h3>
        <li> Region: {country.region}</li>
        <li> Sub-Region: {country.subregion}</li>

        <h3>National Flag</h3>
        <img className="flag" src={country.flags.png} alt="" />
        <Weather country={country} /> 
      </div>
    )
}


const Display = (props) => {
  
  const {data,searchName} = props
  const [activeIndex,setActiveIndex] = useState(-1)
  


  if (data.length === 0 || searchName.length === 0){
    return 
  }
  else{
    const str = searchName[0].toUpperCase() + searchName.slice(1)
    const arr = data.filter(element => element.name.common.includes(str))
    
    const showBtn = (index) => {
      setActiveIndex(index)
    }

    //Since languages is an object and we don't know how many values there are, we use the Object.entries method which
    //returns a pair of [key,value] pairs for each key,value of the object. It returns it in the form of an array
    //So that means we can use the map method and just pass in each key,value of the array since each index of this array
    //consists of a [key,value] pair 
    //Object.entries(country.languages).map(([key,value]) => <li key={key}>{value}</li>)

    if (arr.length === 1){
      const country = arr[0]

      return (
        <CountryDataSolo country={country}/>
      )
    }

    return arr.length > 10 ? <h4>Too many matches!! add more text</h4> : arr.map((element,index)=> 
    <li key={element.cca2}>{element.name.common}
      {<CountryData country={element} isActive={activeIndex === index}
      onShow={() => showBtn(index)}/>}
    </li>
    )
  }
}

const Weather = (props) => {

  const [temp,setTemp] = useState(0)
  const [wind,setWind] = useState(0)
  const [icon,setIcon] = useState("")
  const {country} = props

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=metric`).then(
      response => {
        console.log(response.data)
        setTemp(response.data.main.temp)
        setWind(response.data.wind.speed)
        setIcon(response.data.weather[0].icon)
      }
    )
  },[])
  return (
    <div className="weather-cont">
      <h1 className="weather-header">Weather in {country.name.common}
      <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="" />
      </h1>
      <p>Temperature: {temp} celcius</p>
      <p>Wind: {wind} m/s</p>
    </div>
  )

}







const App = () => {

  const [names,setNames] = useState([])
  const [searchName,setSearchNames] = useState("")

  //Function used to update the state's value
  const searchInput = (e) => setSearchNames(e.target.value)

  useEffect( () => {

    axios.get("https://restcountries.com/v3.1/all").then(
      (response) => {
        console.log(response.data)
        setNames(response.data)
      }
    ).catch( () => console.log("ERRORRR"))

  },[])
  return (
    <div className="main-cont">

      <SearchQuery value={searchName} changeFunction={searchInput} />
      <Display data={names} searchName={searchName}/>
    </div>
    
  )


}

export default App