import { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { InputGroup } from 'react-bootstrap';
import '../../App.css'
// import EditBtn from './../../assets/img/edit2.png'
// import DelBtn from '../../assets/img/delete.png'

function Complex() {

    const [complex, setComplex] = useState([])
    const [company, setCompany] = useState([])
    
    const [ show, setShow ] = useState(false)
    const [ showEdit, setShowEdit] = useState(false)
    const [ showDel, setShowDel] = useState(false)

    
    const complexNameRef = useRef()
    const compID = useRef()
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
        fetch('https://credit-house.herokuapp.com/complex')
            .then((res) => res.json())
            .then((data) => setComplex(data))
    }, [complex])

    useEffect(() =>{
        fetch('https://credit-house.herokuapp.com')
            .then((res) => res.json())
            .then((data) => setCompany(data))
    }, [company])
   

    //add complex
    const handleSubmit = (e) => {
        e.preventDefault()
        const complex_name = complexNameRef.current.value
        const companyID = compID.current.value
        fetch('https://credit-house.herokuapp.com/newComplex',{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": '*'
            },
            body: JSON.stringify({
                name: complex_name,
                companyID: companyID
                
            })
        })
        alert('Please click OK to confirm')
    }

    // //update complex
    const handleUpdateSubmit = (ID) => {
        const complex = editCompNameRef.current.value
        fetch('https://credit-house.herokuapp.com/updateComplex',{
            method: "PUT",
            headers:{
                "Content-Type":'application/json',
                "Access-Control-Allow-Origin": '*'
            },
            body: JSON.stringify({
                name: complex,
                id: ID
            })
            
        })
    }

    const handleDel = (ID) => {
        fetch('https://credit-house.herokuapp.com/deleteComplex',{
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
                    <h3>Complexes </h3>
                    <button className="basketBtn" onClick={handleShow}>
                        Add +
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Complex name</td>
                            <td>Company name</td>
                            <td>Functionality</td>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                complex && complex.map((e, i) => {
                                    return <tr key={i}>
                                        <td>{e.complexes_id}</td>
                                        <td>{e.complexes_name}</td>
                                        
                                            {
                                                company && company.map((b, k) =>{
                                                    if(b.building_company_id == e.building_company_id){
                                                        return <td key={k}>{b.building_company_name}</td>
                                                    }
                                                })
                                            }
                                        
                                        <td>
                                            <button onClick={() => handelEditShow(e.complexes_id)}>Edit</button>
                                            <button onClick={() => handleDelShow(e.complexes_id)}>Delete</button>
                                        </td>
                                    </tr>
                                })
                            }
                    </tbody>
                </table>
                
                {/* Modal add */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add complex</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="complexName">Complex name:</label>
                            <input type="text" id='complexName' className='form-control' ref={complexNameRef} required placeholder='Tashkent city'/>
                        </div>
                        <div>
                            <label htmlFor="companyName">Company name:</label>
                                <select name="" id="companyName" ref={compID}>
                                    {
                                        company && company.map((e, i) =>{
                                            return <option key={i} value={e.building_company_id}>{e.building_company_name}</option>
                                        })
                                    }
                                </select>
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
                    <Modal.Title>Edit complex</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdateSubmit}>
                        <div>
                            <label htmlFor="complexName">Complex name:</label>
                            <input type="text" id='companyName' className='form-control' ref={editCompNameRef} placeholder='Paradise Qoraqamish'/>
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
                <Modal.Body><div className="alert alert-danger">Are you sure want to delete this complex?</div></Modal.Body>
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
export default Complex;
