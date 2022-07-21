import React, { PureComponent, useState, useEffect } from 'react';
import { VictoryPie } from 'victory';
  
function Dashboard(){

    const [company, setCompany] = useState([])
    const [complex, setComplex] = useState([])
    const [room, setRoom] = useState([])
    const [bank, setBank] = useState([])

    useEffect(() => {
        fetch('https://credit-house.herokuapp.com')
          .then((res) => res.json())
          .then((data) => setCompany(data))
    }, [company])

    useEffect(() => {
        fetch('https://credit-house.herokuapp.com/complex')
          .then((res) => res.json())
          .then((data) => setComplex(data))
    }, [complex])
        
    useEffect(() => {
        fetch('https://credit-house.herokuapp.com/room')
          .then((res) => res.json())
          .then((data) => setRoom(data))
    }, [room])

    useEffect(() => {
        fetch('https://credit-house.herokuapp.com/bank')
          .then((res) => res.json())
          .then((data) => setBank(data))
    }, [bank])

    


    const allData = [
        { x: "Company", y: company && company.length },
        { x: "Houses", y: room && room.length },
        {x: "Banks", y: bank && bank.length},
        { x: "Complexes", y: complex && complex.length },
    ]
    
    
    return (<>
    <div className="boxes">
    <h2 className='heading'>All statistics</h2>
        <div className="dash_box">
            <div className='piechart' style={{height: 620}}>
                <VictoryPie
                    data={allData}
                    colorScale={['blue', 'yellow','red','dark-blue']}
                    radius={100}
                />
            </div> 
            <ul className='circle'>
                <li className="circle_blue">Companies: {company.length} </li>
                <li className="circle_yellow">Houses: {room.length}  </li>
                <li className="circle_red">Banks: {bank.length}</li>
                <li className="circle_dark">Complexes: {complex.length}</li>
            </ul>
        </div>
    </div>

    </>
    );
}
export default Dashboard;