import React from "react";
import AnalyticsDashboard from "../components/AnalyticsDashboard";

const DashboardPage = () => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Sales Analytics Dashboard</h1>
            <div className="card-wrapper">
                <AnalyticsDashboard />
            </div>
        </div>
    );
};

export default DashboardPage;
