import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Table, Rating } from 'semantic-ui-react'
import LoadingSpinner from './LoadingSpinner'
import { fetchProducts } from '../actions/products_actions';
//import { getProducts, getProductsPending, getProductsError } from '../reducers/productsReducer'


class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            pending: true,
            products: []
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps)
        if(nextProps.products && nextProps.pending) {
            return ({ pending: nextProps.pending, products: nextProps.products });
        }
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
        console.log("inside componentWillMount")
        this.props.fetchProducts();
    }

    shouldComponentRender = () => {
        const {pending} = this.props;
        if(pending === false) return false;
        // more tests
        return true;
    }


    render() {
        const { products } = this.props;

        if(!this.shouldComponentRender()) return <LoadingSpinner />
        console.log('data', products.products[0])

        const productRow = products.products.map((item, index) =>
            <Table.Row key={index}>
                <Table.Cell>
                    <Header as='h2' textAlign='center'>
                        {item.name}
                    </Header>
                </Table.Cell>
                <Table.Cell singleLine>{item.type}</Table.Cell>
                <Table.Cell textAlign='right'>{item.price.$numberDecimal}</Table.Cell>
                <Table.Cell>
                    <Rating icon='star' defaultRating={item.rating.$numberDecimal} maxRating={5} />
                </Table.Cell>
                <Table.Cell>{item.available? "available": 'not available'}</Table.Cell>
            </Table.Row>
        );
        console.log('product row ', productRow)
        return (
            <div>
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>name</Table.HeaderCell>
                            <Table.HeaderCell>type</Table.HeaderCell>
                            <Table.HeaderCell>price</Table.HeaderCell>
                            <Table.HeaderCell>rating</Table.HeaderCell>
                            <Table.HeaderCell>available</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {productRow}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

Products.propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    pending: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    products: state.products,
    pending: state.pending
});

export default connect(mapStateToProps, { fetchProducts })(Products);