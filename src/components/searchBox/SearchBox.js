import React from 'react'
import "./SearchBox.css"
import { AppUtils } from '../data/AppUtils'

export default function SearchBox({searchInput,data,selectedValues,setSelectedValues}) {

  const handleSelectedValue = (person )=>{
    
    setSelectedValues([...selectedValues,person])
  }
  return (
    <div className='SearchBoxContent'>
      {data.map((person,index)=>(
          AppUtils.isAnyWordExists(searchInput,person?.name)  && AppUtils.notAlreadySelected(selectedValues,person)?
          <div className='row space-between singleRow' key={index} onClick={()=>handleSelectedValue(person)}>
            <div className='row' >
              <img  className = "profileImage" src={person?.icon} alt='dummyImage'/>
              <div>
                {person?.name}
              </div>
            </div>
            <div className='greyColor'>
              {person?.email}
            </div>
          </div>
          :
          <div />
      ))

      }
    </div>
  )
}
