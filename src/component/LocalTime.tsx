"use client";

import React from 'react';

type DateProps = {
  createdAt: string;
};

const LocalizedDate = ({ createdAt } : DateProps) => {
  return (
    <span>
      {new Date(createdAt).toLocaleString()}
      {/* {new Date(createdAt).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })} */}
    </span>
  );
};

export default LocalizedDate;