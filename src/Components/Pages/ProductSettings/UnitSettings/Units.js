import React from 'react'

export default function Units(props) {
    //console.log(props.units)
    return (
        <div className="row">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.units.length !== 0 ? props.units.map((unit, index) => {
                        return (
                            <tr key = {index}>
                                <th>{index+1}</th>
                                <td>{unit.unitName}</td>
                                <td>
                                    <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-danger" onClick={()=>props.deleteUnit(unit.id)} >
                                            <i className="material-icons">close</i>
                                        </button>
                                        <button type="button" className="btn btn-info" onClick={()=>props.update(unit.id)}>
                                            <i className="material-icons">edit</i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }) :
                        <tr >
                            <td colSpan="3">
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-grow text-info" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-danger" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <div className="spinner-grow" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </td>
                        </tr>

                    }


                </tbody>
            </table>
        </div>
    )
}
