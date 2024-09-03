import { Route, Routes } from 'react-router-dom';
import CourseDetailsPage from '@/pages/CourseDetails';
import { Dashboard } from '@/pages/DashBoard';
import CourseListPage from '@/pages/CourseList';

function App() {
    return (
        <Routes>
            <Route path="/" element={<CourseListPage />} />
            <Route path="/course/:id" element={<CourseDetailsPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default App;
