import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to Proshop',
    description: 'We sell best products for cheap',
    keywords: 'electronics, buy electronics, cheap electronics'
}

Meta.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keyword: PropTypes.string,
};

export default Meta;