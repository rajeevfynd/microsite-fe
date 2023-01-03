import * as React from 'react'
import SearchPrograms from './views/search-courses'
import ScrollablePrograms from './views/program-list'
import HeroCarousel from './views/hero-carousel'

export const LndHero = () => {
  const [showBody, setShowBody] = React.useState(true)
  return (
    <>
      <HeroCarousel></HeroCarousel>
      <SearchPrograms />
      <div className='body-container'>
        <ScrollablePrograms {...{ "type": "current", "title":"Enrolled Programs" }} />
        <br></br>
        <ScrollablePrograms {...{ "type": "completed", "title":"Completed Programs"}} />
      </div>
    </>
  )
}
