export class AppUtils {
  static isAnyWordExists = (searchString,targetString) => {
    const searchStringInputWords = searchString.split(/\s+/); 
    if(searchString === null || searchString.trim().length === 0)
    {
      return true;
    }
    
    const targetStringWords = targetString.split(/\s+/)
    for(let index = 0; index < searchStringInputWords.length ; index+=1){
      for(let y = 0; y < targetStringWords.length ; y += 1)
      {
        if(targetStringWords[y].toLowerCase().includes(searchStringInputWords[index].toLowerCase()))
        {
          return true;
        }
      }
    }
    return false;
  }
  static notAlreadySelected(selectedValues,person){
    let notExist = true;
    selectedValues.forEach((selectedVal)=>{
      if(selectedVal.id === person.id)
      {
        notExist = false;
      }
    })
    return notExist;
  }
}