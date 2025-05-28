import { useEffect, useState } from 'react'
import './App.css'
import MapSection from './components/MapSection/MapSection'


interface LatLngInterface{
  latitude: number | undefined;
  longitude: number | undefined
}


function App() {
  const [trigger, setTrigger] = useState(false)
  const [latlng, setLatlng] = useState<LatLngInterface>({latitude:undefined, longitude: undefined})
  const [crimes, setCrimes] = useState([])
  const [error, setError] = useState<null| string>(null)
  const [form, setForm] = useState({
    postcode: "",
    date: ""
  })

  useEffect(()=> {
    if (form.postcode!= ""){
      fetchLatlng()
    }
  },[trigger])

  useEffect(()=>{
    if(latlng.latitude!=undefined){
    fetchData()
    }
  },[latlng])

  async function fetchLatlng(){
    try{
    await fetch(`https://api.postcodes.io/postcodes/${form.postcode}`)
    .then(res => res.json())
    .then(data=> setLatlng(data.result))
    
    } catch(error){
      setError(`Something went wrong: ${error}`)
      throw new Error(`Something went wrong: ${error}`)
    }
  }

  async function fetchData() {
    try{
    await fetch(`https://data.police.uk/api/crimes-street/all-crime?date=${form.date}&lat=${latlng.latitude}&lng=${latlng.longitude}`)
    .then(res=>res.json())
    .then(data=>setCrimes(data))
    } catch(error){
      setError(`Something went wrong: ${error}`)
      throw new Error(`Something went wrong: ${error}`)
    }
  }

  return (
    <>
    <div className='centre'>
      <h1 className='header'>Crime checker</h1>
      <div className='main'>
        <label>
          Enter a postcode:
          <input  value={form.postcode}onChange={e=> setForm({...form, postcode: e.target.value})}/>
        </label>
        <label>
          Date in format 'YYYY-MM':
          <input value={form.date} onChange={e => setForm({...form, date: e.target.value})}/>
        </label>
        <button onClick={()=> setTrigger(!trigger)}>Search</button>
      </div>
      <div className='map'>
        <MapSection crimes={crimes}/>
      </div>
      
      <div className='footer'>
        For crimes in scotland, only the British Transport Police provide data so results will be inaccurate.
      </div>
      <div className='error'>
        {error}
      </div>
    </div>
    </>
  )
}

export default App;