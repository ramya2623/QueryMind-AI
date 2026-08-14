import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/analytics.css";

import { useEffect, useState } from "react";
import axios from "axios";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";


function Analytics() {

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const CHART_COLORS = [
    "#4F7CAC",
    "#6D8EAA",
    "#8FA8BD",
    "#5F7F9B",
    "#7896AE",
    "#A1B5C5"
];

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


    const productData = analytics?.sales_by_product || [];
    const regionData = analytics?.sales_by_region || [];


    /*
        QueryMind AI warm earthy palette
    */
    const chartColors = [
        "#8B6F5A",
        "#A88B73",
        "#C4A88A",
        "#6F6258",
        "#B89A7A",
        "#927B68",
        "#D1B79A",
        "#7A6E64"
    ];


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


                {/* MAIN STAT CARDS */}

                <div className="analytics-stats">

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


                {/* SECONDARY STAT CARDS */}

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


                {/* CHARTS */}

                <div className="chart-section">


                    {/* SALES BY PRODUCT */}

                    <div className="chart-card">

                        <h2>Sales by Product</h2>

                        {productData.length > 0 ? (

                            <div className="chart-wrapper">

                                <ResponsiveContainer
                                    width="100%"
                                    height={300}
                                >

                                    <BarChart
                                        data={productData}
                                        margin={{
                                            top: 10,
                                            right: 20,
                                            left: 0,
                                            bottom: 10
                                        }}
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="var(--chart-grid)"
                                        />

                                        <XAxis
                                            dataKey="name"
                                            tick={{
                                                fill: "var(--chart-text)"
                                            }}
                                            axisLine={{
                                                stroke: "var(--chart-axis)"
                                            }}
                                            tickLine={false}
                                        />

                                        <YAxis
                                            tick={{
                                                fill: "var(--chart-text)"
                                            }}
                                            axisLine={{
                                                stroke: "var(--chart-axis)"
                                            }}
                                            tickLine={false}
                                        />

                                       <Tooltip
    cursor={false}
    formatter={(value) =>
        `₹${Number(value).toLocaleString("en-IN")}`
    }
/>

                                      <Bar
    dataKey="value"
    name="Sales"
    fill="#4F7CAC"
    radius={[8, 8, 0, 0]}
    activeBar={false}
/>

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>

                        ) : (

                            <div className="chart-empty">
                                No product data available.
                            </div>

                        )}

                    </div>


                    {/* SALES BY REGION */}

                    <div className="chart-card">

                        <h2>Sales by Region</h2>

                        {regionData.length > 0 ? (

                            <div className="chart-wrapper">

                                <ResponsiveContainer
                                    width="100%"
                                    height={300}
                                >

                                    <PieChart>

                                        <Pie
    data={regionData}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={100}
    innerRadius={55}
    paddingAngle={3}
    activeShape={false}
>

                                            {regionData.map(
                                                (entry, index) => (

                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            chartColors[
                                                                index %
                                                                chartColors.length
                                                            ]
                                                        }
                                                    />

                                                )
                                            )}

                                        </Pie>

                                        <Tooltip
                                            contentStyle={{
                                                background: "var(--chart-tooltip-bg)",
                                                border: "1px solid var(--chart-tooltip-border)",
                                                borderRadius: "12px",
                                                color: "var(--chart-tooltip-text)"
                                            }}
                                            formatter={(value) =>
                                                `₹${Number(value).toLocaleString("en-IN")}`
                                            }
                                        />

                                        <Legend
                                            wrapperStyle={{
                                                color: "var(--chart-text)"
                                            }}
                                        />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>

                        ) : (

                            <div className="chart-empty">
                                No region data available.
                            </div>

                        )}

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
                                analytics.total_rows || 0
                            ).toLocaleString("en-IN")}{" "}
                            total records.
                        </li>

                        <li>
                            🤖 QueryMind AI has answered{" "}
                            {Number(
                                analytics.total_questions || 0
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