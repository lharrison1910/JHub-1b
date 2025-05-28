import './App.css'
import "react-datepicker/dist/react-datepicker.css"

import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';

import MapSection from './components/MapSection/MapSection'

import validate from './Validation/validation'

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
  const [valid, isValid]=useState<string|null>(null);
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
      const response = await fetch(`https://api.postcodes.io/postcodes/${form.postcode}`)
      if(!response.ok){
        setError(`There was an error: ${response.status}`)
      } else{
        const data  = await response.json()
        setLatlng(data.result)
      }
    } catch(error){
      setError(`Something went wrong: ${error}`)
      throw new Error(`Something went wrong: ${error}`)
    }
  }

  async function fetchData() {
    try{
      const response = await fetch(`https://data.police.uk/api/crimes-street/all-crime?date=${form.stringDate}&lat=${latlng.latitude}&lng=${latlng.longitude}`)
      if (!response.ok){
        setError(`There was an error: ${response.status}`)
      } else {
        const data = await response.json()
        console.log(data[0])
        if (data.length>11){
          setCrimes(data.silce(0,10))
        } else {
          setCrimes(data.result)
        }
      }     
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

    if(validate(form.postcode, form.date)){
      if(form.date.getMonth()+1<10){
        setForm({
          ...form,
          stringDate: `${form.date.getFullYear()}-0${form.date.getMonth()+1}`
        })
      } else {
        setForm({
          ...form,
          stringDate: `${form.date.getFullYear()}-${form.date.getMonth()+1}`
        })
      }
      setTrigger(!trigger)
      setError(null)
      isValid(null)
    } else {
      isValid(`Something is wrong, please ensure the postcode is correct and the date is older than ${today.getMonth()+1}\\01\\${today.getFullYear()}`)
    }
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
        {valid === null?null:<p>{valid}</p>}
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