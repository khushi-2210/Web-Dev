import { useState } from 'react';
import './App.css';

function Header(props) {
  return (
    <header className="app-header ">
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </header>
  );
}

function BMIinfo() {
  const categories = [
    { range: "Below 18.5", category: "Underweight", color: "Yellow" },
    { range: "Below 24.9", category: "Normal", color: "Green" },
    { range: "25-29.9", category: "Overweight", color: "Orange" },
    { range: "Above 30", category: "Obese", color: "Red" }
  ]

  return (
    <div className="bmi-info">
      <h3>BMI Categories</h3>
      <div className="categories">
        {categories.map(function (category, index) {
          return <div key={index} className="category-item" style={{ borderLeft: `6px solid ${category.color}` }}>
            <span className='range'>{category.range}</span>
            <span className='category'>{category.category}</span>
          </div>
        })}
      </div>
    </div>
  );

}

function BMIform({onCalculate}) {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (height && weight && name) {
      const heightInMetres = parseFloat(height) * 0.3048;
      const bmi = (weight / (heightInMetres * heightInMetres)).toFixed(1);

      onCalculate({
        name,
        height: parseFloat(height),
        weight: parseFloat(weight),
        bmi: parseFloat(bmi)
      })

      setName("")
      setHeight("")
      setWeight("")
    }

    else {
      alert("Empty fields")
    }
  }
  return (
    <form className="bmi-form" onSubmit={handleSubmit}>
      <h3> Calculate your BMI </h3>
      <div className="form-group">
        <label> Name: </label>
        <input 
        type="text"
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        placeholder="Enter your name" />
      </div>

      <div className="form-group">
        <label> Height: </label>
        <input 
        type="text"
        value={height}
        onChange={(e)=>{setHeight(e.target.value)}}
        placeholder="Enter your height" />
      </div>

      <div className="form-group">
        <label> Weight: </label>
        <input 
        type="text"
        value={weight}
        onChange={(e)=>{setWeight(e.target.value)}}
        placeholder="Enter your weight" />
      </div>
      <input type="submit" value="Calculate" className='calculate-btn' />
    </form>
  );
}

function BMIResult({result}){
  if(!result){
    return null;
  }
   const getBMICategory = (bmi)=>{
    if(bmi<18.5){
      return { category: "Underweight", color: "yellow" }
    } else if(bmi < 25){
      return { category: "Normal weight", color: "green" }
    } else if(bmi < 30){
      return { category: "Overweight", color: "orange" }
    } else {
      return { category: "Obese", color: "red" }
    }
  }
  const categoryInfo = getBMICategory(result.bmi);

  return (
    <div className='bmi-result'>
      <h3>{result.name}'s BMI result</h3>
      <div className='result-display'>
        <div className='bmi-value' style={{backgroundColor: `${categoryInfo.color}`}}>
          {result.bmi}
        </div>

        <div className='bmi-category' style={{backgroundColor: `${categoryInfo.color}`}}>
          {categoryInfo.category}
        </div>

        <div className='result-details'>
          <p>Height: {result.height} Ft</p>
          <p>Weight: {result.weight} Kg</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [CurrentResult, setCurrentResult] = useState(null);

  const handleCalculate = (data) => {
    console.log(data);
    setCurrentResult(data);
  }


  return (
    <div className='App'>
      <Header
        title="BMI APP"
        subtitle="Tell you weight and height and we'll calculate your bmi"></Header>

      <div className="app-content">
        <div className="left-panel">
          <BMIform onCalculate={handleCalculate} />
          <BMIinfo />
        </div>

        <div className="right-panel">
          <BMIResult result={CurrentResult}/>
        </div>
      </div>

    </div>
  );
}

export default App;
