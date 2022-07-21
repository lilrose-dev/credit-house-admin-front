import { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { InputGroup } from 'react-bootstrap';
import '../../App.css'
// import EditBtn from './../../assets/img/edit2.png'
// import DelBtn from '../../assets/img/delete.png'

function Room() {

    const [complex, setComplex] = useState([])
    const [room, setRoom] = useState([])
    
    const [ show, setShow ] = useState(false)
    const [ showEdit, setShowEdit] = useState(false)
    const [ showDel, setShowDel] = useState(false)

    
    const roomCountRef = useRef()
    const roomSizeRef = useRef()
    const roomPriceRef = useRef()
    const complexRef = useRef()

    const roomEditCountRef = useRef()
    const roomEditSizeRef = useRef()
    const roomEditPriceRef = useRef()
       
     
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
        fetch('https://credit-house.herokuapp.com/room')
            .then((res) => res.json())
            .then((data) => setRoom(data))
    }, [room])

    //add room
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('https://credit-house.herokuapp.com/newComplexRoom',{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": '*'
            },
            body: JSON.stringify({
                price: roomPriceRef.current.value - 0,
                count: roomCountRef.current.value - 0,
                size: roomSizeRef.current.value - 0,
                complexID: complexRef.current.value
                
            })
        })
        alert('Please click OK to confirm')
    }

    // //update room
    const handleUpdateSubmit = (ID) => {
        fetch('https://credit-house.herokuapp.com/updateComplexRoom',{
            method: "PUT",
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify({
                price:roomEditPriceRef.current.value - 0,
                count: roomEditCountRef.current.value - 0,
                size: roomEditSizeRef.current.value - 0,
                id: ID
            })
            
        })
    }

    const handleDel = (ID) => {
        fetch('https://credit-house.herokuapp.com/delComplexRoom',{
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
                    <h3>Rooms </h3>
                    <button className="basketBtn" onClick={handleShow}>
                        Add +
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Room count</td>
                            <td>Room size</td>
                            <td>Room price per m/2</td>
                            <td>Complex name</td>
                            <td>Functionality</td>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                room && room.map((e, i) => {
                                    return <tr key={i}>
                                        <td>{e.complexes_room_id}</td>
                                        <td>{e.complexes_room_counts}</td>
                                        <td>{e.complexes_room_size} m/2</td>
                                        <td>{e.complexes_room_price} sum</td>
                                        {
                                            complex && complex.map((b, k) =>{
                                                if(b.complexes_id == e.complexes_id){
                                                    return <td key={k}>{b.complexes_name}</td>
                                                }
                                            })                                                
                                        }
                                            
                                        
                                        <td>
                                            <button onClick={() => handelEditShow(e.complexes_room_id)}>Edit</button>
                                            <button onClick={() => handleDelShow(e.complexes_room_id)}>Delete</button>
                                        </td>
                                    </tr>
                                })
                            }
                    </tbody>
                </table>
                
                {/* Modal add */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add room:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="roomCount">Room count:</label>
                            <input type="number" id='roomCount' className='form-control' ref={roomCountRef} required placeholder='4'/>
                        </div>
                        <div>
                            <label htmlFor="complexName">Room size:</label>
                            <input type="number" id='complexName' className='form-control' ref={roomSizeRef} required placeholder='45m/2'/>
                        </div>
                        <div>
                            <label htmlFor="complexName">Room price:</label>
                            <input type="number" id='complexName' className='form-control' ref={roomPriceRef} required placeholder="5000000"/>
                        </div>
                        <div>
                            <label htmlFor="companyName">Complex name:</label>
                            <select name="" id="companyName" ref={complexRef}>
                                {
                                    complex && complex.map((e, i) =>{
                                        return <option key={i} value={e.complexes_id}>{e.complexes_name}</option>
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
                    <Modal.Title>Edit room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdateSubmit}> 
                        <div>
                            <label htmlFor="roomCount">Room count:</label>
                            <input type="number" id='roomCount' className='form-control' ref={roomEditCountRef} required placeholder='4'/>
                        </div>
                        <div>
                            <label htmlFor="complexName">Room size:</label>
                            <input type="number" id='complexName' className='form-control' ref={roomEditSizeRef} required placeholder='45m/2'/>
                        </div>
                        <div>
                            <label htmlFor="complexName">Room price:</label>
                            <input type="number" id='complexName' className='form-control' ref={roomEditPriceRef} required placeholder="5000000"/>
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
                <Modal.Body><div className="alert alert-danger">Are you sure want to delete this room?</div></Modal.Body>
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
export default Room;
