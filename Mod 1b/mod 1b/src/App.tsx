import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

import MapSection from './components/MapSection/MapSection'
import './App.css'

interface LatLngInterface{
  latitude: number | undefined;
  longitude: number | undefined
}

interface CrimesInterface{
  location: {
    latitude: string;
    longitude: string
  }
  id: string
  category: string;
  outcome_status: {
    category: string
  }
}

function App() {
  const [trigger, setTrigger] = useState(false)
  const [latlng, setLatlng] = useState<LatLngInterface>({latitude:undefined, longitude: undefined})
  const [crimes, setCrimes] = useState<CrimesInterface[]|null>(null)
  const [error, setError] = useState<null| string>(null)
  const [form, setForm] = useState({
    postcode: "",
    date: new Date(),
    stringDate: ""
  })

  const [valid, isValid]=useState<boolean|undefined>(undefined);
  const today= new Date()


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
    await fetch(`https://data.police.uk/api/crimes-street/all-crime?date=${form.stringDate}&lat=${latlng.latitude}&lng=${latlng.longitude}`)
    .then(res=>res.json())
    .then(data=> {
      if (data.length>101){
        setCrimes(data.slice(0,10))
      } else {
        setCrimes(data)
      }
    })      
      
    } catch(error){
      setError(`Something went wrong: ${error}`)
      throw new Error(`Something went wrong: ${error}`)
    }
  }

  function handleDateSelect(date: Date| null){
    if (date != null){
    setForm({
      ...form,
      date: date
    })
    }
  }

  function handleSearch(){
    const year = form.date.getFullYear()
    const month = form.date.getMonth()+1
    let output = ""
    if(month<10){
      output = year+"-0"+month
    } else{
      output = year+"-"+month
    }
    setForm({
      ...form,
      stringDate: output
    })

    if (form.postcode===""){
      isValid(false)
    }else{
      isValid(true)
    }
    setTrigger(!trigger)
    setError(null)
  }

  return (
    <>
    <div className='centre'>
      <h1 className='absolute top-50'>Check crimes in your area.</h1>
      <div className='main'>
        <label className='m-2'>
          Enter a postcode:
          <input className='text-black border-2 outline-slate-50' value={form.postcode}onChange={e=> setForm({...form, postcode: e.target.value})}/>
        </label>
        <label>Choose a date</label>
        <DatePicker selected={form.date} onChange={(date)=>handleDateSelect(date)} endDate={today}/>
        <button onClick={handleSearch}>Search</button> 
        {valid ===false?<p>Please enter a postcode</p>:null}
      </div>

      <div className='map'>
        <MapSection crimes={crimes}/>
      </div>
      
      <div className='footer'>
        For crimes in scotland, only the British Transport Police provide data so results may be inaccurate.
      </div>
      <div className='error'>
        {error}
      </div>
    </div>
    </>
  )
}

export default App;