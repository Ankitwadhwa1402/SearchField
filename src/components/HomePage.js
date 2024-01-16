import React, { useEffect, useRef, useState } from 'react'
import "./HomePage.css"
import SearchBox from './searchBox/SearchBox';
import { OrderDataModel } from './data/Data';

export default function HomePage() {
  // assuming data on frontend hard coded 
  const [searchInput,setSearchInput] = useState('');
  const [selectedValues,setSelectedValues] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const inputRef = useRef(null);

  const handleSearchValue = (e) =>{
    setSearchInput(e.target.value);
  }

  const handleSelectedValue = (newSelectedValues) =>{
    setSelectedValues(newSelectedValues)
  }
  const handleCrossIcon =(index)=>{
    setSelectedValues(selectedValues.slice(0,index).concat(selectedValues.slice(index+1)))
  }

  const updateCursorPosition = () => {
    if (inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const cursorPositionTop = inputRect.bottom + window.scrollY;
      const cursorPositionLeft = inputRect.left + window.scrollX;

      setCursorPosition({ top: cursorPositionTop, left: cursorPositionLeft });
    }
  };


  useEffect(()=>{
    let inputField = document.getElementById("inputField");
    let lastBackspacePress = 0;
    const handleBackspace = (event) => {
      if (event.keyCode === 8 && inputField.value === ""  && document.activeElement.id === "inputField") {
        const currentTimestamp = new Date().getTime();
  
        if (currentTimestamp - lastBackspacePress < 1000) {
          if (selectedValues.length > 0) {
            setSelectedValues(selectedValues.slice(0, selectedValues.length - 1));
          }
        }
  
        lastBackspacePress = currentTimestamp;
      }
    };
    document.addEventListener("keydown", handleBackspace);  



    updateCursorPosition();
    window.addEventListener('scroll', updateCursorPosition);

    return () => {
      // window.removeEventListener('scroll', updateCursorPosition);
      document.removeEventListener("keydown", handleBackspace);
    };
  },[selectedValues])
  
  return (
    <div className='homeContent'>
      <div className='heading'><b>Pick Users</b></div>
      <div className='searchField row'>
        {selectedValues?.map((person,index)=>(
          <div className='row selectedItem' key={index}>
            <div className='row'>
              <img  className="profileImage" src={person?.icon} alt='dummyImage'/>
              <div key={index}>{person?.name}</div>
            </div>
            <div className='crossIcon' onClick={()=>handleCrossIcon(index)}> x</div>
          </div>
        ))
        }
        <input ref={inputRef} className='inputField' id='inputField' placeholder='Add new user..' type='text' value={searchInput}  onChange={(e)=>handleSearchValue(e)}/>
      </div>
      <div className='floating' style={{ top: cursorPosition.top, left: cursorPosition.left-400}}>
        <SearchBox  searchInput = {searchInput} data = {OrderDataModel.payload} selectedValues = {selectedValues} setSelectedValues= {handleSelectedValue}/>
      </div>
    </div>

  )
}
