import * as React from 'react'
import SearchCourses from './views/search-courses'
import ScrollablePrograms from './views/program-list'
import HeroCarousel from './views/hero-carousel'

export const LndHero = () => {
  return (
    <>
      <HeroCarousel></HeroCarousel>
      <SearchCourses />
      <div className='body-container'>
        <ScrollablePrograms {...{ "type": "current", "title":"Enrolled Programs" }} />
        <br></br>
        <ScrollablePrograms {...{ "type": "completed", "title":"Completed Programs"}} />
      </div>
    </>
  )
}
