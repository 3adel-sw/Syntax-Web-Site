// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-2xl text-gray-700">  الصفحه قيد التنفيذ .....</p>
            <Link to="/" className="text-blue-500 hover:underline">ارجع خطوة الي الخلف من فضلك </Link>
        </div>
    );
}