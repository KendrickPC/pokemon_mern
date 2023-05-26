import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To Ken\'s Pokemon Shop',
  description: 'We sell raw gems at fair market value',
  keywords: 'Fire PSA 10s and BGS Black Labels that will 10x your investment if you flip these baddies'
}

export default Meta