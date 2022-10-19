import * as React from 'react'
import SearchPrograms from './views/search-program'
import Scrollable_programs from './views/program-list'
import HeroCarousel from './views/hero-carousel'

export const LndHero = () => {
  return (
    <>
      <HeroCarousel></HeroCarousel>
      <br>
      </br>
      <SearchPrograms />
      <br></br>
      <h3>Enrolled Programs</h3>
      <Scrollable_programs {...{ "props": "current" }} />
      <br></br>
      <h3>Completed Programs</h3>
      <Scrollable_programs {...{ "props": "completed" }} />
      <br></br>
    </>
  )
}