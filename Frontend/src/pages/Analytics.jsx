import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/analytics.css";

import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const response = await axios.get(
                    "http://127.0.0.1:8000/analytics"
                );

                console.log("Analytics:", response.data);

                setAnalytics(response.data);

            } catch (err) {

                console.error("Analytics error:", err);

                setError("Unable to load analytics.");

            } finally {

                setLoading(false);

            }
        };

        fetchAnalytics();

    }, []);


    if (loading) {

        return (
            <div className="analytics">

                <Sidebar />

                <Navbar />

                <div className="analytics-content">

                    <div className="analytics-header">

                        <h1>Analytics</h1>

                        <p>
                            Understand your business through AI-powered analytics.
                        </p>

                    </div>

                    <p>Loading analytics...</p>

                </div>

            </div>
        );

    }


    if (error) {

        return (
            <div className="analytics">

                <Sidebar />

                <Navbar />

                <div className="analytics-content">

                    <div className="analytics-header">

                        <h1>Analytics</h1>

                        <p>
                            Understand your business through AI-powered analytics.
                        </p>

                    </div>

                    <p>{error}</p>

                </div>

            </div>
        );

    }


    return (

        <div className="analytics">

            <Sidebar />

            <Navbar />

            <div className="analytics-content">

                {/* HEADER */}

                <div className="analytics-header">

                    <h1>Analytics</h1>

                    <p>
                        Understand your business through AI-powered analytics.
                    </p>

                </div>


                {/* STAT CARDS */}

                <div className="analytics-stats">

                    {/* REVENUE */}

                    <div className="analytics-card">

                        <h3>Total Revenue</h3>

                        <h2>
                            ₹{Number(
                                analytics.total_revenue || 0
                            ).toLocaleString("en-IN")}
                        </h2>

                        <span>
                            Total revenue generated
                        </span>

                    </div>


                    {/* SALES */}

                    <div className="analytics-card">

                        <h3>Total Sales</h3>

                        <h2>
                            ₹{Number(
                                analytics.total_sales || 0
                            ).toLocaleString("en-IN")}
                        </h2>

                        <span>
                            Total sales value
                        </span>

                    </div>


                    {/* ORDERS */}

                    <div className="analytics-card">

                        <h3>Orders</h3>

                        <h2>
                            {Number(
                                analytics.orders || 0
                            ).toLocaleString("en-IN")}
                        </h2>

                        <span>
                            Total records
                        </span>

                    </div>


                    {/* CUSTOMERS */}

                    <div className="analytics-card">

                        <h3>Customers</h3>

                        <h2>
                            {Number(
                                analytics.customers || 0
                            ).toLocaleString("en-IN")}
                        </h2>

                        <span>
                            Unique customers
                        </span>

                    </div>

                </div>


                {/* SECONDARY INFORMATION */}

                <div className="analytics-stats">

                    <div className="analytics-card">

                        <h3>Total Datasets</h3>

                        <h2>
                            {Number(
                                analytics.total_datasets || 0
                            ).toLocaleString("en-IN")}
                        </h2>

                        <span>
                            Uploaded datasets
                        </span>

                    </div>


                    <div className="analytics-card">

                        <h3>Total Rows</h3>

                        <h2>
                            {Number(
                                analytics.total_rows || 0
                            ).toLocaleString("en-IN")}
                        </h2>

                        <span>
                            Records across datasets
                        </span>

                    </div>


                    <div className="analytics-card">

                        <h3>Total Columns</h3>

                        <h2>
                            {Number(
                                analytics.total_columns || 0
                            ).toLocaleString("en-IN")}
                        </h2>

                        <span>
                            Data fields
                        </span>

                    </div>


                    <div className="analytics-card">

                        <h3>AI Questions</h3>

                        <h2>
                            {Number(
                                analytics.total_questions || 0
                            ).toLocaleString("en-IN")}
                        </h2>

                        <span>
                            Questions asked
                        </span>

                    </div>

                </div>


                {/* CHART SECTION */}

                <div className="chart-section">

                    <div className="chart-card">

                        <h2>Revenue Trend</h2>

                        <div className="chart-placeholder">

                            📈 Chart Coming Soon

                        </div>

                    </div>


                    <div className="chart-card">

                        <h2>Sales by Category</h2>

                        <div className="chart-placeholder">

                            🥧 Chart Coming Soon

                        </div>

                    </div>

                </div>


                {/* AI INSIGHTS */}

                <div className="insight-panel">

                    <h2>AI Insights</h2>

                    <ul>

                        <li>
                            📊 {analytics.total_datasets} datasets
                            are currently available.
                        </li>

                        <li>
                            📋 Your datasets contain{" "}
                            {Number(
                                analytics.total_rows
                            ).toLocaleString("en-IN")}{" "}
                            total records.
                        </li>

                        <li>
                            🤖 QueryMind AI has answered{" "}
                            {Number(
                                analytics.total_questions
                            ).toLocaleString("en-IN")}{" "}
                            questions.
                        </li>

                        <li>
                            💰 Total sales value is ₹
                            {Number(
                                analytics.total_sales || 0
                            ).toLocaleString("en-IN")}.
                        </li>

                    </ul>

                </div>

            </div>

        </div>

    );

}

export default Analytics;