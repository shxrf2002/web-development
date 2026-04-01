import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FitPointsApp() {
  const [steps, setSteps] = useState(0);
  const [heartRate, setHeartRate] = useState(70);
  const [points, setPoints] = useState(0);
  const [reward, setReward] = useState("");

  // Simulate step tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setSteps((prev) => prev + Math.floor(Math.random() * 20));
      setHeartRate(60 + Math.floor(Math.random() * 40));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Calculate points
  useEffect(() => {
    const stepPoints = Math.floor(steps / 1000) * 10;
    const hrPoints = heartRate > 80 ? 20 : 0;
    setPoints(stepPoints + hrPoints);
  }, [steps, heartRate]);

  const redeemReward = () => {
    if (points >= 2000) {
      setReward("🎉 Full Cheat Day Unlocked!");
    } else if (points >= 1000) {
      setReward("🍔 Cheat Meal Unlocked!");
    } else if (points >= 500) {
      setReward("🍫 Snack Reward Unlocked!");
    } else {
      setReward("❌ Not enough points");
    }
  };

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold text-center">FitPoints</h1>

      <Card>
        <CardContent className="p-4">
          <p>👣 Steps: {steps}</p>
          <p>❤️ Heart Rate: {heartRate} bpm</p>
          <p>⭐ Points: {points}</p>
        </CardContent>
      </Card>

      <Button onClick={redeemReward}>Redeem Reward</Button>

      {reward && (
        <Card>
          <CardContent className="p-4 text-center">
            <p>{reward}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
