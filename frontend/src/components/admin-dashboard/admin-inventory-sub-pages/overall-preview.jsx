import React, { useState, useEffect } from "react";
import RealTimeCountIcon from "../../../assets/img/count.png";
import OverdueReturnIcon from "../../../assets/img/overdue.png";
import OverdueCountIcon from "../../../assets/img/overdue-count.png";
import ConditionItemIcon from "../../../assets/img/items.png";
import CalculatedIcon from "../../../assets/img/count.png";
import RealStockIcon from "../../../assets/img/real-stock.png";
import NeedRepairIcon from "../../../assets/img/need-repair.png";
import ConditionItemlogo from "../../../assets/img/condition-item.png";
import TotalItemPurchase from "../../../assets/img/total-item.png";
import TotalPurchasedCount from "../../../assets/img/total-count.png";
import "../../../assets/css/dashboard/brgy-inventory-css/overall-preview.css";

function OverallPreview() {
  const [stockCount, setStockCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [conditionCounts, setConditionCounts] = useState({
    Good: 0,
    "Needs Repair": 0,
  });
  const [calculatedCounts, setCalculatedCounts] = useState({
    calculated_total_count: 0,
    calculated_total_pesos: "0.00",
  });

  useEffect(() => {
    const fetchStockCount = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/inventory/stock-count"
        );
        const data = await response.json();
        setStockCount(data.real_time_stock_count);
      } catch (error) {
        console.error("Error fetching stock count:", error);
      }
    };

    fetchStockCount();
    const interval = setInterval(fetchStockCount, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCalculatedCounts = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/expenses/calculated-total"
        );
        const data = await response.json();
        setCalculatedCounts(data);
      } catch (error) {
        console.error("Error fetching calculated counts:", error);
      }
    };

    fetchCalculatedCounts();
    const interval = setInterval(fetchCalculatedCounts, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchConditionCounts = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/inventory/condition-counts"
        );
        const data = await response.json();
        setConditionCounts(data);
      } catch (error) {
        console.error("Error fetching condition counts:", error);
      }
    };

    fetchConditionCounts();
    const interval = setInterval(fetchConditionCounts, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchOverdueCount = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/issuance/overdue-count"
        );
        const data = await response.json();
        setOverdueCount(data.overdue_return_count);
      } catch (error) {
        console.error("Error fetching overdue count:", error);
      }
    };

    fetchOverdueCount();
    const interval = setInterval(fetchOverdueCount, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overall-preview__container">
      <div className="overall-preview__box-wrapper">
        <div className="overall-preview__box">
          <span className="overall-preview__label">Real Time Stock Count</span>
          <div className="overall-preview__icon-wrapper">
            <img
              src={RealTimeCountIcon}
              alt="Real Time"
              className="overall-preview__icon"
            />
          </div>
          <div className="overall-preview__value">
            <img
              src={RealStockIcon}
              alt="Real Stock"
              className="overall-preview__value-icon"
            />
            <span>{stockCount}</span>
          </div>
        </div>
        <div className="overall-preview__box">
          <span className="overall-preview__label">Overdue Returns</span>
          <div className="overall-preview__icon-wrapper">
            <img
              src={OverdueReturnIcon}
              alt="Overdue"
              className="overall-preview__icon"
            />
          </div>
          <div className="overall-preview__overdue">
            <img
              src={OverdueCountIcon}
              alt="Overdue Count"
              className="overall-preview__value-icon"
            />
            <span>{overdueCount}</span>
          </div>
        </div>

        <div className="overall-preview__box">
          <span className="overall-preview__label">Condition Items</span>
          <div className="overall-preview__icon-wrapper">
            <img
              src={ConditionItemIcon}
              alt="Condition"
              className="overall-preview__icon"
            />
          </div>

          <div className="overall-preview__condition-pair">
            <div className="condition__item">
              <img
                src={ConditionItemlogo}
                alt="Good"
                className="overall-preview__value-icon"
              />
              <span>{conditionCounts.Good}</span>
            </div>
            <div className="condition__item">
              <img
                src={NeedRepairIcon}
                alt="Needs Repair"
                className="overall-preview__value-icon"
              />
              <span>{conditionCounts["Needs Repair"]}</span>
            </div>
          </div>
        </div>

        <div className="overall-preview__box">
          <span className="overall-preview__label">
            Calculated Total Counts
          </span>
          <div className="overall-preview__icon-wrapper">
            <img
              src={CalculatedIcon}
              alt="Calculated"
              className="overall-preview__icon"
            />
          </div>

          <div className="overall-preview__calculated-counts">
            <div className="calculated__item">
              <img
                src={TotalItemPurchase}
                alt="Total Item Purchase"
                className="overall-preview__value-icon"
              />
              <span>{calculatedCounts.calculated_total_count}</span>
            </div>
            <div className="calculated__item">
              <img
                src={TotalPurchasedCount}
                alt="Total Cost"
                className="overall-preview__value-icon"
              />
              <span>₱{calculatedCounts.calculated_total_pesos}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallPreview;
