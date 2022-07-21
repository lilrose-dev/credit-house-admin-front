import { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { InputGroup } from 'react-bootstrap';
import '../../App.css'
// import EditBtn from './../../assets/img/edit2.png'
// import DelBtn from '../../assets/img/delete.png'

function Company() {

    const [company, setCompany] = useState([])
    
    const [ show, setShow ] = useState(false)
    const [ showEdit, setShowEdit] = useState(false)
    const [ showDel, setShowDel] = useState(false)

    
    const companyNameRef = useRef()
   
    const editCompNameRef = useRef()
   
     
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEditClose = () => setShowEdit(false)
    const handelEditShow = (ID) =>{
        setShowEdit(true) 
        console.log(ID);
        handleUpdateSubmit(ID)
    }

    const handleDelShow = (ID) => {
        setShowDel(true)
        handleDel(ID)
    }
    const handleDelClose = () => setShowDel(false)



    useEffect(()=> {
        fetch('https://credit-house.herokuapp.com')
            .then((res) => res.json())
            .then((data) => setCompany(data))
    }, [company])

    //add company
    const handleSubmit = (e) => {
        e.preventDefault()
        const company_name = companyNameRef.current.value
        fetch('https://credit-house.herokuapp.com/newBuilding',{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": '*'
            },
            body: JSON.stringify({
                name: company_name
                
            })
        })
        alert('Please click OK to confirm')
    }

    // //update company
    const handleUpdateSubmit = async(ID) => {
        const DATA = {
            name: editCompNameRef.current.value,
            id: ID
        }
        await fetch('https://credit-house.herokuapp.com/updateBuilding',{
            method: "PUT",
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify(DATA)
            
        })
    }

    const handleDel = (ID) => {
        fetch('https://credit-house.herokuapp.com/deleteBuilding',{
            method: "DELETE",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id: ID
            })
        })
    }
    


    return(<>
       <div className="wrapper">
            <div className="content">
                <div className="header">
                    <h3>Companies </h3>
                    <button className="basketBtn" onClick={handleShow}>
                        Add +
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Company name</td>
                            <td>Functionality</td>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                company && company.map((e, i) => {
                                    return <tr key={i}>
                                        <td>{e.building_company_id}</td>
                                        <td>{e.building_company_name}</td>
                                        <td>
                                            <button onClick={() => handelEditShow(e.building_company_id)}>Edit</button>
                                            <button onClick={() => handleDelShow(e.building_company_id)}>Delete</button>
                                        </td>
                                    </tr>
                                })
                            }
                    </tbody>
                </table>
                
                {/* Modal add */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="companyName">Company name:</label>
                            <input type="text" id='companyName' className='form-control' ref={companyNameRef} required placeholder='Tashkent city'/>
                        </div>
                       
                        <div className="buttons">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button  variant="primary" className='sbmtBtn' type='submit' onClick={handleClose}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Modal edit */}

            <Modal show={showEdit} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdateSubmit}>
                        <div>
                            <label htmlFor="companyName">Company name:</label>
                            <input type="text" id='companyName' className='form-control' ref={editCompNameRef} placeholder='Paradise'/>
                        </div>
                      
                        <div className="buttons">
                            <Button variant="secondary" onClick={handleEditClose}>
                                Close
                            </Button>
                            <Button  variant="primary" className='sbmtBtn' type='submit' onClick={handleEditClose}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>


             {/* Modal delete confirmation */}
             <Modal show={showDel} onHide={handleDelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="alert alert-danger">Are you sure want to delete this company?</div></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDelClose}>
                        Close
                    </Button>
                    <Button  variant="danger" className='sbmtBtn' type='submit' onSubmit={handleDel} onClick={handleDelClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
       </div>
    </>)
}
export default Company;
