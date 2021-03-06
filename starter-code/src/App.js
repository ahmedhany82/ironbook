import React from 'react';
import users from "./users";
import './App.css';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        search: '',
        isStudent: false,
        isTeacher: false,
        campus: 'All'
    }
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    })
  }


  render() {
    const stateLowerCase = this.state.search.toLowerCase();
    const list = users.filter(element => {
                  return (   (this.state.search === '' ? true: ( element.firstName.toLowerCase().includes(stateLowerCase)|| element.lastName.toLowerCase().includes(stateLowerCase)))
                          && (this.state.isStudent === false ? true: element.role === "student")
                          && (this.state.isTeacher === false ? true: element.role === "teacher")
                          && (this.state.campus === 'All'? true: element.campus === this.state.campus) 
                        )}).map((user,index) => {
                  return (
                          <tr key={user.id} style={{width: '1000px', display:'flex', alignItems: 'center'}}>
                            <p style={{width: '200px'}}>{user.firstName}</p>
                            <p style={{width: '200px'}}>{user.lastName}</p>
                            <p style={{width: '200px'}}>{user.campus}</p>
                            <p style={{width: '200px'}}>{user.role}</p>
                            {user.linkedin && <a style={{width: '200px'}} href={user.linkedin}>linkedin</a>}
                          </tr>
                          )
                        })  
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'}}>
        <h1>IronBook</h1>
        <form onSubmit={this.handleSubmit} style={{width:'100%', marginBottom: '50px'}}>
          <div>
            <label htmlFor="search"></label>
            <input style={{width:'90%', height: '25px', marginLeft: '20px'}}
              type="text"
              name="search"
              id="search"
              value={this.state.search}
              onChange={this.handleChange}
            />
          </div>
          <div style={{marginTop: '10px'}}>
              <label htmlFor="isStudent" style={{marginLeft: '20px', marginRight: '5px'}}>Student</label>
              <input
                type="checkbox"
                name="isStudent"
                id="isStudent"
                checked={this.state.isStudent}
                onChange={this.handleChange}
              />
              <label htmlFor="isTeacher" style={{marginLeft: '20px', marginRight: '5px'}}>Teacher</label>
              <input
                type="checkbox"
                name="isTeacher"
                id="isTeacher"
                checked={this.state.isTeacher}
                onChange={this.handleChange}
              />   
              <label for="campus"  style={{marginLeft: '20px', marginRight: '10px'}}>Campus:</label>
              <select name="campus" id="campus" value={this.state.campus} onChange={this.handleChange}>
                <option value="All">All</option>
                <option value="Berlin">Berlin</option>
                <option value="Lisbon">Lisbon</option>
                <option value="Paris">Paris</option>
              </select> 
          </div>
        </form>
        <table style={{marginLeft: '100px'}}>
          <tr style={{tableLayout: 'fixed', display: 'flex', justifyContent: 'space-between', width: '1000px', textAlign: 'left'}}>
            <th style={{width: '200px'}}>First Name</th>
            <th style={{width: '200px'}}>Last Name</th>
            <th style={{width: '200px'}}>Campus</th>
            <th style={{width: '200px'}}>Role</th>
            <th style={{width: '200px'}}>Links</th>
          </tr>
            {list}
        </table>
      </div>
    )
  }
}

export default App;