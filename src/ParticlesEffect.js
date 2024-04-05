import React from 'react'
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 
import particleOptions from './particleOptions.js';
import { useEffect,useState,useMemo } from 'react';

const ParticlesEffect = () => {

  const [started,setStarted] = useState(false)

    useEffect(() => {
      if(!started){
        setStarted(true)
        initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        }).then(() => {
          setInit(true);
        });  
      }
      }, []);

      const particlesLoaded = (container) => {
        // console.log(container);      
      };

      const options = useMemo(
        () => (  
       particleOptions
        ),
        [],
      );

const [init, setInit] = useState(false);
  return (  
        init?
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
          />:null   
  )
}

export default ParticlesEffect