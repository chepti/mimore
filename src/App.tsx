import { Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateTimeline from './pages/CreateTimeline'
import Timeline from './pages/Timeline'
import CreateTimelineItem from './pages/CreateTimelineItem'
import Header from './components/Header'
import Explore from './pages/Explore'

function App() {
  return (
    <Box>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create-timeline" element={<CreateTimeline />} />
        <Route path="/timeline/:id" element={<Timeline />} />
        <Route path="/timeline/:timelineId/add-item" element={<CreateTimelineItem />} />
      </Routes>
    </Box>
  )
}

export default App 