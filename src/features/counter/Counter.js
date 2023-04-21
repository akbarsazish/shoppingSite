import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

export function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    {

    }

    return (
        <div>
            <div>
                <FontAwesomeIcon onClick={() => dispatch(increment())} icon={faPlusCircle} id="addTobuy" className='tobuy fw-bold' style={{ backgroundColor: "red", marginTop: "3px" }}> </FontAwesomeIcon>
                <span>{count}</span>
                <FontAwesomeIcon onClick={() => dispatch(decrement())} icon={faMinusCircle} id="minusTobuy" className='tobuy fw-bold'> </FontAwesomeIcon>
            </div>
        </div>
    )
}

