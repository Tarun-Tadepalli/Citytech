import React, { useState } from 'react'
import Loader from './Loader';

export default function Biodiversities() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className='card-dashboard'>
    {isLoading && <Loader/>}
      <iframe width="950" height="600" frameborder="0" onLoad={() => setIsLoading(false)} src="https://www.globalforestwatch.org/embed/map/?mainMap=eyJzaG93QW5hbHlzaXMiOnRydWV9&map=eyJjZW50ZXIiOnsibGF0IjoxOC42MjkzNzMyMzY1MDQ3NiwibG5nIjo3NC45Nzc2NTYxOTMwODQ1MX0sInpvb20iOjQuMDI5NTY0Njg5ODkzNjUzLCJkYXRhc2V0cyI6W3siZGF0YXNldCI6ImJpb2RpdmVyc2l0eS1ob3RzcG90cyIsIm9wYWNpdHkiOjEsInZpc2liaWxpdHkiOnRydWUsImxheWVycyI6WyJiaW9kaXZlcnNpdHktaG90LXNwb3RzLTIwMTYiXX0seyJkYXRhc2V0IjoicG9saXRpY2FsLWJvdW5kYXJpZXMiLCJsYXllcnMiOlsiZGlzcHV0ZWQtcG9saXRpY2FsLWJvdW5kYXJpZXMiLCJwb2xpdGljYWwtYm91bmRhcmllcyJdLCJvcGFjaXR5IjoxLCJ2aXNpYmlsaXR5Ijp0cnVlfV0sImxhYmVsIjoiZGVmYXVsdCJ9&mapMenu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJiaW9kaXZlcnNpdHkifQ%3D%3D&mapPrompts=eyJzdGVwc0tleSI6ImFuYWx5emVBbkFyZWEiLCJzdGVwc0luZGV4IjowLCJmb3JjZSI6dHJ1ZX0%3D&menu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJmb3Jlc3RDaGFuZ2UiLCJtZW51U2VjdGlvbiI6ImRhdGFzZXRzIn0%3D"></iframe>
    </div>
  )
}
