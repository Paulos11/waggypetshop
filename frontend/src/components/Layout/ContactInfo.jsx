import React from 'react';

const ContactInfo = () => (
  <div className="hidden lg:flex items-center space-x-4">
    <div className="text-right">
      <span className="text-sm text-gray-500" style={{ fontFamily: 'Chilanka, cursive' }}>Phone</span>
      <h5 className="text-lg text-black" style={{ fontFamily: 'Chilanka, cursive' }}>+980-34984089</h5>
    </div>
    <div className="text-right">
      <span className="text-sm text-gray-500" style={{ fontFamily: 'Chilanka, cursive' }}>Email</span>
      <h5 className="text-lg text-black" style={{ fontFamily: 'Chilanka, cursive' }}>Waggy@Gmail.Com</h5>
    </div>
  </div>
);

export default ContactInfo;
