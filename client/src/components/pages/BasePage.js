import React, { Component } from 'react';
import Home from './Home';
import ShoppingCart from './ShoppingCart';
import ProductDetailsPage from './ProductDetailsPage';
import PageNotFound from '../views/PageNotFound';
import Header from '../views/Header';
import NavContainer from '../containers/NavContainer';
import ErrorBoundary from '../errorHandlers/ErrorBoundary';
import Footer from '../views/Footer';
import withAuth from '../../hoc/withAuth';

class BasePage extends Component {
  render() {
    let componentRendered = '';
    switch (this.props.pageName) {
      case "Home":
        componentRendered = <Home {...this.props}/>;
        break;
      case "ProductDetailsPage":
        componentRendered = <ProductDetailsPage {...this.props}/>;
        break;
      case "ShoppingCart":
        componentRendered = <ShoppingCart {...this.props}/>;
        break;
      default:
        componentRendered = <PageNotFound {...this.props}/>;
    };
    return(
      <div className="App">
        <Header />
        <NavContainer />
        <ErrorBoundary>
          {componentRendered}
        </ErrorBoundary>
        <Footer />
      </div>
    );
  }
}

export default withAuth(BasePage);
