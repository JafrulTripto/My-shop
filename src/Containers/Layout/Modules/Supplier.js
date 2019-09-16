import React, { Component } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { fetchSuppliers } from '../../../Store/Actions';
import AddSupplier from '../../../Components/Pages/Supplier/AddSupplier';
import ShowSuppliers from '../../../Components/Pages/Supplier/ShowSuppliers';
import '../../../Style.css'


class Supplier extends Component {

    state = {
        sup_Name: '',
        email: '',
        contact_person: '',
        contact_person_phone: '',
        category_id: null,
        search: ''

    }
    inuptChangeHandler = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }
    postSupplierHandler = () => {
        let supplier = {
            sup_Name: this.state.sup_Name,
            email: this.state.email,
            contact_person: this.state.contact_person,
            contact_person_phone: this.state.contact_person_phone,
            category_id: this.state.category_id
        }
        Axios.post(process.env.REACT_APP_SERVER+'addSupplier', supplier).then(response => {
            toast.info("New Product Unit Added");
            this.props.fetchSuppliers();
            this.setState({
                sup_Name: '',
                email: '',
                contact_person: '',
                contact_person_phone: '',
                category_id: null
            })
        }).catch(err => {
            console.log(err);
        })
    }





    componentDidMount(prevProp, prevState) {
        if (this.props.suppliers.length === 0) {
            this.props.fetchSuppliers();
        }


    }

    render() {

        let filteredSuppliers = this.props.suppliers.filter(supplier => {
            return supplier.sup_Name.toLowerCase().indexOf(this.state.search) !== -1;
        });
        //console.log(this.props.suppliers)
        return (
            <div className="container">
                <div className="row">
                    <div className="input-group mb-3 mx-3">
                        <input type="text" className="form-control" name="search" onChange={this.inuptChangeHandler}
                            placeholder="Search Supplier By Name . . ." aria-label="Recipient's username" aria-describedby="button-addon2" />

                    </div>
                </div>
                <button type="button" id="ContainerBody" className="btn btn-dark btn-lg btn-block"
                    data-toggle="modal" data-target="#addSupplierModal">ADD NEW SUPPLIER</button>
                <AddSupplier changeInput={this.inuptChangeHandler}
                    addSupplier={this.postSupplierHandler} />
                <ShowSuppliers supplier={filteredSuppliers} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        suppliers: state.supplierData.suppliers
    }
}

export default connect(mapStateToProps, {
    fetchSuppliers
})(Supplier);