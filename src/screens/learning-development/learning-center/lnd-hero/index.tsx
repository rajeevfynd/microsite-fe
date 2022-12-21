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
        <h3>Enrolled Programs</h3>
        <ScrollablePrograms {...{ "props": "current" }} />
        <br></br>
        <h3>Completed Programs</h3>
        <ScrollablePrograms {...{ "props": "completed" }} />
        <br></br>
      </div>
    </>
  )
}
