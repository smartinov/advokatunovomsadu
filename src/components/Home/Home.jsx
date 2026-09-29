import { Banner } from '../Banner/banner'
import { About } from '../About/about'
import { OurWork } from '../OurWork/our-work'
import { Team } from '../Team/team'
import { Footer } from '../Footer/footer'
import React from 'react'

export const Home = () => {
  return (
    <div>
      <Banner />
      <About />
      <OurWork />
      <Team />
      <Footer />
    </div>
  )
}
