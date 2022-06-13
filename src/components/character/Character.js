
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

// import { getLocations, postNewEmployee, postNewUser } from "../APIManager"

export const Character = () => {
    return <><h1>HERE IS WHERE YOU WILL FILL OUT AND ADD/EDIT CHARACTERS</h1></>
}








// export const EmployeeForm = () => {
//     const navigate = useNavigate()


//     const [locationsArray, setLocations] = useState([])
//     const [newCharacter, updateCharacter] = useState({ /*when you callupdate it will automatically assign these given properties to a new object.  or i mean a copy of the existing state*/

//         fullName: "",
//         isStaff: true,
//         email: ""

//     })

//     const [newEmployee, updateEmployee] = useState({
//         userId: 0,
//         payrate: 0,
//         locationId: 0,
//         startDate: ""
//     })

//     useEffect(
//         () => {
//             getLocations()
//                 .then((locationArr) => {
//                     setLocations(locationArr)
//                 })
//         },
//         [] // When this array is empty, you are observing initial component state
//     )


//     const handleSaveButtonClick = (event) => {
//         event.preventDefault()
//         // TODO: Perform the fetch() to POST the object to the API
//         saveNewEmployee()

//     }
//  const saveNewEmployee = () => {
//      let userToSendToAPI = {...newUser }
     
//         postNewUser(userToSendToAPI)
//                 .then((newEmployeeObj) => {
//                     let employee = { ...newEmployee}
                    
//                             let employeeToSendToAPI = { 
//                                 payrate: parseFloat(employee.payRate),
//                                 locationId: parseFloat(employee.locationId),
//                                 startDate: employee.startDate,
//                                 userId: newEmployeeObj.id
                             
                            
//                         }

                            
//                     postNewEmployee(employeeToSendToAPI)
//                         .then(() => {
//                             navigate("/employees")
//                         })
    
//                 })
//     }
//     // TODO: Create the object to be saved to the API
















//     return <form className="employee__Form">
//         <h2 className="employeeForm__title">Add Staff</h2>
//         <fieldset>
//             <div className="form-group">
//                 <label className="name">Full Name:</label>
//                 <input
//                     required autoFocus
//                     type="text"
//                     className="form-control"
//                     placeholder="First and Last"
//                     value={newUser.fullName}  //default value included
//                     onChange={
//                         (evt) => {
//                             const copy = { ...newUser }
//                             copy.fullName = evt.target.value
//                             update(copy)
//                         }
//                     } />
//             </div>
//         </fieldset>
//         <fieldset>
//             <div className="form-group">
//                 <label className="email">Email:</label>
//                 <input
//                     required autoFocus
//                     type="text"
//                     className="form-control"
//                     placeholder="Employee Email"
//                     value={newUser.email}  //default value included
//                     onChange={
//                         (evt) => {
//                             const copy = { ...newUser }
//                             copy.email = evt.target.value
//                             update(copy)
//                         }
//                     } />
//             </div>
//         </fieldset>
//         <fieldset>

//             <div className="form-group">
//                 <label for="hireDate">Start Date: </label>
//                 <input type="date" value={newEmployee.startDate} className="hireDate"
//                     onChange={
//                         (evt) => {
//                             const copy = { ...newEmployee }
//                             copy.startDate = evt.target.value
//                             updateEmployee(copy)
//                         }
//                     } />
//             </div>
//         </fieldset>

//         <fieldset>
//             {locationsArray.map((location) => <EmployeeFormCheck key={`${location.id}`} locationObj={location} newUser={newEmployee} update={updateEmployee} />)}

//         </fieldset>
//         <fieldset>
//             <label className="form__group">Rate: </label>
//             <input type="number" value={newEmployee.rate}
//                 onChange={
//                     (evt) => {
//                         const copy = { ...newEmployee }
//                         copy.payRate = evt.target.value
//                         updateEmployee(copy)
//                     }}>
//             </input>
//         </fieldset>
//         <button onClick={handleSaveButtonClick}>Add Employee</button>





//     </form>
    


// }

