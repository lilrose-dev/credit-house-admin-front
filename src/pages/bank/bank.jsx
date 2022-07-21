import { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { InputGroup } from 'react-bootstrap';
import '../../App.css'
// import EditBtn from './../../assets/img/edit2.png'
// import DelBtn from '../../assets/img/delete.png'

function Bank() {

    const [bank, setBank] = useState([])
    
    const [ show, setShow ] = useState(false)
    const [ showEdit, setShowEdit] = useState(false)
    const [ showDel, setShowDel] = useState(false)

    
    const bankNameRef = useRef()
    const giveUpRef = useRef()
    const percentRef = useRef()
    const serviceRef = useRef()

    const editBankNameRef = useRef()
    const editGiveUpRef = useRef()
    const editPercentRef = useRef()
    const editServiceRef = useRef()
     
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
        fetch('https://credit-house.herokuapp.com/bank')
            .then((res) => res.json())
            .then((data) => setBank(data))
    }, [bank])

    //add bank
    const handleSubmit = (e) => {
        e.preventDefault()
        const bank_name = bankNameRef.current.value
        const give_upto = giveUpRef.current.value - 0
        const percent = percentRef.current.value - 0
        const service = serviceRef.current.value - 0
        fetch('https://credit-house.herokuapp.com/newBank',{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": '*'
            },
            body: JSON.stringify({
                name: bank_name,
                upto: give_upto,
                startingPayment: percent,
                service: service
            })
        })
        alert('Please click OK to confirm')
    }

    //update bank
    const handleUpdateSubmit = (ID) => {
        
        const bankName = editBankNameRef.current.value
        const giveUpto = editGiveUpRef.current.value - 0
        const percent = editPercentRef.current.value - 0
        const services = editServiceRef.current.value - 0
        fetch('https://credit-house.herokuapp.com/updateBank',{
            method: "PUT",
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify({
                id: ID,
                name: bankName,
                upto: giveUpto,
                startingPayment: percent,
                service: services
            })
            
        })
    }

    const handleDel = (ID) => {
        fetch('https://credit-house.herokuapp.com/delBank',{
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
                    <h3>Bank data</h3>
                    <button className="basketBtn" onClick={handleShow}>
                        Add +
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Bank name</td>
                            <td>Give up to</td>
                            <td>Starting payment in %</td>
                            <td>Bank service</td>
                            <td>Functionality</td>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                bank && bank.map((e, i) => {
                                    return <tr key={i}>
                                        <td>{e.bank_id}</td>
                                        <td>{e.bank_name}</td>
                                        <td>{e.upto} sum</td>
                                        <td>{e.starting_payment} %</td>
                                        <td>{e.bank_service} sum</td>
                                        <td>
                                            <button onClick={() => handelEditShow(e.bank_id)}>Edit</button>
                                            <button onClick={() => handleDelShow(e.bank_id)}>Delete</button>
                                        </td>
                                    </tr>
                                })
                            }
                    </tbody>
                </table>
                
                {/* Modal add */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add bank</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="bankName">Bank name:</label>
                            <input type="text" id='bankName' className='form-control' ref={bankNameRef} required placeholder='Asaka'/>
                        </div>
                        <div>
                            <label htmlFor="giveUp">Give up to:</label>
                            <input type="number" id='giveUp' className='form-control' ref={giveUpRef} required placeholder='700000000 sum'/>
                        </div>
                        <div>
                            <label htmlFor="payment">Starting payment in percent:</label>
                            <input type="number" id='payment' className='form-control' ref={percentRef} required placeholder='30%'/>
                        </div>
                        <div>
                            <label htmlFor="service">Bank service:</label>
                            <input type="number" id='service' className='form-control' ref={serviceRef} required placeholder='56000000 sum'/>
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
                    <Modal.Title>Edit bank</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdateSubmit}>
                        <div>
                            <label htmlFor="bankName">Bank name:</label>
                            <input type="text" id='bankName' className='form-control' ref={editBankNameRef} placeholder='Asaka'/>
                        </div>
                        <div>
                            <label htmlFor="giveUp">Give up to:</label>
                            <input type="number" id='giveUp' className='form-control' ref={editGiveUpRef} placeholder='700000000 sum'/>
                        </div>
                        <div>
                            <label htmlFor="payment">Starting payment in percent:</label>
                            <input type="number" id='payment' className='form-control' ref={editPercentRef} placeholder='30%'/>
                        </div>
                        <div>
                            <label htmlFor="service">Bank service:</label>
                            <input type="number" id='service' className='form-control' ref={editServiceRef} placeholder='56000000 sum'/>
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
                <Modal.Body><div className="alert alert-danger">Are you sure want to delete this bank?</div></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDelClose}>
                        Close
                    </Button>
                    <Button  variant="danger" className='sbmtBtn' type='submit'onSubmit={handleDel} onClick={handleDelClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
       </div>
    </>)
}
export default Bank;
