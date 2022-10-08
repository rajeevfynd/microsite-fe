import * as React from 'react'
import Scrollable_courses from './views/course-list'
import ModalCarousal from './views/edit-hero-carousel'
import HeroCarousel from './views/hero-carousel'

export const LndHero = () => {
  return (
    <>
    <HeroCarousel></HeroCarousel>
    <ModalCarousal></ModalCarousal>
    <br></br>
    <h2>Hero Page</h2>
    <br>
    </br>
    <h3>Enrolled Courses</h3>
    <Scrollable_courses {...{"props":"current"}}/>
    <br></br>
    <h3>Completed Courses</h3>
    <Scrollable_courses {...{"props":"completed"}}/>
    <br></br>
    </>
  )
}
