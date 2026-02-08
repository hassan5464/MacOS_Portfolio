import React, { useRef, useState } from 'react';






const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => {
    <span key={i} className={className} style={{ fontVariantionSettings: `"wght" ${baseWeight}` }}>
      {char}
    </span>
  })
}




const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  return (
    <section>
      <p ref={subtitleRef} className='text-3xl font-georama'>{
        renderText("Hey, I'm Ahmed! Welcome to my", "text-3xl font-georama", 100)
      }
      </p>
      <h1 ref={titleRef} className='mt-7'>
        {renderText("Portfolio", "text-9xl italic font-georama")}
      </h1>
    </section>
  )
}

export default Welcome